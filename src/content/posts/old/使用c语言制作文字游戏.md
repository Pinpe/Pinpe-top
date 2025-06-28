---
title: 使用C语言制作文字游戏
published: 2023-06-18
category: '技术与科学'
---

C语言是世界上运行速度最快的高级语言，但缺点是过于繁琐而且贴近底层，导致门槛很高。

这篇文章会教你使用C语言写一个最简单的文字游戏，可能需要其它高级语言基础。

### 初始化

首先需要导入两个库，stdio和string，后面会用到。

使用include语句导入库。

#include&lt;stdio.h&gt;
#include&lt;string.h&gt;

然后，定义一个空的字符串变量，用来接应输入。

#include&lt;stdio.h&gt;
#include&lt;string.h&gt;
char select&#91;0]={};

最后，再写一个main函数作为实际运行的地方，初始化完成。

#include&lt;stdio.h&gt;
#include&lt;string.h&gt;
char select&#91;0]={};
int main(){
    //程序在这里运行
}

### 输入与输出

文字游戏是离不开文字的，使用stdio的printf函数可以打印文字。

#include&lt;stdio.h&gt;
#include&lt;string.h&gt;
char select&#91;0]={};
int main(){
    printf("这里是文字游戏测试\n");
}

其中的\n是转义符，可以使下一段文字换行。

如果有输出，还需要有输入，scanf函数可以获取键盘输入，并存放在一个变量中。

在scanf输入任何字符后，都会执行下一条语句，**需要注意的是，只输入空白会没有任何反应**。

#include&lt;stdio.h&gt;
#include&lt;string.h&gt;
char select&#91;0]={};
int main(){
    printf("这里是文字游戏测试\n");
    scanf("%s",&amp;select);
    printf("你可以输入任意字符继续，除了空白\n");
    scanf("%s",&amp;select);
    printf("现在，请选择\n");}

### 循环与判断

文字游戏要有互动，玩家可以自由地选择如何行动，实现这种功能需要判断。

判断语句有：if、else if、else等。

**C语言的字符串无法直接使用运算符比较**，需要使用string的!strcmp函数。

#include&lt;stdio.h&gt;
#include&lt;string.h&gt;
char select&#91;0]={};
int main(){
    printf("这里是文字游戏测试\n");
    scanf("%s",&amp;select);
    printf("你可以输入任意字符继续，除了空白\n");
    scanf("%s",&amp;select);
    printf("现在，请选择\n");
    printf("&gt;A&lt;一个选项\n");
    printf("&gt;B&lt;另一个选项\n");
    scanf("%s",&amp;select);
    if(!strcmp(select,"A")){
        printf("这里将显示A的剧情\n");
        return 0;
    }else if(!strcmp(select,"B")){
        printf("这里将显示B的剧情\n");
        return 0;
    }else{
        printf("无效输入\n");
    }}

但是这样会出现一个问题，如果玩家输入了A与B以外的字符，游戏告知“无效输入”后就自动退出了，可以使用循环语句while等避免这种情况。

#include&lt;stdio.h>
#include&lt;string.h>
char select&#91;0]={};
int main(){
    printf("这里是文字游戏测试\n");
    scanf("%s",&amp;select);
    printf("你可以输入任意字符继续，除了空白\n");
    scanf("%s",&amp;select);
    printf("现在，请选择\n");
    while(1){
        printf(">A&lt;一个选项\n");
        printf(">B&lt;另一个选项\n");
        scanf("%s",&amp;select);
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

### 完成

至此，全程序完成。