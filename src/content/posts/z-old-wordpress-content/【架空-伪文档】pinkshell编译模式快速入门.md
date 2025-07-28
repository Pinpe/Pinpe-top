---
title: 【架空/伪文档】PinkShell编译模式快速入门
published: 2023-09-01
category: '其它'
---

### 第零章：为什么选择PinkShell？

**PinkShell**是由**Exquisite开发**的**面向对象的Shell和编程语言**，**具有Shell和编译两种独立模式**，本文档是编译模式的教程。

PinkShell的一些特点：

* 跨平台：**Pink OS**、**Windows**、**Liunx**、**Mac OS**等操作系统都能兼容PinkShell。

* 系统支持：**Pink OS自带PinkShell环境**，此系统的GUI程序和系统软件都是使用PinkShell开发的。

* 运行效率高：PinkShell的峰值运行效率仅次于C语言。

* 快速部署：PinkShell可以直接生成可执行文件，如C语言一样便捷。

### 第一章：环境配置

此文档假设以下条件：

操作系统版本Pink OS 17.7.0PinkShell版本8.2.0

**PinkShell文件的后缀名是.sh**，在某个目录创建一个名为Hello.sh，然后使用文本编辑器打开。

### 第二章：基础声明

如果这个文件是编译模式的程序，需要在开头加入这样的声明：

$ mode compile;

否则会以Shell模式运行。

### 第三章：数据类型

**PinkShell严格区分数据类型**，使用错误的数据类型会报错或出现逻辑错误，以下是部分数据类型：

#### 整数

类型范围auto_int无限short_int-32768~32767long_int小于-32,768或大于32,767

#### 浮点数

类型范围auto_float无限short_float2.3E-308~1.7E+308long_float小于2.3E-308或大于1.7E+308

#### 字符串

类型范围auto_str无限short_str0字节~1024字节long_str大于1024字节

#### 特殊类型

类型含义no_type无类型null空

### 第四章：函数

**函数区分数据类型**，如果没有返回值，通常是no_type。

创建和调用函数的语法如下：

defined function &lt;数据类型> &lt;创建的函数名字>(&lt;参数1>,&lt;参数2>...)
    &lt;代码块>;
end
调用的函数名字(&lt;参数1>,&lt;参数2>...);

**PinkShell需要有一个main函数作为程序入口**，不需要额外调用，大概是这样

defined function no_type main()
    &lt;代码块>;
end

### 第五章：输出

**output类中的echo函数可以输出数据**，语法如下：

output.echo(&lt;参数>);

完整的Hello world程序是这样的：

$ mode compile;

defined function no_type main()
    output.echo("Hello world!\n");
end

### 第六章：变量

**变量也区分数据类型**，语法如下：

defined variable &lt;数据类型> &lt;变量名> -> &lt;值>;

以下是一个示例，用于连接字符串：

$ mode compile;

defined function no_type main()
    defined variable auto_str a -> "Hello";
    defined variable auto_str b -> "World";
    output.echo(a .. b .. "\n");
end

### 第七章：输入

**input函数可以获取键盘在终端输入的信息**，可以传达到变量，返回的类型随变量的类型而变化，语法如下：

input(&lt;参数(通常是空的)>);

以下是一个示例，用于获取你的名字：

$ mode compile;

defined function no_type main()
    output.echo("你的名字是什么：");
    defined variable auto_str name -> input();
    output.echo("你好，" .. name .. "\n");
end

### 第八章：判断

**if...elseif...else语句用来进行条件判断**，语法如下：

if (&lt;条件>)
    &lt;代码块>;
elseif (&lt;条件>)
    &lt;代码块>;
else
    &lt;代码块>;
end

这个示例可以判断密码是否正确：

$ mode compile;

defined function no_type main()
    output.echo("请输入密码：");
    defined variable auto_str password -> input();
    if (password == "112233")
        output.echo("密码正确\n");
    else
        output.echo("密码错误\n");
    end
end

### 第九章：循环

**while语句可以循环执行一个代码块**，在没有break的情况不会停止，语法如下：

while
   &lt;代码块>;
end

如果需要达到某种条件跳过循环的情况，可以使用break语句配合判断来实现：

while
    if (&lt;条件>)
        break;
    else
        &lt;代码块>;
    end
end

### 第十章：库

**PinkShell拥有各种好用的库**，如与系统通信的system库，简便制作GUI程序的iris库，数学计算的math库，管理服务器的web库...

导入一个库很简单，只需要在开头加入这样的声明：

$ import "&lt;库名称>";

### 第十一章：实战

这个程序可以循环获取键盘输入，并且判断奇偶数：

$ mode compile;

defined function no_type calc(auto_int parameter)
    if (parameter % 2 == 0)
        output.echo("这是偶数\n");
    else
        output.echo("这是奇数\n");
    end
end

defined function no_type main()
    output.echo("判断奇偶数，输入0退出：\n\n");
    while
        output.echo(">>>");
        defined variable auto_int num -> input();
        if (num == 0)
            break;
        else
            calc(num);
        end
    end
end