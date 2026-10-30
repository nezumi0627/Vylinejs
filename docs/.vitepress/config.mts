import { defineConfig } from "vitepress";
import process from "node:process";

const base = process.env.GITHUB_ACTIONS ? "/Vylinejs/" : "/";
const siteUrl = "https://nezumi0627.github.io/Vylinejs/";

// https://vitepress.dev/reference/site-config
const config = defineConfig({
	base,
	lang: "en-US",
	title: "Vylinejs Documentation",
	titleTemplate: ":title | Vylinejs",
	description: "Documentation for Vylinejs, the independently maintained LINEJS-based LINE client library.",
	srcExclude: ["superpowers/**"],
	sitemap: {
		hostname: siteUrl,
	},
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		siteTitle: "Vylinejs",
		logo: {
			light: "/vylinejs-icon-light.svg",
			dark: "/vylinejs-icon-dark.svg",
			alt: "Vylinejs",
		},

		nav: [
			{ text: "Home", link: "/" },
			{ text: "Get started", link: "/docs/start" },
			{ text: "Features", link: "/docs/features" },
			{ text: "AI guide", link: "/ai/guide" },
			{
				text: "Compare",
				link: "/VYLINE_PORTING",
			},
			{
				text: "Examples",
				link: "https://github.com/nezumi0627/Vylinejs/tree/main/example",
			},
		],

		sidebar: [
			{
				text: "Get started",
				items: [
					{ text: "1. Install", link: "/docs/quickstart/1-install" },
					{ text: "2. Log in", link: "/docs/quickstart/2-login" },
					{ text: "3. Receive messages", link: "/docs/quickstart/3-messages" },
					{ text: "4. Next steps", link: "/docs/quickstart/4-next-steps" },
					{ text: "Features and support", link: "/docs/features" },
					{ text: "Migrate from LINEJS", link: "/docs/migration" },
				],
			},
			{
				text: "Features",
				items: [
					{ text: "Authentication & sessions", link: "/docs/auth" },
					{ text: "Messaging", link: "/docs/message-event" },
					{ text: "1:1 audio calls", link: "/docs/audio-call" },
					{ text: "Group calls", link: "/docs/group-call" },
					{ text: "Video calls", link: "/docs/video-call" },
					{ text: "Incoming calls", link: "/INCOMING_AUDIO" },
					{ text: "E2EE", link: "/docs/e2ee" },
					{ text: "Album (Moa)", link: "/docs/moa" },
					{ text: "Utilities and storage", link: "/docs/utils" },
				],
			},
			{
				text: "Reference",
				items: [
					{ text: "Client Options", link: "/docs/client-options" },
					{ text: "Client Methods", link: "/docs/methods" },
				],
			},
			{
				text: "Project",
				items: [
					{ text: "LINEJS / Vyline comparison", link: "/VYLINE_PORTING" },
					{ text: "Stability and performance", link: "/VYLINEJS_STABILITY" },
					{ text: "Contributors", link: "/docs/authors" },
					{ text: "Help and questions", link: "/docs/question" },
				],
			},
			{
				text: "AI & code map",
				items: [
					{ text: "AI integration guide", link: "/ai/guide" },
					{ text: "DeepWiki and architecture", link: "/ai/deepwiki" },
					{ text: "llms.txt", link: "/llms.txt" },
				],
			},
		],

		editLink: {
			pattern: "https://github.com/nezumi0627/Vylinejs/edit/main/docs/:path",
			text: "Edit this page on GitHub",
		},

		footer: {
			message: "Vylinejs is an unofficial LINE client library. Released under the MIT License.",
			copyright: "Copyright © " + new Date().getFullYear() +
				" nezumi0627, Evex Developers, and Vylinejs contributors.",
		},

		socialLinks: [
			{ icon: "github", link: "https://github.com/nezumi0627/Vylinejs" },
		],
	},
	head: [
		["link", {
			rel: "icon",
			type: "image/svg+xml",
			href: `${base}vylinejs-icon-dark.svg`,
		}],
		["link", { rel: "apple-touch-icon", href: `${base}apple-touch-icon.png` }],
		["meta", { name: "og:title", content: "Vylinejs Documentation" }],
		["meta", {
			name: "og:image",
			content: `${siteUrl}vylinejs-social-preview.png`,
		}],
		["meta", {
			name: "og:description",
			content: "Documentation for Vylinejs, the independently maintained LINEJS-based LINE client library.",
		}],
		["meta", { name: "og:url", content: siteUrl }],
		["meta", { name: "twitter:title", content: "Vylinejs Documentation" }],
		["meta", {
			name: "twitter:description",
			content: "Documentation for Vylinejs, the independently maintained LINEJS-based LINE client library.",
		}],
		["meta", { name: "twitter:card", content: "summary_large_image" }],
		["meta", {
			name: "twitter:image",
			content: `${siteUrl}vylinejs-social-preview.png`,
		}],
	],

	cleanUrls: true,
});
const labels: Record<string,string> = {
 "Home":"ホーム", "Get started":"はじめに", "Features":"機能", "AI guide":"AI向けガイド", "Compare":"比較", "Examples":"使用例", "1. Install":"1. インストール", "2. Log in":"2. ログイン", "3. Receive messages":"3. メッセージ受信", "4. Next steps":"4. 次のステップ", "Features and support":"対応機能と制限", "Migrate from LINEJS":"LINEJSからの移行", "Authentication & sessions":"認証とセッション", "Messaging":"メッセージ", "1:1 audio calls":"1対1音声通話", "Group calls":"グループ通話", "Video calls":"ビデオ通話", "Incoming calls":"着信", "Album (Moa)":"アルバム（Moa）", "Utilities and storage":"ユーティリティとストレージ", "Reference":"リファレンス", "Client Options":"クライアント設定", "Client Methods":"クライアントメソッド", "Project":"プロジェクト", "LINEJS / Vyline comparison":"LINEJS・Vylineとの比較", "Stability and performance":"安定性と性能", "Contributors":"貢献者", "Help and questions":"質問とサポート", "AI & code map":"AIとコード構成", "AI integration guide":"AI導入ガイド", "DeepWiki and architecture":"DeepWikiとアーキテクチャ",
};
function localizeItems<T extends { text?: string; link?: string; items?: T[] }>(items: T[]): T[] {
 return items.map(item => ({ ...item, text: item.text ? (labels[item.text] ?? item.text) : undefined,
  link: item.link?.startsWith("/") && item.link !== "/llms.txt" ? "/ja" + item.link : item.link,
  ...(item.items ? { items: localizeItems(item.items) } : {}),
 }));
}
export default defineConfig({
 ...config,
 markdown: {
  config(md) {
   const fence = md.renderer.rules.fence!;
   md.renderer.rules.fence = (tokens, index, options, env, self) => {
    const token = tokens[index];
    if (token.info.trim() === "mermaid") {
     return `<MermaidDiagram code="${encodeURIComponent(token.content)}" />\n`;
    }
    return fence(tokens, index, options, env, self);
   };
  },
 },
 locales: {
  root: { label:"English", lang:"en-US", link:"/" },
  ja: {
   label:"日本語", lang:"ja-JP", link:"/ja/", title:"Vylinejs ドキュメント", description:"LINEJSを基盤とするLINEクライアントライブラリ、Vylinejsのドキュメント。",
   themeConfig: {
    nav:localizeItems(config.themeConfig!.nav!), sidebar:localizeItems(config.themeConfig!.sidebar as Array<{text:string; items:Array<{text:string;link:string}>}>),
    outline:{label:"このページの内容"}, docFooter:{prev:"前のページ",next:"次のページ"},
    editLink:{pattern:"https://github.com/nezumi0627/Vylinejs/edit/main/docs/:path",text:"GitHubでこのページを編集"},
    sidebarMenuLabel:"メニュー", returnToTopLabel:"ページの先頭へ", darkModeSwitchLabel:"外観", lightModeSwitchTitle:"ライトモードに切替",darkModeSwitchTitle:"ダークモードに切替", langMenuLabel:"言語を選択",
    footer:{message:"Vylinejsは非公式のLINEクライアントライブラリです。MITライセンスで公開されています。",copyright:"nezumi0627・Evex Developers・Vylinejs contributors"},
   },
  },
 },
});
