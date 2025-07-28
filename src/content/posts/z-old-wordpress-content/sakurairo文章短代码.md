---
title: Sakurairo文章短代码
published: 2023-04-30
category: '技术与科学'
---

Sakurairo主题有很多短代码，使用它们可以是文章页面更加语义化和丰富有趣。

### 禁止提示块

&#91;noway]这是禁止提示块&#91;/noway]

效果：

[noway]这是禁止提示块[/noway]

### 允许提示块

&#91;buy]这是允许提示块&#91;/buy]

效果：

[buy]这是允许提示块[/buy]

### 任务提示块

&#91;task]这是任务提示块&#91;/task]

效果：

[task]这是任务提示块[/task]

### 警告提示块

&#91;warning]这是警告提示块&#91;/warning]

效果：

[warning]这是警告提示块[/warning]

### 折叠信息块

&#91;collapse title="这是收缩信息块，这里是标题"]这里是信息&#91;/collapse]

效果

[collapse title="这是收缩信息块，这里是标题"]这里是信息[/collapse]

### GitHub 仓库信息块

将 #GitHub 用户名# 替换为您的用户名、 #仓库名# 替换为您的仓库名：

&#91;ghcard path="#GitHub 用户名#/#仓库名#"]/pin/?username=#GitHub 用户名#&amp;amp;repo=#仓库名#&#91;/ghcard]

例如：

&#91;ghcard path="mirai-mamori/Sakurairo"]/pin/username=mirai-mamori&amp;amp;repo=Sakurairo&#91;/ghcard]

效果：

[ghcard path="mirai-mamori/Sakurairo"]/pin/username=mirai-mamori&amp;amp;repo=Sakurairo[/ghcard]

### 卡片信息块

* #icon# 替换为 FontAwesome 6 icon 

* #标题# 替换为卡片标题

* #图片链接# 替换为图片 URL 

* #链接# 替换为超链接

&#91;showcard icon="#icon#" title="#标题#" img="#图片链接#" color="#cce1eb"]#链接#&#91;/showcard]

例如：

&#91;showcard icon="fa-regular fa-bookmark" title="mirai-mamori" img="https://s.nmxc.ltd/sakurairo_vision/asuhe/avatar.jpg" color="#cce1eb"]https://kiseki.blog&#91;/showcard]

效果：

[showcard icon="fa-regular fa-bookmark" title="mirai-mamori" img="https://s.nmxc.ltd/sakurairo_vision/asuhe/avatar.jpg" color="#cce1eb"]https://kiseki.blog[/showcard]

### 聊天气泡

* 将 #头像# 替换为头像 URL

* #文本# 替换为聊天文本 

* #对齐方式# 为 row 时聊天气泡靠左，为 row-reverse 时聊天气泡靠右

&#91;conversations avatar="#头像#" direction="#对齐方式#"]#文本#&#91;/conversations]

例如：

&#91;conversations avatar="https://s.nmxc.ltd/sakurairo_vision/asuhe/avatar.jpg" direction="row"]Hello&#91;/conversations]
&#91;conversations avatar="https://s.nmxc.ltd/sakurairo_vision/asuhe/avatar.jpg" direction="row-reverse"]World&#91;/conversations]

效果：

[conversations avatar="https://s.nmxc.ltd/sakurairo_vision/asuhe/avatar.jpg" direction="row"]Hello[/conversations] [conversations avatar="https://s.nmxc.ltd/sakurairo_vision/asuhe/avatar.jpg" direction="row-reverse"]World[/conversations]