const FOOTNOTE_HEADING_ID = 'footnote-label'

/**
 * remark-gfm 会在文章末尾自动生成脚注区，并配一个 sr-only 的
 * <h2 id="footnote-label">Footnotes</h2>。这个英文标题会作为一条普通标题
 * 混进侧边栏目录，所以在渲染结果里把它改成中文。
 *
 * @param {string} label 脚注区标题的显示文字
 */
export function rehypeFootnoteLabel(label = '脚注') {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element' && node.properties?.id === FOOTNOTE_HEADING_ID) {
        node.children = [{ type: 'text', value: label }]
        return
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) walk(child)
      }
    }
    walk(tree)
  }
}
