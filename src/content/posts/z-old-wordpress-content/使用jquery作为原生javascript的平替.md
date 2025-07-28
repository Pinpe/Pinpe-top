---
title: 使用jQuery作为原生JavaScript的平替
published: 2025-05-01
category: '技术与科学'
---

### $('01').缘起()

说实话，我从一开始就觉得JavaScript与HTML、CSS没有融合起来，写起来非常别扭和繁琐，于是在很长一段时间里，除非必须要使用JavaScript，我都会想想其它替代办法。

比如说，我想要做一个弹窗，页面结构如下：

&lt;html>
    &lt;body>
        &lt;button id="open">打开弹窗&lt;/button>
        &lt;div id="window" >
            &lt;span id="text">Hello&lt;/span>&lt;br>
            &lt;button id="close">关闭&lt;/button>
        &lt;/div>
        &lt;script>
            // 在这里写JavaScript...
        &lt;/script>
    &lt;/body>
&lt;/html>

如果使用原生JavaScript，需要在&lt;script>里这么写：

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('window').style.display = 'none';
    document.getElementById('open').addEventListener('click', function() {
        document.getElementById('window').style.display = '';
    });
    const closeButton = document.getElementById('close');
    const textElement = document.getElementById('text');
    const windowElement = document.getElementById('window');
    closeButton.addEventListener('mouseenter', function() {
        textElement.textContent = '不要关闭我呜呜呜';
        windowElement.style.backgroundColor = '#ffdddd';
    });
    closeButton.addEventListener('mouseleave', function() {
        textElement.textContent = 'Hello';
        windowElement.style.backgroundColor = '#dddddd';
    });
    closeButton.addEventListener('click', function() {
        windowElement.style.display = 'none';
    });
});

又臭又长，看都看的难受，别说写了。

因此当我在学校机房里的一本书里看到**jQuery**时，我都惊呆了，觉得JavaScript本来应该是这样的，是如此的优雅、简明扼要：

$(
    function(){
        $('#window').hide()
    }
)
$('#open').click(
    function(){
        $('#window').show()
    }
)
$('#close').mouseenter(
    function(){
        $('#text').text('不要关闭我呜呜呜')
        $('#window').css('background-color', '#ffdddd')
    }
)
$('#close').mouseleave(
    function(){
        $('#text').text('Hello')
        $('#window').css('background-color', '#dddddd')
    }
)
$('#close').click(
    function(){
        $('#window').hide()
    }
)

### $('02').引入()

引入jQuery很简单，可以使用外部CDN，例如使用字节的CDN：

&lt;script src="https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/2.1.3/jquery.min.js">&lt;/script>

你也可以在这里下载文件并本地引入：[https://code.jquery.com/jquery-3.7.1.min.js](https://jquery.com/)

&lt;script src="jquery-3.7.1.min.js">&lt;/script>

### $('03').使用()

jQuery类似于CSS，语法本身是很简单的，但吃积累。

几乎所有的语法遵循同一个规则：

$(选择器).触发条件(
    function(){
        $(选择器1).操作1(参数).操作2(参数)...
        $(选择器2).操作1(参数).操作2(参数)...
    }
)

例如在上文的例子中，其中有一段是这样的：

$('#open').click(
    function(){
        $('#window').show()
    }
)

这段代码很简单：如果id为open的元素被点击，就显示id为window的元素。其中选择器的语法也与CSS差不多。

不过需要注意的是，你可能会看到没有选择器的情况，就是：

$(
    function(){
        $('#window').hide()
    }
)

这其实是一个语法糖，它的原型为：

$(document).ready(
    function(){
       $('#window').hide()
    }
)

这个意思是说：当页面（document）加载完毕时，就隐藏id为window的元素。如果你想要在页面打开时立刻执行程序，就必须要写$(document).ready(function(){})或$(function(){})。

### $('04').为什么我要学jQuery()

jQuery是过时的，与Vue、React简直是不能比，虽然以前辉煌过一段时间，但时过境迁，现在除了政府网和老项目，也没人用jQuery了。

但我认为jQuery与Vue、React根本就不是一个赛道上的，**我觉得更像JavaScript的语法糖**，与其说jQuery是过时的，还不如说是原生JavaScript是过时的。

因此我觉得还是得学一下，可以当作JavaScript的平替，但如同原生JavaScript一样，遇到大量交互的单页、性能要求高等情况，还是相形见拙，只能交给更加现代的框架搞了。