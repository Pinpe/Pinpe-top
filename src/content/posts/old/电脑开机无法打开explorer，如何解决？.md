---
title: 电脑开机无法打开explorer，如何解决？
published: 2025-03-15
category: '技术与科学'
---

最近我的电脑很不老实，开机登录之后只有一个黑屏和鼠标，也不会自动打开自启软件，但是可以使用Ctrl+Shift+ESC打开任务管理器，这说明只是explorer挂了，系统是正常的。

因此我找到了以下解决方案：

### 方案一（我使用的方案）

Ctrl+Shift+ESC打开任务管理器：

![](images/image-6.png)

点击”运行新任务“，输入”cmd“，并勾选”以系统管理权限创建此任务“：

![](images/image-7.png)

在cmd输入以下命令，回车：

start explorer.exe

![](images/image-9.png)

此时就能启动explorer，并且加载桌面和启动自启软件。

### 方案二（如果方案一不起作用，可以尝试此方案，可用性未知）

用上文的方法，用管理员权限打开cmd，输入以下命令：

sfc /scannow

此时系统会自己修复，完成后再次输入：

start explorer.exe

### 为什么这样？

根据很多人反馈，火绒会把explorer纳入隔离区，因此启动完explorer后最好就卸载火绒。

奇怪的是我没有安装火绒，但有一个微软电脑管家，我就卸载那个了，目前还没有出问题。