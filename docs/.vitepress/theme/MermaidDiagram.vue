<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{ code: string }>();
const host = ref<HTMLElement>();

onMounted(async () => {
	if (!host.value) return;
	const { default: mermaid } = await import("mermaid");
	mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: document.documentElement.classList.contains("dark") ? "dark" : "default" });
	const { svg, bindFunctions } = await mermaid.render(`vyline-diagram-${Math.random().toString(36).slice(2)}`, decodeURIComponent(props.code));
	host.value.innerHTML = svg;
	bindFunctions?.(host.value);
});
</script>

<template>
	<div ref="host" class="mermaid-diagram" role="img" aria-label="Mermaid diagram" />
</template>

<style scoped>
.mermaid-diagram { margin: 1.75rem 0; overflow-x: auto; text-align: center; }
.mermaid-diagram :deep(svg) { display: inline-block; max-width: 100%; height: auto; }
</style>
