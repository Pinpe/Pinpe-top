---
title: 终端控制代码 (ANSI/VT100) Terminal Codes 简介 (转载翻译)
published: 2024-09-13
category: '技术与科学'
---

翻译者：[NAzi_1911](https://blog.csdn.net/NAzi_1911?type=blog)原文：[https://wiki.bash-hackers.org/scripting/terminalcodes](https://wiki.bash-hackers.org/scripting/terminalcodes)

### 终端控制代码 (ANSI/VT100) 简介

终端 (控制) 代码是用来控制终端的特殊命令，它可以改变颜色和光标的位置，实现那些无法被程序本身完成的操作。

### 实现原理

‎终端控制代码是被打印的特殊字符序列（与正常被打印的文本一样）。如果是可被终端解析的代码，则会直接执行操作而不会被打印出来。你可以使用 echo 命令来测试终端控制代码。‎

*注意：这些控制代码有时被说成是 “Bash 颜色” (某些 “Bash 教程” 如是称呼)，我觉得这是完全错误的定义。*

### tput 命令

‎由于存在大量不同的终端控制语言，因此系统中通常存在中间通信层。真正的控制代码在库中‎‎检索当前的终端命令类型‎‎，然后由你来提供相应的 API 或者 命令 (在 Shell 中时) 进行标准化处理请求。（*译者注：大体的意思应该是将不同的终端控制指令通过一些 API 或者 专有命令 转换为标准的终端控制指令后再处理）‎*

tput 命令就是其中之一。它可以通过一组缩略命令 (包含功能名称和参数)，然后比对库中当前命令的数据进而打印正确的控制代码 (终端可以解析的)。

### 控制代码

‎在下表中，我将重点讨论 ANSI/VT100 控制代码的常见操作，并围绕于此进行讲解。如果遇到不明白的，可以参考你所使用的终端或标准化指令的文档。这里介绍的 tput 命令就是一种常用的标准化指令。

‎我仅列出了最常用的控制代码，但所有的 ANSI 终端都可解析更多指令。在此，我们仅讨论常用的 Shell 脚本‎。

‎如果没有合适的 ANSI 转义符，将用?代替。

ANSI 控制符都以 ESC 为起始 (ASCII 编码 0x1B 或 八进制表示为 033)，表格中并未列出此控制符，但应避免直接使用 ANSI 控制符，应当使用 tput 命令。

所有可被 tput 命令替代的控制符都可在 terminfo 中找到，请查看 OpenBSD 中功能 (Capabilities) 章节中的 terminfo，其中包含各 tput 命令的名称及描述。

### 常用 ASCII 控制符

‎Ctrl ‎表示法通过 ASCII 可见字符来表示 ASCII 编码中的不可见字符，将 ‎‎ASCII‎‎ 代码 1 与 ‎‎ASCII‎‎ 代码 65（“A”）关联在一起。‎‎ASCII‎‎ 代码 1 用 Ctrl-A 表示，而‎‎ ASCII‎‎ 代码 7 （BEL） 表示为 Ctrl-G。这是一个常见的表示（和输入）方法，历史上源于 VT 系列终端。‎

名称十进制八进制十六进制C 转义符Ctrl 表示描述BEL70070x07\a^G终端警告声BS80100x08\b^H退格HT90110x09\t^I水平 TABLF100120x0A\n^J新行VT110130x0B\v^K垂直 TABFF120140x0C\f^L新页面CR130150x0D\r^M回车ESC270330x1B无^[ESC 符DEL1271770x7F无无删除符 

### 光标控制

ANSIterminfo 等式描述[ &lt;X&gt; ; &lt;Y&gt; H[ &lt;X&gt; ; &lt;Y&gt; fcup &lt;X&gt; &lt;Y&gt;设置原点坐标好像 ANSI 原点为1-1&#xff0c;tput 原点为 0-0[ Hhome移动光标到原点7sc保存当前光标位置8rc恢复已保存的光标位置? 类似于 \bcub1向左移动一个位置 (退格)[ ? 25 lcivis光标不可见[ ? 25 hcvvis光标可见 

### 删除文本

ANSIterminfo 等式描述[ K  [ 0 Kel清除从当前位置到本行结尾的字符[ 1 Kel1清除从本行开始到当前位置的字符[ 2 Kel2清除本行所有字符 (光标位置不变) 

### 常用文本属性

ANSIterminfo 等式描述[ 0 msgr0重置所有属性[ 1 mbold粗体[ 2 mdim加深[ 3 msmso突出[ 4 mset smul unset rmul下划线[ 5 mblink闪烁[ 7 mrev倒序[ 8 minvis隐藏 

### 前景色

ANSIterminfo 等式描述[ 3 0 msetaf 0黑色[ 3 1 msetaf 1红色[ 3 2 msetaf 2绿色[ 3 3 msetaf 3黄色[ 3 4 msetaf 4蓝色[ 3 5 msetaf 5品红[ 3 6 msetaf 6青色[ 3 7 msetaf 7白色[ 3 9 msetaf 9重置为默认色 

### 背景色

ANSIterminfo 等式描述[ 4 0 msetab 0黑色[ 4 1 msetab 1红色[ 4 2 msetab 2绿色[ 4 3 msetab 3黄色[ 4 4 msetab 4蓝色[ 4 5 msetab 5品红[ 4 6 msetab 6青色[ 4 7 msetab 7白色[ 4 9 msetab 9重置为默认色 

### 其他控制代码

#### 保存/恢复 屏幕

使用功能：smcup, rmcup

你一定遇到过程序在处理完它们的工作后恢复屏幕的情况 (诸如 vim)。此操作可以通过下面的命令实现：

# 保存并清除屏幕内容
tput smcup
clear

# 进行一些程序操作
read -n1 -p "Press any key to continue..."
# 程序操作到此

# 恢复屏幕内容
tput rmcup

这些功能需要 termcap/terminfo 的支持。由于 xterm 及其衍生软件 ( rxvt, urxvt 等) 都支持这些指令，所以你的操作系统中可能并不会在 xterm 的配置中包含这些参考 (FreeBSD 就是其中之一)。如果 tput smcup 命令没有生效，并且你不想修改 termcap/terminfo 数据，如果你是用的是 xterm 兼用程序，则可以执行以下操作：

echo -e '\033&#91;?47h' # 保存屏幕内容
echo -e '\033&#91;?47l' # 恢复屏幕内容

一些软件也使用这些代码。你可能在 less、vim、top、screen 等命令中见过 **屏幕 保存/恢复** 操作，这些程序可能会提供参数 禁能 此操作。如，less 命令可以使会用 -X 参数禁能此操作。当然，也可以使用环境变量配置：

export LESS=X
less /path/to/file

类似地，vim 也可以配置为不 “恢复” 屏幕，通过添加以下内容到 ~/.vimrc：

set t_ti= t_te=

#### 附加颜色

许多终端模拟器都支持附加颜色，最常用的是 xterm 兼容 的扩展 256 色。同样可以通过 tput 命令 seta{f,b} [0-255] 设置。还有一些终端支持 [24位全彩色](https://gist.github.com/XVilka/8346728#now-supporting-truecolour)，所有的 X11 颜色都可以直接通过特殊的控制编码序列表示出来 ([详情](https://gist.github.com/XVilka/8346728))。只有少数程序用到 256 色以外的颜色，tput 并不支持这些颜色。16 色以上的也仅仅在图形界面中的现代终端模拟器中有所使用。

Linux 内核中的虚拟终端仅支持 16 色，且 terminfo 中默认的入口 TERM=linux 仅定义了 8 色。有时可以使用 linux-16color 切换使用另外 8 种颜色。

### Bash 示例

#### 硬编码颜色

printf '%b\n' 'It is \033&#91;31mnot\033&#91;39m intelligent to use \033&#91;32mhardcoded ANSI\033&#91;39m codes!'

#### tput 方式

##### 直接使用 echo:

echo "TPUT is a $(tput setaf 2)nice$(tput setaf 9) and $(tput setaf 5)user friendly$(tput setaf 9) terminal capability database."

##### 使用预设变量:

COL_NORM="$(tput setaf 9)"
COL_RED="$(tput setaf 1)"
COL_GREEN="$(tput setaf 2)"
echo "It's ${COL_RED}red${COL_NORM} and ${COL_GREEN}green${COL_NORM} - have you seen?"