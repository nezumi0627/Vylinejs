<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import searchIndex from "../search-index.json";

type Page = { id: string; title: string; text: string; headings: string[] };
const query = ref("");
const open = ref(false);
const selected = ref(0);
const { lang } = useData();
const isJa = computed(() => lang.value.startsWith("ja"));
const pages = computed(() => (searchIndex as Page[]).filter(page => page.id.startsWith("ja/") || page.id === "ja" ? isJa.value : !isJa.value));
const labels = computed(() => isJa.value ? {
 search:"ドキュメントを検索",short:"検索",placeholder:"機能・API・使用例を検索…",close:"検索を閉じる",hint:"機能名、メソッド名、使用例のファイル名で検索できます。",results:"検索結果",empty:"該当するページがありません。短い語句で検索してください。",footer:"Vylinejs 日本語ドキュメント",keys:"↑↓ 選択 · Enter 開く · Esc 閉じる",
} : {
 search:"Search documentation",short:"Search docs",placeholder:"Search guides, APIs, examples…",close:"Close search",hint:"Search by feature, method, or example file.",results:"Search results",empty:"No matching pages. Try a shorter query.",footer:"Vylinejs documentation",keys:"↑↓ to navigate · Enter to open · Esc to close",
});
const shortcut = ref("Ctrl K");
const results = computed(() => {
	const terms = normalize(query.value).split(/\s+/).filter(Boolean);
	if (!terms.length) return [];
	return pages.value.map((page) => {
		const title = normalize(page.title);
		const headings = normalize(page.headings.join(" "));
		const text = normalize(page.text);
		let score = 0;
		for (const term of terms) {
			if (title.includes(term)) score += 8;
			else if (headings.includes(term)) score += 4;
			else if (text.includes(term)) score += 1;
			else return undefined;
		}
		return { page, score };
	}).filter((result): result is { page: Page; score: number } => result !== undefined)
		.sort((a, b) => b.score - a.score).slice(0, 8);
});

function normalize(value: string): string {
	return value.normalize("NFKC").toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

watch(query, () => selected.value = 0);

function show() {
	open.value = true;
	query.value = "";
	requestAnimationFrame(() => document.querySelector<HTMLInputElement>(".vy-search-input")?.focus());
}

function onKeydown(event: KeyboardEvent) {
	if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
		event.preventDefault();
		void show();
	} else if (event.key === "Escape") open.value = false;
	else if (open.value && event.key === "ArrowDown") {
		event.preventDefault();
		selected.value = Math.min(selected.value + 1, results.value.length - 1);
	} else if (open.value && event.key === "ArrowUp") {
		event.preventDefault();
		selected.value = Math.max(selected.value - 1, 0);
	} else if (open.value && event.key === "Enter" && results.value[selected.value]) {
		window.location.href = withBase(`/${results.value[selected.value].page.id}`);
	}
}

onMounted(() => {
	if (/Mac|iPhone|iPad/.test(navigator.platform)) shortcut.value = "⌘ K";
	window.addEventListener("keydown", onKeydown);
});
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
	<div class="vy-search">
		<button class="vy-search-trigger" type="button" :aria-label="labels.search" @click="show">
			<span class="vy-search-glass" aria-hidden="true"></span>
			<span>{{ labels.short }}</span>
			<kbd>{{ shortcut }}</kbd>
		</button>
		<Teleport to="body">
			<div v-if="open" class="vy-search-scrim" @click.self="open = false">
				<section class="vy-search-panel" role="dialog" aria-modal="true" :aria-label="labels.search">
					<div class="vy-search-field">
						<span class="vy-search-glass" aria-hidden="true"></span>
						<input v-model="query" class="vy-search-input" type="search" :placeholder="labels.placeholder" autocomplete="off" />
						<button type="button" :aria-label="labels.close" @click="open = false">Esc</button>
					</div>
					<p v-if="!query.trim()" class="vy-search-empty">{{ labels.hint }}</p>
					<ul v-else-if="results.length" class="vy-search-results" role="listbox" :aria-label="labels.results">
						<li v-for="({ page }, i) in results" :key="page.id">
						<a :href="withBase(`/${page.id}`)" :aria-selected="i === selected" role="option" @mouseenter="selected = i">
							<strong>{{ page.title }}</strong><span>{{ page.headings.slice(0, 2).join(" · ") || page.text.slice(0, 110) }}</span>
						</a>
						</li>
					</ul>
					<p v-else class="vy-search-empty">{{ labels.empty }}</p>
					<footer class="vy-search-footer"><span>{{ labels.footer }}</span><span>{{ labels.keys }}</span></footer>
				</section>
			</div>
		</Teleport>
	</div>
</template>
