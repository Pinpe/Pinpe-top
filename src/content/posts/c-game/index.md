---
title: 使用 C 语言制作文字游戏
published: 2023-07-05
description: 这篇文章会教你使用 C 语言写一个最简单的文字游戏，可能需要其它高级语言基础。
tags: [C语言, 游戏]
category: 技术与科学
---

C 语言是世界上运行速度最快的高级语言，但缺点是过于繁琐而且贴近底层，导致门槛很高。

这篇文章会教你使用 C 语言写一个最简单的文字游戏，可能需要其它高级语言基础。

## 初始化

首先需要导入两个库，`stdio` 和 `string`，后面会用到。

使用 `include` 语句导入库。

```c
#include<stdio.h>
#include<string.h>
```

然后，定义一个空的字符串变量，用来接应输入。

```c
#include<stdio.h>
#include<string.h>
char select[0]={};
```

最后，再写一个 `main` 函数作为实际运行的地方，初始化完成。

```c
#include<stdio.h>
#include<string.h>
char select[0]={};
int main(){
    //程序在这里运行
}
```

## 输入与输出

文字游戏是离不开文字的，使用 `stdio` 的 `printf` 函数可以打印文字。

```c
#include<stdio.h>
#include<string.h>
char select[0]={};
int main(){
    printf("这里是文字游戏测试\n");
}
```

其中的 `\n` 是转义符，可以使下一段文字换行。

如果有输出，还需要有输入，`scanf` 函数可以获取键盘输入，并存放在一个变量中。

在 scanf 输入任何字符后，都会执行下一条语句，**需要注意的是，只输入空白会没有任何反应**。

```c
#include<stdio.h>
#include<string.h>
char select[0]={};
int main(){
    printf("这里是文字游戏测试\n");
    scanf("%s",&select);
    printf("你可以输入任意字符继续，除了空白\n");
    scanf("%s",&select);
    printf("现在，请选择\n");
}
```

## 循环与判断

文字游戏要有互动，玩家可以自由地选择如何行动，实现这种功能需要判断。

判断语句有：`if`、`else if`、`else` 等。

C 语言的字符串无法直接使用运算符比较，需要使用 `string` 的 `!strcmp` 函数。

```c
#include<stdio.h>
#include<string.h>
char select[0]={};
int main(){
    printf("这里是文字游戏测试\n");
    scanf("%s",&select);
    printf("你可以输入任意字符继续，除了空白\n");
    scanf("%s",&select);
    printf("现在，请选择\n");
    printf(">A<一个选项\n");
    printf(">B<另一个选项\n");
    scanf("%s",&select);
    if(!strcmp(select,"A")){
        printf("这里将显示A的剧情\n");
        return 0;
    }else if(!strcmp(select,"B")){
        printf("这里将显示B的剧情\n");
        return 0;
    }else{
        printf("无效输入\n");
    }
}
```

但是这样会出现一个问题，如果玩家输入了 A 与 B 以外的字符，游戏告知 “无效输入” 后就自动退出了，可以使用循环语句 `while` 等避免这种情况。

```c
#include<stdio.h>
#include<string.h>
char select[0]={};
int main(){
    printf("这里是文字游戏测试\n");
    scanf("%s",&select);
    printf("你可以输入任意字符继续，除了空白\n");
    scanf("%s",&select);
    printf("现在，请选择\n");
    while(1){
        printf(">A<一个选项\n");
        printf(">B<另一个选项\n");
        scanf("%s",&select);
    	if(!strcmp(select,"A")){
	        printf("这里将显示A的剧情\n");
	        return 0;
        }else if(!strcmp(select,"B")){
	        printf("这里将显示B的剧情\n");
	        return 0;
    	}else{
	        printf("无效输入\n");
	    }
    }
}
```

## 完成

至此，全程序完成。