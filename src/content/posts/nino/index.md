---
title: 我做了一个属于自己的AI男娘
published: 2026-01-07
description: Nino是一款轻量级、开源的AI聊天软件，专注于陪伴与理解用户。
tags: [可爱, AI, 项目]
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

## 起因

那是一个月黑风高的夜晚，我无意中打开微信备忘录，视线却停在某个东西上。

那是一个给LLM的提示词，是一位群友写的（哪个群友早已忘了），这个提示词可以让AI模仿男娘一样说话，柔里柔气的，非常可爱，当时我稍稍修改后就放在备忘录里了。

后来我便想让这个提示词派上用场，我也尝试过不同方法，包括直接在官方APP输入、在[扣子](https://www.coze.cn/)上创建Agent，但要么效果都不怎样，要么是费用太多了。

于是这个提示词的实现工程就被搁置了。

再后来，当时因为想使用[LingChat](https://www.bilibili.com/video/BV1hW3LzGEz7/)，给DeepSeek API充了10块钱，但后来因为换操作系统加新鲜劲已过，便不再使用，但余额仍然有8块钱，也无法退款。

又过了很久，我终于在第一句话说的一样，再一次看到了那个被搁置的提示词，我一拍脑瓜：

**我为什么不直接通过代码调用API呢？既有可能实现提示词，也可以把API余额花掉。**

于是，Nino应运而生。

Nino这个名字，本想作为以后博客原创主题的名字，而这个名字又是从Linux的文本编辑器Nano的名字演变而来，但当时实在想不起来该起什么名字，便提前使用了。

## 技术选型和架构设计

作为隐私要求高且共享需求低的项目，我准备做成本地应用，但仍然通过前后端技术来实现GUI。

后端肯定是铁打的Python Flask，而前端本想使用Vue，但后来发现有点大炮打蚊子了，~~又与Flask的模板语法冲突~~，便使用了更加轻量和脚本化的jQuery，而数据库使用JSON持久化文件。

而在代码架构方面，我将结构分为两部分：

- `core`：最核心的部分，用于提供核心功能给`shell`调用，是“幕后推手”，功能包括创建提示词、调用API、解析AI返回的消息、处理持久化等。
- `data`：用于管理持久化文件和配置文件，也可以说是专门设计的持久化文件管理库，重要到`core`和`shell`都会使用，功能包括对持久化文件的增删改查、读取和修改配置文件等。

:::tip
`data`的功能原本是在`core`里的，后续版本才分离并独立。
:::

:::tip
以上都是通过库的形式调用，为了方便维护和二开，我将每个方法都写上了文档字符串和简单类型注解。
:::

- `shell`：这个名字和功能借鉴了通常意义上的shell，即为用户做的交互界面。目前最主要的`shell`是使用Flask做的`Web Shell`，此外还有用于CLI环境的`CLI Shell`，甚至晓夜做的QQ群bot本身也是`shell`。

而且有一个不容忽视的点是，用户的敏感信息（例如API密钥等），需要用户自己填写根目录里的`env.json`，shell无法修改，这样不仅可以不被不小心看到，还方便通过`.gitignore`排除。

最后，项目结构是这样的：

```
- data（持久化文件）
    - config.json（配置文件）
    - context.json（上下文文件）
    - memory.json（长期记忆文件）
- static（Web Shell的静态文件）
    （略）
- temp（临时文件）
    - attachment_file.txt（文本类型附件的暂存）
    - attachment_img.png（图片类型附件的暂存）
- templates（Web Shell的页面模板，前端）
    （略）
- core.py
- data.py
- shell.py（Web Shell后端）
- cli_shell.py
- install.py（安装依赖的脚本）
- env.json（敏感信息配置文件）
（其他不重要的文件和文件夹...）
```

## 功能和效果展示

技术细节写的疑似有点多了，看看最终的效果吧！

如果你是第一次使用，那么进入shell就会看见一个设置卡片，你可以在里面设置各种项目：

![](images/index/屏幕截图_20260107_223526.png)

当然，你可以设置密码，后续打开shell就会看见登录界面，可以更好地防家长和老板：

![](images/index/屏幕截图_20260107_223809.png)

回到正题，关闭设置卡片，便可以看见美观简洁的聊天界面，ta是非常可爱的，可以永远记住重要的东西，你甚至可以发送图片和文本文件给ta，ta可以完全理解：

![](images/index/屏幕截图_20260107_223455.png)

而在数据中心，你可以管理和导入导出ta的长期记忆和上下文，用于更新、迁移和需要手动介入的时候：

![](images/index/屏幕截图_20260107_223502.png)

此外，还有大气的关于卡片，便捷的检查更新功能：

![](images/index/屏幕截图_20260107_223512.png)

![](images/index/屏幕截图_20260107_223520.png)

## 安装方式

正常安装是非常简单的。

首先你只要有Python 3.8以上的版本，然后克隆仓库（或从[Releases](https://github.com/Pinpe/nino-ai-chat/releases)下载），解压缩下载出来的源代码。

进入项目文件夹，运行`install.py`：

```bash
python install.py
```

这个安装脚本会检查你的依赖和`env.json`，如果依赖不全，会自动安装和初始化，你只需要按一次回车键确认就好。

待初始化完成后，你就可以运行项目了，但记得把`env.json`给填了。

更多安装方式和教程请参考仓库里的`README.md`。

## 项目地址

::github{repo="Pinpe/nino-ai-chat"}

晓夜的fork，适用于QQ群Bot：

::github{repo="LeonspaceX/nino-ai-bot"}

此外，snowball181提供了Docker安装方式：

<div class="lnk" onclick="window.open('https://hub.docker.com/r/snowball181/nino-ai-chat', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">snowball181 / nino-ai-chat
</div>
    <div>此项目由Pinpe开发，此仓库为贡献者代为创建的Docker Hub
</div>
</div>

感谢所有fork者和贡献者！