---
title: 实现Brainfuck解释器
published: 2025-08-18
description: 文章明确Brainfuck规则，做触发器、流程器处理符号与循环，整合成解释器。
tags: [BF, 脑操, 解释器]
category: 技术与科学
draft: false
---

## +.我认为的Brainfuck标准

Brainfuck是目前最著名的Esolang,整个语言只有8个符号，通过操作虚构的、无限的内存，却可以实现图灵完备的效果，以下是符号含义：

|符号|含义|Python伪代码|
|:--|:--|:--|
|+|指针对应的单元格加一|`rom[ptr] += 1`|
|-|指针对应的单元格减一|`rom[ptr] -= 1`|
|<|指针左移一个单元格|`ptr -= 1`|
|>|指针右移一个单元格|`ptr += 1`|
|.|输出指针所在单元格对应的ASCII字符|`print(chr(rom[ptr]))`|
|,|获取键盘输入的一个字符，并且将其转换为数字，赋值给指针所在单元格|`rom[ptr] = ord(getchar())`|
|[|循环，直到指针所在单元格为0|`while rom[ptr]:`|
|]|代码块结束||

如果程序中出现其他符号，将无视。

如果在为255的单元格加一，此单元格会变成0，如果在为0的单元格减一，此单元格会变成255。

如果指针已到达内存最首端（`ptr == 0`），指针左移不会有任何效果。

## ++.创建模拟内存

内存和指针是Brainfuck最重要也是最精华的组成部分，而且构建这个也不难：

- 可以使用有限但非常大的列表来模拟内存，例如有4096项的全是0的列表，名称为`rom`。
- 指针可以使用int存储，用于内存的索引，名称为`rom_ptr`，这样使用`rom[rom_ptr]`就能取值了。

```python
class core:
    rom = [0] * 4096
    rom_ptr = 0
```

## +++.触发器

如果仔细观察，在忽略`[`和`]`的情况下，代码只会线性读取，再加上单字符的特性，连AST都不需要做，只需要使用`for`和`if`就行了，大概结构如下：

```python
class core:
    rom = [0] * 4096
    rom_ptr = 0

    def __init__(self, code):
        code = list(code)  # 将代码字符串拆分成列表
        for val in code:
            if val == '+':
                ...
            elif val == '-':
                ...
            elif val == '>':
                ...
            elif val == '<':
                ...
            elif val == '.':
                ...
            elif val == ',':
                ...
```

先写`+`和`-`，没什么可说的，小学生都能看懂，但要注意单元格上下限：

```python
if val == '+':
    if core.rom[core.rom_ptr] == 255:
        core.rom[core.rom_ptr] = 0
    else:
        core.rom[core.rom_ptr] += 1
elif val == '-':
    if core.rom[core.rom_ptr] == 0:
        core.rom[core.rom_ptr] = 255
    else:
        core.rom[core.rom_ptr] -= 1
```

接下来写`>`和`<`，用于操作指针本身，但要判断指针是否等于0，如果为0的话就不做任何事：

```python
elif val == '>':
    core.rom_ptr += 1
elif val == '<':
    if core.rom_ptr != 0:
        core.rom_ptr -= 1
```

:::note
无需判断指针是否超过4096，因为在标准中内存是无限的，没有末尾，如果实在不行可以扩大内存大小。
:::

然后是`.`输出，我们可以先获取指针指向的内存值，然后使用`chr()`转为ASCII码，最后打印出来，注意关掉换行和缓存：

```python
elif val == '.':
    print(chr(core.rom[core.rom_ptr]), end='', flush=True)
```

最后是`,`输入，这里需要使用第三方库`click`，安装一下：

```
pip install click
```

导入一下：

```python
import click
```

然后就可以用了，可以用`ord()`将字符转化为数字：

```python
elif val == ',':
    core.rom[core.rom_ptr] = ord(click.getchar())
```

我们写完了大部分符号，把上面的代码填充进来，这个模块就叫“触发器”吧，意为触发操作：

```python
import click


class core:
    rom = [0] * 4096
    rom_ptr = 0

    def __init__(self, code):
        code = list(code)
        for val in code:
            if val == '+':
                if core.rom[core.rom_ptr] == 255:
                    core.rom[core.rom_ptr] = 0
                else:
                    core.rom[core.rom_ptr] += 1
            elif val == '-':
                if core.rom[core.rom_ptr] == 0:
                    core.rom[core.rom_ptr] = 255
                else:
                    core.rom[core.rom_ptr] -= 1
            elif val == '>':
                core.rom_ptr += 1
            elif val == '<':
                if core.rom_ptr != 0:
                    core.rom_ptr -= 1
            elif val == '.':
                print(chr(core.rom[core.rom_ptr]), end='', flush=True)
            elif val == ',':
                core.rom[core.rom_ptr] = ord(click.getchar())
```

