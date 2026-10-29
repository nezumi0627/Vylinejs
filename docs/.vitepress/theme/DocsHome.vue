<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { computed, ref } from "vue";
import { homeCopy } from "./home-copy";
const { lang } = useData();
const isJa = computed(() => lang.value.startsWith("ja"));
const t = computed(() => homeCopy[isJa.value ? "ja" : "en"]);
const localLink = (path: string) => withBase((isJa.value ? "/ja" : "") + path);
const runtime = ref("Node.js");
const copied = ref(false);
const copyError = ref(false);
const commands: Record<string,string> = { "Node.js":"npx jsr add @nezumi0627/vylinejs", "Bun":"bunx jsr add @nezumi0627/vylinejs", "Deno":"deno add jsr:@nezumi0627/vylinejs" };
const command = computed(() => commands[runtime.value]);
const stepPaths = ["1-install", "2-login", "3-messages", "4-next-steps"];
async function copyCommand() {
 try { await navigator.clipboard.writeText(command.value); copied.value = true; copyError.value = false; }
 catch { copyError.value = true; }
}
</script>
<template>
 <main class="vyline-home">
  <header class="vy-welcome">
   <div><h1>Vylinejs</h1><p class="vy-description">{{ t.lead }}<br />{{ t.description }}</p><div class="vy-package"><code>@nezumi0627/vylinejs</code><span>LINEJS-based · TypeScript</span></div></div>
   <aside class="vy-context" :aria-label="t.about"><p>{{ t.about }}</p><a :href="localLink('/docs/features')">{{ t.support }} ↗</a><a :href="localLink('/docs/migration')">{{ t.migration }} ↗</a><a href="https://github.com/nezumi0627/Vylinejs">GitHub ↗</a></aside>
  </header>
  <section class="vy-workspace" aria-labelledby="start-title">
   <div>
    <h2 id="start-title">{{ t.install }}</h2>
    <div class="vy-install"><div class="vy-runtime-tabs" role="group" :aria-label="t.runtime"><button v-for="name in Object.keys(commands)" :key="name" type="button" :aria-pressed="runtime === name" @click="runtime = name; copied = false; copyError = false">{{ name }}</button></div><div class="vy-command"><code>{{ command }}</code><button type="button" @click="copyCommand">{{ copied ? t.copied : t.copy }}</button></div></div>
    <p v-if="copyError" role="status" class="vy-install-note">{{ t.copyError }}</p><p class="vy-install-note">{{ runtime === 'Deno' ? t.denoNote : t.nodeNote }}</p><a class="vy-primary" :href="localLink('/docs/quickstart/1-install')">{{ t.guide }} <span aria-hidden="true">→</span></a>
   </div>
   <aside :aria-label="t.steps"><h2>{{ t.steps }}</h2><ol class="vy-steps"><li v-for="(step, i) in t.stepLabels" :key="step"><span>0{{ i + 1 }}</span><a :href="localLink('/docs/quickstart/' + stepPaths[i])">{{ step }}</a></li></ol></aside>
  </section>
  <section class="vy-example" aria-labelledby="example-title"><div class="vy-example-top"><h2 id="example-title">{{ t.example }}</h2><a :href="localLink('/docs/quickstart/2-login')">{{ t.exampleLink }} →</a></div><pre class="vy-code"><code><span class="keyword">import</span> { loginWithQR } <span class="keyword">from</span> <span class="string">"@nezumi0627/vylinejs"</span>;

<span class="keyword">const</span> client = <span class="keyword">await</span> loginWithQR({
  onReceiveQRUrl: (url) =&gt; console.log(url),
  onPincodeRequest: (pin) =&gt; console.log(pin),
}, { device: <span class="string">"IOSIPAD"</span> });</code></pre></section>
  <section class="vy-topic-index" aria-labelledby="topics-title"><h2 id="topics-title">{{ t.topics }}</h2><p>{{ t.topicNote }}</p><nav class="vy-topics" :aria-label="t.topics"><a v-for="topic in t.topicItems" :key="topic.href" :href="localLink(topic.href)"><strong>{{ topic.title }}</strong><p>{{ topic.text }}</p><span aria-hidden="true">→</span></a></nav></section>
  <footer class="vy-doc-footer"><span>{{ t.footer }}</span><a href="https://github.com/nezumi0627">Maintained by nezumi0627 ↗</a></footer>
 </main>
</template>
