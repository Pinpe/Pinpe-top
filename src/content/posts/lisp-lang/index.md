---
title: 上帝给了我一个全是括号的语言
published: 2025-04-15
description: 为什么 Lisp 称之为 “上帝的编程语言”，因为哪怕现在看来也是极为超前的。
tags: [Lisp, 函数式]
category: 技术与科学
draft: false
---

1957 年，Fortran 诞生了，这是世界上第一个高级语言。

但是不知道是不是巧合，Fortran 诞生仅一年，一个更加新的语言诞生了，这是世界上第二个高级语言，但这个语言越传越玄乎，不仅是麻省理工教学计算机科学的第一个语言，甚至被誉为 “上帝的编程语言”。

在 [GNU 幽默合集](https://link.zhihu.com/?target=https%3A//www.gnu.org/fun/jokes/eternal-flame.en.html)中，刊载了一首诗，以下是一些摘抄和翻译：

>Lisp 的绿意漫过叶片<br>
>分形花朵吐出递归的根<br>
>当雪花裂解成唯一方程<br>
>四字真言刻入永恒<br>
>
>…
>
>诸神通晓所有语言<br>
>却为每片羽毛预留归途<br>
>三十二位的枷锁怎能丈量<br>
>沙粒在 Lisp 中重获自由<br>
>
>万物皆在括号里生长<br>
>别在磁盘寻找创世日志<br>
>当闪电劈开愚昧的字符<br>
>六日神迹闪耀 Lisp 的光泽<br>
>
>是的，上帝也有死线<br>
>所以他写下 ——<br>
>万物归 λ<br>

因此这个语言来头不小，我便虔诚的尝试了一下。

## 选择方言和解释器

Lisp 到现在有 67 年了，必然产生各种各样的方言，每个方言还有很多版本的解释器，因此可以选择的余地非常繁杂：

![](images/index/image.png)

但是目前只有两种比较流行的方言：**Common Lisp** 和 **Scheme**，这篇文章我选择了 **Scheme** 方言，并且选择了 **gauche** 编译器。

>Common Lisp 和 Scheme 有什么不同呢？个人认为，Common Lisp 和 Scheme，就像狮子和家犬。狮子更加强大，难以驯服；家犬更加小巧，容易驯服。而选择哪一种，取决于实际需要。鉴于郝同学只是需要学习一下函数式编程的思想，所以 Scheme 足够了。
>
>—— [函数式编程之 Scheme 入门 | 好好学习的郝](https://www.voidking.com/dev-scheme-start/)

## 万物皆函数

在 Lisp 中，每个东西都是**函数**，都是有返回值的**表达式**，而单个函数被括号包围，这叫做**原子**。

例如，想要计算 1+1 等于几，要这么写：

```scheme
(+ 1 1)
```

其中，`+` 是要将参数输入进去的函数，两个 `1` 就是参数，整个函数被括号包围。

## 函数式编程

我之前尝试过 Haskell，函数式编程大概可以总结成这样：

- 变量**不可变**。
- 使用**递归**代替循环。
- 函数不得有**副作用**。
- 函数除了**参数**，不得被其它因素干扰输出。

真不知道这种情况下还怎么做项目，毕竟太麻烦了，可能是给计算机科学家看的吧（？

但是谢天谢地的是，Lisp 没有 Haskell 做的那么严格，比如 `(do)` 函数同样可以实现循环，`(set!)` 函数也可以强制改变变量值。

但这不属于最佳实践，因此在这篇文章中还是会尽量选择函数式编程的写法。

## 真正的解释型语言

通常解释性语言都会在运行前做一遍预检查，如果出现明显的语法错误或命名错误，都会直接抛出异常。

但这个语言不会做这种预检查，只会检查正在运行的一行，所以我觉得 Lisp 更像解释型语言。

## 极为超前，像来自未来

看到这里，我感觉 Lisp 更像是现代的语言，而不是来自 1958 年，看看 Lisp 实现了什么：

- 世界上**第一个**解释型语言。
- 弱化数据类型，并且**完全隐藏底层**。
- 提倡**函数式编程**。
- 支持**高级函数用法**。（递归、隐式函数）
- **all in one** 思想。
- 等等...

我有些明白了，为什么 Lisp 称之为 “上帝的编程语言”，因为哪怕现在看来也是极为超前的。

## 代码示例

我编写了一个代码示例，里面用到了 Lisp 的很多特性和功能，但为了有更好的可读性，括号的格式化仿照了 C 系风格：

```scheme
(define (star-line currently target)
    (cond ((< currently target)
            (display "*")
            (star-line (+ currently 1) target)
        )(else
            (newline)
        )
    )
)
 
(define (star currently target)
    (cond ((< currently target)
            (star-line 0 target)
            (star (+ currently 1) target)
        )
    )
)
 
(display "你叫什么名字：")
(define name (read-line))
(display (string-append "你好，" name))
(newline)
(display "你想要几颗星：")
(define input (read-line))
(define num (string->number input))
(if (and (integer? num) (> num 0))
    (star 0 num)
    (display "输入的不是有效数字")
)
```