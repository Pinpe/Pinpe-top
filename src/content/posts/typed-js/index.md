---
title: typed.js 使用手册
published: 2024-07-22
description: 这是一种前端库，用来实现逐字打印和光标闪烁的效果
tags: [前端, 轮子, 效果]
category: 技术与科学
draft: false
---

## 这是什么？

这是一种前端库，用来实现逐字打印和光标闪烁的效果：

而代码只需要这么写：

```html
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9"></script>
<p><span id="typed"></span></p>
<script>
    var typed = new Typed('#typed', {
        strings: ["这是效果演示", "这里消费不高，交通方便，工资也不错，自然而然成为了我的打工首选地。而且，我租的房子附近就有还算四通八达的地铁，到达市中心只需要 15 分钟。于是，我便在这里安顿了下来。"],
        typeSpeed: 60,
        showCursor: true,
        cursorChar: "  _",
        loop:true,
        backSpeed:60,
        backDelay:2000,
        startDelay:500
    });
</script>
```

## 怎么导入？

只需在 `<head>` 标签里插入如下脚本：

```html
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9"></script>
```

例如：

```html
<html>
    <head>
        <meta charset="UTF-8">
        <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9"></script>
    </head>
    <body>
         ...
    </body>
</html>
```

需要注意的是，jsdelivr 在国内可能无法使用，这时就需要换成其它的 CDN 或镜像。

## 怎么使用？

### Step1：创建容器

先创建一个 `<span>` 元素，再设置一个 id，例如`#typed`（也可以改成其它的 id），元素内不用写任何东西：

```html
<span id="typed"></span>
```

如果要选择别的元素当容器（例如 `<p>`），不要直接上手改，只能往外套一层：

```html
<p><span id="typed"></span></p>
```

现在，整个代码应该是这样的：

```html
<html>
    <head>
        <meta charset="UTF-8">
        <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9"></script>
    </head>
    <body>
        <p><span id="typed"></span></p>
    </body>
</html>
```

### Step2：创建对象

将以下代码复制到容器下面：

```html
<script>
    var typed = new Typed('这里要改成容器的id（带“#”号）', {
        ...
    });
</script>
```

例如：

```html
<html>
    <head>
        <meta charset="UTF-8">
        <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9"></script>
    </head>
    <body>
        <p><span id="typed"></span></p>
        <script>
            var typed = new Typed('#typed', {
                ...
            });
        </script>
    </body>
</html>
```

### Step3：填写参数

在 `...` 处填写参数，语法是：

```
参数名: 参数值,
```

如果是最后一个参数，则不需要加 “,” 号。

感谢 [tabzzz](https://blog.csdn.net/m0_73850058/article/details/137093504) 提供的参数列表：

| 参数 | 作用 | 取值类型（仅供参考） |
|------|------|------------------|
| `strings`（必选） | 要打印的文字 | 由字符串组成的数组 |
| `typeSpeed`（必选） | 打字速度（毫秒） | 整型 |
| `startDelay` | 打字开始前的延迟时间（毫秒） | 整型 |
| `backSpeed` | 删除速度（毫秒） | 整型 |
| `smartBackspace` | 智能删除，仅删除与前一个字符串不匹配的字符 | 布尔值（`true` 或 `false`） |
| `shuffle` | 字符串数组随机排序 | 布尔值（`true` 或 `false`） |
| `backDelay` | 后退延迟，即打字和删除之间的延迟时间（毫秒） | 整型 |
| `fadeOut` | 是否淡出而不是删除 | 布尔值（`true` 或 `false`） |
| `loop` | 是否循环播放文字 | 布尔值（`true` 或 `false`） |
| `loopCount` | 循环次数 | 整型，`Infinity` 为无限循环 |
| `showCursor` | 是否显示光标 | 布尔值（`true` 或 `false`） |
| `cursorChar` | 光标字符 | 字符串 |
| `autoInsertCss` | 是否自动插入 CSS 为光标和淡出效果 | 布尔值（`true` 或 `false`） |

例如：

```html
<html>
    <head>
        <meta charset="UTF-8">
        <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9"></script>
    </head>
    <body>
        <p><span id="typed"></span></p>
        <script>
            var typed = new Typed('#typed', {
                strings: ["Hello", "World!"],
                typeSpeed: 60,
                showCursor: true
            });
        </script>
    </body>
</html>
```

## 大功告成！