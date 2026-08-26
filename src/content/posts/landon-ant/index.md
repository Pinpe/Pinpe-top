---
title: 实现兰顿蚂蚁
published: 2026-08-26
description: 一种消遣。
tags: [算法, 自动机]
category: 技术与科学
draft: false
---

## 问题

> 兰顿蚂蚁是一类细胞自动机，和著名的康威生命游戏看上去十分类似，但实现上有些不同。
>
> 和生命游戏一样，兰顿蚂蚁的规则也很简单：
> 
> 初始状态，蚂蚁被放置在一个初始为纯白色的棋盘中，头朝上。
> 
> - 如果蚂蚁脚下的格子是白色，将蚂蚁脚下的格子填成黑色，蚂蚁原地右转然后前进一格；
> - 如果蚂蚁脚下的格子是黑色，将蚂蚁脚下的格子填成白色，蚂蚁原地左转然后前进一格。
> 
> 重复这一步骤，蚂蚁将在棋盘格子上画出复杂的图案。
> 
> _——<https://zhuanlan.zhihu.com/p/457603758>_

## 实现

我们将使用Python来实现兰顿蚂蚁。

### 第一步：开空间（棋盘）

定义一个二维列表，并且内容全部为 `0` ，这将成为蚂蚁运行的空间。

其中，设定 `0` 是白， `1` 是黑。（蚂蚁的位置和朝向则用另外一个表达方式）

```py
# 定义 #
space_hight = 32                                               # 空间长度
space_width = 64                                               # 空间宽度
space       = [[0] * space_width for _ in range(space_hight)]  # 使用space[x坐标][y坐标]来读取单个格
```

与此同时，我们可以开始写空间的渲染了，只需要双层 `for` 分别遍历空间的x轴和y轴，然后判断当前index（由x和y组成）读取到的是什么：

```py
  # 定义 #
  space_hight = 32                                               # 空间长度
  space_width = 64                                               # 空间宽度
  space       = [[0] * space_width for _ in range(space_hight)]  # 使用space[x坐标][y坐标]来读取单个格
  
  
  # 函数 #
+ def out_char(char: str):
+     ''' 不换行、无缓冲地打印字符 '''
+     print(char, end='', flush=True)
+ 
+ def out_space():
+     ''' 遍历并以特定格式打印当前空间状态 '''
+     for x in range(space_hight):
+         for y in range(space_width):
+             if space[x][y] == 0:
+                 out_char('.')
+             elif space[x][y] == 1:
+                 out_char('#')
+             else:
+                 raise ValueError('遍历时出现了未知的值')
+         print()
+ 
+ 
+ # 主程序 #
+ if __name__ == '__main__':
+     out_space()
```

### 第二步：定义蚂蚁以及相关方法

空间有了，但是最核心的蚂蚁还没有，现在我们可以开始构建蚂蚁以及它的相关方法，便于后面设置蚂蚁的行为。

首先定义蚂蚁的坐标和方向：

```py
  # 定义 #
  space_hight       = 32                                               # 空间长度
  space_width       = 64                                               # 空间宽度
  space             = [[0] * space_width for _ in range(space_hight)]  # 使用space[x坐标][y坐标]来读取单个格
+ ant_location      = [16, 32]                                         # 蚂蚁的位置（0为x坐标，1为y坐标）
+ ant_towards_index = 0                                                # 蚂蚁的朝向表的索引
+ ant_towards_list  = ['↑', '→', '↓', '←']                             # 蚂蚁的朝向表，只需要将索引+1或-1即可转向
  
  
  # 函数 #
  def out_char(char: str):
      ''' 不换行、无缓冲地打印字符 '''
      print(char, end='', flush=True)
  
  def out_space():
      ''' 遍历并以特定格式打印当前空间状态 '''
      for x in range(space_hight):
          for y in range(space_width):
              if space[x][y] == 0:
                  out_char('.')
              elif space[x][y] == 1:
                  out_char('#')
              else:
                  raise ValueError('遍历时出现了未知的值')
          print()
  
  
  # 主程序 #
  if __name__ == '__main__':
      out_space()
```

别忘了让蚂蚁也能显示在屏幕上！

