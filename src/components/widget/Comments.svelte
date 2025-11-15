<script lang="ts">
import { onDestroy, onMount } from "svelte";
import Giscus from "@giscus/svelte";

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
import { getHue } from "@utils/setting-utils.ts";

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
let stylesLoaded = false;
let theme: string = giscus.theme ? giscus.theme : mode; // 初始化为默认值
// 只有当 giscus.theme 是 "reactive" 时才导入样式文件
// 立即加载样式，不等待组件挂载
let stylesPromise: Promise<void> | null = null;
if (giscus.theme === "reactive") {
	stylesPromise = (async () => {
		try {
			const [baseModule, darkModule, lightModule] = await Promise.all([
				import("@styles/giscus-base.css?raw"),
				import("@styles/giscus-dark.css?raw"),
				import("@styles/giscus-light.css?raw"),
			]);
			giscus_base = baseModule.default;
			giscus_dark = darkModule.default;
			giscus_light = lightModule.default;
			stylesLoaded = true;
			theme = getGiscusThemeValue();
		} catch (error) {
			console.error("Failed to load giscus styles:", error);
			stylesLoaded = true; // 即使失败也标记为已加载，避免无限等待
			// 失败时使用默认主题
			theme = mode;
		}
	})();
} else {
	stylesLoaded = true; // 非reactive模式不需要样式
}

let giscus_iframe: HTMLIFrameElement | null = null;
let styleApplied = false;
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

	// 确保样式已经加载
	if (stylesPromise) {
		await stylesPromise;
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

function findGiscusIframe(retries = 0, maxRetries = 30) {
	giscus_iframe = document
		.getElementById("comments")
		?.shadowRoot?.querySelector("iframe") as HTMLIFrameElement;
	if (giscus_iframe) {
		// 找到iframe后，确保样式已加载并应用
		applyGiscusThemeOnce();
		// 监听iframe的load事件，确保内容加载时应用样式
		if (giscus_iframe.contentWindow && !styleApplied) {
			giscus_iframe.addEventListener("load", () => {
				setTimeout(() => applyGiscusThemeOnce(), 100);
			}, { once: true });
		}
	} else if (retries < maxRetries) {
		// 如果iframe还没有加载，稍后再尝试，使用指数退避策略
		setTimeout(
			() => findGiscusIframe(retries + 1, maxRetries),
			100 * 1.5 ** retries,
		);
	}
}

function getGiscusThemeValue() {
	if (!giscus_base || !giscus_dark || !giscus_light) {
		// 如果样式还没加载，返回默认主题
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

async function applyGiscusThemeOnce() {
	if (styleApplied) return;
	
	// 如果是reactive模式，等待样式加载完成
	if (giscus.theme === "reactive" && !stylesLoaded && stylesPromise) {
		await stylesPromise;
	}
	
	if (giscus.theme === "reactive") {
		theme = getGiscusThemeValue();
	}
	
	updateGiscusTheme(0, 20);
	styleApplied = true;
}

function updateGiscusTheme(retries = 0, maxRetries = 20) {
	if (!giscus_iframe || !giscus_iframe.contentWindow) {
		if (retries < maxRetries) {
			setTimeout(
				() => updateGiscusTheme(retries + 1, maxRetries),
				100 * 1.5 ** retries,
			);
		}
		return;
	}
	
	// 对于reactive模式，确保使用正确的主题值
	let themeValue = theme;
	if (giscus.theme === "reactive" && stylesLoaded) {
		themeValue = getGiscusThemeValue();
	}
	
	const message = {
		giscus: {
			setConfig: {
				theme: themeValue,
			},
		},
	};
	try {
		giscus_iframe.contentWindow.postMessage(message, "https://giscus.app");
	} catch (error) {
		// 如果发送失败，稍后重试
		if (retries < maxRetries) {
			setTimeout(
				() => updateGiscusTheme(retries + 1, maxRetries),
				200,
			);
		}
	}
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