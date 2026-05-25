import { siteConfig } from '@/config'
import rss from '@astrojs/rss'
import { getSortedPosts } from '@utils/content-utils'
import type { APIContext } from 'astro'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

const parser = new MarkdownIt()

export const prerender = false

function renderHtml(blog: Awaited<ReturnType<typeof getSortedPosts>>, site: string) {
  const items = blog.map(post => {
    const content = sanitizeHtml(parser.render(post.body || ''), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    })
    return {
      title: post.data.title,
      url: `${site}posts/${post.slug}/`,
      date: post.data.published.toISOString().slice(0, 10),
      description: post.data.description || '',
      content,
    }
  })

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${siteConfig.title} - RSS</title>
<style>
  :root {
    --hue: 250;
    --page-bg: oklch(0.95 0.01 var(--hue));
    --card-bg: white;
    --primary: oklch(0.70 0.14 var(--hue));
    --text: oklch(0.25 0.02 var(--hue));
    --text-secondary: oklch(0.45 0.02 var(--hue));
    --radius: 1rem;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --page-bg: oklch(0.16 0.014 var(--hue));
      --card-bg: oklch(0.23 0.015 var(--hue));
      --primary: oklch(0.75 0.14 var(--hue));
      --text: oklch(0.85 0.01 var(--hue));
      --text-secondary: oklch(0.65 0.01 var(--hue));
    }
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: var(--page-bg);
    font-family: Roboto, system-ui, -apple-system, sans-serif;
    color: var(--text);
    min-height: 100vh;
  }
  .container { max-width: 48rem; margin: 0 auto; padding: 3rem 1.5rem; }
  h1 { font-size: 2rem; font-weight: 700; color: var(--primary); margin-bottom: 0.25rem; }
  .subtitle { font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
  .notice {
    font-size: 0.9rem; color: var(--text-secondary);
    background: var(--card-bg); border-radius: var(--radius);
    padding: 0.75rem 1rem; margin-bottom: 1.5rem;
    border-left: 3px solid var(--primary);
  }
  .section-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem; }
  .item {
    background: var(--card-bg); border-radius: var(--radius);
    padding: 1.25rem 1.5rem; margin-bottom: 0.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: box-shadow 0.15s;
  }
  .item:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
  .item h2 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.25rem; }
  .item h2 a { color: var(--text); text-decoration: none; }
  .item h2 a:hover { color: var(--primary); }
  .item time { font-size: 0.85rem; color: var(--text-secondary); }
  .item .desc { font-size: 0.92rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.6; }
  footer { text-align: center; margin-top: 2rem; font-size: 0.85rem; color: var(--text-secondary); opacity: 0.6; }
</style>
</head>
<body>
<div class="container">
  <h1>${siteConfig.title}</h1>
  <p class="subtitle">${siteConfig.subtitle || ''}</p>
  <div class="notice">
    此页面是 RSS 订阅源，你可以直接复制本页地址到 RSS 阅读器中订阅。
  </div>
  <p class="section-title">文章列表</p>
  ${items.map(item => `
  <div class="item">
    <h2><a href="${item.url}">${item.title}</a></h2>
    <time>${item.date}</time>
    ${item.description ? `<p class="desc">${item.description}</p>` : ''}
  </div>
  `).join('')}
  <footer>${siteConfig.title} · RSS 订阅</footer>
</div>
</body>
</html>`
}

export async function GET(context: APIContext) {
  const blog = await getSortedPosts()
  const accept = context.request.headers.get('accept') || ''

  // 浏览器请求 → 返回 HTML 页面
  if (accept.includes('text/html')) {
    return new Response(renderHtml(blog, context.site?.href ?? 'https://pinpe.top/'), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  // RSS 阅读器 → 返回原始 XML
  const response = await rss({
    title: siteConfig.title,
    description: siteConfig.subtitle || 'No description',
    site: context.site ?? 'https://fuwari.vercel.app',
    items: blog.map(post => ({
      title: post.data.title,
      pubDate: post.data.published,
      description: post.data.description || '',
      link: `/posts/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body || ''), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    })),
    customData: `<language>${siteConfig.lang}</language>`,
  })

  const xml = await response.text()
  const styledXml = xml.replace(
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/css" href="/rss-styles.css"?>',
  )
  return new Response(styledXml, {
    status: 200,
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
