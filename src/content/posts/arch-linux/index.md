---
title: 试试Linux吧：Arch Linux日用记录
published: 2025-09-10
description: Arch Linux 的日常使用体验与心得。
tags: [Arch, Linux, KDE]
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
    .hide{
        background-color: black;
        color: black;
    }
    .hide:hover{
        color: white;
    }
</style>

![](images/index/image-8.png)

<span style="color: #666">_图为社区创作的Arch发行版娘化形象_</span>

## \[🎐 千里之行，始于足下\] # 转Linux的契机

那是一个暑假，我当时正在搞Windows的美化，然后不小心把某些文件删除了，导致不仅再也不见毛玻璃的材质，一些系统应用（例如设置）也没法打开。

我便进入启动项补救，结果安全模式是一片漆黑的，sfc和还原点是没用的，唯一剩下的，只有重置系统。

我别无选择，便重置了系统，最后我发现系统修好了，软件还在，但是设置什么的也一起重置了，一切都回到了2023年的状态，一切都要从头再来。

这时，一个念头出现了：

**“与其继续使用Windows，难道不能有其他的选择吗？”**

是啊，Windows特别是Windows11，又慢又笨重，喜欢到处拉屎，甚至还有成千上万的Bug和技术债，一个专业版就要收费一千多，结果卖成这价格也都植入了广告，除了生态是全球最大的以外，与其他系统根本不能比，这就是垄断的力量，已经连做产品的觉悟都没有了。

于是，我将目光投向其他操作系统：

- Mac OS虽然有品味，但是绝对封闭，把用户当白鼠养，生态也不咋地，普通电脑也很难安装。
- 而Linux则刚刚好，开源不拉屎，虽然生态不如Windows，但是也有一些人作为日用系统，似乎只要不玩3A大作和工业软件，也能够用。

于是，在这个契机下，我的Linux旅程，便开始了。

## \[🌸 知己知彼，百战不殆\] # 选择一个发行版

我已经确定要使用Linux了，但是Linux只是一个内核，还有成千上万个衍生出来的发行版，且各有不同。

我选择了Arch，但是与转Linux不同的是，我甚至无法拿出任何像样的理由，也许是与Windows完全相反的极致轻量化，也许是自定义程度高，也许可以让我学到点东西，也许比较热门，<span class=hide>也许MTF很喜欢用</span>，但无论如何，我就是选择了它。

这个发行版门槛和难度都比较高，对用户不太友好，但是我有信心可以驾驭它，成为优秀的Windows的平替。

当然，纯Arch我玩不来，我选择了基于Arch衍生而来的**EndeavourOS**，它支持图形化的安装方式，也预装了一些软件，其他都没怎么动，相比起来更加方便一些。

## \[🌺 爱美之心，人皆有之\] # 桌面环境与终端

我换Linux的一个动机就是可以随心所欲美化，这样看的会更加舒服。

经过了适当的美化和磨合后，截至目前，我的桌面是这样的：

![](images/index/image-1.png)

![](images/index/image.png)

我使用的是此发行版预装的KDE桌面环境，与其他桌面环境有一个优点就是自定义程度高，例如上图的“Dock”和“Finder”，实际为两个面板，每个面板都可以单独自定义属性和内容：

![](images/index/image-2.png)

支持全局主题，与Windows只能换个壁纸不同，这里的主题甚至可以替换控件样式、窗口装饰、图标、配色等，大部分软件的主题一致性也能保证，而Windows11已经成为究极缝合怪了：

![](images/index/image-3.png)

