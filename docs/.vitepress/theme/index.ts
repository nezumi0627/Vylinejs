// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import SearchDialog from "./SearchDialog.vue";
import MermaidDiagram from "./MermaidDiagram.vue";

import "./style.css";

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component("MermaidDiagram", MermaidDiagram);
	},
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			"nav-bar-content-after": () => [
				h(SearchDialog),

			],
		});
	},
} satisfies Theme;
