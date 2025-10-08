---
title: 👁请你视奸我👁
published: 2025-10-08
description: 你会死死的盯着我的..👁️👁️..👁️👁️..我为什么要背叛你你会死死的盯着我的..👁️👁️..带着你的恨着我..你会一直看着我..👁️👁️..
tags: [视奸, 创意, 窗口]
category: 技术与科学
draft: false
---

:::note[省流]
体验地址：<https://monitor.nekoqwq.space/>
:::

## 👁缘起👁

有一天，群友晓夜给自己的主页加上了一个新颖的功能，可以实时显示自己活动窗口的名称，如图：

![](images/index/image.png)

我便好奇问他原理是什么：

![](images/index/image-1.png)

感觉以我的技术水平还是写的出来的，于是我便尝试了一下。

## 👁理论👁

我准备分成两个端：**服务端**和**客户端**，其中客户端每10秒采集一次活动窗口标题，然后发送到部署在服务器的服务端的特殊路由，服务端获取到请求则更新内部变量，当有人访问服务端的根路由时，内部变量会写入HTML模板，这样就能公开了。

对于安全性，可以在发送的请求里连带上密码，然后服务端验证密码是否与服务端一致，也许能保证请求来自正确的客户端。

你应该注意到了，与晓夜不同，我进一步简化了原理，去除了WebSocket：这应该是用来实现页面无感更新的，但是去除掉这个而直接使用服务端渲染依然能达到视奸的效果，只是没有无感更新的效果。

![](images/index/原理.png)

理论存在，实践开始。

## 👁客户端👁

我使用Python来写客户端，在AI的指导下，我很快整理出来了一个用于采集活动窗口标题的办法，居然只需要4行代码就能完成：

```python
import subprocess

def get_active_window_title():
    output = subprocess.check_output(["xprop", "-root", "_NET_ACTIVE_WINDOW"], text=True).split()[-1]
    if output == "0x0": return "似了（窗口编号为0x0）"
    output = subprocess.check_output(["xprop", "-id", output, "WM_NAME"], text=True).strip('\n').split('=')[-1]
    return output
```

实际上，只是执行了`xprop`命令，手动在终端输入也有同样的效果：

```
$ xprop -root _NET_ACTIVE_WINDOW
_NET_ACTIVE_WINDOW(WINDOW): window id # 0x2e001a9
$ xprop -id 0x2e001a9 WM_NAME
WM_NAME(UTF8_STRING) = "fish - Pinpe-top - Visual Studio Code"
```

:::note
这个只支持Linux，不跨平台，Windows不能用，而且似乎不能采集KDE应用。
:::

然后，在往外面加一点点细节，客户端就完成了：

```python
import subprocess
import requests
import time

def get_active_window_title():
    output = subprocess.check_output(["xprop", "-root", "_NET_ACTIVE_WINDOW"], text=True).split()[-1]
    if output == "0x0": return "似了（窗口编号为0x0）"
    output = subprocess.check_output(["xprop", "-id", output, "WM_NAME"], text=True).strip('\n').split('=')[-1]
    return output

if __name__ == '__main__':
    while True:
        request_obj = requests.get(f'https://your-domain/update/{get_active_window_title()}/your-password'.strip('/'))
        if request_obj.status_code == 200:
            print(request_obj.text)
        else:
            print(f'出现了不正常的状态码：{request_obj.status_code}')
        time.sleep(10)
```

## 👁服务端👁

按照我的尿性，我还用Python写服务端，配合Flask框架，就这么轻松地做好了：

```python
from flask import *
import hashlib

app = Flask(__name__)
name_date = '似了（没有收到数据）'

@app.route('/')
def main():
    return f'''
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" /> 
        <style>
            *{{
                background-color: black;
                color: aliceblue;
                text-align: center;
            }}
        </style>
        <h1>请你视奸我</h1>
        <p>这是一个创意项目，你可以在这里看到我电脑上激活窗口的标题，每10秒上传一次，有关此项目的博文：https://pinpe.top</p>
        <h2>{ name_date }</h2>
    '''

# 传输数据需要使用POST方式，这里为了省事而使用如此邪路，好孩子别学我！
@app.route('/update/<name>/<passwd>')
def update(name, passwd):
    # 这里只是简陋地哈希了一下，正规存储密码需要强哈希+加盐，并存储在环境变量里，好孩子别学我！
    if hashlib.sha256(str(passwd).encode()).hexdigest() == 'your-password-hash':
        global name_date
        name_date = name
        return f'服务器：已收到请求（{name_date}）'
    else:
        return '服务器：密码错误'

if __name__ == '__main__':
    app.run()
```

## 👁开始视奸👁

现在就可以狠狠地视奸我了！<https://monitor.nekoqwq.space/>

![](images/index/image-2.png)

![](images/index/image-3.png)