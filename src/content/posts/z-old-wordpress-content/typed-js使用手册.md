---
title: typed.js使用手册
published: 2024-07-22
category: '技术与科学'
---

### 这是什么？

这是一种前端库，用来实现逐字打印和光标闪烁的效果：

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

而代码只需要这么写：

&lt;script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9">&lt;/script>
&lt;p>&lt;span id="typed">&lt;/span>&lt;/p>
&lt;script>
    var typed = new Typed('#typed', {
        strings: &#91;"这是效果演示", "这里消费不高，交通方便，工资也不错，自然而然成为了我的打工首选地。而且，我租的房子附近就有还算四通八达的地铁，到达市中心只需要 15 分钟。于是，我便在这里安顿了下来。"],
        typeSpeed: 60,
        showCursor: true,
        cursorChar: "  _",
        loop:true,
        backSpeed:60,
        backDelay:2000,
        startDelay:500
    });
&lt;/script>

### 怎么导入？

只需在&lt;head>标签里插入如下脚本：

&lt;script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9">&lt;/script>

例如：

&lt;html>
    &lt;head>
        &lt;meta charset="UTF-8">
        &lt;script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9">&lt;/script>
    &lt;/head>
    &lt;body>
         ...
    &lt;/body>
&lt;/html>

![](images/sticker-34.png)需要注意的是，**jsdelivr**在国内可能无法使用，这时就需要换成其它的CDN或镜像。

### 怎么使用？

#### Step1：创建容器

先创建一个&lt;span>元素，再设置一个id，例如#typed（也可以改成其它的id），元素内不用写任何东西：

&lt;span id="typed">&lt;/span>

如果要选择别的元素当容器（例如&lt;p>），不要直接上手改，只能往外套一层：

&lt;p>&lt;span id="typed">&lt;/span>&lt;/p>

现在，整个代码应该是这样的：

&lt;html>
    &lt;head>
        &lt;meta charset="UTF-8">
        &lt;script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9">&lt;/script>
    &lt;/head>
    &lt;body>
        &lt;p>&lt;span id="typed">&lt;/span>&lt;/p>
    &lt;/body>
&lt;/html>

#### Step2：创建对象

将以下代码复制到容器下面：

&lt;script>
    var typed = new Typed('*这里要改成容器的id（带“#”号）*', {
        ...
    });
&lt;/script>

例如：

&lt;html>
    &lt;head>
        &lt;meta charset="UTF-8">
        &lt;script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9">&lt;/script>
    &lt;/head>
    &lt;body>
        &lt;p>&lt;span id="typed">&lt;/span>&lt;/p>
        &lt;script>
            var typed = new Typed('#typed', {
                ...
            });
        &lt;/script>
    &lt;/body>
&lt;/html>

#### Step3：填写参数

在...处填写参数，语法是：

参数名: 参数值,

如果是最后一个参数，则不需要加“**,**”号。

感谢[tabzzz](https://blog.csdn.net/m0_73850058/article/details/137093504)提供的参数列表：

参数作用取值类型（仅供参考）strings（必选）要打印的文字由字符串组成的数组typeSpeed（必选）打字速度（毫秒）整型startDelay打字开始前的延迟时间（毫秒）整型backSpeed删除速度（毫秒）整型smartBackspace智能删除，仅删除与前一个字符串不匹配的字符布尔值（true或false）shuffle字符串数组随机排序布尔值（true或false）backDelay后退延迟，即打字和删除之间的延迟时间（毫秒）整型fadeOut是否淡出而不是删除布尔值（true或false）loop是否循环播放文字布尔值（true或false）loopCount循环次数整型，Infinity为无限循环showCursor是否显示光标布尔值（true或false）cursorChar光标字符字符串autoInsertCss是否自动插入 CSS 为光标和淡出效果布尔值（true或false）

例如：

&lt;html>
    &lt;head>
        &lt;meta charset="UTF-8">
        &lt;script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9">&lt;/script>
    &lt;/head>
    &lt;body>
        &lt;p>&lt;span id="typed">&lt;/span>&lt;/p>
        &lt;script>
            var typed = new Typed('#typed', {
                strings: &#91;"Hello", "World!"],
                typeSpeed: 60,
                showCursor: true
            });
        &lt;/script>
    &lt;/body>
&lt;/html>

### 大功告成！