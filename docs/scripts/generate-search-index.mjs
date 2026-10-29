import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const output = join(root, ".vitepress", "search-index.json");
const ignored = new Set(["node_modules", ".vitepress", "superpowers", "licenses"]);

async function markdownFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		if (entry.isDirectory()) {
			if (!ignored.has(entry.name)) files.push(...await markdownFiles(join(directory, entry.name)));
		} else if (entry.isFile() && entry.name.endsWith(".md")) {
			files.push(join(directory, entry.name));
		}
	}
	return files;
}

const pages = [];
for (const file of await markdownFiles(root)) {
	let markdown = (await readFile(file, "utf8")).replace(/^\uFEFF/, "");
	const frontmatterTitle = markdown.match(/^---\r?\n[\s\S]*?^title:\s*(.+)$/m)?.[1];
	markdown = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
	const relativePath = relative(root, file).split(sep).join("/");
	const id = relativePath === "index.md"
		? ""
		: relativePath.replace(/\.md$/, "").replace(/\/index$/, "");
	const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.replace(/\s*\{#[^}]+\}\s*$/, "").replace(/[`*_]/g, "") ?? frontmatterTitle ?? id.split("/").at(-1);
	const headings = [...markdown.matchAll(/^#{2,4}\s+(.+)$/gm)].map((match) => match[1].replace(/\s*\{#[^}]+\}\s*$/, "").replace(/[`*_]/g, ""));
	const text = markdown
		.replace(/^```[\s\S]*?^```\s*$/gm, " ")
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/[`*_>#|]/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.slice(0, 6000);
	pages.push({ id, title, headings, text });
}

await writeFile(output, JSON.stringify(pages));
console.log(`Indexed ${pages.length} documentation pages.`);
