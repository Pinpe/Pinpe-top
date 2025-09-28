---
title: 如何优化 Windows11 的祖传界面？
published: 2024-12-23
description: 既然微软不想改，开源社区就要出手了。
tags: [优化, 设计, 插件]
category: 技术与科学
draft: false
---

Windows 从 1986 年发展至今，已经经过了很多轮迭代，到现在的 Windows11 已经是什么都有了，包括历代的界面，甚至没有经过深度翻新，还保留着原汁原味。

这导致了体验严重割裂，你可以在一个屏幕上同时看见 Fluent、Metro，甚至是 Basic 之类的各种风格。

![](images/index/image.png)

![](images/index/image-1.png)

![](images/index/image-2.png)

因此，既然微软不想改，开源社区就要出手了。

## Rectify11

这是专门解决界面一致性的软件，不仅可以重绘系统图标，修改 Basic 界面样式，添加更多动画，还可以优化右键菜单，移植 Windows7 的小组件。

:::caution
此为侵入性修改，会直接修改系统数据，务必创建还原点。
:::

![](images/index/image-3.png)

![](images/index/image-4.png)

![](images/index/image-5.png)

![](images/index/image-6.png)

![](images/index/image-7.png)

但万物不是完美的，还是会有一点小瑕疵，比如在资源监视器就有滚动条的 Bug，但对我来说这个软件不常用，影响不大：

![](images/index/image-8.png)

>安装教程：<https://xiaoyi.vc/rectify-11-setup.html><br>
>官方网站：<https://rectify11.net/>

:::github{repo=Rectify11/Installer}
:::

## MicaForEveryone

原版的云母模糊效果有一个根本性问题：只会对桌面采样，不能识别窗口底下真正有什么：

![](images/index/image-9.png)

这不能完全算毛玻璃效果，而这款软件就可以完美解决这个问题：

![](images/index/image-10.png)

:::github{repo=MicaForEveryone/MicaForEveryone}
:::