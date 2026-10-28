import type { Buffer } from "node:buffer";
import type { LooseType } from "@evex/loose-types";

/**
 * TMoreCompactProtocol - TypeScript implementation
 * Ported from CHRLINE Python implementation by YinMo
 * Author: YinMo (https://github.com/WEDeach)
 * Source: CHRLINE (https://github.com/DeachSword/CHRLINE))
 */

interface DummyProtocolData {
	fid: number | null;
	ftype: number;
	data: unknown;
	subType: number[] | null;
}

interface DummyProtocol {
	data?: DummyProtocolData;
}

export class TMoreCompactProtocol {
	huffmanTree: number[] = []; // Huffman tree lookup array
	huffmanPatterns: string[][] = []; // Huffman code patterns
	buildHuffmanNode: (cArr: string[], typeId: number) => void;
	typeSequence: number[] = []; // Decoded type sequence from header
	stringTable: string[] = []; // String lookup table
	reserved: unknown[] = []; // Reserved for future use
	bufferToHexArray: (data: Buffer) => string[];
	lastFieldId: number = 0; // Last read field ID
	currentPosition: number = 0; // Current position in buffer
	lastStringId: bigint = 0n; // Last string ID for delta encoding
	data!: Buffer; // Input data buffer
	public res: LooseType = null; // Parsed result
	public dummyProtocol?: DummyProtocol; // Dummy protocol data
	baseException: { [key: string]: number };
	readWith?: string;

	constructor(
		inputData?: Buffer,
		baseException?: { [key: string]: number },
		readWith?: string,
	) {
		this.buildHuffmanNode = this.buildHuffmanNodeImpl.bind(this);
		this.bufferToHexArray = this.convertBufferToHexArray.bind(this);
		this.initializeHuffmanTree(); // Initialize Huffman tree
		this.baseException = baseException || {
			code: 1,
			message: 2,
			metadata: 3,
		};
		this.readWith = readWith;
		if (inputData) {
			this.setDataAndParse(inputData); // Parse data if provided
		}
	}

	// varint reader - reads variable-length integer
	readVarint(): number {
		let result = BigInt(0);
		let shift = 0;
		let count = 0;
		while (true) {
			this.requireAvailable(1);
			if (count++ >= 10) throw new Error("TMC varint exceeds 10 bytes");
			const byte = this.data[this.currentPosition];
			this.currentPosition += 1;
			result |= BigInt(byte & 127) << BigInt(shift);
			if ((byte & 128) !== 128) {
				if (result > 0xffffffffffffffffn) {
					throw new Error("TMC varint exceeds uint64");
				}
				return (result > Number.MAX_SAFE_INTEGER)
					? <LooseType> result
					: Number(result);
			}
			shift += 7;
		}
	}

	// Read bytes from position
	readBytes(position: number, length: number): number[] {
		this.requireRange(position, length);
		if (length === 0) {
			return [];
		}
		const buffer = this.data.subarray(position, position + length);
		return Array.from(buffer);
	}

	// Set data and parse
	setDataAndParse(inputData: Buffer): void {
		this.data = inputData;
		this.currentPosition = 0;
		this.lastFieldId = 0;
		this.lastStringId = 0n;
		this.stringTable = [];
		this.typeSequence = [];
		this.res = null;
		this.dummyProtocol = undefined;
		this.parseHeader();
	}

	private requireAvailable(length: number): void {
		this.requireRange(this.currentPosition, length);
	}

	private requireRange(position: number, length: number): void {
		if (
			!Number.isSafeInteger(position) || !Number.isSafeInteger(length) ||
			position < 0 || length < 0 || position + length > this.data.length
		) {
			throw new Error("Truncated or invalid TMC input");
		}
	}

	private readSize(label: string): number {
		const value = this.readVarint();
		if (typeof value !== "number" || !Number.isSafeInteger(value)) {
			throw new Error(`Invalid TMC ${label}`);
		}
		return value;
	}

