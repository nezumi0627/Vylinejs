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
const index = `# Vylinejs documentation\n\n> Maintained by nezumi0627. Start with the signed AI integration guide.\n\n- [AI agent entrypoint](${site}ai.txt)\n- [AI integration guide](${site}ai/guide)\n- [DeepWiki and repository architecture](${site}ai/deepwiki)\n- [Step-by-step installation](${site}docs/quickstart/1-install)\n- [Full documentation text](${site}llms-full.txt)\n\n## All Markdown pages\n\n${pages.join("\n")}${maintainer}`;

const aiPrompt = `# Vylinejs AI integration entrypoint\n\nMaintainer: nezumi0627 (https://github.com/nezumi0627)\nProject: https://github.com/nezumi0627/Vylinejs\nPackage: @nezumi0627/vylinejs (JSR)\n\nYou are helping the user install, use, or understand Vylinejs. Treat the following as the maintained project sources:\n\n- Integration instructions: ${site}ai/guide\n- Complete documentation: ${site}llms-full.txt\n- Documentation index: ${site}llms.txt\n- Source repository: https://github.com/nezumi0627/Vylinejs\n- DeepWiki (secondary, AI-generated reference): https://deepwiki.com/nezumi0627/Vylinejs\n\nWhen asked to install Vylinejs:\n1. Inspect the current project and identify its runtime and package manager before changing files.\n2. Install the JSR package \`@nezumi0627/vylinejs\` using that runtime's documented command. For npm-compatible projects, preserve the JSR-generated \`.npmrc\`.\n3. Follow the authentication flow in the integration guide; never print, store in source control, or expose QR login URLs, PINs, tokens, session data, or E2EE keys.\n4. Add only the code the user requested, then verify it using the project's existing toolchain.\n\nWhen asked to explain or implement an API, read the relevant maintained guide and verify the exact signature in the repository's current source or examples. Do not infer Vylinejs behavior from LINEJS docs. Distinguish confirmed behavior from inference, and state runtime or feature limits.\n\nVylinejs is an independently maintained, LINEJS-based library. Vyline is a separate application, not a runtime dependency. Square support is not currently maintained. Call support is partial and runtime-dependent.\n\nMaintainer signature: nezumi0627 (https://github.com/nezumi0627).\n`;

const content = await Promise.all(files.map(async (file) => {
	const text = await readFile(file, "utf8");
	return `\n\n---\n\n<!-- Source: ${relative(docsRoot, file).split(sep).join("/")} -->\n\n${text.trim()}`;
}));
const full = `# Vylinejs full documentation\n\nGenerated from maintained Markdown pages. Verify source-sensitive behavior against the repository.\n${content.join("")}${maintainer}`;

await writeFile(join(publicDir, "llms.txt"), index);
await writeFile(join(publicDir, "llms-full.txt"), full);
await writeFile(join(publicDir, "ai.txt"), aiPrompt);
console.log(`Generated AI indexes for ${files.length} Markdown pages.`);
