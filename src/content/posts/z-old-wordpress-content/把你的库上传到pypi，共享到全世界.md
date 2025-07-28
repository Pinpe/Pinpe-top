---
title: 把你的库上传到PyPI，共享到全世界
published: 2024-10-11
category: '技术与科学'
---

### 首次上传请安装twine库

pip install twine

### 规范文件结构

项目文件夹里应该是这样的结构：

&lt;项目名称>

* __init__.py（主程序）

* LICENSE

* pyproject.toml（库的信息文件）

* README.md

### 填写pyproject.toml

以我的Output库为例子：

&#91;project]
name = "outputs" #项目名称
version = "1.12" #版本
description = "这是一个用于扩展CLI打印功能的Python库，主要发展方向是类似`logging`的日志记录功能，但也发展其它方向，而且还支持PinkShell的高仿样式。" #简介
dependencies = &#91;"conkits"] #需要依赖库
authors = &#91;{ name = "Pinpe", email = "813233375@qq.com"}] #作者信息集合
readme = "README.md" #README文件名称
requires-python = ">=3.6" #所需Python版本
classifiers = &#91;
    "Programming Language :: Python :: 3", #制作语言
    "License :: OSI Approved :: MIT License", #许可证
    "Environment :: Console", #类型/用途
    "Operating System :: Microsoft :: Windows", #支持的操作系统（下面两条同理）
    "Operating System :: MacOS",
    "Operating System :: POSIX :: Linux",
]

&#91;build-system]
requires = &#91;"setuptools>=61.0"] #不需要改变
build-backend = "setuptools.build_meta" #不需要改变

&#91;project.urls]
"blog-url" = "https://pinpe.top" #作者博客地址

### 打包库文件

在终端打开项目文件夹：

python -m build

### 上传到PyPI

python -m twine upload --repository-url https://upload.pypi.org/legacy/ dist/* --verbose

上传过程中需要使用API token，可在PyPI官网注册后申请。