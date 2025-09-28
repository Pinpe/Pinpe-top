---
title: 如何本地部署大模型
published: 2025-03-08
description: LLM如何在你的计算机通过显卡本地运行？而且不联网。
tags: [LLM, AI, 显卡]
category: 技术与科学
draft: false
---

## 安装 Ollama

打开终端，通过 `winget` 安装 Ollama 引擎：

```sh
winget install ollama
```

## 下载模型

打开 [Ollama](https://ollama.com/search) 网站，选择一个你想要的模型：

![](images/index/image.png)

然后选择模型的参数量，参数量越大越聪明，但所需配置也需要更高：

![](images/index/image-1.png)

## 安装和运行模型

选择完成后，复制并运行右边的命令，例如这样：

```sh
ollama run deepseek-r1:1.5b
```

等待安装，安装完成后就可以使用了。如果以后还想继续使用，只需输入同样的命令。

![](images/index/image-2.png)