:::tip
可以透露一些主题信息：
|项目|值|注释|
|-|-|-|
|配色|Catppuccin Latte Lavender|这是一个配色方案标准，色彩柔和，支持数百种接口，其中也包括了KDE。|
|应用程序外观样式|Breeze微风|默认的已经很好看了。|
|Plasma外观样式|Breeze微风||
|窗口装饰元素|Breeze微风|以前用的是其他的，但因为[这个](https://pinpe.top/posts/kde-gtk3-shadow/)原因，导致换回默认的了。|
|图标|Fluent|设计的比较清爽，但是也有风格不一致的问题。|
:::

不过我认为最好的是动效，几乎每处地方都有一个过渡动画，且质量和性能都不错，最让人感到惊艳的动效是窗口拖动时的惯性效果，一张图足以说明一切：

![](images/index/image-4.png)

这是我将文件管理器从左边快速拖到右边的截图，只需要进入`设置->动效->桌面特效`，打开`窗口惯性晃动`，就可以开启了，自带的：

![](images/index/image-5.png)

说了这么多桌面环境，来看看Linux的精华：终端如何吧。

我使用的是KDE自带的Konsole终端，Shell默认为Fish，主题为Catppuccin Latte，以下是进入终端时的样子：

![](images/index/image-6.png)

我写了一个小脚本，在进入终端时会自动加载Python虚拟环境，Haskell语言工具链Path，以及使用fastfetch显示的系统信息，以充足的准备来执行命令：

```fish
set -gx PATH $HOME/.ghcup/bin $PATH
if test "$TERM_PROGRAM" != "vscode" && test -z "$VSCODE_INJECTION" && test -z "$NVIM"
  if status is-interactive
    source myenv/bin/activate.fish
    fastfetch
    printf "\n\u001b[90m─ Shell ──────────────────────────────────────────────────────────────────────────────────────────────────────────────\u001b[0m\n"
  end
end
```

:::tip
neofetch、fastfetch等软件可以在终端里显示系统信息，因为一些原因被称为“耍酷”的代名词，很多配置展示的视频下第一个命令就是调用这些软件。
:::

## \[🌼 采菊东篱下，悠然见南山\] # 包的管理与生态

### 管理

首先要说明一下，Arch使用滚动更新的更新策略，这意味着系统组件可以使用包管理器单独的升级和安装：

>滚动更新（rolling update）是指软件开发中经常性将更新发送到软件的概念。相较于滚动发行，有标准版本和小数点版本的版本号开发模式，必需通过重新安装以取代先前的发行版。archlinux 是没有版本概念的，它始终保持最新的状态，通俗地理解就相当于把发行版比喻为一部车，ubuntu 更新就是换一部新的，而 archlinux 就是把车里面旧的配件换成新的。
>
><span style="color: #666">_——来自[archlinux 简明指南](https://arch.icekylin.online/guide/prepare/understand)_</span>

只需要在终端输入一个`yay`，通过AUR，即可列出所有需要更新的系统组件和其他软件：

![](images/index/image-7.png)

但因为有些未知的原因，无法检索更新，我们也可以使用这个备用命令来更新：

```bash
sudo pacman -Syu
```

是的，`yay`和`pacman`都是包管理器，且都是自带的，我们看看两者有什么区别：

|项目|Pacman|AUR|
|-|-|-|
|这是什么|官方管理的包管理器|用户管理的包管理器（Arch User Repository）|
|调用方式|`pacman`|`yay`|
|软件来源|由官方托管包，有审核（相当于App Stroe）|由用户上传包，无审核（相当于PyPI）|
|下载方式|直接下载官方的提供的包|只是一个索引，将根据索引去另外的网站下载包|
|安装方式|直接下载安装二进制文件|下载的是源代码，需要先编译再安装|
|生态范围|仅包含开源且过审核的包|任何支持Linux的包，包括闭源软件、最新版本、测试版或小众软件|

这里列举一些较为常用的命令：

|pacman|yay|功能|
|-|-|-|
|`sudo pacman -Syu`|`yay`|更新应该更新的包|
|`sudo pacman -S pkg`|`yay -S pkg`|安装pkg包，包括依赖|
|`sudo pacman -R pkg`|`yay -R pkg`|删除pkg包，不包括依赖|
|`sudo pacman -Rns pkg`|`yay -Rns pkg`|删除pkg包，包括依赖|
|`sudo pacman -Qs pkg`|`yay -Qs pkg`|搜索本机上的pkg包|
|`sudo pacman -Ss pkg`|`yay -Ss pkg`|搜索网络上的pkg包|

:::note
根据上表，可以发现一些规律：
- `pacman`需要root权限，但是`yay`不建议加上root权限。
- 这两个包管理器的操作方式基本一致。
:::

:::tip
Windows安装命令行软件需要去环境变量指定Path，但Linux则不需要，大大简化了安装步骤。
:::

### 生态

有人说，生态是决定操作系统是否成功的一个重要因素，Linux生态不太行，因此只能永远退居嵌入式和服务器行业，接触不到桌面系统。

这个说法在十几年前甚至几年前还有道理，但今时不同往日，我已经见到一些人日常使用Linux了<span class='hide'>（悄悄告诉你，有些人的年龄比我都小）</span>，这侧面证明了Linux至少支持很多生活和工作场景了。

- 日常生活基本不成问题，QQ，微信，Clash等国民级软件基本支持。
- 即使是Office，Adobe等生产力软件也有替代品。
- 几乎支持所有编程环境和工具。
- 如果没有发行Linux的软件（例如RPG Maker），可以尝试用Wine或Proton等兼容层。
- 实在不行的个别软件（例如VMware），只能暂时回到Windows系统了。

而且还会让你更偏向使用开源软件而不是私有软件，对共产主义一样的开源社区发展提供帮助，以下是一部分专业软件的替代品：

|原版|替代|
|-|-|
|`Photoshop`|`GIMP`|
|`Mircosoft Office`|`Libre Office` `WPS`|
|`After Effects`|`Natron`|
|`C4D` `3DMax`|`Blender`|

## \[🌱 路漫漫其修远兮，吾将上下而求索\] # 其他杂谈

### 文件管理的不同

在Windows中，一块硬盘有C盘，D盘等盘符，人们习惯使用C盘为系统盘，D盘为数据盘，文件系统使用的是ntfs。

在Linux中，则没有盘符，系统和数据都在根目录（`/`）里，如同一棵树，文件系统使用ext4或brtfs。

而且，Linux有比较统一的系统目录，看起来比较整洁，各目录用途如下：

| 目录路径     | 说明|
| - | - |
| **/**        | 根目录，所有文件和目录的起点。                               |
| **/bin**     | 存放所有用户都可使用的基本命令（二进制可执行文件）。           |
| **/boot**    | 存放系统启动所必需的核心文件，如内核和引导程序。             |
| **/dev**     | 存放设备文件，如硬盘、键盘、鼠标等，系统通过这里访问硬件。     |
| **/etc**     | 存放系统和应用程序的配置文件。                               |
| **/home**    | 普通用户的主目录所在地，每个用户有一个同名子目录。           |
| **/lib**     | 存放系统最基本的共享库文件，供 `/bin` 和 `/sbin` 中的程序使用。 |
| **/media**   | 系统自动挂载可移动设备（如U盘、光盘）的默认位置。            |
| **/mnt**     | 用于临时手动挂载文件系统或设备的目录。                       |
| **/opt**     | 用于安装附加的第三方可选应用程序。                           |
| **/proc**    | 虚拟文件系统，映射当前内核运行状态和进程信息，存在于内存中。 |
| **/root**    | 系统管理员 (root) 的主目录。                                 |
| **/sbin**    | 存放仅供系统管理员使用的系统管理命令。                       |
| **/srv**     | 存放一些服务（如Web、FTP）运行后所需的数据。                 |
| **/tmp**     | 存放临时文件，所有用户都可读写，重启后文件可能被清除。       |
| **/usr**     | 存放用户安装的应用程序和只读数据，是另一个重要的层级目录。   |
| **/var**     | 存放经常变化的文件，如日志、缓存、邮件等。                   |
| **/run**     | 存放自系统启动以来运行中的进程信息，是临时文件系统，重启后重建。 |
| **/lost+found** | 文件系统修复时，用于存放 recovered（找回）的碎片文件。        |

<span style="color: #666">_——数据来自[菜鸟教程](https://www.runoob.com/linux/linux-system-contents.html)，经AI处理_</span>

另外，Linux无需像Windows手动指定软件的安装位置，是由包管理器统一管理的。

### 权限管理的不同

有个有趣的一点是，与Windows看扩展名不同，Linux判断可执行文件不看扩展名，而是看权限位是否有“可执行”权限，你也无法在图形化文件管理器执行程序，必须要打开终端执行。

而root权限与Windows的Administrator也不一样，前者明显比后者更加强大，甚至可以把整个根目录给撸掉，接近System权限，**因此请谨慎行使root权限**。

:::tip
在脚本文件经常会发现一个神秘注释`#!`，例如`#!/usr/bin/python`，这与Shebang机制有关，用来更方便地识别和调用正确的解释器。
:::

### 用于时刻提醒自己的注意事项

这些注意事项和安全告示一样，现在还贴在我的桌面上，现在也送给你：

1. 务必知道每个将要运行的命令的具体含义。
2. 谨慎使用root权限，此权限相当于System，权力越大，责任越大。
3. 安装软件前务必滚一下，经常滚滚也更健康（yay）
4. 遇到问题及时求助，包括群U、AI、搜索引擎

### 主观使用感想

文章已经到末尾了，最后说一下我的主观评价：

首先日常用起来很舒服：文件目录干净，控件样式统一，随处可见的动画，高级的自定义，优雅的字体渲染——至少这不是一个充斥着垃圾和敷衍的系统，我可以看见KDE和Linux的努力，这一切甚至是开源免费的。

但是与商业系统的开箱即用还是有不小差距，就是太折腾了，毛病很多，门槛有些高，也不算很稳定，生态尽管有很大进步，但也没有特别好。

另外使用终端的情况变多了，以前在Windows只是启动一个CLI程序，但在Linux许多操作都需要终端，大部分教程也优先使用终端。

虽然如此，我也希望能长期用下去，替代Windows，这篇文章就是诚意的体现。

## 附录

### 与此主题有关的网站

<div class="lnk" onclick="window.open('https://forum.archlinuxcn.org/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">Arch Linux 中文论坛</div>
    <div>https://forum.archlinuxcn.org/</div>
</div>

<div class="lnk" onclick="window.open('https://arch.icekylin.online/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">archlinux 简明指南
</div>
    <div>https://arch.icekylin.online/</div>
</div>

<div class="lnk" onclick="window.open('https://archlinux.org/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">Arch Linux 官网
</div>
    <div>https://archlinux.org/</div>
</div>

<div class="lnk" onclick="window.open('https://endeavouros.com/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">EndeavourOS 官网
</div>
    <div>https://endeavouros.com/</div>
</div>

### 鸣谢

[春华秋实](https://chun.itcdt.top)是一个精通Linux的人，在我换系统后不顾麻烦和幼稚，耐心给了我很多帮助和指导，非常感谢他的帮助。

[Ariasaka](https://blog.yaria.top/)也是一个Arch日常使用者，并且也给予了我一些帮助。