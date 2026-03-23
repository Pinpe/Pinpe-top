---
title: 终端控制代码 (ANSI/VT100) Terminal Codes 简介 (转载翻译)
published: 2024-09-13
category: 技术与科学
tags: [终端, 转载, ANSI]
description: 终端控制代码是用来控制终端的特殊命令，它可以改变颜色和光标的位置，实现那些无法被程序本身完成的操作。
---

翻译者：NAzi_1911

原文：https://wiki.bash-hackers.org/scripting/terminalcodes

## 终端控制代码 (ANSI/VT100) 简介

终端 (控制) 代码是用来控制终端的特殊命令，它可以改变颜色和光标的位置，实现那些无法被程序本身完成的操作。

## 实现原理

终端控制代码是被打印的特殊字符序列（与正常被打印的文本一样）。如果是可被终端解析的代码，则会直接执行操作而不会被打印出来。你可以使用 echo 命令来测试终端控制代码。

注意：这些控制代码有时被说成是 "Bash 颜色" (某些 "Bash 教程" 如是称呼)，我觉得这是完全错误的定义。

## tput 命令

由于存在大量不同的终端控制语言，因此系统中通常存在中间通信层。真正的控制代码在库中检索当前的终端命令类型，然后由你来提供相应的 API 或者 命令 (在 Shell 中时) 进行标准化处理请求。

tput 命令就是其中之一。它可以通过一组缩略命令 (包含功能名称和参数)，然后比对库中当前命令的数据进而打印正确的控制代码 (终端可以解析的)。

## 控制代码

在下表中，我将重点讨论 ANSI/VT100 控制代码的常见操作，并围绕于此进行讲解。如果遇到不明白的，可以参考你所使用的终端或标准化指令的文档。

我仅列出了最常用的控制代码，但所有的 ANSI 终端都可解析更多指令。在此，我们仅讨论常用的 Shell 脚本。

如果没有合适的 ANSI 转义符，将用 ? 代替。

ANSI 控制符都以 ESC 为起始 (ASCII 编码 0x1B 或 八进制表示为 033)，表格中并未列出此控制符，但应避免直接使用 ANSI 控制符，应当使用 tput 命令。

所有可被 tput 命令替代的控制符都可在 terminfo 中找到。

## 常用 ASCII 控制符

| 名称 | 十进制 | 八进制 | 十六进制 | C 转义符 | Ctrl 表示 | 描述 |
|------|--------|--------|----------|----------|-----------|------|
| BEL | 7 | 007 | 0x07 | \a | ^G | 终端警告声 |
| BS | 8 | 010 | 0x08 | \b | ^H | 退格 |
| HT | 9 | 011 | 0x09 | \t | ^I | 水平 TAB |
| LF | 10 | 012 | 0x0A | \n | ^J | 新行 |
| VT | 11 | 013 | 0x0B | \v | ^K | 垂直 TAB |
| FF | 12 | 014 | 0x0C | \f | ^L | 新页面 |
| CR | 13 | 015 | 0x0D | \r | ^M | 回车 |
| ESC | 27 | 033 | 0x1B | 无 | ^[ | ESC 符 |
| DEL | 127 | 177 | 0x7F | 无 | 无 | 删除符 |

## 光标控制

| ANSI | terminfo 等式 | 描述 |
|------|---------------|------|
| [ <X> ; <Y> H | cup <X> <Y> | 设置原点坐标 |
| [ H | home | 移动光标到原点 |
| 7 | sc | 保存当前光标位置 |
| 8 | rc | 恢复已保存的光标位置 |
| ? | \b | cub1 向左移动一个位置 (退格) |
| [ ? 25 l | civis | 光标不可见 |
| [ ? 25 h | cvvis | 光标可见 |

## 删除文本

| ANSI | 描述 |
|------|------|
| [ K / [ 0 K | el 清除从当前位置到本行结尾的字符 |
| [ 1 K | el1 清除从本行开始到当前位置的字符 |
| [ 2 K | el2 清除本行所有字符 (光标位置不变) |

## 常用文本属性

| ANSI | terminfo 等式 | 描述 |
|------|---------------|------|
| [ 0 m | sgr0 | 重置所有属性 |
| [ 1 m | bold | 粗体 |
| [ 2 m | dim | 加深 |
| [ 3 m | smso | 突出 |
| [ 4 m | set | 下划线 |
| [ 5 m | blink | 闪烁 |
| [ 7 m | rev | 倒序 |
| [ 8 m | invis | 隐藏 |

## 前景色

| ANSI | terminfo 等式 | 描述 |
|------|---------------|------|
| [ 3 0 m | setaf 0 | 黑色 |
| [ 3 1 m | setaf 1 | 红色 |
| [ 3 2 m | setaf 2 | 绿色 |
| [ 3 3 m | setaf 3 | 黄色 |
| [ 3 4 m | setaf 4 | 蓝色 |
| [ 3 5 m | setaf 5 | 品红 |
| [ 3 6 m | setaf 6 | 青色 |
| [ 3 7 m | setaf 7 | 白色 |
| [ 3 9 m | setaf 9 | 重置为默认色 |

## 背景色

| ANSI | terminfo 等式 | 描述 |
|------|---------------|------|
| [ 4 0 m | setab 0 | 黑色 |
| [ 4 1 m | setab 1 | 红色 |
| [ 4 2 m | setab 2 | 绿色 |
| [ 4 3 m | setab 3 | 黄色 |
| [ 4 4 m | setab 4 | 蓝色 |
| [ 4 5 m | setab 5 | 品红 |
| [ 4 6 m | setab 6 | 青色 |
| [ 4 7 m | setab 7 | 白色 |
| [ 4 9 m | setab 9 | 重置为默认色 |

## 保存/恢复 屏幕

使用功能：smcup, rmcup

```bash
# 保存并清除屏幕内容
tput smcup
clear

# 进行一些程序操作
read -n1 -p "Press any key to continue..."
# 程序操作到此

# 恢复屏幕内容
tput rmcup
```

这些功能需要 termcap/terminfo 的支持。由于 xterm 及其衍生软件 (rxvt, urxvt 等) 都支持这些指令，所以你的操作系统中可能并不会在 xterm 的配置中包含这些参考。

如果 tput smcup 命令没有生效，可以执行以下操作：

```bash
echo -e "\033[?47h" # 保存屏幕内容
echo -e "\033[?47l" # 恢复屏幕内容
```

## 附加颜色

许多终端模拟器都支持附加颜色，最常用的是 xterm 兼容 的扩展 256 色。同样可以通过 tput 命令 seta{f,b} [0-255] 设置。

还有支持24位全彩色的终端，详情可以参考这里。

## Bash 示例

硬编码颜色：

```bash
printf "%b\n" "It is \033[31mnot\033[39m intelligent to use \033[32mhardcoded ANSI\033[39m codes!"
```

tput 方式：

```bash
echo "TPUT is a $(tput setaf 2)nice$(tput setaf 9) and $(tput setaf 5)user friendly$(tput setaf 9) terminal capability database."
```

使用预设变量：

```bash
COL_NORM="$(tput setaf 9)"
COL_RED="$(tput setaf 1)"
COL_GREEN="$(tput setaf 2)"
echo "It is ${COL_RED}red${COL_NORM} and ${COL_GREEN}green${COL_NORM} - have you seen?"
```