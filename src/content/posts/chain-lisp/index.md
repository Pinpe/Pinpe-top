---
title: 我写了一个可能会让人抓狂的编程语言
published: 2026-01-17
description: 我一直想写个足够异类的编程语言，如同外星语言一样，用这个语言实现一些东西也足够有挑战。
tags: [函数式, Lisp, 链]
category: 技术与科学
draft: false
---

## 介绍

我一直想写个足够异类的编程语言，如同外星语言一样，用这个语言实现一些东西也足够有挑战。

经过了一段时间的潜意识思考，我端出来了——ChainLisp（チェーンリスプ），顾名思义，是一个Lisp方言，深受函数式编程和Lisp的影响，通过**链**而不是**从上到下**来实现程序流程。

因此，只要代码稍微复杂一点，你将得到无尽的括号地狱，甚至很难分析代码结构，可能都看不懂自己写的啥了。

## 从最基础开始

### 数据类型

首先，来了解这个语言的数据类型，用于表达字面量：

|名称|含义|示例|
|-|-|-|
|num|所有整数和小数|`3` `3.14` `-2.8` |
|str|字符串（或单个字符），用单引号或双引号括起来|`"Hello"` `'你好'`|
|bol|布尔值|`#t`（真）`#f`（假）|
|nul|空值|`#n`|

只有唯一的复合类型：列表。

### 列表

它使用方括号括起来，用空格（或换行）区分里面的数据（字符串里的空格例外），例如：

```
[1234 3.14 #n "Hello けん"]
```

最后的解析结果为：

- 1234（num）
- 3.14（num）
- nul
- Hello けん（str）

### 函数和链

除了字面量，一切都是函数。

函数的语法都遵循着一个S表达式变体，分为三段式（或两段式），同样用空格（或换行）区分里面的数据（字符串里的空格例外）：

```
(echo "Hello world" #n)
```

- `echo`： 调用`echo`函数。
- `"hello world"`： 给函数的参数。
- `#n`： 下一个需要运行的函数或返回值，但这是nul，意味着下一个没有函数，且这个函数返回的是nul。

如果想要执行多个函数，你不能怎么写：

```
(echo "Hello " #n)
(echo "world" #n)
```

否则仍然只执行了第一个函数，正确写法是这样的：

```
(echo "Hello " (echo "world" #n))
```

因为只有正确的嵌套，解释器执行第一个函数后，才知道下一个函数在哪里。

但是有很多函数需要提供2个或以上的参数，我们就需要使用列表来传递：

```
(echo (add [3 2]) #n)
```

我们解析其中的`add`函数：

- `add`： 调用`add`函数。
- `[3 2]`：给函数3和2这两个数字。
- 注意，这里没有使用nul作为返回值，因为我们需要这个函数返回计算结果，如果写上返回值将被覆盖掉。

:::tip
当然，如果某个函数的返回值不重要，你也可以不写nul，比如`echo`就可以不用写返回值，只需要副作用。
:::

如果需要调用没有返回值的函数，不能用nul作为参数，而是空列表占位：

```
(exit [] #n)
```

因为nul是有语义的，代表“这个东西虽然有，但目前是空的”，而空列表代表“什么都没有”。

### 局部返回值和程序返回值

每个函数都有一个返回值，如前文所述，返回值写在函数的最后一段。

也就是说，实际上“下一个函数”只是一个返回值罢了，只是被执行了。

如果不写返回值，那么就会返回函数原本的返回值，例如正确写法`(add [2 3])`，如果写成`(add [2 3] 4)`的话，无论2+3多少，都会返回4，因为你显式指定了4为返回值。

还有一个情况是，如果函数外层没有需要返回的东西了，一个优秀的解释器会输出这个最后的返回值（程序返回值），并且退出程序，这意味着最简单的Hello world只需要一个字符串：

```
"Hello world"
```

输出（返回）为：

```
此程序的返回值："Hello world"
```

## 函数库大全

以下是这个语言的所有标准函数，足够实现一些功能了。

:::important
带 `(to_xxx)` 的都是仅限定特定类型，此外 `(to_xxx/xxx/...)` 代表限定多种类型，但这只是为了好写些，程序里不能怎么用。
:::

### 类型

|名称|参数|返回值|解释|
|-|-|-|-|
|type|a|(to_str b)|判断a的类型，返回他的类型b|
|to_str|a|(to_str a)|将a转换为字符串|
|to_num|a|(to_num a)|将a转换为数字（#t为1，#f为0）|
|to_bol|a|(to_bol a)|将非0的a转换为#t，反之为#f|
|to_list|a|[...]|将数字和布尔转为列表，但字符串需要将一个个字符隔开|

