---
title: Pydroid6.2 汉化版下载 (arm64)–手机上最好用的 Python IDE
published: 2023-07-24
description: Pydroid 是安卓生态下的 Python 集成开发环境
tags: [环境, 汉化, 下载]
category: 资源
---

:::warning
转载自：<https://blog.qaiu.top/archives/pydroid>，并非原创
:::

## 教程更新日志

>2023-04-22 蓝奏云的直链下载解析器重构完成，测试应该没啥问题，如果遇到无法下载的问题，请及时和我联系
><br>
>2023-04-28 发布 6.0 汉化版，使用云安装脚本简化安装流程；之前的版本安装繁琐不建议使用

## 注意事项

- 完整安装 Pydroid 需要安装 3 个 Apk 分别是 Pydroid6.2主程序、Pydroid预制库插件、Pydroid权限插件
- 根据自身需要来决定是否完整安装
    1. 预制库插件提供大量已适配安卓端的轮子（Whl）库，如人工智能机器学习相关领域开发的 TensorFlow，图像识别相关的 OpenCV，QT 组件库等等，**如果只是基于 Console 学习 Python 入门可以不必安装 Pydroid 预制库插件和 Pydroid 权限插件**
    2. Pydroid 权限插件在 Pydroid 调用额外权限（除基本的文件存取外的）如 OpenCV 调用摄像头，调用话筒来录音等等，如果不涉及这类操作可以不必安装 Pydroid 权限插件
- **Pydroid6.2 汉化版基于 MT 默认签名可能在某些平台会报毒** 未来会考虑重新签名
- 如果之前已经安装过 5.0 汉化版和本站提供的 5.0 英文版可以直接`升级主程序`即可（Python 版本和插件并未更新），如果之前使用的是其他来源版本要卸载重装（一定要卸载掉主程序和插件不然签名冲突）

## Pydroid 是什么:

Pydroid 是安卓生态下的 Python 集成开发环境，基于 Python3.9.x；内置 GCC 编译器可以自己构建 whl (轮子) 库；内置 pip 包管理器；以及一个预构建的 whl 常用框架集，包括 tensorflow, opencv， pyQT5 等等

## 下载地址

[Pydroid6.2 主程序](https://lz.qaiu.top/lz/iaQi10u4j2md)

[Pydroid 预制库插件](https://lz.qaiu.top/lz/iKrRr0tvlsgb)

[Pydroid 权限插件](https://lz.qaiu.top/lz/izE6C0tvlsej)

## 安装指南

1. 分别下载三个 Apk 安装包，
2. 安装主程序两个插件；当然也可以只安装主程序用以简单学习，这时可以忽略后面步骤。
3. 下载依赖：
    - -> 打开 Pydroid
    - -> 点击左上角菜单 (或者屏幕从左往右划)
    - ->Pip-> 找到最右侧快速安装
    - -> 随便安装一个库 -> 这时会提示是否允许启动 pydroid-xxx (允许) 和是否允许访问文件系统 (允许)
    - -> 这时候假如你能科学上网的话可以忽略以下步骤 (插件会自动下载 Obb 预制库依赖)
    - -> 辅助安装：没有科学上网的话进度会一直卡在 0% 这时候把 Pydroid 强制关掉，将如下辅助代码复制到 Pydroid 编辑器里运行 (如果没啥报错基本上就 OK 了)：

```python
# Pydroid辅助安装脚本，需要先在pip的快速安装下安装任意库之后（因为不开VPN会卡0%，强制退出即可）重启pydroid执行本脚本
from urllib.request import urlopen
exec(urlopen(&#39;https://qaiu.top/src/py/install.py&#39;).read())
```
> 就算使用 VPN 安装上了 obb 依赖（pydroid 预制库插件的数据包）建议也要执行一下辅助安装脚本，因为脚本里不光实现了下载 obb 文件，也升级了 pip 版本，配置了清华源镜像，最重要的就算安装了 keras==2.6 这个依赖（不指定这个版本后面 TensorFlow 安装会出错）

## 总结一下：

1. 下载一个主程序和两个插件，主程序直接安装，插件结合自身需求看需不需要安装
2. 如果要完整安装需要先下任意一个 Pip 库 (这一步主要是引导插件创建 Obb 目录)
3. 如果能科学上网可以直接安装，否则进度卡 0% 需要重新启动 pydroid 使用本站提供的脚本辅助安装