## ++++.流程器

一切都很好，但是循环呢？

使用`for`只能用于线性顺序，但Brainfuck也不是线性顺序的，因此不能用`for`，因此需要一个模块专门管理这种顺序。

不过不要担心，触发器还有用，但不能站在`__init__`的位置上了：

```python
import click


class core:
    rom = [0] * 4096
    rom_ptr = 0

    def trigger(val):
        if val == '+':
            if core.rom[core.rom_ptr] == 255:
                core.rom[core.rom_ptr] = 0
            else:
                core.rom[core.rom_ptr] += 1
        elif val == '-':
            if core.rom[core.rom_ptr] == 0:
                core.rom[core.rom_ptr] = 255
            else:
                core.rom[core.rom_ptr] -= 1
        elif val == '>':
            core.rom_ptr += 1
        elif val == '<':
            if core.rom_ptr != 0:
                core.rom_ptr -= 1
        elif val == '.':
            print(chr(core.rom[core.rom_ptr]), end='', flush=True)
        elif val == ',':
            core.rom[core.rom_ptr] = ord(click.getchar())

    def __init__(self, code):
        ...
```

首先构建一个基础框架，可以让程序线性跑起来：

```python
def __init__(self, code):
    code_ptr = 0  # 代码指针，用于定位程序的位置（不是内存位置）
    code = list(code)
    while code_ptr < len(code):
        core.trigger(code[code_ptr])  # 提交代码指针获取到的符号给触发器
        code_ptr += 1  # 代码指针加一，就是程序往后运行
```

然后写循环开头`[`的逻辑：

- 使用列表`loop_list`保存循环的多少层，都是哪里开始循环的。
- 如果发现了`[`符号，就在`loop_list`的末尾添加当前的代码指针位置。

```python
def __init__(self, code):
    loop_list = []
    code_ptr = 0 
    code = list(code)
    while code_ptr < len(code):
        if code[code_ptr] == '[':
            loop_list.append(code_ptr)
        else:
            core.trigger(code[code_ptr])
        code_ptr += 1
```

然后写循环结束`]`的逻辑：

- 判断当前内存指针所指向的单元格是否为0，如果是就跳过，并且删除`loop_list`最后一个元素。
- 如果单元格不为0，就根据`loop_list`提供的位置，将代码指针移动到最内圈一个循环开头。

```python
def __init__(self, code):
    loop_list = []
    code_ptr = 0 
    code = list(code)
    while code_ptr < len(code):
        if code[code_ptr] == '[':
            loop_list.append(code_ptr)
        elif code[code_ptr] == ']':
            if core.rom[core.rom_ptr] == 0:
                loop_list.pop()
            else:
                code_ptr = loop_list[-1]
        else:
            core.trigger(code[code_ptr])
        code_ptr += 1
```

别忘了运行完程序的收尾工作！

```python
def __init__(self, code):
    loop_list = []
    code_ptr = 0 
    code = list(code)
    while code_ptr < len(code):
        if code[code_ptr] == '[':
            loop_list.append(code_ptr)
        elif code[code_ptr] == ']':
            if core.rom[core.rom_ptr] == 0:
                loop_list.pop()
            else:
                code_ptr = loop_list[-1]
        else:
            core.trigger(code[code_ptr])
        code_ptr += 1
    core.rom_ptr = 0  # 重置内存指针
    core.rom = [0] * 4096  # 格式化内存
```

此模块叫“流程器”吧！用于处理代码流程。

组合所有代码：

```python
import click


class core:
    rom = [0] * 4096
    rom_ptr = 0

    def trigger(val):
        if val == '+':
            if core.rom[core.rom_ptr] == 255:
                core.rom[core.rom_ptr] = 0
            else:
                core.rom[core.rom_ptr] += 1
        elif val == '-':
            if core.rom[core.rom_ptr] == 0:
                core.rom[core.rom_ptr] = 255
            else:
                core.rom[core.rom_ptr] -= 1
        elif val == '>':
            core.rom_ptr += 1
        elif val == '<':
            if core.rom_ptr != 0:
                core.rom_ptr -= 1
        elif val == '.':
            print(chr(core.rom[core.rom_ptr]), end='', flush=True)
        elif val == ',':
            core.rom[core.rom_ptr] = ord(click.getchar())

    def __init__(self, code):
        loop_list = []
        code_ptr = 0 
        code = list(code)
        while code_ptr < len(code):
            if code[code_ptr] == '[':
                loop_list.append(code_ptr)
            elif code[code_ptr] == ']':
                if core.rom[core.rom_ptr] == 0:
                    loop_list.pop()
                else:
                    code_ptr = loop_list[-1]
            else:
                core.trigger(code[code_ptr])
            code_ptr += 1
        core.rom_ptr = 0
        core.rom = [0] * 4096
```

