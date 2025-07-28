---
title: 使用Node.js创建一个后端开发项目
published: 2024-08-08
category: '技术与科学'
---

### 此教程不是从零开始，因此需要提前配置以下环境：

* Node.js开发环境

* npm包管理器

### 第一步：创建项目

* 在任意地方创建一个文件夹，并且重命名为项目的名称。

* 在文件夹内打开终端，输入：

npm install express

* 创建并打开server.js文件，你将在这里写代码。

### 第二部：构建框架

复制并粘贴以下代码：

// 导入express库
let express = require('express');

// 创建express应用
let app = express();

//处理路由
app.get('/', (req, res) => {
    res.send(`&lt;h1>Hello world!&lt;/h1>&lt;span>网站运行正常&lt;/span>`);
});

// 启动服务器并打开端口
let port = 3000; //设定端口号
let url = 'http://localhost' //设定网址
app.listen(port, () => {
    console.log(`网站部署完成：${url}:${port}`);
});

这是一个简单的后端框架，可以进行进一步更改和开发。

如果在公网环境下运行，需要把端口号改成HTTP或HTTPS的通用端口：

* HTTP：80

* HTTPS：443