	// Parse message body
	parseMessageBody(): void {
		let result: LooseType = {};
		const fieldIdBits = this.readVarint();

		if (fieldIdBits === 0) {
			// Empty message
		} else if (fieldIdBits === 1 || fieldIdBits === 2) {
			const [fieldId] = this.decodeFieldBitmap(fieldIdBits);

			if (fieldId === 0) {
				const fieldType = this.getNextType();
				result[0] = this.readDataByType(fieldType, fieldId)[1];
			} else if (fieldId === 1) {
				const fieldType = this.getNextType();
				result[1] = this.readDataByType(fieldType, fieldId)[1];
			} else if (fieldId === 5) {
				const fieldType = this.getNextType();
				throw new Error(String(this.readDataByType(fieldType, fieldId)));
			} else {
				throw new Error(`fid ${fieldId} not implemented`);
			}
		} else {
			const fieldType = this.getNextType();
			[result] = this.readDataByType(fieldType);
			throw new Error(
				`recv fid \`${fieldIdBits}\`, expected \`1\`, message: \`${result}\``,
			);
		}

		this.res = result;
	}

	// ZigZag decode
	decodeZigZag(encoded: number): number {
		const n = BigInt(encoded);
		return Number((n >> 1n) ^ -(n & 1n));
	}

	// Read data by type
	readDataByType(
		typeId: number,
		fieldId: number | null = null,
	): [number | null, LooseType] {
		let value: unknown = null;
		let temp: unknown = null;
		let valData: unknown = null;
		// deno-lint-ignore no-unused-vars
		let subType: number[] | null = null;

		if (typeId === 2) {
			// BOOL
			temp = this.readVarint();
			value = Boolean(temp);
		} else if (typeId === 3) {
			// BYTE
			this.requireAvailable(1);
			const byte = this.data[this.currentPosition];
			value = byte;
			this.currentPosition += 1;
		} else if (typeId === 4) {
			// DOUBLE
			this.requireAvailable(8);
			value = this.data.readDoubleLE(this.currentPosition);
			this.currentPosition += 8;
		} else if (typeId === 8) {
			// I32 (zigzag varint)
			const encoded = this.readVarint();
			value = this.decodeZigZag(encoded);
		} else if (typeId === 10) {
			// I64 (zigzag varint)
			const encoded = this.readVarint();
			value = this.decodeZigZag(encoded);
		} else if (typeId === 11) {
			// STRING
			value = this.readString();
		} else if (typeId === 12) {
			// STRUCT
			value = {} as Record<number, unknown>;
			temp = this.readVarint();
			const fieldIds = this.decodeFieldBitmap(temp as number);
			valData = {};

			for (const fid of fieldIds) {
				const [_, fieldValue] = this.readDataByType(
					this.getNextType(),
					fid,
				);
				(<LooseType> valData)[fid] = fieldValue;
			}
		} else if (typeId === 13) {
			// MAP
			value = {} as Record<string, unknown>;
			const mapSize = this.readSize("map size");
			subType = [0, 0];
			valData = {} as Record<string, unknown>;

			if (mapSize !== 0) {
				const typesByte = this.readSingleByte();
				if (
					mapSize > Math.floor((this.data.length - this.currentPosition) / 2)
				) {
					throw new Error("TMC map size exceeds remaining input");
				}
				const [keyType, valueType] = this.decodeMapTypes(typesByte);
				subType = [keyType, valueType];

				for (let i = 0; i < mapSize; i++) {
					const [, kVal] = this.readDataByType(keyType);
					const [, vVal] = this.readDataByType(valueType);
					(<LooseType> valData)[kVal] = vVal;
				}
			}
		} else if (typeId === 14 || typeId === 15) {
			// SET or LIST
			value = [] as unknown[];
			const sizeType = this.readSingleByte();

			let count = sizeType >> 4;
			const elementType = sizeType & 0x0f;

			if (count === 15) {
				count = this.readSize("collection size");
			}
			if (count > this.data.length - this.currentPosition) {
				throw new Error("TMC collection size exceeds remaining input");
			}

			subType = [this.convertCompactTypeToTType(elementType)];
			valData = [];

			for (let i = 0; i < count; i++) {
				const [, val] = this.readDataByType(
					this.convertCompactTypeToTType(elementType),
				);
				(<Array<LooseType>> valData).push(val);
			}
		} else if (typeId === 16) {
			// STRING (string ID delta)
			const raw = BigInt(this.readVarint());
			const delta = (raw >> 1n) ^ -(raw & 1n);
			const stringId = delta + this.lastStringId;
			this.lastStringId = stringId;
			value = String(stringId);
			typeId = 11;
		} else if (typeId === 17) {
			// STRING (string table reference)
			temp = this.readVarint();
			if (this.stringTable.length > (temp as number)) {
				value = this.stringTable[temp as number];
				typeId = 11;
			} else {
				console.log(`mid not found: ${temp}`);
			}
		} else {
			throw new Error(`cAN't rEad TyPE: ${typeId}`);
		}

		if (valData === null) {
			valData = value;
		}

		return [fieldId, valData];
	}

