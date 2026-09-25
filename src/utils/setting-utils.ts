import type { LIGHT_DARK_MODE } from '@/types/config'
import {
  AUTO_MODE,
  DARK_MODE,
  DEFAULT_THEME,
  LIGHT_MODE,
} from '@constants/constants.ts'
import { daylightHue } from './daylight-hue'

export function getDefaultHue(): number {
  const fallback = '270'
  const configCarrier = document.getElementById('config-carrier')
  return Number.parseInt(configCarrier?.dataset.hue || fallback)
}

/** 配色选择器是不是关掉了（config.ts 的 themeColor.fixed） */
export function isHueFixed(): boolean {
  if (typeof window === 'undefined') return true
  const configCarrier = document.getElementById('config-carrier')
  // 属性缺失时按老行为走（当作没固定），免得 ConfigCarrier 没渲染就整个瘫掉
  return configCarrier?.dataset.hueFixed === 'true'
}

/** 访客自己在配色面板里挑的色相；没挑过就是 null */
export function getStoredHue(): number | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('hue')
  return stored ? Number.parseInt(stored) : null
}

export function getHue(): number {
  // 新增：检查window环境，避免报错
  if (typeof window === 'undefined') {
    return getDefaultHue()
  }
  // 选择器关掉时，访客以前挑过的色相一律作废，统一跟着当天的太阳走
  if (isHueFixed()) return daylightHue()
  // 否则：访客挑过就听他的；没挑过就跟着当天的太阳走
  return getStoredHue() ?? daylightHue()
}

/** 抹掉访客的选择，让色相回到「跟着天走」 */
export function clearHue(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('hue')
  }
}

/** 只把色相写进 CSS 变量，不碰 localStorage —— 给「跟着天走」用 */
export function applyHue(hue: number): void {
  if (typeof window === 'undefined') return
  const root = document.querySelector(':root') as HTMLElement
  if (root) {
    root.style.setProperty('--hue', String(hue))
  }
}

export function setHue(hue: number): void {
  const defaultHue = getDefaultHue()
  // 新增：检查window环境，避免报错
  if (typeof window !== 'undefined') {
      // 只有当要设置的颜色不是默认颜色时，才存入localStorage
  // 如果是默认颜色，则移除已存储的值
    if (hue === defaultHue) {
      localStorage.removeItem('hue')
    } else {
      localStorage.setItem('hue', String(hue))
    }
  }

  // 无论是否为默认颜色，都更新CSS变量（同样需要检查浏览器环境）
  applyHue(hue)
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
  // 检查浏览器环境
  if (typeof window === 'undefined') {
    return
  }
  switch (theme) {
    case LIGHT_MODE:
      document.documentElement.classList.remove('dark')
      break
    case DARK_MODE:
      document.documentElement.classList.add('dark')
      break
    case AUTO_MODE:
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      break
  }
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
  // 检查浏览器环境
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme)
    applyThemeToDocument(theme)
  }
}

export function getStoredTheme(): LIGHT_DARK_MODE {
  // 检查浏览器环境
  if (typeof window === 'undefined') {
    return DEFAULT_THEME
  }
  return (localStorage.getItem('theme') as LIGHT_DARK_MODE) || DEFAULT_THEME
}