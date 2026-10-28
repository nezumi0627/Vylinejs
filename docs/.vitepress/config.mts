import { defineConfig } from "vitepress";
import process from "node:process";

const base = process.env.GITHUB_ACTIONS ? "/Vylinejs/" : "/";
const siteUrl = "https://nezumi0627.github.io/Vylinejs/";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base,
	title: "Vylinejs Documentation",
	titleTemplate: ":title | Vylinejs",
	description:
		"Documentation for Vylinejs, a LINEJS-based unofficial LINE client library.",
	sitemap: {
		hostname: siteUrl,
	},
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		siteTitle: "Vylinejs Docs",
		search: {
			provider: "local",
		},

		nav: [
			{ text: "Home", link: "/" },
			{ text: "Docs", link: "/docs/start" },
			{
				text: "Examples",
				link: "https://github.com/nezumi0627/Vylinejs/tree/main/example",
			},
			{
				text: "Ask AI",
				link: "https://deepwiki.com/nezumi0627/Vylinejs",
			},
		],

		sidebar: [
			{
				text: "Docs",
				items: [
					{ text: "Getting Started", link: "/docs/start" },
					{ text: "Next Steps", link: "/docs/start-2" },
					{ text: "Message Event", link: "/docs/message-event" },
					{ text: "Client Options", link: "/docs/client-options" },
					// { text: "Utils", link: "/docs/utils" },
					{ text: "Client Methods", link: "/docs/methods" },
					{ text: "Calls", link: "/docs/call" },
					{ text: "Album (Moa)", link: "/docs/moa" },
				],
			},
			{
				text: "Guides",
				items: [
					{ text: "Authors", link: "/docs/authors" },
					{ text: "Question", link: "/docs/question" },
				],
			},
		],

		editLink: {
			pattern: "https://github.com/nezumi0627/Vylinejs/edit/main/docs/:path",
			text: "Edit this page on GitHub",
		},

		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © " + new Date().getFullYear() +
				"-present Evex Developers and Vylinejs contributors.",
		},

		socialLinks: [
			{ icon: "github", link: "https://github.com/nezumi0627/Vylinejs" },
			{ icon: "discord", link: "https://evex.land" },
		],
	},
	head: [
		["link", { rel: "icon shortcut", href: `${base}favicon.png` }],
		["link", { rel: "apple-touch-icon", href: `${base}favicon.png` }],
		["meta", { name: "og:title", content: "Vylinejs Documentation" }],
		["meta", {
			name: "og:image",
			content: `${siteUrl}favicon.png`,
		}],
		["meta", {
			name: "og:description",
			content: "Documentation for Vylinejs, a LINEJS-based unofficial LINE client library.",
		}],
		["meta", { name: "og:url", content: siteUrl }],
		["meta", { name: "twitter:title", content: "Vylinejs Documentation" }],
		["meta", {
			name: "twitter:description",
			content: "Documentation for Vylinejs, a LINEJS-based unofficial LINE client library.",
		}],
		["meta", { name: "twitter:card", content: "summary_large_image" }],
		["meta", {
			name: "twitter:image",
			content: `${siteUrl}favicon.png`,
		}],
	],

	cleanUrls: true,
});
