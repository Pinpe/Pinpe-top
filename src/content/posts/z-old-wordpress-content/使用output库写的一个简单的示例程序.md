---
title: 使用Output库写的一个简单的示例程序
published: 2024-09-20
category: '技术与科学'
---

try:
    # 导入库
    from outputs import *

    # 程序初始化
    def init():
        config(pinkshell = True)
        clean.screen()

    # 登录
    def login():
        log.warn('请先登录！（密码为112233）')
        output.horizon()
        while True:
            password = keyboard('密码')
            if password == '112233':
                return None
            elif password == '':
                pass
            else:
                log.error('密码错误！')

    # 关于
    def readme():
        clean.screen()
        cursor.hide()
        about()
        keyboard(f'按{color.yellow}Enter{style.rst}退出...')
        cursor.show()
        main()

    # 计算
    def calc():
        clean.screen()
        try:
            all = int(keyboard('晚自习所有人数'))
            to = int(keyboard('晚自习实到人数'))
        except Exception:
            log.error('请输入整数！')
            keyboard(f'按{color.yellow}Enter{style.rst}重来...')
            calc()
        results = all - to
        cursor.hide()
        output.bar('正在计算', '计算完成', 5)
        clean.screen()
        output.horizon()
        output.li(&#91;
            f'应到：{color.yellow}{all}{style.rst}人',
            f'实到：{color.yellow}{to}{style.rst}人'
        ])
        output.horizon()
        output.echo(f'有{color.yellow}{results}{style.rst}人未到！')
        output.horizon()
        keyboard(f'按{color.yellow}Enter{style.rst}退出...')
        cursor.show()
        main()

    # 主菜单
    def main():
        clean.screen()
        output.horizon()
        output.echo(f'{color.yellow}欢迎使用晚自习人数计算系统！{style.rst}\n')
        output.li(&#91;
            '这是Output库的一个示例程序。',
            '里面涵盖了一些功能。',
            '对学习和体验有帮助。'
        ])
        output.horizon()
        output.echo(f'{color.yellow}W{style.rst}和{color.yellow}S{style.rst}选择，{color.yellow}Enter{style.rst}确定\n')
        output.menu(
            &#91;' 计算 ', ' 关于 ', ' 退出 '],
            &#91;calc, readme, lambda: log.fatal('已退出！')]
        )

    # 主程序
    if __name__ == '__main__':
        init()
        login()
        main()
except Exception as err:
    traceback(err)