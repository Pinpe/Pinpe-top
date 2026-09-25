/**
 * 把 banner 图整体转到指定 OKLCH 色相（保明度、保色度），逐像素算。
 *
 * 为什么不用 CSS：`filter: hue-rotate()` 的矩阵不管作用在 sRGB 还是线性 RGB 上都偏，
 * 实测色相能偏 15°、明度还会整片浮动；`mix-blend-mode: hue` 按规范走 Lum 体系，
 * 蓝色图会被染成芥末黄。要准只能自己转 OKLab。
 *
 * 原图的主色相是**从像素上量出来的**，所以每月换图不用改代码，
 * 换哪张它就跟着哪张转。
 */

const DEG = Math.PI / 180
/** 目标色相差不到这个度数就别折腾了 */
const HUE_EPS = 1.5

/** linear → sRGB 编码查表（省掉逐像素 pow） */
const ENCODE_LUT = new Float32Array(4097)
for (let i = 0; i <= 4096; i++) {
	const x = i / 4096
	ENCODE_LUT[i] = x <= 0.0031308 ? x * 12.92 : 1.055 * Math.pow(x, 1 / 2.4) - 0.055
}
function encode(x: number): number {
	if (x <= 0) return 0
	if (x >= 1) return 255
	const f = x * 4096
	const i = f | 0
	const t = f - i
	return 255 * (ENCODE_LUT[i] + (ENCODE_LUT[i + 1] - ENCODE_LUT[i]) * t)
}

/** sRGB → linear 解码查表 */
const DECODE_LUT = new Float32Array(256)
for (let i = 0; i < 256; i++) {
	const c = i / 255
	DECODE_LUT[i] = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const im = new Image()
		im.onload = () => resolve(im)
		im.onerror = () => reject(new Error(`banner image failed to load: ${src}`))
		im.src = src
	})
}

let inFlight = false

/**
 * 把 `#banner` 里的图转到 `hue`。
 * 第一次调用会把 `<img>` 换成同尺寸的 `<canvas>`（putImageData 是同步的，
 * 换上去那一帧就已经是新颜色，不会闪），之后重复调用只重算颜色。
 */
export async function recolorBanner(hue: number): Promise<void> {
	if (inFlight) return

	const host = document.getElementById('banner')
	if (!host) return

	const applied = host.querySelector<HTMLCanvasElement>('canvas[data-hue-applied]')
	// 已经是对的颜色就不动
	if (applied && Math.abs(Number(applied.dataset.hueApplied) - hue) < HUE_EPS) return

	const img = host.querySelector<HTMLImageElement>('img')
	const previous: HTMLElement | null = applied ?? img
	if (!previous) return

	const src = applied?.dataset.hueSrc || img?.currentSrc || img?.src
	if (!src) return

	inFlight = true
	try {
		const source = await loadImage(src)
		const w = source.naturalWidth
		const h = source.naturalHeight
		if (!w || !h) return

		const off = document.createElement('canvas')
		off.width = w
		off.height = h
		const octx = off.getContext('2d', { willReadFrequently: true })
		if (!octx) return
		octx.drawImage(source, 0, 0)

		let raw: ImageData
		try {
			raw = octx.getImageData(0, 0, w, h)
		} catch {
			// 跨域图会把 canvas 涂上 taint，读不了像素 —— 安静放弃，留原图
			return
		}

		// 拆成 OKLab（L 和 a/b 分开存，转色相时 L 原样带过）
		const n = w * h
		const L = new Float32Array(n)
		const A0 = new Float32Array(n)
		const B0 = new Float32Array(n)
		const d = raw.data
		let sumA = 0
		let sumB = 0
		for (let i = 0; i < n; i++) {
			const r = DECODE_LUT[d[i * 4]]
			const g = DECODE_LUT[d[i * 4 + 1]]
			const b = DECODE_LUT[d[i * 4 + 2]]
			const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
			const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
			const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
			const li = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
			const ai = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
			const bi = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
			L[i] = li
			A0[i] = ai
			B0[i] = bi
			// a/b 本身就是「色度 × 方向」，直接求和即是按色度加权的圆平均
			sumA += ai
			sumB += bi
		}
		// 原图主色相：灰像素色度近 0，自动没话语权
		const dominant = Math.atan2(sumB, sumA) / DEG

		// 绕色相环转到目标（保 L、保 C，只动角度）
		const delta = (hue - dominant) * DEG
		const cd = Math.cos(delta)
		const sd = Math.sin(delta)
		const out = octx.createImageData(w, h)
		const o = out.data
		for (let i = 0; i < n; i++) {
			const a = A0[i]
			const b = B0[i]
			const A = a * cd - b * sd
			const B = a * sd + b * cd
			const l_ = L[i] + 0.3963377774 * A + 0.2158037573 * B
			const m_ = L[i] - 0.1055613458 * A - 0.0638541728 * B
			const s_ = L[i] - 0.0894841775 * A - 1.291485548 * B
			const l = l_ * l_ * l_
			const m = m_ * m_ * m_
			const s = s_ * s_ * s_
			o[i * 4] = encode(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)
			o[i * 4 + 1] = encode(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)
			o[i * 4 + 2] = encode(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)
			o[i * 4 + 3] = 255
		}
		octx.putImageData(out, 0, 0)

		const canvas = document.createElement('canvas')
		canvas.width = w
		canvas.height = h
		canvas.className = previous.className
		canvas.style.cssText = previous.style.cssText
		canvas.dataset.hueApplied = String(hue)
		canvas.dataset.hueSrc = src
		canvas.dataset.hueDominant = dominant.toFixed(1)
		canvas.setAttribute('aria-hidden', 'true')
		// 把算好的图搬进去（同步），插进 DOM 就是最终样子
		const cctx = canvas.getContext('2d')
		if (!cctx) return
		cctx.drawImage(off, 0, 0)

		previous.replaceWith(canvas)
	} finally {
		inFlight = false
	}
}
