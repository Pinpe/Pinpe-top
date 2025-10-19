---
title: 将KDE打扮成Hyprland一样！
published: 2025-10-18
description: 不妨试试在 KDE 中亲手复刻一套类似的视觉风格，兼顾美观与生产力！
tags: [KDE, Hyprland]
category: 技术与科学
draft: false
---

## ✨ 先上效果图 ✨

![](images/index/image.png)

![](images/index/image-1.png)

![](images/index/image-2.png)

![](images/index/image-3.png)

![](images/index/image-4.png)

## 📋 为什么要这样做 📋

我是从暑假开始使用Linux的，而且大部分使用KDE全家桶。

后来我了解了Hyprland、niri等平铺式WM，发现它们非常新颖和美观，让我很眼馋：

![](images/index/image-5.png)

![](images/index/image-6.png)

但我短时间不会转过去，主要是担心迁移成本、入门难度、稳定性和Wayland兼容性问题，毕竟我用Lazyvim+Neovide都手足无措，更何况是更进一步的平铺式WM？

我只能继续用KDE，幸运的是KDE支持很大程度的个性化，理论上应该能仿照Hyprland风格。

然后我翻边所有KDE美化文章，发现没人搞这种风格，然后我便自己搞，就有了这篇文章。

## 🎛️ 状态栏美化 🎛️

Hyprland不得不品的是它的状态栏，与其他操作系统和DE相比，是我目前见过最好的，至少也是最美观的。

而在KDE中有一个类似的概念，叫做**面板**_（只不过更全能更通用些，还可以做Dock栏和任务栏）_，因此我们先从这里下手。

### 配置布局和功能

建筑是需要打地基的，我们先用原版的东西定个型。

![](images/index/屏幕截图_20251017_234614.png)

上图就是状态栏和Dock栏的布局和挂件，因为每个面板都要赋予不同的样式，因此总共有5个面板，当然你也可以根据自己的情况酌情修改，只要达到满意即可。

:::tip
需要注意的是布局和Bug，KDE在这块的Bug是最多的，调布局也需要花一些时间，还要测试不同场景下的情况。
:::

### 配置样式

KDE商店有一个第三方挂件，叫**Panel Colorizer**，可以修改面板的样式。

![](images/index/image-7.png)

使用起来很简单，只需要将它添加到某个面板上，然后右键它，点击`配置 Panel Colorizer`即可。

:::tip
这个挂件支持i18n，安装完成后注销重进即可。
:::

接下来以左上角的窗口列表为例，一步一步配置成想要的样式。

首先，打开配置界面，进入`外观`菜单，将`原生面板`下的`背景`复选框取消掉，效果就变成透明的了：

![](images/index/image-8.png)

切换元素到`挂件`，勾选`启用`复选框，启用并设置你想要的背景颜色，如果需要的话可以设置前景颜色，目前效果如下：

![](images/index/image-9.png)

:::tip
不知道要使用何种颜色？使用 [Catppuccin](https://catppuccin.com/palette/)谢谢喵！
:::

切换到`Shape`选项卡，按照以下配置调整，有时需要酌情修改，写过CSS的应该都知道是什么意思：

![](images/index/image-10.png)

按照这个思路，配置剩下需要配置的面板即可大功告成。

## 🎨 外观样式和配色方案 🎨

### 使用Catppuccin谢谢喵！

上面就推荐了**Catppuccin**，这是我目前最喜欢的配色方案，也是适配最广泛的，其中就包括KDE，推荐使用。

目前无论哪个适配，都有4种主题可选：

- **Latte**：浅色主题，适合浅色党，但我认为与Hyprland风格不太一致。_（也就是没人用浅色主题）_
- **Frappé**：最亮的深色主题，偏灰。
- **Macchiato**：介于Frappé和Mocha之间。_（我用的）_
- **Mocha**：最黑的深色主题。

![](images/index/image-12.png)

KDE的适配有一个安装脚本，只需要两个步骤即可使用：

1. `git clone --depth=1 https://github.com/catppuccin/kde catppuccin-kde && cd catppuccin-kde`
2. 运行安装脚本`./install.sh`，并按照说明进行操作。

安装完成后，设置里就能找到相应的配色方案了。

![](images/index/image-11.png)

### 更好的Breeze主题：Klassy

自带的Breeze看着一般，但换个配色方案就很不错了，因此目前我并不准备换。

但是现在有一个基于Breeze的fork，叫**Klassy**，提供了一些原版没有的功能，例如可以自定义的标题栏、可以部分自定义的元素样式、标题栏和工具栏的毛玻璃效果。

![](images/index/image-13.png)

我使用Arch系的，如果要安装，应该是：

```bash
yay -S klassy-bin
```

## 🖌️ 窗口圆角和描边 🖌️

**LightlyShaders**是一个桌面特效，可以给所有窗口添加圆角和描边，与Windwos 11和Mac类似，而不是默认的上圆下方。

:::warning
1. 此特效**不兼容**其他部分特效。_（包括系统自带的）_
2. 有时会给不应该上边框的对象上边框。
3. 没有二进制文件，需要从仓库编译。
:::

应该可以通过`yay`编译和安装：

```bash
yay -S lightlyshaders-git
```

安装完成后就能在设置里配置了，翻译和配置请见下，可以照着我的配置：

![](images/index/image-15.png)

## 🎉 完成 🎉

如果全部完成了，大概就能体验到Hyprland一样的桌面！

你还可以更改鼠标指针、配置更多桌面特效、设置动态壁纸来更丰富你的桌面。