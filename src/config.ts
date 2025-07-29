import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Pinpe的云端',
  subtitle: '一个属于自己的云朵',
  lang: 'zh_CN',         // 语言：'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
  themeColor: {
    hue: 200,         // 主题色的默认色调值（0-360）。例如：红色:0, 蓝绿色:200, 青色:250, 粉色:345
    fixed: false,     // 对访客隐藏主题色选择器
  },
  banner: {
    enable: true,    // 是否启用横幅
    src: 'assets/images/back.png',   // 相对于/src目录的路径。若以'/'开头则相对于/public目录
    position: 'center',      // 相当于object-position，仅支持'top'、'center'、'bottom'，默认为'center'
    credit: {
      enable: true,         // 是否显示横幅图片来源信息
      text: 'log 8',              // 显示的来源文本
      url: 'https://www.pixiv.net/artworks/132644451'                // （可选）原作品或艺术家页面的链接
    }
  },
  toc: {
    enable: true,           // 是否在文章右侧显示目录
    depth: 3                // 目录显示的最大标题层级（1-3级）
  },
  favicon: [    // 留空则使用默认网站图标
    {
      src: '/favicon/logo.png',    // 网站图标路径（相对于/public目录）
    //   theme: 'light',              // （可选）'light'或'dark'，仅在为浅色/深色模式提供不同图标时设置
    //   sizes: '32x32',              // （可选）图标尺寸，仅在提供不同尺寸图标时设置
    }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    {
      name: "主页",
      url: "/",
    },
    {
      name: '归档',
      url: '/archive/'
    },
    {
      name: '关于',
      url: '/about/'
    },
    {
      name: "友链",
      url: "/links/",
    },
    {
      name: "留言",
      url: "/comment/"
    },
    {
      name: "旧站",
      url: "https://blog.pinpe.top/",
      external: true,
    },
    {
      name: "开往",
      url: "https://www.travellings.cn/go-by-clouds.html",
      external: true,
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/head.jpg',  // 头像路径：相对于/src目录。若以'/'开头则相对于/public目录
  name: 'Pinpe',
  bio: '高尚是高尚者的墓志铭，卑鄙是卑鄙者的通行证。',
  links: [
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/Pinpe/Pinpe-top",
    },
    {
      name: "RSS",
      icon: "fa6-solid:rss",
      url: "/rss.xml",
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,     // 是否显示许可证信息
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}