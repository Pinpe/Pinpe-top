---
title: 看见时间：我写了个倒数日软件
published: 2026-02-15
description: 某一天，我意识到我需要一个倒数日软件，以便我可以“看见”时间。
tags: [时间, 设计, 登录]
category: 技术与科学
draft: false
---

某一天，我意识到我需要一个倒数日软件，以便我可以“看见”时间。

但是我尝试了市面上大部分这类软件，发现要么有很多广告和VIP，要么就是不知名的小作坊做的，还不支持云同步，并没有发现很称心如意的。

那怎么办呢？我父亲是电子和嵌入式的一把好手，家里有什么电器坏了自己就能修——而我也终于能理解父亲的感受，我决定：自己做。

至于名字...我实在想不到什么名字了，就叫：《倒数日》吧，取的是每日科技《倒数日》的同款名字。

## 技术选型

首先我想要有多端无缝同步的功能，那么肯定不能在本地上运行，而是要搬到云上，这样只需要一个浏览器和网络就能打开了。

如何上云呢？我可以采用传统前后端的形式，也可以用仓库+部署平台的形式（这个博客就采取此形式），但我依然选择了前者，因为后者更改数据相对来说很麻烦。

我依然沿用了Nino的技术栈：Flask+jQuery，毕竟也不是很复杂的东西，没必要用太高级的。

至于UI设计，我想用拟物化风格，因为我认为拟物化的设计可以更贴近生活，让冰冷的节目有一丝温度。

## 开发手记

这是我第一次尝试做登录系统，结果比我想象中的要简单，只需要先判断密码是否正确，然后设置一下session就好了：

```python
@app.route('/login')
def public_login():
    '''登录页面路由'''
    return render_template('login.html')

@app.route('/get_login', methods=['POST'])
def get_login():
    '''接收密码路由'''
    if hashlib.sha256(request.form.get('password').encode()).hexdigest() == \
    data.load()['password']:  # 判断密码是否正确
        # 如果正确，设置session，并且重定向到根路由
        session['logged_in'] = True
        return redirect('/')
    else:
        # 如果不正确，注销session（当登出用），并且弹出提示
        session.pop('logged_in', None)
        return alert('验证未通过', '/login')
```

对于其他路由，只需一个装饰器就可以保护：

```python
def login_required(f):
    '''验证用户是否已登录，未登录则重定向到登录页'''
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):  # 判断session是否不为True
            return redirect(url_for('public_login'))  # 重定向到登录页面
        return f(*args, **kwargs)  # 否则执行原路由
    return decorated_function

@app.route('/')
@login_required
def public_root():
    return ...
```

## 截图

![](images/index/屏幕截图_20260213_211638.png)

![](images/index/屏幕截图_20260213_211919.png)

## 源代码

这点小玩具就不上传到Github占空间了：<https://wwbtu.lanzouq.com/iCefe3ijiufe>