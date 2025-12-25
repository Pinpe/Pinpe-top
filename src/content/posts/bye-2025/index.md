---
title: 平稳的一年：2025年终总结
published: 2025-12-25
description: 我不知道该怎么面对自己的未来，也不一定知道该怎么面对自己的过去。
tags: [反思, 总结, 终点]
category: 其它
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

如果算上今年的，那么这一次是我第三次写年终总结了。但与以往不同的是，这次我会以文章形式发布，并且尽可能写详细些。

首先我想说的是，今年我觉得相对来说还不错，一切都很平稳，但是我却重新审视了自己的未来和过去，开始对未来愈加迷惘、焦虑和无奈，也许有些事情已经有些改变了。

## 今年发生了什么事

### 高血压 / 高尿酸

今年中旬，我正式确诊了**高血压和高尿酸**（高压平均在140-150左右），血糖也临近死线。

![](images/index/IMG_20250826_135014_edit_417756823460636.jpg)

但是现在我也在做出一些改变，吃了医生开的降压药，学习日本人一样吃东西之类的（尽可能），等到把降压药吃完后，再去复诊。

### 学院合并 / 新教室 / 新老师

听说因为建筑学院招不到人（但是现在谁还入土木啊），于是校方将建筑学院和信息学院合并了。

对我们班的影响是，教室的位置被改了，离校门更远了。

但这算不了什么，最重要的是换了新班主任，姓蒋，但是诡异的地方在于，她做到了喜怒不形于色，我无法从她的面部和眼睛里读出任何情感，还自带着一种严肃感，这有点恐怖。

### 社会负面新闻增多

我以前也不是不关注新闻，但是现在出圈的新闻是越来越多了（有些是政策），今年更是一只手都数不过来。

比如说：协和医院4+4事件、武汉大学学术不端事件、于朦胧事件、耳环事件、绿皮火车跳窗事件、K签政策、吸毒记录封存政策。

这让我觉得今年的氛围确实比之前有些不一样了，也许有什么东西在暗流涌动。

## 今年去哪里玩了

### 上海！

甚至是一年去了两次！

观感都挺不错的，特别喜欢浦东和陆家嘴！

<div class="lnk" onclick="window.open('http://pinpe.top/posts/to-shanghai/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">做一个繁华之梦 —— 上海一日游
</div>
    <div>今年五一假期，我们准备去上海玩。</div>
</div>

<div class="lnk" onclick="window.open('http://pinpe.top/posts/to-shanghai-2/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">上海一日游，但是二周目
</div>
    <div>因为之前五一假期的上海之行，留下了很深的印象，因此在今年国庆节二刷上海。</div>
</div>

### 抚远 & 哈巴洛夫斯克！

在中国的最东边县城，前往俄罗斯体验异域风情！

<div class="lnk" onclick="window.open('https://pinpe.top/posts/fuyuan-russia/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">【多图预警】人生第一次出国！抚远和俄罗斯的加倍快乐
</div>
    <div>中国最东极抚远，和俄罗斯的哈巴洛夫斯克市。</div>
</div>

### 天津！

尽管只是顺路，但是仍然去探索了一下！

<div class="lnk" onclick="window.open('https://pinpe.top/posts/to-tianjin/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">天津之行
</div>
    <div>回家的路上，顺路去天津玩了两天。</div>
</div>

### 东方盐湖城！

尽管不远，但红枫很好看！

<snap class=hide>（本来这种级别的不该写进这里的，但红枫真的好看）</snap>

<div class="lnk" onclick="window.open('https://pinpe.top/posts/to-yanhucheng/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">与深秋同呼吸
</div>
    <div>秋季已然即将尾声，我们只是去看最后一眼罢了。</div>
</div>

## 今年干了啥

### 实现了可用的Brainfuck解释器 / 调试器

作为著名的Esolang，其解释器居然很好实现，因为只有8种符号，逐字核对就可以了。

我还顺便实现了Debug调试功能，可以放慢运行速度并且显示实时内存状态，非常好用👍。

<div class="lnk" onclick="window.open('https://pinpe.top/posts/pinfuck/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">实现 Brainfuck 解释器
</div>
    <div>文章明确 Brainfuck 规则，做触发器、流程器处理符号与循环，整合成解释器。</div>
</div>

### 操作系统大换血

因为忍受不了Windows，我开始使用Linux了，并且成为了日用系统。

尽管Linux比Windows更加折腾和麻烦，但是至少很多都是开源的，这意味着每个问题都会有解决办法，而不是像后者那样是个黑箱。

我使用的是EndeavourOS，这实际上是原汁原味Arch，只是有了个图形化安装程序。

<div class="lnk" onclick="window.open('https://pinpe.top/posts/arch-linux/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">试试 Linux 吧：Arch Linux 日用记录
</div>
    <div>Arch Linux 的日常使用体验与心得。</div>
