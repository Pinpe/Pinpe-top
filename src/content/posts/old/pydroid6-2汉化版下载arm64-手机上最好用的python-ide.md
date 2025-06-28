---
title: Pydroid6.2汉化版下载(arm64)--手机上最好用的Python IDE
published: 2023-05-04
category: '资源'
---

[warning]转载自：[https://blog.qaiu.top/archives/pydroid](https://blog.qaiu.top/archives/pydroid)，并非原创[/warning]

教程更新日志

2023-04-22 蓝奏云的直链下载解析器重构完成, 测试应该没啥问题, 如果遇到无法下载的问题, 请及时和我联系
2023-04-28 发布6.0汉化版, 使用云安装脚本简化安装流程; 之前的版本安装繁琐不建议使用

### 注意事项

* 完整安装Pydroid需要安装3个Apk分别是Pydroid6.2主程序、Pydroid预制库插件、Pydroid权限插件

根据自身需要来决定是否完整安装

* 预制库插件提供大量已适配安卓端的轮子（Whl）库，如人工智能机器学习相关领域开发的TensorFlow，图像识别相关的OpenCV，QT组件库等等，**如果只是基于Console学习Python入门可以不必安装Pydroid预制库插件和Pydroid权限插件**

* Pydroid权限插件在Pydroid调用额外权限（除基本的文件存取外的）如OpenCV调用摄像头，调用话筒来录音等等，如果不涉及这类操作可以不必安装Pydroid权限插件

* **Pydroid6.2汉化版基于MT默认签名可能在某些平台会报毒** 未来会考虑重新签名

* 如果之前已经安装过5.0汉化版和本站提供的5.0英文版可以直接升级主程序即可（Python版本和插件并未更新），如果之前使用的是其他来源版本要卸载重装（一定要卸载掉主程序和插件不然签名冲突）

### Pydroid是什么:

Pydroid是安卓生态下的Python集成开发环境，基于Python3.9.x；内置GCC编译器可以自己构建whl(轮子)库；内置pip包管理器；以及一个预构建的whl常用框架集，包括tensorflow, opencv， pyQT5等等

### 视频讲解:

### 下载地址

[Pydroid6.2主程序](https://lz.qaiu.top/lz/iaQi10u4j2md)
[Pydroid预制库插件](https://lz.qaiu.top/lz/iKrRr0tvlsgb)
[Pydroid权限插件](https://lz.qaiu.top/lz/izE6C0tvlsej)

### 安装指南

* 分别下载三个Apk安装包，

* 安装主程序两个插件；当然也可以只安装主程序用以简单学习，这时可以忽略后面步骤。

下载依赖：

* -&gt;打开Pydroid

* -&gt;点击左上角菜单(或者屏幕从左往右划)

* -&gt;Pip-&gt;找到最右侧快速安装

* -&gt;随便安装一个库-&gt;这时会提示是否允许启动pydroid-xxx(允许)和是否允许访问文件系统(允许)

* -&gt;这时候假如你能**科学上网**的话可以忽略以下步骤(插件会自动下载Obb预制库依赖)

* -&gt;辅助安装：没有科学上网的话进度会一直卡在0% 这时候把Pydroid强制关掉，将如下辅助代码复制到Pydroid编辑器里运行(如果没啥报错基本上就OK了)：

# Pydroid辅助安装脚本，需要先在pip的快速安装下安装任意库之后（因为不开VPN会卡0%，强制退出即可）重启pydroid执行本脚本
from urllib.request import urlopen
exec(urlopen(&amp;#39;https://qaiu.top/src/py/install.py&amp;#39;).read())

就算使用VPN安装上了obb依赖（pydroid预制库插件的数据包）建议也要执行一下辅助安装脚本，因为脚本里不光实现了下载obb文件，也升级了pip版本，配置了清华源镜像，最重要的就算安装了keras==2.6这个依赖（不指定这个版本后面TensorFlow安装会出错）

### 总结一下：

* 下载一个主程序和两个插件，主程序直接安装，插件结合自身需求看需不需要安装

* 如果要完整安装需要先下任意一个Pip库(这一步主要是引导插件创建Obb目录)

* 如果能科学上网可以直接安装，否则进度卡0%需要重新启动pydroid使用本站提供的脚本辅助安装