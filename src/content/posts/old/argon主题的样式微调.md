---
title: Argon主题的样式微调
published: 2025-01-10
category: '技术与科学'
---

目前市面上有很多Argon美化教程，但很多样式要么是花里胡哨，要么是风格不搭（例如雪花/樱花效果、卡片半透明但不模糊），如果不加辨别地使用，只会起到适得其反的效果。

我整理/设计了一些贴合Argon原风格的样式，与其说是修改/美化，还不如说是微调，因为原版做的就已经够好了，不需要大刀阔斧地去改，此文章的所有微调全部基于以下几点理念：

* 尽量不要推翻原设计，应该揣摩原设计的精妙之处。

* 尽可能统一风格，非特殊情况下，一个页面不应该出现两种风格。

* 不要给视觉和性能造成过多“负担”。

* 尊重用户的习惯。

### 自定义字体

Windows自带的微软雅黑，在低分屏上的效果简直是一言难尽，因此使用自己的字体是值得的，虽然这会延长页面的加载速度几秒时间。

/*字体导入*/
@font-face {
    font-family: 'font';
    src: url('https://blog.pinpe.top/link/HarmonyOS_Sans_SC_Regular.ttf');
}
@font-face {
    font-family: 'mono';
    src: url('https://blog.pinpe.top/link/JetBrainsMono-Regular.ttf');
}

/*顶栏设置字体*/
.navbar-nav .nav-link {
  font-family: font
}

/*页面设置字体*/
body{
 font-family: font;
}

/*代码块字体*/
.hljs-ln {
    font-family: mono,font;
}

建议用黑体系列的字体，Harmony字体就很不错，不建议用宋体、楷体和花体等其它字体。

### 封面白云效果

给封面（Banner）的标题添加黑色的阴影，在封面图片亮度高/复杂的情况下最好用。

![](images/image.png)

/* 封面白云效果 */
.banner-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  bottom: 0;
  right: 0;
  transform:translatex(-50%);
  max-width:500px;
  z-index: -100;
  background:black;
  filter: blur(30px);
  opacity: 0.2;
}

### 头像自动缩放

鼠标停靠在右侧栏的头像时，会有一个放大的效果，适合做交互反馈。

/* 头像自动缩放 */
#leftbar_overview_author_image {
    width: 100px;
    height: 100px;
    margin: auto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgba(127, 127, 127, 0.1);
    overflow: hidden;
    box-shadow: 0 0 5px rgba(116, 8, 204, 0.3);
    transition: transform 0.3s ease; /*变化速度*/
}
#leftbar_overview_author_image:hover {
    transform: scale(1.2); /*缩放大小*/
}

### 控制字重

在原版，文章和说说的正文字重是不一样的，导致视觉上的不统一。

/*控制字重*/
p{
    font-weight: normal
}

### 顶栏展开项的字体颜色

在原版，顶栏展开项的文字颜色是纯黑（#000），应该要避免。

/*顶栏展开项的字体颜色*/
.dropdown-item{
 color:#525f7f
}

### 图片样式

给图片添加圆角和阴影。

/*图片样式*/
.wp-block-image img{
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
    border-radius: var(--card-radius);
}
.fancybox-wrapper > img{
  border-radius: var(--card-radius);
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
.shuoshuo-preview-container img{
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}

### 顶栏圆角

给顶栏添加外边距和圆角，这个设计好不好看因人而异，我是感觉比原来的好看一些。

![](images/image-1.png)

/*顶栏圆角*/
@media screen and (orientation: landscape){
	#navbar-main {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    width: 98.80%;
    border-radius: var(--card-radius) var(--card-radius) var(--card-radius) var(--card-radius);
    display: inline-block;
  }
}
@media screen and (orientation: portrait) {
  #navbar-main {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    width: 96%;
    border-radius: var(--card-radius) var(--card-radius) var(--card-radius) var(--card-radius);
    display: inline-block;
  }
}

### 侧边栏遮罩模糊

给手机端的侧边栏遮罩添加模糊效果。

![](images/image-2.png)

/*侧边栏遮罩模糊*/
@media screen and (max-width: 900px) {
    #sidebar_mask {
      backdrop-filter: blur(12px);
    }
}

### 封面文字内边距

给手机端封面的标题添加边距，看起来不至于那么拥挤。

![](images/image-4.png)

/*封面文字内边距*/
.banner-title{
    padding: 8px;
}