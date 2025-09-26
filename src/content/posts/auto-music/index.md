---
title: 避开浏览器限制，实现自动播放音乐
published: 2024-07-19
description: 避开浏览器禁止自动播放音乐的限制。
tags: [前端, 音频, 设计]
category: 资源
draft: false
---

很多教程都让我们使用这样的写法：

```html
<embed src="music.mp3" autostart="true" loop="true" hidden="true"></embed>
```

但实际上，这样会被浏览器拦截的，因为浏览器禁止这样的自动播放，哪怕对页面交互了也不行。

所以我们只能通过 CSS 将 `embed` 元素的宽高调为 0，来替代 `hidden="true"`。

```html
<embed src="music.mp3" autostart="true" loop="true"></embed>
```

```css
embed {
    width: 0;
    height: 0;
}
```

虽仍不能直接播放，但至少对页面交互后就能正常播放了。