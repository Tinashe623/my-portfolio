import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const IMAGE_DIR = path.join(process.cwd(), 'public', 'images')

const imagesToOptimize = [
  { input: 'hero.jpg', output: 'hero.webp', sizes: [1920] },
  { input: 'profile-pic.jpg', output: 'profile-pic.webp', sizes: [340, 680] },
  { input: 'projects/clock-preview.png', output: 'projects/clock-preview.webp', sizes: [400, 800] },
  { input: 'projects/todo-preview.png', output: 'projects/todo-preview.webp', sizes: [400, 800] },
  { input: 'projects/temp-preview.png', output: 'projects/temp-preview.webp', sizes: [400, 800] },
  { input: 'projects/gmp-preview.png', output: 'projects/gmp-preview.webp', sizes: [400, 800] },
  { input: 'projects/reigns-preview.png', output: 'projects/reigns-preview.webp', sizes: [400, 800] },
  { input: 'projects/rubble-removal-preview.png', output: 'projects/rubble-removal-preview.webp', sizes: [400, 800] },
  { input: 'projects/st-james-zongoro-preview.png', output: 'projects/st-james-zongoro-preview.webp', sizes: [400, 800] },
  { input: 'projects/tarie-cakes-preview.png', output: 'projects/tarie-cakes-preview.webp', sizes: [400, 800] },
]

async function optimizeImage(inputPath, outputPath, sizes) {
  const fullInput = path.join(IMAGE_DIR, inputPath)
  const fullOutput = path.join(IMAGE_DIR, outputPath)

  if (!fs.existsSync(fullInput)) {
    console.log(`❌ Not found: ${inputPath}`)
    return
  }

  const stats = fs.statSync(fullInput)
  console.log(`\n📁 ${inputPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`)

  try {
    const image = sharp(fullInput)
    const resizeOptions = sizes ? { width: sizes[0] } : {}

    await image
      .resize(resizeOptions)
      .webp({ quality: 80, lossless: false })
      .toFile(fullOutput)

    const newStats = fs.statSync(fullOutput)
    const saved = stats.size - newStats.size
    const percent = ((saved / stats.size) * 100).toFixed(1)

    console.log(`   ✅ WebP: ${outputPath} (${(newStats.size / 1024).toFixed(0)} KB)`)
    console.log(`   💾 Saved: ${(saved / 1024).toFixed(0)} KB (${percent}%)`)

    if (sizes && sizes[1]) {
      const retinaOutput = fullOutput.replace('.webp', `@2x.webp`)
      await sharp(fullInput)
        .resize({ width: sizes[1] })
        .webp({ quality: 80 })
        .toFile(retinaOutput)
      console.log(`   📱 2x: ${path.basename(retinaOutput)}`)
    }
  } catch (err) {
    console.error(`   ❌ Error: ${err.message}`)
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n')

  for (const img of imagesToOptimize) {
    await optimizeImage(img.input, img.output, img.sizes)
  }

  console.log('\n✨ Optimization complete!')
  console.log('\n📝 Next steps:')
  console.log('1. Update your components to use .webp files')
  console.log('2. Remove old .png/.jpg files from public/images/')
  console.log('3. Add width/height and loading="lazy" attributes to images')
  console.log('4. Update serviceWorker.js precache list to use .webp\n')
}

main().catch(console.error)
