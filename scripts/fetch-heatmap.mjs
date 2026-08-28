#!/usr/bin/env node
// 抓取 GitHub 贡献数据为博客同源静态资源。
// 原因：访客浏览器直接拉 raw.githubusercontent.com 需要翻墙；本脚本在构建/开发前把
// data.json 落到 public/data/，Astro 会将其伺服为同源路径 /data/github-contributions.json，
// 访客访问博客域名即可拿到，无需翻墙。
// 容错：抓取失败只告警不中断构建/开发——保留上次快照，客户端脚本仍有 raw 回退。

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = 'https://raw.githubusercontent.com/Pinpe/github-contributions/main/data.json'
const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'data',
  'github-contributions.json',
)

try {
  const res = await fetch(SRC, { signal: AbortSignal.timeout(15000) })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  const data = await res.json()
  if (!data || !Array.isArray(data.contributions)) throw new Error('bad data shape')
  await mkdir(dirname(OUT), { recursive: true })
  await writeFile(OUT, JSON.stringify(data))
  console.log('[fetch-heatmap] ok:', data.contributions.length, 'days ->', OUT)
} catch (e) {
  // 不中断构建/dev；文件缺失或旧时，客户端自动回退 raw 或隐藏
  console.warn('[fetch-heatmap] 抓取失败，保留已有快照:', e.message)
}