	// Read string table and parse message
	readStringTableAndParseMessage(): void {
		const tableSize = this.readSize("string table size");
		if (
			tableSize > Math.floor((this.data.length - this.currentPosition) / 17)
		) {
			throw new Error("TMC string table exceeds remaining input");
		}

		for (let i = 0; i < tableSize; i++) {
			const m = String.fromCharCode(this.data[this.currentPosition]) +
				this.data.subarray(this.currentPosition + 1, this.currentPosition + 17)
					.toString("hex");
			this.stringTable.push(m);
			this.currentPosition += 17;
		}

		this.parseMessageBody();
	}

	// Decode field bitmap
	decodeFieldBitmap(bitmap: number): number[] {
		if (!Number.isSafeInteger(bitmap) || bitmap < 0 || bitmap >= 2 ** 30) {
			throw new Error("TMC field bitmap exceeds supported field IDs");
		}
		const fieldIds: number[] = [];
		for (let bitPosition = 0; bitPosition < 32; bitPosition++) {
			if (Math.floor(bitmap / 2 ** bitPosition) % 2 === 1) {
				fieldIds.push(bitPosition);
			}
		}

		return fieldIds;
	}

	// Decode map key-value types
	decodeMapTypes(typesByte: number): [number, number] {
		return [
			this.convertCompactTypeToTType(typesByte >> 4),
			this.convertCompactTypeToTType(typesByte & 15),
		];
	}

	// Read string
	readString(): string | Buffer {
		const length = this.readSize("string length");
		this.requireAvailable(length);
		const buffer = this.data.subarray(
			this.currentPosition,
			this.currentPosition + length,
		);
		let result: string | Buffer;

		try {
			result = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
		} catch {
			result = buffer;
		}

		this.currentPosition += length;
		return result;
	}

	// Parse header and initialize
	parseHeader(): void {
		this.currentPosition = 3;
		const headerLength = this.readSize("header length");
		this.requireAvailable(headerLength);
		const headerBytes = this.readBytes(this.currentPosition, headerLength);
		this.typeSequence = new Array(headerLength << 1).fill(0);

		let nodeIndex = 0;
		let typeIndex = 0;
		let currentNode = 0;

		for (const byte of headerBytes) {
			let bitIndex = 0;
			let bitMask = 128;

			while (bitIndex < 8) {
				if ((byte & bitMask) === 0) {
					nodeIndex = (currentNode << 1) + 1;
				} else {
					nodeIndex = (currentNode << 1) + 2;
				}

				if (this.huffmanTree[nodeIndex] !== 0) {
					if (typeIndex >= this.typeSequence.length) {
						const newSize = this.typeSequence.length * 4;
						const newArray = new Array(newSize).fill(0);
						for (let i = 0; i < this.typeSequence.length; i++) {
							newArray[i] = this.typeSequence[i];
						}
						this.typeSequence = newArray;
					}
					this.typeSequence[typeIndex] = this.huffmanTree[nodeIndex];
					typeIndex += 1;
					currentNode = 0;
				} else {
					currentNode = nodeIndex;
				}

				bitMask >>= 1;
				bitIndex += 1;
			}
		}

		this.currentPosition += headerLength;
		this.readStringTableAndParseMessage();
	}

