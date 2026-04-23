---
title: 对 (MPA) 多页面切换实现丝滑动画的探索
published: 2026-04-23
description: 我发现了一种新的浏览器原生 API ：View Transition，最早是给 SPA 做的，但后续扩展了对 MPA 的支持
tags: [Web开发]
category: 技术与科学
draft: false
---

:::note
此文章转载于：<https://blog.glumi.cn/article/MPA-ViewTransition.html><br>
略微调整了格式，视频仍然来自源链接。
:::

有接触过一点 Web 的朋友应该知道，SPA (单页应用) 总能实现非常丝滑的切换动画，而传统 MPA (多页应用) 由于每次切换页面都会重载一次 HTML、CSS、JS 资源，即使写了一些延时跳转机制 (如执行动画后多少毫秒跳转目标页面)、使用首屏动画，但也总感觉不是很丝滑，通常有动画断层，浏览体验不是很好。

但是直到有天我发现了一种新的浏览器原生 API ：`View Transition`，了解到它最早是给 SPA 做的，但后续扩展了对 MPA 的支持，这么一来丝滑的页面切换动画不再是 SPA 类站点的专属。尽管这还是一个实验性的功能（细节可能会在未来变更），但我相信以后稳定时会开始普及。

## 尝鲜前置

目前我的实验环境是 chrome 浏览器 144.0.7559.59 正式版，可以尽量使用最新版浏览器，并避免使用 Firefox 和 Safari，因为他们对该功能支持的还不是很完善。

需要注意的点：

- 跳转的两个网页需要同源。
- 两个网页都需要选择启用 View Transition，才能实现视图动画。

启用 View Transition，首先我们得在需要跳转的页面如："页面 A" 和 "页面 B" 中定义一个这样的 CSS。

```css
@view-transition {
  navigation: auto;
}
```

A.html

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A</title>
    <style>
        body {
            background-color: aquamarine;
        }
        @view-transition {
            navigation: auto;
        }
    </style>
</head>
<body>
    这里是页面 A
    <a href="/B.html">去 B</a>
</body>
</html>
```

B.html

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B</title>
    <style>
        body {
            background-color: bisque;
        }
        @view-transition {
            navigation: auto;
        }
    </style>
</head>
<body>
    这里是页面 B
    <a href="/A.html">去 A</a>
</body>
</html>
```

然后页面此时会有一个默认的淡入淡出过渡动画效果。

<video loading="lazy" poster="" preload="metadata" width="100%" controls="" src="https://blog.glumi.cn/assets/MPA-ViewTransition/1.mp4"></video>

关于 navigation 参数属性：

- auto：如果两个网页是同源的，启用视图过渡
- none：该网页将不会启用视图过渡。

## 更近一步，自定义动画

上面的例子可能不明显，而且很简陋，接下来我们可以实现一个明显点的自定义动画。

A.html

```HTML
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A</title>
    <style>
        body {
            background-color: aquamarine;
        }
        @view-transition {
            navigation: auto;
        }
        @keyframes anim-out {
            0%{
                transform: translateX(0%);
            }100%{
                transform: translateX(100%);
            }
        }
        @keyframes anim-in {
            0%{
                transform: translateX(-100%);
            }100%{
                transform: translateX(0%);
            }
        }
        ::view-transition-old(root) {
            animation: anim-out 1s;
        }
        ::view-transition-new(root) {
            animation: anim-in 1s;
        }
    </style>
</head>
<body>
    这里是页面 A
    <a href="/B.html">去 B</a>
</body>
</html>
```

B.html

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B</title>
    <style>
        body {
            background-color: bisque;
        }
        @view-transition {
            navigation: auto;
        }
        @keyframes anim-out {
            0%{
                transform: translateX(0%);
            }100%{
                transform: translateX(-100%);
            }
        }
        @keyframes anim-in {
            0%{
                transform: translateX(100%);
            }100%{
                transform: translateX(0%);
            }
        }
        ::view-transition-old(root) {
            animation: 1s anim-out;
        }
        ::view-transition-new(root) {
            animation: 1s anim-in;
        }
    </style>
</head>
<body>
    这里是页面 B
    <a href="/A.html">去 A</a>
