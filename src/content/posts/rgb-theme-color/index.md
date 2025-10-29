---
title: 让Fuwari的主题色随时间变化
published: 2025-10-29
description: 11月的月度配色，我上线了一个可以让主题色随着时间而慢慢变化的效果，效果还是可以的。
tags: [Fuwari, 美化]
category: 技术与科学
draft: false
---

<style>
    .hide{
        background-color: black;
        color: black;
    }
    .hide:hover{
        color: white;
    }
</style>

11月的月度配色，我上线了一个可以让主题色（`hue`）随着时间而慢慢变化的效果，效果还是可以的。

在Fuwari主题中，`hue`是取值为0到360的数值，一个数字对应着不同的色相，我的思路是从一个默认色（例如这次的`257`）开始，每隔一秒就把`hue`加一，超过360就回到0，以此往复。

接下来我将实现的源码公开<span class=hide>（虽然也是用AI写的）</span>，省得想要的人扒了，正好还能水一篇文章。

:::tip
这个设计实际上也不是我独创的，而是很早之前看到的一个Fuwari博客，也只是看到了实装效果，后来这个博客搜索不到了。
:::

## 修改setting-utils.ts

打开`src/utils/setting-utils.ts`文件，这里就是控制`hue`的地方，直接覆盖所有内容：

```typescript
import type { LIGHT_DARK_MODE } from '@/types/config'
import {
  AUTO_MODE,
  DARK_MODE,
  DEFAULT_THEME,
  LIGHT_MODE,
} from '@constants/constants.ts'

// 新增：仅在浏览器环境下删除用户存储的颜色（避免SSR环境报错）
if (typeof window !== 'undefined') {
  localStorage.removeItem('hue');
}

export function getDefaultHue(): number {
  // 旧代码：原默认颜色 fallback 为 250
  // const fallback = '250'
  // 新代码：默认颜色改为275，作为循环起始值
  const fallback = '275'
  const configCarrier = document.getElementById('config-carrier')
  return Number.parseInt(configCarrier?.dataset.hue || fallback)
}

export function getHue(): number {
  // 新增：检查window环境，避免报错
  if (typeof window === 'undefined') {
    return getDefaultHue()
  }
  const stored = localStorage.getItem('hue')
  return stored ? Number.parseInt(stored) : getDefaultHue()
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
  if (typeof window !== 'undefined') {
    const root = document.querySelector(':root') as HTMLElement
    if (root) {
      root.style.setProperty('--hue', String(hue))
    }
  }
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

// 新增：实现每秒颜色加1，循环往复（0-360）
function startHueCycle() {
  // 检查浏览器环境，仅在客户端执行
  if (typeof window === 'undefined') {
    return
  }
  // 从默认颜色开始循环（当前默认值为275）
  let currentHue = getHue()
  
  setInterval(() => {
    currentHue += 1
    // 超过360回到0，确保在0-360范围内循环
    if (currentHue >= 360) {
      currentHue = 0
    }
    setHue(currentHue)
  }, 1000)
}

// 新增：启动颜色循环
startHueCycle()
```

## 修改config.ts

打开`src/config.ts`文件，将`themecolor`里的`fixed`项设为`true`，因为这个效果与主题色选择器不兼容，大概在15行的位置：

```typescript
// ...
export const siteConfig: SiteConfig = {
  title: 'Pinpe的云端',
  subtitle: '一个属于自己的云朵',
  lang: 'zh_CN',
  themeColor: {
    hue: 275,
    fixed: true,     // 将此项设为true
  },
  banner: {
// ...
```