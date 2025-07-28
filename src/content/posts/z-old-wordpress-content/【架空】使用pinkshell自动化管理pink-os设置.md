---
title: 【架空】使用PinkShell自动化管理Pink OS设置
published: 2024-08-24
category: '其它'
---

Pink OS与PinkShell高度集成，甚至应用层就是使用PinkShell编写的，**因此PinkShell就成为了Pink OS的官方脚本语言**。

此教程会教你**使用PinkShell自动化管理Pink OS设置**，例如根据时间自动调整暗色模式、自动屏蔽所有通知、甚至可以制作一个简单的提醒软件。

但在此之前，需要复习一下PinkShell的基础语法：[【架空/伪文档】PinkShell编译模式快速入门](http://blog.pinpe.top/1136/)。

### Setting API

**Setting API**就是实现这些需求的利器，而且是内置库，也无需额外下载，目前只支持Pink OS。

#### 查看设置

目前，有两种方法可以查看设置的值。

##### 变量式

语法：

setting_api.&lt;第一大类&gt;.&lt;第二大类&gt;.&lt;...&gt;.&lt;选项名称&gt;

例如，我想要查看显示&gt;HUD&gt;个性化&gt;配色&gt;暗色模式的值，需要这么写：

setting_api.display.hud.personalize.color.dark

但这样还不够，还要套一个输出才能看到文字：

output.echo(setting_api.display.hud.personalize.color.dark);

完整的代码如下：

$ mode compile;
$ import "setting_api";

defined function auto_int main() do
    output.echo(setting_api.display.hud.personalize.color.dark);
end

##### 函数式

语法：

setting_api.&lt;第一大类&gt;.&lt;第二大类&gt;.&lt;...&gt;.&lt;选项名称&gt;()

使用方法与变量式差不多，这里一笔带过：

output.echo(setting_api.display.hud.personalize.color.dark());

#### 修改设置

修改设置的值也有两种方法，对，还是那两个。

##### 变量式

语法：

setting_api.&lt;第一大类&gt;.&lt;第二大类&gt;.&lt;...&gt;.&lt;选项名称&gt; -&gt; &lt;修改后的值&gt;;

例如，我想要修改暗色模式的值为True，需要这么写：

setting_api.display.hud.personalize.color.dark -&gt; True;

完整的代码如下：

$ mode compile;
$ generate "/bin";  //记住这个声明，以后要考
$ import "setting_api";

defined function auto_int main() do
    setting_api.display.hud.personalize.color.dark -&gt; True;
end

##### 函数式

语法：

setting_api.&lt;第一大类&gt;.&lt;第二大类&gt;.&lt;...&gt;.&lt;选项名称&gt;(&lt;修改后的值&gt;);

同样的，我想要修改暗色模式的值为True，需要这么写：

setting_api.display.hud.personalize.color.dark(True);

完整的代码如下：

$ mode compile;
$ generate "/bin";
$ import "setting_api";

defined function auto_int main() do
    setting_api.display.hud.personalize.color.dark(True);
end

### 实例：自动调整暗色模式

#### 要求

下午6点自动设定暗色模式，上午5点关闭暗色模式。

#### 思路

通过system获取系统时间，然后根据情况使用Setting API进行修改。

#### 实现

$ mode compile;
$ generate "/bin";
$ import "setting_api";
$ import "system";

defined function auto_int main() do
    if (system.time.hour() &gt;= 18 or system.time.hour() &lt;= 4) then
        setting_api.display.hud.personalize.color.dark -&gt; True;
    else then
        setting_api.display.hud.personalize.color.dark -&gt; False;
    end
end

每小时和重启后触发一次。

### 实例：提醒软件

#### 要求

下午3点弹出窗口，提醒我与*Kosu*在咖啡厅面谈。

#### 思路

通过system获取系统时间，判断后使用iris弹出窗口。

#### 实现

$ mode compile;
$ generate "/bin";
$ import "setting_api";
$ import "system";
$ import "iris" ;

defined function auto_int main() do
    if (system.time.hour() == 15) then
        iris.add.window(name -> "tip", title -> "clock", location -> "center", height -> 60, width -> 60, units -> "px");
        iris.tip.add.text(content -> "你与Kosu有约，请立即前往咖啡厅！", color -> "#ff0000", size -> 20, units -> "px");
    end
end

每小时和重启后触发一次。

### 启动你的脚本

想使用你编写的脚本，**请先把代码编译为可执行文件，哪怕无法直接运行**。

然后打开设置>系统>服务>自动控制>创建任务，上传可执行文件。

随后设置触发器，可以根据自己的情况设置，常见的触发器为**小时、天、月、年**。

**注意：**

不要在脚本里写死循环，否则两分钟后会被系统强制杀死。