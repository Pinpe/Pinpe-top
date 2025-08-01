<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 my-4">
    <LinkCard
      v-for="link in randomLinks"
      :key="link.link"
      :title="link.title"
      :desc="link.desc"
      :link="link.link"
      :img="link.img"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LinkCard from "./LinkCard.vue";

const links: { title: string; link: string; desc: string; img: string }[] = [
  {
    link: "https://pinpe.top",
    title: "Pinpe的云端",
    img: "https://pinpe.top/favicon/logo.png",
    desc: "一个属于自己的云朵",
  },
  {
    link: "https://blog.365sites.top/",
    title: "365云栈",
    img: "https://blog.365sites.top/upload/avatar.png",
    desc: "初阅不明言外意，重温方觉字中情",
  },
  {
    link: "https://angine.tech/",
    title: "Angine’s blog",
    img: "https://angine.tech/favicon.ico",
    desc: "以语言之力",
  },
  {
    link: "https://blog.yaria.top",
    title: "Ariasakaの小窝",
    img: "https://weavatar.com/avatar/ae64fbbd18c13144d3e48ed089b5d07359ff071d6310d0c376d53ac8a213f6fc?d=mp",
    desc: "人有悲欢离合 月有阴晴圆缺"
  },
  {
    link: "https://blog.6uu.us/",
    title: "bbb-lsy07",
    img: "https://blog.6uu.us/upload/logo.jpg",
    desc: "科技激荡人文，洞见智慧本真。"
  },
  {
    link: "https://blog.bleaz.net/",
    title: "Bleaz's Blog",
    img: "https://api.bleaz.top/img/links/logo.jpg",
    desc: "不畏过往，不惧将来"
  },
  {
    link: "https://casear.net",
    title: "Casear的技术栈",
    img: "https://casear.net/static/img/eae10f098ce1f671fa0e60d899bf545e.avatar.svg",
    desc: "如果你有机会到好望角，请在海边的石头上刻下我的故事👨‍💻"
  },
  {
    link: "https://dpkg123.top/",
    title: "dpkg123 的小站",
    img: "https://dpkg123.top/favicon.jpg",
    desc: "咕咕咕"
  },
  {
    link: "https://i.duckxu.com",
    title: "Glimmer",
    img: "https://media.duckxu.com/blogfiles/public/iduckxucom.webp",
    desc: "只有不活在他人的期待中，才可以成为更好的自己。"
  },
  {
    link: "https://www.hsuyeung.com",
    title: "Hsu Yeung 的博客",
    img: "https://www.hsuyeung.com/img/avatar.jpg",
    desc: "前天看到了小兔，昨天是小鹿，今天是你。"
  },
  {
    link: "https://www.luochancy.com",
    title: "I’m Luochancy",
    img: "https://apac-r2.luochancy.com/img/icon.png",
    desc: "这是个猫猫的博客喵～"
  },
  {
    link: "https://pic.ffnb.top",
    title: "SSR-FF摄影📸",
    img: "https://s11.ax1x.com/2023/03/10/ppu3a9O.jpg",
    desc: "远赴人间惊鸿宴，一睹人间盛世颜"
  },
  {
    link: "https://ivampiresp.com",
    title: "iVampireSP 的物语",
    img: "https://nwl.im/avatar",
    desc: "比起千言万语，更重要的是心灵相通吧。"
  },
  {
    link: "https://jukai.site/",
    title: "樹海サライ 或 JUKAI.SITE",
    img: "https://jukai.site/avatar.png",
    desc: "我喜欢听花开的声音，更想自由地深情地呼吸"
  },
  {
    link: "https://imqi1.com",
    title: "ImQi1 / 棋",
    img: "https://imqi1.com/avatar.webp",
    desc: "做技术的分享者、生活的摄影师、时事的评论员。"
  },
  {
    link: "https://kegongteng.cn/",
    title: "Kegongteng",
    img: "https://bu.dusays.com/2023/12/23/65867c3357bb6.jpg",
    desc: "Blogger / Technophile / Student"
  },
  {
    link: "https://kekkj123.github.io/",
    title: "KEKKJ BLOG",
    img: "https://kekkj123.github.io/img/Blog_Saturn.png",
    desc: "小世界的一瞥。"
  },
  {
    link: "http://baihuiblog.top/",
    title: "柏荟的桃源",
    img: "https://baihuiblog.top/wp-content/uploads/2025/03/Image_1729392074336.jpg",
    desc: "Baihui_柏荟",
  },
    {
    link: "https://www.leonxie.cn",
    title: "LeonXieの小窝",
    img: "https://www.leonxie.cn/upload/avatar.jpg",
    desc: "保持热爱，奔赴山海！",
  },
  {
    link: "https://www.linexic.top",
    title: "LineXic书屋",
    img: "https://github.com/LineXic.png",
    desc: "难离难舍，想抱紧些",
  },
  {
    link: "https://blog.m78.su",
    title: "M78.SU",
    img: "https://blog.m78.su/head.jpg",
    desc: "我的随笔",
  },
  {
    link: "https://magma.ink/",
    title: "Magma Ink",
    img: "https://q1.qlogo.cn/g?b=qq&nk=823202450&s=640",
    desc: "为美好的生活献礼",
  },
  {
    link: "https://mei.lv",
    title: "mei的网络日志",
    img: "https://api.mmeiblog.cn/favicon",
    desc: "重度妄想症患者",
  },
  {
    link: "https://blog.mocn.top",
    title: "Momo5418's Blog",
    img: "https://cdn.jsdmirror.com/gh/momo54181/momo54181@main/avatar.webp",
    desc: "Momo5418的个人博客",
  },
  {
    link: "https://oyiso.cn",
    title: "Oyiso's Blog",
    img: "https://oyiso.cn/logo.png",
    desc: "The shortest answer is doing",
  },
  {
    link: "https://blog.qaiu.top",
    title: "千百度",
    img: "https://blog.qaiu.top/upload/2020/3/QQ%E5%9B%BE%E7%89%8720200308202902-9c1cfee1d0964b1e8c8e2ac80fe42264.png",
    desc: "qaiu博客提供c4droid下载，以及手机编程相关资料",
  },
  {
    link: "https://www.qladgk.com/",
    title: "qlAD",
    img: "https://cdn.qladgk.com/images/qlAD.jpg",
    desc: "一名小小的计算机爱好者",
  },
  {
    link: "https://lunars.site",
    title: "Silvaire's Blog",
    img: "https://wsrv.nl/?url=avatars.githubusercontent.com/u/184231508&mask=circle",
    desc: "君埋泉下泥销骨，我寄人间雪满头。",
  },
  {
    link: "https://blog.voyage200.top/",
    title: "voyage200的博客",
    img: "https://blog.voyage200.top/usr/uploads/2024/08/2670878194.jpg",
    desc: "",
  },
  {
    link: "https://teleblog.ryanyuan.top/",
    title: "Ryan's 家门口 📢",
    img: "https://teleblog.ryanyuan.top/static/https://cdn5.cdn-telegram.org/file/K4bbd8QiOUm9VhD2ljo6htgNpyS3pxF5YkJSCd2v5yFw7jH7mRs2CVvdRQYrG5xQ9jGe2GXzeGJrANB3IsDSJeH3KyVzhhkGStvfjZ0bTYZhSKpVe15BgfilYF_dZ1RvfC85mO3wXeeO7jW6rR-qpb5m3aebAJgzdmOJEdi6BkeXET3LilzSzzTGt6-DFvWXXlez0t8yQgpg6QrIFbmr2J2VwNzWLX53rmjo57MRdXazuxBTIM9OpFOTRtoStj5q8yTmIvYaldTno9odd1qmg4nrMUay1Ukiz1tD0AcRUCvzFa9JWNAKJdulEFwYl8egSGKuAMmbVxlTKuFUTeotnA.jpg",
    desc: "蹲在家门口 把贼有意思的东西向全宇宙广播 😋",
  },
  {
    link: "https://wcowin.work/",
    title: "Wcowin's Blog",
    img: "https://pica.zhimg.com/80/v2-74ecd899c7c4cc0258930eaff239a21b_1440w.webp",
    desc: "循此苦旅，以达星辰",
  },
  {
    link: "https://www.dorazhang.cn/",
    title: "Zyx的小窝",
    img: "https://q2.qlogo.cn/headimg_dl?dst_uin=2078170660&spec=100",
    desc: "人生海海，山山而川，不过尔尔。",
  },
  {
    link: "https://blog.conoha.vip/",
    title: "一只辣鸡鹅🐧の窝",
    img: "https://img.conoha.vip/images/2024/06/01/d5c57101def22d98823fb9fa54159672.png#vwid=1200&vhei=1200",
    desc: "",
  },
  {
    link: "https://jiuliu.top/",
    title: "久流的个人小站",
    img: "https://img.jiuliu.top/i/2025/04/29/681050cd602ce.png",
    desc: "借由他人,寻找自我",
  },
  {
    link: "https://blog.ykrazy.top/",
    title: "shenlyy的存档点",
    img: "https://blog.ykrazy.top/avatar.jpg",
    desc: "随手存个档～",
  },
  {
    title: "伞菌の博客",
    link: "https://umb.ink",
    img: "https://umb.ink/static/img/ch.ico",
    desc: "闲鱼的生活记录"
  },
  {
    title: "冰糖 xh 的秘密基地",
    link: "https://www.bingtangxh.moe/",
    img: "https://wsrv.nl/?url=github.com/bingtangxh.png",
    desc: ""
  },
  {
    title: "吴先生の博客",
    link: "https://blog.ecylt.top/yllb.html",
    img: "https://wzhteam.s3-us-east-1.ossfiles.com/img/logo2.png",
    desc: ""
  },
  {
    title: "哈冬猪的小站",
    link: "https://hadongzhu.com",
    img: "https://assets.hadongzhu.com/avatar.webp",
    desc: "不是轨道，是旷野"
  },
  {
    title: "墨泽",
    link: "https://blog.imzy.ink/",
    img: "https://imzy.ink/blog/logo.jpg",
    desc: "生命不息 折腾不止"
  },
  {
    title: "天翔 TNXG の自留地",
    link: "https://tnxg.top/friends",
    img: "https://api-space.tnxg.top/avatar?s=qq",
    desc: ""
  },
  {
    title: "姓王者的博客",
    link: "https://xingwangzhe.fun/",
    img: "https://xingwangzhe.fun/avatar.webp?w=100",
    desc: ""
  },
  {
    title: "寒夏摸鱼站",
    link: "https://blog.rainiar.top",
    img: "https://gravatar.webp.se/avatar/1beae7b1b3ca799888552bfcf9930a4e",
    desc: "稀奇古怪技术集散地"
  },
  {
    title: "小城寒风",
    link: "https://blog.atago.moe",
    img: "https://blog.atago.moe/wp-content/uploads/2023/08/头像atago512隐写.png",
    desc: "驻足现实，仰望星空，率性而活"
  },
  {
    title: "希乐博客",
    link: "https://blog.xlenco.top/",
    img: "https://q.qlogo.cn/headimg_dl?dst_uin=1043865083&spec=640&img_type=webp",
    desc: "总有人间一两风，吹我十万八千梦"
  },
  {
    title: "幽默的小刘吖",
    link: "https://blog.lzch.top",
    img: "https://blog.lzch.top/favicon.png",
    desc: "每天分享不一样的知识内容"
  },
  {
    title: "peachRL的小站",
    link: "https://wanyijizi.com",
    img: "https://image.wanyijizi.com/00000000_封面/avatar.jpg",
    desc: "万亿及秭"
  },
  {
    title: "汐塔魔法屋",
    link: "https://blog.storical.space/",
    img: "https://blog.storical.space/images/icon.png",
    desc: "种下一颗有故事的种子，让它带着魔法和奇迹生根发芽"
  },
  {
    title: "洛屿的小站",
    link: "https://www.drluo.top/",
    img: "https://www.drluo.top/img/avatar.webp",
    desc: "嗨，靓仔，今天也要有个好心情哦！"
  },
  {
    title: "狐狸反走矣",
    link: "https://blog.southfox.me/",
    img: "https://blog.southfox.me/favicon.png",
    desc: ""
  },
  {
    title: "笔记星球",
    link: "https://note-star.cn/",
    img: "https://upload.note-star.cn/upload/1/user/avatar/97f800ed.png",
    desc: ""
  },
  {
    title: "狐言",
    link: "https://blog.dukefox.com/",
    img: "https://img13.360buyimg.com/ddimg/jfs/t1/165516/15/41553/45930/6556c328F55e3160d/189631a824f5e4a2.jpg",
    desc: ""
  },
  {
    title: "纱雾の闺房 - 不可进入の房间",
    link: "https://blog.dragon1573.wang/",
    img: "https://blog.dragon1573.wang/images/404.png",
    desc: ""
  },
  {
    title: "秋实-Allenyou 的小窝",
    link: "https://www.allenyou.wang/",
    img: "https://blog-oss.allenyou.top/avatar/59b2fbdd507a84fe181b0af3e4ad7be3",
    desc: "稻花香里说丰年，听取 WA 声一片"
  },
  {
    title: "纸鹿摸鱼处",
    link: "https://blog.zhilu.cyou/",
    desc: "纸鹿至麓不知路，支炉制露不止漉",
    img: "https://www.zhilu.cyou/api/avatar.png"
  },
  {
    title: "良的世界",
    link: "https://www.lemonary.cn/",
    desc: "忙点充实，闲点自在",
    img: "https://www.lemonary.cn/wp-content/uploads/2024/12/profile.jpg"
  },
  {
    title: "菲兹克斯喵",
    link: "https://physnya.top",
    desc: "Eclipse first, the rest nowhere.",
    img: "https://physnya.top/images/Physics_nya.jpg"
  },
  {
    title: "葱苓小筑",
    link: "https://blog.ciraos.top/",
    desc: "a small blog station.",
    img: "https://blog.ciraos.top/_next/image?url=https%3A%2F%2Fcdn.smartcis.cn%2Fgh%2Fciraos%2Fciraos-static%40main%2Fimg%2Favatar1.avif&w=640&q=75" // 注意：未提供有效图片
  },
  {
    title: "薄荷の小屋",
    link: "https://www.hoshiroko.com",
    desc: "越是拼命往前伸手，渴望之物越是渐行渐远",
    img: "https://api.hoshiroko.com/img/avatar.jpg"
  },
  {
    title: "路何求|创想工坊",
    link: "https://www.luheqiu.com",
    desc: "分享思考，分享创造，分享生活，分享热泪盈眶。",
    img: "https://cxbox.luheqiu.com/static/img/luheqiu_web.ico" 
  },
  {
    title: "钧言极客",
    link: "https://www.jinjun.top",
    desc: "记录生活、爱好学习、不爱折腾",
    img: "https://www.jinjun.top/img/avatar.jpg"
  },
  {
    title: "陈陈菌博客",
    link: "https://blog.glumi.cn/",
    desc: "",
    img: "https://blog.glumi.cn/favicon.ico"
  },
  {
    title: "陵长镜",
    link: "https://r1n.top",
    desc: "Everything collapses, but you rise.",
    img: "https://r1n.top/avatar_nr.jpg"
  },
  {
    title: "Lanke's blog",
    img: "https://gcore.jsdelivr.net/gh/Keduoli03/My_img@img/img/头像.jpg",
    desc: '请为一切不真实之物骄傲，因为我们高于这个世界！',
    link: 'https://www.blueke.top/',
  },
  {
    title: "远野千束的个人主页",
    link: "https://sfkm.me",
    desc: "远野千束的个人主页",
    img: "https://cdn.liteyuki.org/snowykami/avatar.jpg"
  },
  {
    title: "世上云川",
    link: "https://blog.ssyc.me",
    desc: "若有韶月熹微，愿作流萤徂岁。",
    img: "https://blog.ssyc.me/favicon.ico"
  },
  {
    title: "VnYzm的博客",
    link: "https://zimingyuan.github.io/",
    desc: "分享技术心得和摸鱼感想",
    img: "https://zimingyuan.github.io/img/profile.jpg"
  },
  {
    title: "Tigerの小窝",
    link: "https://tigercoder.top/",
    desc: "一位普通中学生编程爱好者的日常记录",
    img: "https://static.gridea.dev/55ce656d-1c22-43d7-b8a4-3e3f9ede9903/Zf6mKFy3H.jpeg"
  },
  {
    title: "xyx404's blog",
    link: "https://xyx404.github.io/",
    desc: "在努力和摆烂中选择了努力摆烂AWA",
    img: "https://fastly.jsdelivr.net/npm/xyx404blogphoto@1.2.23/avatar.webp"
  },
  {
    title: "fishcpy的小破站",
    link: "https://blog.fis.ink",
    desc: "非淡泊无以明志，非宁静无以致远",
    img: "https://www.fis.ink/img/logo.png"
  },
  {
    title: "Xeonzilla’s Note",
    link: "https://xeonzilla.top/",
    desc: "Yuri is life.",
    img: "https://xeonzilla.top/img/avatar.avif
  }
];

const randomLinks = computed(() => links.sort(() => Math.random() - 0.5));
</script>