```py
  # 定义 #
  space_hight       = 32                                               # 空间长度
  space_width       = 64                                               # 空间宽度
  space             = [[0] * space_width for _ in range(space_hight)]  # 使用space[x坐标][y坐标]来读取单个格
+ ant_location      = [16, 32]                                         # 蚂蚁的位置（0为x坐标，1为y坐标）
+ ant_towards_index = 0                                                # 蚂蚁的朝向表的索引
+ ant_towards_list  = ['↑', '→', '↓', '←']                             # 蚂蚁的朝向表，只需要将索引+1或-1即可转向
  
  
  # 函数 #
  def out_char(char: str):
      ''' 不换行、无缓冲地打印字符 '''
      print(char, end='', flush=True)
  
  def out_space():
      ''' 遍历并以特定格式打印当前空间状态 '''
      for x in range(space_hight):
          for y in range(space_width):
+             if x == ant_location[0] and y == ant_location[1]:
+                 out_char(ant_towards_list[ant_towards_index % 4])
              elif space[x][y] == 0:
                  out_char('.')
              elif space[x][y] == 1:
                  out_char('#')
              else:
                  raise ValueError('遍历时出现了未知的值')
          print()
  
  
  # 主程序 #
  if __name__ == '__main__':
      out_space()
```

:::tip
关于蚂蚁的朝向，不需要编写很复杂的逻辑，只需要定义一个可能出现的所有朝向的列表（上下左右四个），和一个朝向表的索引即可。

这样只需要 `ant_towards_list[ant_towards_index % 4]` 就能获取当前朝向，`ant_towards_index` 加1右转，减1左转。
:::

接下来是最难的的一步：编写工具蚂蚁的朝向来让蚂蚁移动一格的函数，我们先看看蚂蚁怎么移动：

- 朝上时，y减1，x不变。（如果y等于0时就跳到空间的最底端）
- 朝下时，y加1，x不变。（如果y已经在最底端就跳到0）
- 朝左时，y不变，x减1。（如果x等于0时就跳到空间的最右端）
- 朝右时，y不变，x加1。（如果x已经在最右端就跳到0）

这样，就可以写具体的实现了：

```py
  # 定义 #
  space_hight       = 32                                               # 空间长度
  space_width       = 64                                               # 空间宽度
  space             = [[0] * space_width for _ in range(space_hight)]  # 使用space[x坐标][y坐标]来读取单个格
  ant_location      = [16, 32]                                         # 蚂蚁的位置（0为x坐标，1为y坐标）
  ant_towards_index = 0                                                # 蚂蚁的朝向表的索引
  ant_towards_list  = ['↑', '→', '↓', '←']                             # 蚂蚁的朝向表，只需要将索引+1或-1即可转向
  
  
  # 函数 #
  def out_char(char: str):
      ''' 不换行、无缓冲地打印字符 '''
      print(char, end='', flush=True)
  
  def out_space():
      ''' 遍历并以特定格式打印当前空间状态 '''
      for x in range(space_hight):
          for y in range(space_width):
              if x == ant_location[0] and y == ant_location[1]:
                  out_char(ant_towards_list[ant_towards_index % 4])
              elif space[x][y] == 0:
                  out_char('.')
              elif space[x][y] == 1:
                  out_char('#')
              else:
                  raise ValueError('遍历时出现了未知的值')
          print()
  
+ def ant_move():
+     ''' 根据朝向来让蚂蚁向前移动一格 '''
+     ant_towards = ant_towards_list[ant_towards_index % 4]
+     if ant_towards == '↑':
+         ant_location[0] = ant_location[0] - 1 if ant_location[0] != 0 else space_hight - 1
+     elif ant_towards == '→':
+         ant_location[1] = ant_location[1] + 1 if ant_location[1] != space_width - 1 else 0
+     elif ant_towards == '↓':
+         ant_location[0] = ant_location[0] + 1 if ant_location[0] != space_hight - 1 else 0
+     elif ant_towards == '←':
+         ant_location[1] = ant_location[1] - 1 if ant_location[1] != 0 else space_width - 1
+     else:
+         raise ValueError('未知朝向')
  
  
  # 主程序 #
  if __name__ == '__main__':
      out_space()
```

### 第三步：编写蚂蚁的行为逻辑和主循环

接下来是最重要的一步，但反而是最简单的一步，只是把之前的轮子组装上去。

首先编写蚂蚁的行为逻辑，和问题的规则一样：

