<script lang="ts">
import { onDestroy, onMount } from "svelte";
import Giscus from "@giscus/svelte";
import { getHue } from "@utils/setting-utils.ts";

export const commentConfig = {
  giscus: {
    repo: "Pinpe/Pinpe-top",
    repoId: "R_kgDOO9tviQ",
    category: "General",
    categoryId: "DIC_kwDOO9tvic4CsWkr",
    mapping: "url",
    strict: "0",
    reactionsEnabled: "0",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "reactive",
    lang: "zh-CN",
    loading: "lazy",
  },
};

if (!commentConfig || !commentConfig.giscus) {
	throw new Error("Giscus comments are not configured");
}
const giscus = commentConfig.giscus;

let hue = getHue();
let mode = document.documentElement.classList.contains("dark")
	? "dark"
	: "light";

let giscus_base: string | null = null;
let giscus_dark: string | null = null;
let giscus_light: string | null = null;
let theme: string;
// 只有当 giscus.theme 是 "reactive" 时才导入样式文件
if (giscus.theme === "reactive") {
	(async () => {
		try {
			const [baseModule, darkModule, lightModule] = await Promise.all([
				import("@styles/giscus-base.css?raw"),
				import("@styles/giscus-dark.css?raw"),
				import("@styles/giscus-light.css?raw"),
			]);
			giscus_base = baseModule.default;
			giscus_dark = darkModule.default;
			giscus_light = lightModule.default;
			theme = getGiscusThemeValue();
		} catch (error) {
			console.error("Failed to load giscus styles:", error);
		}
	})();
} else {
	theme = giscus.theme ? giscus.theme : mode;
}

let giscus_iframe: HTMLIFrameElement | null = null;
const observer = new MutationObserver(() => {
	const new_hue = getHue();
	const new_mode = document.documentElement.classList.contains("dark")
		? "dark"
		: "light";
	if (hue !== new_hue || mode !== new_mode) {
		hue = new_hue;
		mode = new_mode;
		updateGiscusTheme();
	}
});

onMount(async () => {
	if (giscus.theme !== "reactive") {
		return;
	}

	findGiscusIframe();

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class", "style"],
	});
});

onDestroy(() => {
	observer?.disconnect();
});

function findGiscusIframe(retries = 0, maxRetries = 10) {
	giscus_iframe = document
		.getElementById("comments")
		?.shadowRoot?.querySelector("iframe") as HTMLIFrameElement;
	if (!giscus_iframe && retries < maxRetries) {
		// 如果iframe还没有加载，稍后再尝试，使用指数退避策略
		setTimeout(
			() => findGiscusIframe(retries + 1, maxRetries),
			100 * 1.5 ** retries,
		);
	}
}

function getGiscusThemeValue() {
	if (!giscus_base || !giscus_dark || !giscus_light) {
		console.error("Giscus styles not loaded yet");
		return mode;
	}
	const hue_style = `main { --hue: ${hue}; }`;
	const css =
		mode === "dark"
			? hue_style + giscus_dark + giscus_base
			: hue_style + giscus_light + giscus_base;
	// 将 CSS 编码为 data URI
	return `data:text/css;base64,${btoa(css)}`;
}

function updateGiscusTheme(retries = 0, maxRetries = 10) {
	if (!giscus_iframe || !giscus_iframe.contentWindow) {
		if (retries < maxRetries) {
			setTimeout(
				() => updateGiscusTheme(retries + 1, maxRetries),
				100 * 1.5 ** retries,
			);
		}
		return;
	}
	const message = {
		giscus: {
			setConfig: {
				theme: getGiscusThemeValue(),
			},
		},
	};
	giscus_iframe.contentWindow.postMessage(message, "https://giscus.app");
}
</script>


<section>
    <script src="https://giscus.app/client.js"
        data-repo="Pinpe/Pinpe-top"
        data-repo-id="R_kgDOO9tviQ"
        data-category="General"
        data-category-id="DIC_kwDOO9tvic4CsWkr"
        data-mapping="url"
        data-strict="0"
        data-reactions-enabled="0"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme={theme}
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
    </script>
</section>