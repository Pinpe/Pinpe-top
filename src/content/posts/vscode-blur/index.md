---
title: 将你的VScode背景变成毛玻璃
published: 2026-05-10
description: 我前年写了篇文章，讲了如何通过某个插件来让VScode有毛玻璃效果，但此文章会给出更好的方法。
tags: [美化, 窗口, 插件]
category: 技术与科学
draft: false
---

<style>
    .lnk{
        background: var(--license-block-bg);
        margin: 0.5rem 0px;
        padding: 1.1rem 1.5rem;
        border-radius: var(--radius-large);
        transition-property: all;
        transition-timing-function: cubic-bezier(.4,0,.2,1);
        transition-duration: .15s;
        cursor: pointer;
    }
    .lnk:hover{
        background-color: var(--btn-regular-bg-hover);
    }
    .lnk:active{
        scale: .98;
        background-color: var(--btn-regular-bg-active);
    }
</style>

我前年写了篇文章，讲了如何通过“Vibrancy Continued”插件来让VScode有毛玻璃效果：

<div class="lnk" onclick="window.open('https://blog.pinpe.top/3009', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">将你的 VScode 背景变成毛玻璃
</div>
    <div>https://blog.pinpe.top/3009</div>
</div>

但是这篇文章写得太早了，插件有几个大问题，导致并不是最佳实践，目前已不推荐使用：

- 窗口无法调整大小和设定最大化。
- 透明度、饱和度和模糊度无法设置，因为饱和度过高而看的很怪。

此文章会给出更好的方法。

---

## 通过backgroundCover插件实现“伪模糊”

下载安装“backgroundCover”插件：

<div class="lnk" onclick="window.open('https://marketplace.visualstudio.com/items?itemName=manasxx.background-cover', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">background-cover
</div>
    <div>让你喜欢的图片或视频铺满 VS Code，支持粒子动画、热更新、视频背景、自动轮播等丰富特性</div>
</div>

然后侧边栏便出现了新的条目，你可以在这里选择图片、调整透明度和模糊度：

![](images/index/image.png)

:::note
每个图片适合不同的透明度和模糊度，自己慢慢调整才会更好看。
:::

你注意到了，这并不能算真正的毛玻璃效果，只能算叠加一层带模糊效果的图片，但这是性能开销最小的、不用系统级插件的最逼真的效果了。

---

## 使用系统级插件

这个可以做到真毛玻璃，但是性能开销比较大，而且实现起来比较复杂，每个系统也不一样，参见Linux KDE桌面的方法：

<div class="lnk" onclick="window.open('https://pinpe.top/posts/kde-better-blur-dx/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">让 KDE 的任意窗口都有半透明模糊效果
</div>
    <div>通过窗口规则和 Better Blur DX，来使任意窗口都有半透明模糊效果。</div>
</div>