```py
  # 定义 #
  space_hight       = 32                                               # 空间长度
  space_width       = 64                                               # 空间宽度
  space             = [[0] * space_width for _ in range(space_hight)]  # 使用space[x坐标][y坐标]来读取单个格
  ant_location      = [16, 32]                                         # 蚂蚁的位置（0为x坐标，1为y坐标）
  ant_towards_index = 0                                                # 蚂蚁的朝向表的索引
  ant_towards_list  = ['↑', '→', '↓', '←']                             # 蚂蚁的朝向表，只需要将索引+1或-1即可转向
  
  
  # 函数 #
  def out_char(char: str):
      ''' 不换行、无缓冲地打印字符 '''
      print(char, end='', flush=True)
  
  def out_space():
      ''' 遍历并以特定格式打印当前空间状态 '''
      for x in range(space_hight):
          for y in range(space_width):
              if x == ant_location[0] and y == ant_location[1]:
                  out_char(ant_towards_list[ant_towards_index % 4])
              elif space[x][y] == 0:
                  out_char('.')
              elif space[x][y] == 1:
                  out_char('#')
              else:
                  raise ValueError('遍历时出现了未知的值')
          print()
  
  def ant_move():
      ''' 根据朝向来让蚂蚁向前移动一格 '''
      ant_towards = ant_towards_list[ant_towards_index % 4]
      if ant_towards == '↑':
          ant_location[0] = ant_location[0] - 1 if ant_location[0] != 0 else space_hight - 1
      elif ant_towards == '→':
          ant_location[1] = ant_location[1] + 1 if ant_location[1] != space_width - 1 else 0
      elif ant_towards == '↓':
          ant_location[0] = ant_location[0] + 1 if ant_location[0] != space_hight - 1 else 0
      elif ant_towards == '←':
          ant_location[1] = ant_location[1] - 1 if ant_location[1] != 0 else space_width - 1
      else:
          raise ValueError('未知朝向')
  
+ def ant_act():
+     ''' 蚂蚁的行为模拟 '''
+     global ant_towards_index
+     if space[ant_location[0]][ant_location[1]] == 0:
+         space[ant_location[0]][ant_location[1]] = 1
+         ant_towards_index += 1
+         ant_move()
+     elif space[ant_location[0]][ant_location[1]] == 1:
+         space[ant_location[0]][ant_location[1]] = 0
+         ant_towards_index -= 1
+         ant_move()
+     else:
+         raise ValueError('蚂蚁无法判断当前是0还是1')
  
  
  # 主程序 #
  if __name__ == '__main__':
      out_space()
```

但是此时还是不能运行的：蚂蚁没出现，空间仍空白，这是因为现在蚂蚁是死的，我们需要让它活，添加一个死循环即可：

```py
+ import time
  
  # 定义 #
+ sleep_time        = 0.05                                             # 每多少秒一回合？
  space_hight       = 32                                               # 空间长度
  space_width       = 64                                               # 空间宽度
  space             = [[0] * space_width for _ in range(space_hight)]  # 使用space[x坐标][y坐标]来读取单个格
  ant_location      = [16, 32]                                         # 蚂蚁的位置（0为x坐标，1为y坐标）
  ant_towards_index = 0                                                # 蚂蚁的朝向表的索引
  ant_towards_list  = ['↑', '→', '↓', '←']                             # 蚂蚁的朝向表，只需要将索引+1或-1即可转向
  
  
  # 函数 #
  def out_char(char: str):
      ''' 不换行、无缓冲地打印字符 '''
      print(char, end='', flush=True)
  
  def out_space():
      ''' 遍历并以特定格式打印当前空间状态 '''
      for x in range(space_hight):
          for y in range(space_width):
              if x == ant_location[0] and y == ant_location[1]:
                  out_char(ant_towards_list[ant_towards_index % 4])
              elif space[x][y] == 0:
                  out_char('.')
              elif space[x][y] == 1:
                  out_char('#')
              else:
                  raise ValueError('遍历时出现了未知的值')
          print()
  
  def ant_move():
      ''' 根据朝向来让蚂蚁向前移动一格 '''
      ant_towards = ant_towards_list[ant_towards_index % 4]
      if ant_towards == '↑':
          ant_location[0] = ant_location[0] - 1 if ant_location[0] != 0 else space_hight - 1
      elif ant_towards == '→':
          ant_location[1] = ant_location[1] + 1 if ant_location[1] != space_width - 1 else 0
      elif ant_towards == '↓':
          ant_location[0] = ant_location[0] + 1 if ant_location[0] != space_hight - 1 else 0
      elif ant_towards == '←':
          ant_location[1] = ant_location[1] - 1 if ant_location[1] != 0 else space_width - 1
      else:
          raise ValueError('未知朝向')
  
  def ant_act():
      ''' 蚂蚁的行为模拟 '''
      global ant_towards_index
      if space[ant_location[0]][ant_location[1]] == 0:
          space[ant_location[0]][ant_location[1]] = 1
          ant_towards_index += 1
          ant_move()
      elif space[ant_location[0]][ant_location[1]] == 1:
          space[ant_location[0]][ant_location[1]] = 0
          ant_towards_index -= 1
          ant_move()
      else:
          raise ValueError('蚂蚁无法判断当前是0还是1')
  
  
  # 主程序 #
  if __name__ == '__main__':
+     while True:
+         out_char('\033[H\033[J')
+         ant_act()
          out_space()
+         time.sleep(sleep_time)
```