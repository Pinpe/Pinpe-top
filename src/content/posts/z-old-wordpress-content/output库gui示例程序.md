---
title: Output库GUI示例程序
published: 2024-10-18
category: '技术与科学'
---

try:
    # 导入库
    from outputs import *

    # 弹出考前提示
    start = iris.y_n('本考试有10道判断题，每道题10分，满分100分，考试过程中无法关闭程序。\n确定要考试吗？', title = '考前提示')
    exit(0) if not start else None

    # 主程序
    def main():
        # 初始化
        scores = 0

        # 考试中
        question = iris.y_n('前端三剑客包含Cascading Style Sheets。', title = '#1')
        scores += 10 if question else 0
        question = iris.y_n('Output库擅长编写GUI程序。', title = '#2')
        scores += 10 if not question else 0
        question = iris.y_n('Ruby是动态语言。', title = '#3')
        scores += 10 if question else 0
        question = iris.y_n('术力口文化发源自韩国，与流行明星息息相关。', title = '#4')
        scores += 10 if not question else 0
        question = iris.y_n('《暮しガスメータ》是r-906创作的歌曲。', title = '#5')
        scores += 10 if not question else 0
        question = iris.y_n('本软件使用PyQT编写。', title = '#6')
        scores += 10 if not question else 0
        question = iris.y_n('一个人工智能的智能达到了某种门槛，就应当受到适当的尊重。', title = '#7')
        scores += 10
        question = iris.y_n('Pinpe出生于2008年。', title = '#8')
        scores += 10 if question else 0
        question = iris.y_n('WebGAL是一款专门制作视觉小说的游戏引擎。', title = '#9')
        scores += 10 if question else 0
        question = iris.y_n('《OMORI》是Toby Fox制作的游戏。', title = '#10')
        scores += 10 if not question else 0

        # 弹出确认提交试卷提示
        end = iris.y_n_cancel('恭喜你完成了所有题目，是否提交试卷？\n\n&#91;是]确认交卷\n&#91;否]重新答题\n&#91;取消]关闭程序', title = '考试结束')
        if end is True:
            pass
        elif end is False:
            main()
        elif end is None:
            exit(0)

        # 弹出分数
        iris.info(f'你的分数为：{scores}\n感谢你的参与！', title='成绩单')

    # 运行主程序
    if __name__ == '__main__':
        main()
except Exception as err:
    traceback(err)