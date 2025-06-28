---
title: 什么？CSS还自带变量功能？
published: 2024-07-01
category: '技术与科学'
---

以往，要在CSS中使用“改一点点，全局生效”的变量功能，要么用SCSS、LESS，要么写个脚本生成文件。但实际上，新一点的CSS标准已经自带变量功能。

### 先看看其它的实现方式

#### LESS

@main-color: #525f7f;

span {
  color: @main-color;
}

这种方式没有什么问题，但页面需要加载额外加载项，比较耗资源。（SCSS同样）

#### 脚本

main_color = '#525f7f'

css = open('style.css', 'w', encoding='utf-8')
css.write(f'''span {{
    color: {main_color};
}}''')

这种方式需要本地编译脚本，同时兼顾脚本语言和CSS规则，还繁琐。

### 再看看自带的实现方式

:root {
    --main-color: #525f7f;
}

span {
    color: var(--main-color);
}

定义变量需要统一在:root里用--定义，使用var(--[变量名])调用变量。由于是自带的，所以不需要作额外处理，直接上即可。

目前这种方式已经普及，很多网站都在使用。