---
title: JavaScript 获取选中文字
published: 2024-04-21
category: '技术与科学'
---

&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;title&gt;获取选中文字&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;input id="inputText" onselect="logSelection(event)"&gt;
        &lt;button onclick="obtain()"&gt;获取&lt;/button&gt;
        &lt;p&gt;被选中的文字为：&lt;span id="selectedText"&gt;&lt;/span&gt;&lt;/p&gt;
        &lt;script&gt;
            var selectedText = "";
            var selectionInfo = {
                x: 0,
                y: 0
            };
            function logSelection(event) {
                const selection = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);
                selectedText = selection;
                selectionInfo = {
                    x: event.target.selectionStart,
                    y: event.target.selectionEnd
                };
            }
            function obtain() {
                document.querySelector("#selectedText").innerText = selectedText;
                document.getElementById("inputText").focus();
            }
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;

运行后在输入框中输入文字，并且选中一段文字，点击获取后会在下面显示选中的文字。

变量 selectedText 用于存储选中文字，selectionInfo 用于存储开始和结束位置。 

logSelection 函数用于处理输入框中的文本被选中的事件，首先获取选中的文字，然后更新变量 selectedText 和 selectionInfo 的值。obtain 函数用于将选中的文字显示在页面上，并将焦点返回到输入框。