---
title: 线程的创建、检查与关闭
published: 2025-03-30
description: 可以用线程来分出一个独立运行的程序出来。
tags: [线程, 系统, 教程]
category: 技术与科学
draft: false
---

这几天在做探针软件，其中需要定时请求目标 URL，其中的伪代码是这样的：

```python
import time
 
target_url = 'https://pinpe.top'
sleep_time = 3600
 
def monitor():
    while True:
        ping(target_url)
        time.sleep(sleep_time)
```

但这样的话，会因为要等待 `time.sleep()` 而阻塞软件的流程，导致整个软件都打不开了，我只能用线程来分出一个独立运行的程序出来。

---

## 创建线程

首先必须要定义线程，才能创建（启动）：

```python
import threading
import time

target_url = 'https://pinpe.top'
sleep_time = 3600

def monitor():
    while True:
        ping(target_url)
        time.sleep(sleep_time)

if __name__ == '__main__':
    monitor_thread = threading.Thread(target=monitor)
    monitor_thread.start()
```

关键代码解析：

- `import threading` - 导入管理线程的库
- `monitor_thread = threading.Thread(target=monitor)` - 定义线程，此线程需要执行 `monitor()` 函数
- `monitor_thread.start()` - 启动线程

---

## 检查线程

使用线程内置的 `.is_alive()` 方法即可检查线程是否存在：

```python
if monitor_thread.is_alive() == True:
    print('线程存在')
else:
    print('线程不存在')
```

---

## 关闭线程

通常，线程在执行完任务后会自动关闭。但作为一个死循环线程，是无法自己关闭的，而且因为安全原因也无法强制关闭，因此只能用事件来触发关闭：

```python
import threading
import time

target_url = 'https://pinpe.top'
sleep_time = 3600
stop_event = threading.Event()

def monitor():
    while not stop_event.is_set():
        ping(target_url)
        stop_event.wait(sleep_time)

if __name__ == '__main__':
    monitor_thread = threading.Thread(target=monitor)
    monitor_thread.start()
    time.sleep(18000)
    stop_event.set()
    monitor_thread.join()
    stop_event.clear()
    monitor_thread = threading.Thread(target=monitor)
```

关键代码解析：

- `stop_event = threading.Event()` - 创建关闭事件
- `while not stop_event.is_set():` - 如果触发了这个事件，就不再执行循环
- `stop_event.wait(sleep_time)` - `time.sleep()` 的替代方案，可以接受事件触发
- `stop_event.set()` - 到时间了，启用这个事件
- `monitor_thread.join()` - 等待线程执行完工作
- `stop_event.clear()` - 重置事件的状态
- `monitor_thread = threading.Thread(target=monitor)` - 如果以后还要使用此线程，可再次定义