</div>

![](images/index/image.png)

### 博客内核大换血

我使用了两年多WordPress，实际上还是挺好用的，但合适的主题太稀少了，实在看腻了，就换成了Astro。

而Astro的Fuwari主题还是挺对我胃口的，而且当时也很小众，于是就用到了现在。

还有一个好处是，静态博客无需服务器，因此现在整个博客做到了0服务器，也做到了低成本。（只要付个域名钱）

<div class="lnk" onclick="window.open('https://pinpe.top/posts/bye-wordpress/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">再见，WordPress
</div>
    <div>我放弃了 WordPress，成功迁移到了 Astro。</div>
</div>

### 前端框架和工程化

我入门了一些前端上的东西。

首先是jQurey，虽然这是很老的东西了，但我觉得设计的还是挺不错的，以至于在一些要求不算高的情况下，我还会使用的。

然后是Vue，这是一个更加复杂的框架，还自带了许多功能，比如包管理器、组件、插值表达式、TypeScript之类的，Vue的项目结构大多也是固定的（脚手架），让我一举进入了前端工程化时代，我第一次有了只用前端就可以做出完整项目的能力。

<div class="lnk" onclick="window.open('http://pinpe.top/posts/jquery/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">使用 jQuery 作为原生 JavaScript 的平替
</div>
    <div>说实话，我从一开始就觉得 JavaScript 与 HTML、CSS 没有融合起来，写起来非常别扭和繁琐，于是在很长一段时间里，除非必须要使用 JavaScript，我都会想想其它替代办法。</div>
</div>

### 体验函数式编程

一开始我是从Haskell语言了解函数式编程的。

函数式编程与其他编程不太一样，写代码的时候有种外星语言的感觉，费脑细胞。

借此机会，我还去体验了神之语言——Lisp。

<div class="lnk" onclick="window.open('https://pinpe.top/posts/lisp-lang/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">上帝给了我一个全是括号的语言
</div>
    <div>为什么 Lisp 称之为 “上帝的编程语言”，因为哪怕现在看来也是极为超前的。</div>
</div>

### 新机器人们的新故事

今年与AI协作，又写了3篇故事，这些故事有些是伤感的，有些是热血的，有些是微妙的，但都继续反思了我们习以为常的事物，以及“何以为人”的叩问。

<div class="lnk" onclick="window.open('https://pinpe.top/posts/hell/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">来自地狱的患者
</div>
    <div>当共生被撕裂，地狱便在人间的缝隙中滋生。她失去的不仅是姐姐，更是赖以生存的 “另一半灵魂”。
</div>
</div>

<div class="lnk" onclick="window.open('https://pinpe.top/posts/magical-girl/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">最后的魔法少女
</div>
    <div>欢迎来到魔法咖啡厅 —— 让蛋包饭上的星光，守护你心中的温暖。
</div>
</div>

<div class="lnk" onclick="window.open('https://pinpe.top/posts/fallen-angel/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">堕天使
</div>
    <div>当天使堕落之时，甜饮暖过的人心，能否拉住失控的羽翼
</div>
</div>

### 开始学习日语

实际上也没学多久，现在也还不算入门。

<div class="lnk" onclick="window.open('https://pinpe.top/posts/duo-japenese/', '_blank');">
    <div class="gc-titlebar" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: .5rem;color: var(--tw-prose-headings);font-size: 1.25rem;font-weight: 500;">日语学习记录
</div>
    <div>此文章是用于记录目前日语学习时需要记录的东西，就当成日记看吧。
</div>
</div>

### Nino聊天AI

受到了之前写的提示词和<snap class=hide>男娘xnn</snap>的启发，创建了名叫Nino的项目，这是一个AI聊天软件，ta会以可爱且包容的语气回应你的消息。

ta还会识别图片、识别文本文件，支持长期记忆，支持上下文保存，尽力打造成日常好伙伴的情感型AI。

目前项目仍然在更新。

::github{repo="Pinpe/nino-ai-chat"}

另外也推荐晓夜的fork，这是QQ群Bot版本的，感谢所有fork者和贡献者！

::github{repo="LeonspaceX/nino-ai-bot"}

_其实还有很多，但不列举了..._

## 未来怎么办

如同一开始说的，今年是我思想受到最猛烈冲击的一年，对过去和未来的迷惘焦虑愈加严重，不想当猪仔，但现在也拿不出像样的办法。

我不知道该怎么面对自己的未来，也不一定知道该怎么面对自己的过去。

我想，如果回到几年前啥也不知道的时光该多好啊，但再也无法当个鸵鸟一样视而不见了。

于是我想改变些什么，试图去尝试一个哪怕不是很像样的办法，尽管不知道能不能成功，不知道能不能坚持下去。