恭喜！你完成了一个解释器！

## +++++.Pinfuck

在写这篇文章之前，我就释放了Pinfuck，在上文基础上添加了更多功能，比如调试模式、交互式运行、读取文件运行、自由调整内存大小等功能。

```python
import click
import time


'''函数截取列表中末非零元素间的部分（含中间零）'''
def trim(lst):
    # 找到最后一个非零元素的索引
    last_non_zero = None
    for i in range(len(lst)-1, -1, -1):
        if lst[i] != 0:
            last_non_zero = i
            break
    
    # 如果没有非零元素，返回包含3个0的列表
    if last_non_zero is None:
        return [0, 0, 0]
    
    # 只截取到最后一个非零元素（包含），不处理开头
    return lst[:last_non_zero+1]


'''output库兼容工具'''
class clean:
    '清除屏幕'
    def screen():
        print('\033c', end='', flush=True)

class color:
    '文本颜色'
    black = '\033[30m'
    red = '\033[31m'
    green = '\033[32m'
    yellow = '\033[33m'
    blue = '\033[34m'
    magenta = '\033[35m'
    cyan = '\033[36m'
    white = '\033[37m'

'重置颜色设置'
rst = '\033[0m'


'''解释器本体'''
class core:
    '解释器内部公共数据'
    rom_size    = 4096
    rom_ptr     = 0
    rom         = [0] * rom_size
    debug_mode  = False
    output_list = []

    '触发器'
    def trigger(val):
        if val == '+':
            if core.rom[core.rom_ptr] == 255:
                core.rom[core.rom_ptr] = 0
            else:
                core.rom[core.rom_ptr] += 1
        elif val == '-':
            if core.rom[core.rom_ptr] == 0:
                core.rom[core.rom_ptr] = 255
            else:
                core.rom[core.rom_ptr] -= 1
        elif val == '>':
            core.rom_ptr += 1
        elif val == '<':
            if core.rom_ptr != 0:
                core.rom_ptr -= 1
        elif val == '.':
            print(chr(core.rom[core.rom_ptr]), end='', flush=True) if core.debug_mode==False else core.output_list.append(chr(core.rom[core.rom_ptr]))
        elif val == ',':
            core.rom[core.rom_ptr] = ord(click.getchar())

    '调试器'
    def debug(output=None):
        clean.screen()
        tmp_rom = core.rom.copy()
        ptr_cont = tmp_rom[core.rom_ptr]
        tmp_rom[core.rom_ptr] = f'{color.yellow}{ptr_cont}{rst}'
        print('当前内存：', flush=True)
        for i in trim(tmp_rom):
            print(str(i) + ', ', end='', flush=True)
        print('\nIO：', flush=True)
        for i in core.output_list:
            print(i, end='', flush=True)
        time.sleep(0.4)

    '流程器'
    def __init__(self, code):
        loop_list = []
        code_ptr  = 0
        code = list(code)
        while code_ptr < len(code):
            if code[code_ptr] == '[':
                loop_list.append(code_ptr)
            elif code[code_ptr] == ']':
                if core.rom[core.rom_ptr] == 0:
                    loop_list.pop()
                else:
                    code_ptr = loop_list[-1]
            else:
                core.trigger(code[code_ptr])
            code_ptr += 1
            core.debug() if core.debug_mode==True else None
        core.rom_ptr = 0
        core.rom = [0] * core.rom_size


'''主程序'''
if __name__ == '__main__':
    while True:
        clean.screen()
        print(f'''{color.green}
██████╗ ██╗███╗   ██╗███████╗██╗   ██╗ ██████╗██╗  ██╗
██╔══██╗██║████╗  ██║██╔════╝██║   ██║██╔════╝██║ ██╔╝
██████╔╝██║██╔██╗ ██║█████╗  ██║   ██║██║     █████╔╝ 
██╔═══╝ ██║██║╚██╗██║██╔══╝  ██║   ██║██║     ██╔═██╗ 
██║     ██║██║ ╚████║██║     ╚██████╔╝╚██████╗██║  ██╗
╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝  ╚═════╝╚═╝  ╚═╝

{rst}由{color.blue}Pinpe{rst}制作的{color.yellow}Brainfuck{rst}解释器（第一版）

输入以下关键词可操作运行环境：
    - {color.yellow}script{rst}    执行Brainfuck脚本文件
    - {color.yellow}debug{rst}     执行Brainfuck脚本文件，但用于调试
    - {color.yellow}size{rst}      修改模拟内存的大小（当前：{core.rom_size}）
    - {color.yellow}exit{rst}      退出运行环境
''')
        while True:
            code = input(f'\n{color.cyan}>>>{rst} ')
            if code == 'exit':
                exit(0)
            elif code == 'size':
                try:
                    tmp_size = int(input(f'在此输入新的内存大小（当前：{core.rom_size}，默认：4096）\n{color.cyan}$ {rst}'))
                    if 128 <= tmp_size <= 32768:
                        core.rom_size = tmp_size
                        break
                    else:
                        print(f'{color.red}ERR: {rst}内存大小不得小于128或大于32768', end='')
                except ValueError:
                    print(f'{color.red}ERR: {rst}仅接受纯数字输入', end='')
            elif code == 'script':
                try:
                    core(open(input(f'在此输入脚本文件的路径：\n{color.cyan}$ {rst}'), mode='r', encoding='UTF-8').read())
                except FileNotFoundError:
                    print(f'{color.red}ERR: {rst}未获取到文件', end='')
            elif code == 'debug':
                try:
                    core.debug_mode = True
                    core(open(input(f'在此输入脚本文件的路径：\n{color.cyan}$ {rst}'), mode='r', encoding='UTF-8').read())
                except FileNotFoundError:
                    print(f'{color.red}ERR: {rst}未获取到文件', end='')
            else:
                core(code)
```

