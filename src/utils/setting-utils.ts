import type { LIGHT_DARK_MODE } from '@/types/config'
import {
  AUTO_MODE,
  DARK_MODE,
  DEFAULT_THEME,
  LIGHT_MODE,
} from '@constants/constants.ts'

export function getDefaultHue(): number {
  const fallback = '250'
  const configCarrier = document.getElementById('config-carrier')
  return Number.parseInt(configCarrier?.dataset.hue || fallback)
}

export function getHue(): number {
  const stored = localStorage.getItem('hue')
  return stored ? Number.parseInt(stored) : getDefaultHue()
}

export function setHue(hue: number): void {
  const defaultHue = getDefaultHue()
  // 只有当要设置的颜色不是默认颜色时，才存入localStorage
  // 如果是默认颜色，则移除已存储的值
  if (hue === defaultHue) {
    localStorage.removeItem('hue')
  } else {
    localStorage.setItem('hue', String(hue))
  }
  
  // 无论是否为默认颜色，都更新CSS变量
  const root = document.querySelector(':root') as HTMLElement
  if (root) {
    root.style.setProperty('--hue', String(hue))
  }
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
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
  localStorage.setItem('theme', theme)
  applyThemeToDocument(theme)
}

export function getStoredTheme(): LIGHT_DARK_MODE {
  return (localStorage.getItem('theme') as LIGHT_DARK_MODE) || DEFAULT_THEME
}