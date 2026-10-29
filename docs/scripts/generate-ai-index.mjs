import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const root = new URL("../", import.meta.url).pathname.replace(/^\/(\w:)/, "$1");
const publicDir = join(root, "public");
const site = "https://nezumi0627.github.io/Vylinejs/";

async function markdownFiles(directory) {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			if (!new Set(["superpowers", "public", "node_modules", ".vitepress", "dist", "cache"]).has(entry.name)) {
				files.push(...await markdownFiles(join(directory, entry.name)));
			}
		} else if (entry.isFile() && entry.name.endsWith(".md")) {
			files.push(join(directory, entry.name));
		}
	}
	return files;
}

const docsRoot = root;
const files = (await markdownFiles(docsRoot)).sort((a, b) => a.localeCompare(b));
const pages = await Promise.all(files.map(async (file) => {
	const relativePath = relative(docsRoot, file).split(sep).join("/");
	const route = relativePath === "index.md"
		? ""
		: relativePath.replace(/\.md$/, "").replace(/\/index$/, "");
	const title = (await readFile(file, "utf8")).match(/^#\s+(.+)$/m)?.[1] ?? route;
	return `- [${title}](${site}${route})`;
}));

const maintainer = "\n\nMaintainer signature: nezumi0627 (https://github.com/nezumi0627).\n";
const index = `# Vylinejs documentation\n\n> Maintained by nezumi0627. Start with the signed AI integration guide.\n\n- [AI integration guide](${site}ai/guide)\n- [DeepWiki and repository architecture](${site}ai/deepwiki)\n- [Step-by-step installation](${site}docs/quickstart/1-install)\n- [Full documentation text](${site}llms-full.txt)\n\n## All Markdown pages\n\n${pages.join("\n")}${maintainer}`;

const content = await Promise.all(files.map(async (file) => {
	const text = await readFile(file, "utf8");
	return `\n\n---\n\n<!-- Source: ${relative(docsRoot, file).split(sep).join("/")} -->\n\n${text.trim()}`;
}));
const full = `# Vylinejs full documentation\n\nGenerated from maintained Markdown pages. Verify source-sensitive behavior against the repository.\n${content.join("")}${maintainer}`;

await writeFile(join(publicDir, "llms.txt"), index);
await writeFile(join(publicDir, "llms-full.txt"), full);
console.log(`Generated AI indexes for ${files.length} Markdown pages.`);
