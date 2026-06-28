import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const MAX_WIDTH = 1200
const QUALITY = 80

export default function imageOptimizerIntegration() {
  return {
    name: 'image-optimizer',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distDir = fileURLToPath(dir)
        if (!fs.existsSync(distDir)) return

        // Find all webp images in dist
        const images = findWebp(distDir)
        let resized = 0
        let skipped = 0
        let saved = 0

        for (const imgPath of images) {
          try {
            const metadata = await sharp(imgPath).metadata()
            const width = metadata.width || 0

            // Skip if already within target width
            if (width <= MAX_WIDTH) {
              skipped++
              continue
            }

            const originalSize = fs.statSync(imgPath).size

            // Resize to a temp file, then replace original
            const tmpPath = imgPath + '.tmp'
            await sharp(imgPath)
              .resize({ width: MAX_WIDTH, withoutEnlargement: true })
              .webp({ quality: QUALITY })
              .toFile(tmpPath)

            const newSize = fs.statSync(tmpPath).size
            fs.renameSync(tmpPath, imgPath)
            saved += originalSize - newSize
            resized++
          } catch (err) {
            console.error(`  [image-optimizer] ✗ ${path.relative(distDir, imgPath)}: ${err.message}`)
          }
        }

        if (resized > 0) {
          const savedMB = (saved / (1024 * 1024)).toFixed(1)
          console.log(`  [image-optimizer] ${resized} resized, ${skipped} skipped (saved ${savedMB} MB)`)
        }
      },
    },
  }
}

function findWebp(dir) {
  const results = []
  function walk(d) {
    let entries
    try {
      entries = fs.readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.')) continue
      const full = path.join(d, e.name)
      if (e.isDirectory()) {
        walk(full)
      } else if (e.name.endsWith('.webp')) {
        results.push(full)
      }
    }
  }
  walk(dir)
  return results
}