## ++++++.haskell实现（8月29日更新）

```haskell
module Main where
import Data.Char (chr, ord)
import System.IO (hFlush, stdout, stdin, hSetEcho, hSetBuffering, BufferMode(NoBuffering))
import System.Console.Haskeline (runInputT, defaultSettings, getInputChar)

updateList :: Int -> Int -> [Int] -> [Int]
updateList index value list  --更新列表中指定位置的元素(AI工具函数)
    | index < 0 || index >= length list = list
    | otherwise = take index list ++ [value] ++ drop (index + 1) list

getRealtimeChar :: IO Char
getRealtimeChar = do  -- 处理实时输入(AI工具函数)
    hSetBuffering stdin NoBuffering
    hSetEcho stdin False
    maybeChar <- runInputT defaultSettings (getInputChar "")
    case maybeChar of
        Just c  -> return c
        Nothing -> return '\0'


trigger :: [Char] -> [Int] -> Int -> Int -> [Char] -> [Int] -> IO()
trigger val rom romPtr step code loopList  --触发器
    | val == ">" = process code rom (romPtr + 1) (step + 1) loopList
    | (val == "<") && (romPtr /= 0) = process code rom (romPtr - 1) (step + 1) loopList
    | val == "+" = do
        if (rom !! romPtr) == 255 then
            process code (updateList romPtr 0 rom) romPtr (step + 1) loopList
        else
            process code (updateList romPtr (rom !! romPtr + 1) rom) romPtr (step + 1) loopList
    | val == "-" = do
        if (rom !! romPtr) == 0 then
            process code (updateList romPtr 255 rom) romPtr (step + 1) loopList
        else
            process code (updateList romPtr (rom !! romPtr - 1) rom) romPtr (step + 1) loopList
    | val == "." = do
        putChar (chr (rom !! romPtr))
        hFlush stdout
        process code rom romPtr (step + 1) loopList
    | val == "," = do
        input <- getRealtimeChar
        process code (updateList romPtr (ord input) rom) romPtr (step + 1) loopList
    | val == "[" = process code rom romPtr (step + 1) (step : loopList)
    | val == "]" = do
        if null loopList then
            process code rom romPtr (step + 1) loopList
        else
            if (rom !! romPtr) /= 0 then
                process code rom romPtr (head loopList) loopList
            else
                process code rom romPtr (step + 1) (tail loopList)
    | otherwise = process code rom romPtr (step + 1) loopList

process :: [Char] -> [Int] -> Int -> Int -> [Int] -> IO()
process code rom romPtr step loopList  --流程器
    | step >= length code = return ()
    | otherwise = do
        trigger [code !! step] rom romPtr step code loopList

initBF :: [Char] -> IO()
initBF code = do  --入口和初始化
    let rom :: [Int] = replicate 4096 0
    let romPtr :: Int = 0
    let step :: Int = 0
    let loopList :: [Int] = []
    process code rom romPtr step loopList


main :: IO()
main = do  --主函数
    initBF "++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>++.>+.+++++++..+++.<<++.>+++++++++++++++.>.+++.------.--------."
```