#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses PNG/JPG images to WebP and creates responsive sizes
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Requirements:
 *   npm install sharp
 *   (or use: npx sharp-cli input.png -o output.webp)
 */

const fs = require('fs')
const path = require('path')

// Check if sharp is available
let sharp
try {
  sharp = require('sharp')
} catch (_e) {
  console.log('⚠️  Sharp not installed. Install with: npm install sharp')
  console.log('Falling back to file copying...\n')
}

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images')
// const PROJECTS_DIR = path.join(IMAGE_DIR, 'projects') // Reserved for future use

const imagesToOptimize = [
  // Profile picture (already converted to jpg, but can be compressed)
  { input: 'profile-pic.jpg', output: 'profile-pic.webp', sizes: [340, 680] },

  // Project images - target WebP with multiple sizes
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

  if (!sharp) {
    // Just copy if sharp not available
    fs.copyFileSync(fullInput, fullOutput)
    console.log(`   Copied to ${outputPath} (sharp not available for compression)`)
    return
  }

  try {
    // Create WebP version (lossless or lossy with quality 80)
    const image = sharp(fullInput)
    // Resize to max width, maintain aspect ratio
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

    // Also create 2x version for retina
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
