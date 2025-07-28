---
title: 使用字典来重构if查询
published: 2025-04-10
category: '技术与科学'
---

### 问题

def func(parameter):
    if parameter == '0001':
        return '小明'
    elif parameter == '0002':
        return '小红'
    elif parameter == '0003':
        return '小马'
    elif parameter == '0004':
        return '晴晴'
    elif parameter == '0005':
        return '纳米'
    else:
        raise NameError('未查询到此人')

重构以上代码，必须保证其功能一致。

### 分析问题

此问题使用了if...elif...else来尝试查询**键值对**数据，不仅低效繁琐，还可读性差，使用**字典**结构就能优雅高效地存放和查询此类数据。

另外，数据与逻辑要区分开，这样逻辑就能更方便地统一处理，数据也能统一修改。

对于根据键获取值的方式，可以使用索引，也可以使用get()方法，但使用get()方法更加简洁些。

### 重构

先将数据转到字典：

def func(parameter):
    **base = {**
        **'0001': '小明',**
        **'0002': '小红',**
        **'0003': '小马',**
        **'0004': '晴晴',**
        **'0005': '纳米'**
    **}**

然后编写查询逻辑，只需要3行：

def func(parameter):
    base = {
        '0001': '小明',
        '0002': '小红',
        '0003': '小马',
        '0004': '晴晴',
        '0005': '纳米'
    }
    **if name := base.get(parameter):**
        **return name**
    **raise NameError('未查询到此人')**

需要注意的是，这里使用了:=运算符，既能赋值又可以条件判断，非常地好用。（赞赏）