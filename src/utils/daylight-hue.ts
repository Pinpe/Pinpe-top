/**
 * 一天色相：把「此刻的太阳高度角」折成一支 OKLCH 色相。
 *
 * 思路：太阳低 = 暖（橙 h60），太阳高 = 冷（蓝 h255），夜里停在冷端。
 * 暖端与冷端之间沿**短弧**走（60 → 0 → 330 → 300 → 255），所以中途会经过
 * 红／紫 —— 这是刻意的，整站色相因此能连续地跟着天走，没有跳变。
 *
 * 观测点固定在常州：banner 里那把「天」和主题色用的是同一支色相，
 * 换地方只需要改 LAT / LON。
 */

const DEG = Math.PI / 180

/** 观测点（常州） */
export const LAT = 31.81
export const LON = 119.97

/** 暖端：太阳刚露头时的色相 */
const WARM = 60
/** 冷端：太阳升到最高的色相 */
const COOL = 255
/** 从暖端走到冷端一共转过多少度（短弧：60 → 255 逆时针 165°） */
const ARC = 165
/** 民用暮光：低于 -6° 就算天黑，直接给冷端 */
const TWILIGHT = -6

/** NOAA 简化算法，返回太阳高度角（度）。dayOfYear 从 1 数起，hour 是本地钟点。 */
function altitudeAt(dayOfYear: number, hour: number, lat: number, lon: number): number {
	const n = dayOfYear - 1 + (hour - 12) / 24
	const L = ((280.46 + 0.9856474 * n) % 360) * DEG
	const g = ((357.528 + 0.9856003 * n) % 360) * DEG
	const lambda = L + 1.915 * DEG * Math.sin(g) + 0.02 * DEG * Math.sin(2 * g)
	const eps = (23.439 - 0.0000004 * n) * DEG
	const declination = Math.asin(Math.sin(eps) * Math.sin(lambda))
	// 均时差（分钟）
	const eot =
		229.18 *
		(0.000075 +
			0.001868 * Math.cos(L) -
			0.032077 * Math.sin(L) -
			0.014615 * Math.cos(2 * L) -
			0.040849 * Math.sin(2 * L))
	// 真太阳时 → 时角（中国全境用东八区，所以对 120°E 作经度修正）
	const solarTime = (hour * 60 + eot + 4 * (lon - 120)) / 60
	const H = 15 * (solarTime - 12) * DEG
	const phi = lat * DEG
	return (
		Math.asin(
			Math.sin(phi) * Math.sin(declination) + Math.cos(phi) * Math.cos(declination) * Math.cos(H)
		) / DEG
	)
}

/** 当天日头最高能到几度（用来把高度角归一化到 0~1） */
function maxAltitude(dayOfYear: number, lat: number, lon: number): number {
	let max = 0
	for (let i = 0; i < 288; i++) max = Math.max(max, altitudeAt(dayOfYear, i / 12, lat, lon))
	return max || 1
}

/** 一年里的第几天（按本地日历算，不受时区/夏令时影响） */
function dayOfYear(date: Date): number {
	const start = Date.UTC(date.getFullYear(), 0, 1)
	const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	return Math.floor((today - start) / 86400000) + 1
}

/** 此刻该用的 OKLCH 色相（0~360）。 */
export function daylightHue(date: Date = new Date(), lat = LAT, lon = LON): number {
	const doy = dayOfYear(date)
	const hour = date.getHours() + date.getMinutes() / 60
	const altitude = altitudeAt(doy, hour, lat, lon)

	// t：0 = 刚日出（最暖），1 = 正午或天黑（最冷）
	let t: number
	if (altitude <= TWILIGHT) t = 1
	else if (altitude < 0) t = -altitude / -TWILIGHT
	else t = altitude / maxAltitude(doy, lat, lon)

	return (WARM - ARC * t + 360) % 360
}

export { WARM, COOL, ARC }
