---
title: 使用exec()来重构重复代码
published: 2024-09-11
category: '技术与科学'
---

### 问题

func(bool, a, 'a')
func(bool, b, 'b')
func(bool, c, 'c')
func(bool, d, 'd')
func(int, e, 'e')
func(int, f, 'f')
func(float, g, 'g')

重构以上代码，必须保证其功能一致。

### 初次重构

我们先将代码拆分：

# 第一部分：
func(bool, a, 'a')
func(bool, b, 'b')
func(bool, c, 'c')
func(bool, d, 'd')

# 第二部分：
func(int, e, 'e')
func(int, f, 'f')

# 第三部分：
func(float, g, 'g')

然后分别使用for循环搭配exec()来重构，也可以使用格式化字符串来提升可读性。

# 第一部分：
for i in ('a', 'b', 'c', 'd'):
    exec(f"func(bool, {i}, '{i}')")

# 第二部分：
for i in ('e', 'f'):
    exec(f"func(int, {i}, '{i}')")

# 第三部分：
for i in ('g'):
    exec(f"func(float, {i}, '{i}')")

但是，这样还不是最好的。

### 重构评估

* 第一部分从4行缩减到了2行，是成功的。

* 第二部分行数未变，但是复杂度有所提升，效果就见仁见智了。

* 第三部分从1行增加到了2行，还绕了个弯子，是失败的。

### 最终重构

我们可以取长补短，自己选择部分代码是否重构：

# 第一部分：
for i in ('a', 'b', 'c', 'd'):
    exec(f"func(bool, {i}, '{i}')")

# 第二部分：
func(int, e, 'e')
func(int, f, 'f')

# 第三部分：
func(float, g, 'g')

去掉注释：

for i in ('a', 'b', 'c', 'd'):
    exec(f"func(bool, {i}, '{i}')")
func(int, e, 'e')
func(int, f, 'f')
func(float, g, 'g')