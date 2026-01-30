---
title: 让KDE的任意窗口都有半透明模糊效果
published: 2026-01-30
description: 通过窗口规则和Better Blur DX，来使任意窗口都有半透明模糊效果。
tags: [KDE, 模糊, 窗口]
category: 技术与科学
draft: false
---

效果如下，其中以下所有窗口都通过这个方法成功实现了半透明模糊效果：

![](images/index/屏幕截图_20260130_144244.png)

## 第一步：编译并安装特效

我们需要安装一个名叫 `kwin-effects-better-blur-dx` 的特效。

打开终端，输入 `yay -Ss kwin-effects-better-blur-dx`，便找到了以下包：

```
aur/kwin-effects-better-blur-dx-x11-git r541.ae8d454-1 (+1 0.75)
    KWin Better Blur DX effect fork with window class force blur feature (X11)
aur/kwin-effects-better-blur-dx-x11 2.1.0-1 (+0 0.00)
    KWin Better Blur DX effect fork with window class force blur feature (X11)
aur/kwin-effects-better-blur-dx-git r541.ae8d454-2 (+6 1.14)
    KWin Better Blur DX effect fork with window class force blur feature (Wayland)
aur/kwin-effects-better-blur-dx 2.1.0-1 (+0 0.00)
    KWin Better Blur DX effect fork with window class force blur feature (Wayland)
```

我使用Wayland混成器，且不想直接从Git上获取源码，便可以选择最后一个（`aur/kwin-effects-better-blur-dx 2.1.0-1`），现在安装它：

```
yay -S kwin-effects-better-blur-dx
```

然后可能会进入编译环节，但是yay会自动给你编译并安装好的。

## 第二步：将窗口调整至半透明效果

安装完成后，打开你想要应用特效的窗口（比如QQ），然后打开设置。

![](images/index/image.png)

窗口管理 > 窗口规则 > 新增。

![](images/index/image-1.png)

检测窗口属性 > 单击QQ窗口 > 添加窗口类 > 匹配整个窗口类 > 添加属性 > 活动不透明度和非活动不透明度分别改为90%和95%。

![](images/index/image-3.png)

:::tip
这里的90%和95%可以根据喜好改成其他的，数值越低，窗口越透。
:::

正常情况下，你的窗口就变为半透明了，但是没有模糊效果：

![](images/index/image-4.png)

## 第三步：给窗口应用模糊效果

打开桌面特效 > Better Blur DX 的设置 > Force blur，在那个大输入框里写上窗口类的小写名称。

![](images/index/image-2.png)

应用更改后，模糊效果就生效了。