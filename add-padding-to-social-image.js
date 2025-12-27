import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
import path from 'path'

async function addPaddingToImage() {
  try {
    // Paths
    const originalImagePath = './public/images/Reflecting-01.png'
    const socialImagePath = './public/images/Reflecting-01-social.png'

    console.log('📸 Loading original image...')
    const originalImage = await loadImage(originalImagePath)

    // Social media optimal dimensions
    const CANVAS_WIDTH = 1200
    const CANVAS_HEIGHT = 630
    const PADDING = 80

    // Create canvas
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    const ctx = canvas.getContext('2d')

    // Fill background with white
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Calculate image dimensions with padding
    const availableWidth = CANVAS_WIDTH - PADDING * 2
    const availableHeight = CANVAS_HEIGHT - PADDING * 2

    // Calculate scale to fit image within available space while maintaining aspect ratio
    const scale = Math.min(
      availableWidth / originalImage.width,
      availableHeight / originalImage.height
    )

    const scaledWidth = originalImage.width * scale
    const scaledHeight = originalImage.height * scale

    // Center the image
    const x = (CANVAS_WIDTH - scaledWidth) / 2
    const y = (CANVAS_HEIGHT - scaledHeight) / 2

    // Draw the image
    ctx.drawImage(originalImage, x, y, scaledWidth, scaledHeight)

    // Save the padded image
    console.log('💾 Saving padded social image...')
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(socialImagePath, buffer)

    console.log('✅ Successfully created padded social image!')
    console.log(`📍 Saved to: ${socialImagePath}`)
    console.log(`📏 Dimensions: ${CANVAS_WIDTH}x${CANVAS_HEIGHT} with ${PADDING}px padding`)

    // Get file sizes for comparison
    const originalStats = fs.statSync(originalImagePath)
    const socialStats = fs.statSync(socialImagePath)

    console.log(`📊 Original: ${Math.round(originalStats.size / 1024)}KB`)
    console.log(`📊 Social: ${Math.round(socialStats.size / 1024)}KB`)
  } catch (error) {
    console.error('❌ Error processing image:', error.message)
    process.exit(1)
  }
}

addPaddingToImage()
