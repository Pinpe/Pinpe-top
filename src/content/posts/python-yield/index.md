---
title: 函数可以结束，但也可以暂停：Python的yield
published: 2026-10-28
description: yield与return不同的一点是：一个可以暂停和保存状态，一个只能结束。
tags: [基础, 技术, 函数]
category: 技术与科学
draft: false
---

## 问题

以下是一个函数，其中`var` 和 `for` 遍历是无法修改和引用的：

```py
def func() -> str:
    var: list = ['apple', 'fuji', 'python']  # 本行禁止修改和引用
    for i in var:  # 本行禁止修改和引用
        return i
```

我们需要遍历这个函数，需要有如下输出：

```
apple
fuji
python
```

因为函数 `return` 后是无法储存状态的，这导致遍历无法优雅地写出来。

## 使用yield

那么该怎么办呢？仅仅需要将 `return` 换成 `yield` 即可解决，然后直接遍历这个函数，对于核心本身没有修改：

```py
def func():
    var: list = ['apple', 'fuji', 'python']
    for i in var:
        yield i

if __name__ == '__main__':
    for i in func():
        print(i)
```

这个函数的底层性质也不同了，现在它是个**生成器函数**。

生成器函数是一种可以暂停和恢复执行的函数。它不会一次性算完所有结果，而是每次产出一个值后就暂停，暂停时函数的状态会被保存，等下次被调用时再从暂停处继续，这个暂停处就是 `yield`。

如果 `return` 是结束/停止，那么 `yield` 就是暂停。

## 手动迭代生成器函数

如果不想用 `for` 遍历，还可以用 `next()` 内置函数手动迭代它：

```py
def func():
    var: list = ['apple', 'fuji', 'python']
    for i in var:
        yield i

if __name__ == '__main__':
    func_obj = func()
    print(next(func_obj))
    print(next(func_obj))
    print(next(func_obj))
```

:::tip[等等！为什么需要将函数存储在一个变量中？]
这个函数本身不会存储状态，因此会返回一个带有它的状态的对象，这个对象才是我们真正调用的。

而 `next()` 仅接受这种对象，因此我们必须要先“初始化”才行。
:::

当迭代到无法再迭代时，会发出 `StopIteration` 信号，这也许会被处理成报错。`for` 遍历则会自动结束。

## 生成器函数的类型注解

如果你的注意力惊人（？），可以注意到我没有给这个函数写返回值的类型注解。

因为生成器函数的类型注解在原版是没有的，但如果真的要使用，可以用 `typing` 库来加上：

```py
from typing import Iterator

def func() -> Iterator[str]:
    var: list = ['apple', 'fuji', 'python']
    for i in var:
        yield i

if __name__ == '__main__':
    for i in func():
        print(i)
```