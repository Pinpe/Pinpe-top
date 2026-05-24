import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const MAX_WIDTH = 1200
const QUALITY = 80
const CONTENT_GLOB = 'src/content/posts/**/*.{png,jpg,jpeg}'

export default function imageOptimizerIntegration() {
  return {
    name: 'image-optimizer',
    hooks: {
      'astro:build:start': async () => {
        const root = fileURLToPath(new URL('../..', import.meta.url))
        const contentDir = path.join(root, 'src', 'content', 'posts')
        if (!fs.existsSync(contentDir)) return

        const images = findImages(contentDir)
        let converted = 0
        let skipped = 0

        for (const imgPath of images) {
          const ext = path.extname(imgPath).toLowerCase()
          if (!/\.(png|jpe?g)$/i.test(ext)) continue

          const webpPath = imgPath.replace(/\.(png|jpe?g)$/i, '.webp')
          const sourceTime = fs.statSync(imgPath).mtimeMs
          const webpTime = fs.existsSync(webpPath) ? fs.statSync(webpPath).mtimeMs : 0

          if (webpTime > sourceTime) {
            skipped++
            continue
          }

          try {
            await sharp(imgPath)
              .resize({ width: MAX_WIDTH, withoutEnlargement: true })
              .webp({ quality: QUALITY })
              .toFile(webpPath)
            converted++
          } catch (err) {
            console.error(`  [image-optimizer] ✗ ${path.relative(contentDir, imgPath)}: ${err.message}`)
          }
        }

        if (converted > 0 || skipped > 0) {
          console.log(`  [image-optimizer] ${converted} converted, ${skipped} cached`)
        }
      },
    },
  }
}

function findImages(dir) {
  const results = []
  function walk(d) {
    const entries = fs.readdirSync(d, { withFileTypes: true })
    for (const e of entries) {
      const full = path.join(d, e.name)
      if (e.isDirectory()) {
        walk(full)
      } else if (/\.(png|jpe?g)$/i.test(e.name)) {
        results.push(full)
      }
    }
  }
  walk(dir)
  return results
}