</body>
</html>
```

例子 2 效果：

<video loading="lazy" poster="" preload="metadata" width="100%" controls="" src="https://blog.glumi.cn/assets/MPA-ViewTransition/2.mp4"></video>

这里我们可以看到，动画过渡平滑，而且能对导航的前进、后退功能生效，同时也能注意到如果手动修改 url 进行跳转则没有动画效果，也就是动画只跟着用户交互走。

此时动画过渡已经接近 SPA 体验了，甚至不需要写一行 JS 代码，不过应该有人注意到了，我们需要在每个参与动画过渡的页面都定义 `::view-transition-old` 和 `::view-transition-new` 。

这两个伪元素选择器主要作用：

- `::view-transition-old`：过渡前的旧视图的快照的表现。
- `::view-transition-new`：过渡后的新视图的表现。

我们可以在这里定义一些预制衔接良好的 CSS 动画，增加体验。

而括号中那个 root 标记默认是代指整个 html 根节点，它可以是自定义的标记，接下来我们会接触一个属性：`view-transition-name`，

如果你只是想给某个元素实现过渡，也可以使用：`view-transition-name` 来设置新标记。并且像这样传递给 `::view-transition-new(**)` 和 `::view-transition-old(**)` ** 为: 自定义标记名。

A.html

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A</title>
    <style>
        body {
            background-color: aquamarine;
        }
        @view-transition {
            navigation: auto;
        }
        @keyframes anim-out {
            0%{
                transform: translateX(0%);
            }100%{
                transform: translateX(100%);
            }
        }
        @keyframes anim-in {
            0%{
                transform: translateX(-100%);
            }100%{
                transform: translateX(0%);
            }
        }
        .box {
            view-transition-name: box;
        }
        ::view-transition-old(box) {
            animation: anim-out 1s;
        }
        ::view-transition-new(box) {
            animation: anim-in 1s;
        }
    </style>
</head>
<body>
    这里是页面 A
    <div class="box">balbalbal</div>
    <a href="/B.html">去 B</a>
</body>
</html>
```

B.html

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B</title>
    <style>
        body {
            background-color: bisque;
        }
        @view-transition {
            navigation: auto;
        }
        @keyframes anim-out {
            0%{
                transform: translateX(0%);
            }100%{
                transform: translateX(-100%);
            }
        }
        @keyframes anim-in {
            0%{
                transform: translateX(100%);
            }100%{
                transform: translateX(0%);
            }
        }
        .box {
            view-transition-name: box;
        }
        ::view-transition-old(box) {
            animation: 1s anim-out;
        }
        ::view-transition-new(box) {
            animation: 1s anim-in;
        }
    </style>
</head>
<body>
    这里是页面 B
    <div class="box">balbalbal</div>
    <a href="/A.html">去 A</a>
</body>
</html>
```

例子 3 效果：

<video loading="lazy" poster="" preload="metadata" width="100%" controls="" src="https://blog.glumi.cn/assets/MPA-ViewTransition/3.mp4"></video>

此时可以看到，只有 `.box` 元素使用 animation 动画。

## 那我不使用 animation 行么？

行，即使你不添加任何自定义 animation 而它也根据新旧视图中同一个标记的元素的 width height 等变化帮你自动实现过渡动画。

A.html

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A</title>
    <style>
        body {
            background-color: aquamarine;
        }
        @view-transition {
            navigation: auto;
        }
        .goTarget {
            view-transition-name: ab;
            width: 200px;
            height: 100px;
            background-color: red;
        }
        
    </style>
</head>
<body>
    这里是页面 A
    <div class="goTarget">
        <a href="/B.html">去 B</a>
    </div>
</body>
</html>
```

B.html

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B</title>
    <style>
        body {
            background-color: bisque;
        }
        @view-transition {
            navigation: auto;
        }
        .goTarget {
            view-transition-name: ab;
            width: 400px;
            height: 300px;
            transform: translateX(100px) rotate(160deg);
            background-color: red;
        }
    </style>
</head>
<body>
    这里是页面 B
    <div class="goTarget">
        <a href="/A.html">去 A</a>
    </div>
</body>
</html>
```

例子 4 效果：

<video loading="lazy" poster="" preload="metadata" width="100%" controls="" src="https://blog.glumi.cn/assets/MPA-ViewTransition/4.mp4"></video>

可以看到页面A 和 页面B 的 `.goTarget` 元素都设置了 `view-transition-name` 并且为同一个标识名 `ab` 它们会根据元素的新旧状况（width、height、transform 等）来自动进行动画过渡。而且导航的前进、后退依然生效。

需要注意：整个文档只能设置唯一的标识，view-transition-name 标识名不能冲突。

对于复杂的场景，你还可以使用 js 来动态变换某个元素的 view-transition-name 标记，如：

```js
document.querySelector(taget).style.viewTransitionName = '新标记'
```

还有两个比较重要的事件函数：

`pageswap`：事件会在网页的最后一帧呈现之前触发。对要移除的网页进行一些最后一刻的更改。

`pagereveal`：网页在初始化或重新激活后，但在首次呈现机会之前，会触发该事件。借助此功能，可以在系统拍摄新快照之前自定义新页面。

以及文档传入传出时的导航历史记录相关 api：`NavigationActivation`

至于怎么构思动画逻辑，全看自己思路了。
