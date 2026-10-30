import { loginWithAuthToken } from "@nezumi0627/vylinejs";

const token = Deno.env.get("LINE_AUTH_TOKEN");
if (!token) throw new Error("Set LINE_AUTH_TOKEN before running this example");

const client = await loginWithAuthToken(token, { device: "IOSIPAD" });
const chatId = Deno.env.get("LINE_MOA_CHAT_ID");
const selectedAlbumId = Deno.env.get("LINE_MOA_ALBUM_ID");
let cursor = "";

do {
	const response = await client.base.moa.getAlbums({ cursor });
	const result = response.result;
	for (const album of result?.albums ?? []) {
		console.log(`${album.albumId}\t${album.title}\t${album.photoCount} photos`);
	}
	const next = result?.nextCursor ?? result?.cursor ?? "";
	if (!next || next === cursor || !(result?.hasMore ?? true)) break;
	cursor = next;
} while (true);

if (chatId && selectedAlbumId) {
	let photoCursor = "";
	do {
		const response = await client.base.moa.getPhotos({
			chatId,
			albumId: selectedAlbumId,
			pageSize: 100,
			cursor: photoCursor,
		});
		for (const photo of response.result?.photos ?? []) {
			console.log(photo.oid, photo.shotTime);
		}
		const next = response.result?.nextCursor ?? "";
		if (!next || next === photoCursor) break;
		photoCursor = next;
	} while (true);
}