### 运算

|名称|参数|返回值|解释|
|-|-|-|-|
|add|[(to_num a) (to_num b)]|(to_num x)|x=a+b|
|sub|[(to_num a) (to_num b)]|(to_num x)|x=a-b|
|mul|[(to_num a) (to_num b)]|(to_num x)|x=a*b|
|div|[(to_num a) (to_num b)]|(to_num x)|x=a/b|
|mod|[(to_num a) (to_num b)]|(to_num x)|x=a//b（取余）|
|and|[(to_bol a) (to_bol b)]|(to_bol x)|x=a&&b（表达式也可以传入）|
|or|[(to_bol a) (to_bol b)]|(to_bol x)|x=a\|\|b（表达式也可以传入）|
|not|(to_bol a)|(to_bol b)|当a表达式为#t时，返回#f，反之|
|eq|[a b]|(to_bol x)|判断数字、布尔、字符串是否相等，相等返回#t，反之#f|
|gt|[(to_sum a) (to_sum b)]|(to_bol x)|x=a>b|
|lt|[(to_sum a) (to_sum b)]|(to_bol x)|x=a<b|

### I/O

|名称|参数|返回值|解释|
|-|-|-|-|
|echo|a|a|在标准输出打印a，同时返回a|
|getchar|[]|(to_str a)|获取标准输入的一个字符a，获取完成后返回a|

### 程序流程

|名称|参数|返回值|解释|
|-|-|-|-|
|if|[x a b]|(or [a b])|当x为#t时，返回a，否则返回b|
|define|(n [...] a)|#n|定义函数或变量，n为函数/变量名称，列表为参数（变量就空着），a为函数体或字面量，需要注意如果没有显式制定返回值，会返回字面量或函数体|
|comments|(to_str a)|(to_str a)|程序注释，必须传入字符串，也会返回注释的字符串|
|exit|[]|#n|退出程序|

### 列表和字符串

|名称|参数|返回值|解释|
|-|-|-|-|
|len|(to_str/list a)|(to_num)|返回字符串或列表的长度|
|get|[(to_str/list a) (to_num b)]|x|返回字符串/列表a的第b个元素|
|append|[(to_str/list a) b]|(to_str/list x)|将b添加进列表/字符串最后一位，返回新列表/字符串x|
|remove|[(to_str/list a) b]|(to_str/list x)|删除列表/字符串其中的b，返回新列表/字符串x|
|slice|[(to_str/list n) (to_num a) (to_num b)]|(to_str/list x)|返回列表n的从索引a到索引b的切片|

### 字符

|名称|参数|返回值|解释|
|-|-|-|-|
|to_code|(to_str a)|(to_num b)|将单个字符a转换为ascii码的b|
|to_char|(to_num a)|(to_str b)|将ascii码的a转换为单个字符b|

### 语法糖

为了避免嵌套过多，使用`process`函数可以将从**链**执行变为**从上到下**顺序执行，这是一个语法糖。

使用方法如下：

```
(process [
    (函数1)
    (函数2)
    (函数3)
] 执行完成的返回值)
```

首先会执行函数1，然后是函数2，然后是函数3，最后就执行链中下一个函数或直接返回。

## 示例

需要注意的是，因为这个语言实在是太难分析，我也不知道以下示例是否正确。

### Hello world

```
"Hello world"
```

或

```
(echo "Hello world" #n)
```

### 打印三角形程序

```
(comments "打印三角形程序"
(define (main [index target]
    (if [(eq [index target])
        (echo "\n"
        (define (target [] (sub [target 1]))
        (define (index [] 0) 
        (if [(eq [target 0])
            (exit [] #n) 
            (main [index target] #n)]))))
        (echo "*"
        (define (index [] (add [index 1]))
        (main [index target] #n)))]))
(main [0 10])))
```

### 奇偶数判断

```
(comments "奇偶数判断"
(define (main input
    (if [(eq (mod [input 2]) 0)
        (echo "偶数")
        (echo "奇数")]
        (main (getchar []) #n)))
    (main (getchar []) #n)))
```

### process示例

```
(process [
    (define (var1 [] 1))
    (define (var2 [] 2))
    (echo (add [var1 var2])) (comments "输出3")
    (define (var2 [] 4))
    (echo (add [var1 var2])) (comments "输出5")
] (echo "结束" #n))
```