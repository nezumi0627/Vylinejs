import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
const ignored = new Set(["node_modules", ".vitepress", "superpowers", "public", "ja", "licenses"]);
async function pages(dir) {
 const result = [];
 for (const entry of await readdir(dir, { withFileTypes:true })) {
  if (entry.isDirectory() && !ignored.has(entry.name)) result.push(...await pages(join(dir, entry.name)));
  else if (entry.isFile() && entry.name.endsWith(".md")) result.push(relative(root, join(dir, entry.name)));
 }
 return result;
}
const errors = [];
const files = await pages(root);
for (const file of files) {
 try {
  const translated = await readFile(join(root,"ja",file),"utf8");
  if (!/[\u3040-\u30ff\u4e00-\u9fff]/u.test(translated)) errors.push(`${file}: Japanese text is missing`);
 } catch (error) {
  if (error.code === "ENOENT") errors.push(`${file}: Japanese page is missing`);
  else throw error;
 }
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode=1; }
else console.log(`English/Japanese route parity: ${files.length} page pairs.`);