	// Get next type from sequence
	getNextType(): number {
		const typeId = this.typeSequence[this.lastFieldId];
		this.lastFieldId += 1;
		return typeId;
	}

	// Read varint (with optional return length)
	readVarintWithoutIncrement(
		buffer: Buffer,
		_returnLength: boolean = false,
	): number {
		let result = BigInt(0);
		let shift = 0;
		let index = 0;

		while (true) {
			if (index >= buffer.length || index >= 10) {
				throw new Error("Truncated or oversized TMC varint");
			}
			const byte = buffer[index];
			index += 1;
			result |= BigInt(byte & 0x7f) << BigInt(shift);

			if (byte >> 7 === 0) {
				this.currentPosition += index;
				return Number(result);
			}

			shift += 7;
		}
	}

	// Read single byte
	readSingleByte(): number {
		this.requireAvailable(1);
		const byte = this.data[this.currentPosition];
		this.currentPosition += 1;
		return byte;
	}

	// Check if more data available
	hasMoreData(): boolean {
		return this.data.length > this.currentPosition;
	}

	// Initialize Huffman tree
	initializeHuffmanTree(): void {
		this.huffmanTree = new Array(512).fill(0);
		this.huffmanPatterns = new Array(18).fill([]);

		this.buildHuffmanNode(["1", "0", "1", "1"], 2);
		this.buildHuffmanNode(["1", "0", "1", "0", "1", "0", "0", "1"], 3);
		this.buildHuffmanNode(["1", "0", "1", "0", "1", "0", "0", "0"], 4);
		this.buildHuffmanNode(["1", "0", "1", "0", "1", "1", "1"], 6);
		this.buildHuffmanNode(["0", "1"], 8);
		this.buildHuffmanNode(["0", "0"], 10);
		this.buildHuffmanNode(["1", "0", "1", "0", "0"], 11);
		this.buildHuffmanNode(["1", "1", "0", "1"], 12);
		this.buildHuffmanNode(["1", "0", "1", "0", "1", "1", "0"], 13);
		this.buildHuffmanNode(["1", "0", "1", "0", "1", "0", "1"], 14);
		this.buildHuffmanNode(["1", "1", "0", "0"], 15);
		this.buildHuffmanNode(["1", "1", "1"], 16);
		this.buildHuffmanNode(["1", "0", "0"], 17);
	}

	// Build Huffman tree node
	buildHuffmanNodeImpl(pattern: string[], typeId: number): void {
		this.huffmanPatterns[typeId] = pattern;
		let nodeIndex = 0;

		for (const bit of pattern) {
			if (bit === "0") {
				nodeIndex = (nodeIndex << 1) + 1;
			} else if (bit === "1") {
				nodeIndex = (nodeIndex << 1) + 2;
			}
		}

		this.huffmanTree[nodeIndex] = typeId;
	}

	// Convert buffer to hex string array
	convertBufferToHexArray(buffer: Buffer): string[] {
		return Array.from(buffer).map((byte) => byte.toString(16).padStart(2, "0"));
	}

	// Convert compact type to TType
	convertCompactTypeToTType(compactType: number): number {
		if (compactType === 0) return 0;
		if (compactType === 1 || compactType === 2) return 2;
		if (compactType === 3) return 3;
		if (compactType === 4) return 6;
		if (compactType === 5) return 8;
		if (compactType === 6) return 10;
		if (compactType === 7) return 4;
		if (compactType === 8) return 11;
		if (compactType === 9) return 15;
		if (compactType === 10) return 14;
		if (compactType === 11) return 13;
		if (compactType === 12) return 12;
		throw new Error(`Invalid type: ${compactType}`);
	}

	// Unsigned right shift
	unsignedRightShift(value: number, shiftAmount: number): number {
		if (value >= 0) {
			return value >> shiftAmount;
		} else {
			return (value + 0x10000000000000000) >> shiftAmount;
		}
	}
}

// Usage example:
// const data = Buffer.from([0x00, 0x01, 0x02, ...]); // Your TMoreCompact data
// const protocol = new TMoreCompactProtocol(data);
// console.log(protocol.res); // Parsed result
