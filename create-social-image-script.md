# Social Image Generator Script

This script creates a properly padded social media image (1200x630px) from your existing image.

## Quick Fix Option 1: Use Canvas API in Browser Console

1. Open your browser's developer console
2. Go to any page that loads your image
3. Run this code:

```javascript
// Create a canvas for the social image
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

// Set optimal social media dimensions
canvas.width = 1200
canvas.height = 630

// Create the image
const img = new Image()
img.crossOrigin = 'anonymous'
img.onload = function () {
  // Fill background with a nice gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, '#667eea')
  gradient.addColorStop(1, '#764ba2')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Calculate centered position with padding
  const padding = 80 // Top/bottom padding
  const sidePadding = 100 // Left/right padding

  const availableWidth = canvas.width - sidePadding * 2
  const availableHeight = canvas.height - padding * 2

  // Calculate scaling to fit image in available space
  const imgAspect = img.width / img.height
  const availableAspect = availableWidth / availableHeight

  let drawWidth, drawHeight
  if (imgAspect > availableAspect) {
    drawWidth = availableWidth
    drawHeight = drawWidth / imgAspect
  } else {
    drawHeight = availableHeight
    drawWidth = drawHeight * imgAspect
  }

  // Center the image
  const x = (canvas.width - drawWidth) / 2
  const y = (canvas.height - drawHeight) / 2

  // Add white background behind image
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
  ctx.roundRect(x - 20, y - 20, drawWidth + 40, drawHeight + 40, 12)
  ctx.fill()

  // Draw the image
  ctx.drawImage(img, x, y, drawWidth, drawHeight)

  // Add title overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
  ctx.roundRect(60, canvas.height - 120, canvas.width - 120, 80, 8)
  ctx.fill()

  // Add title text
  ctx.fillStyle = '#2d3748'
  ctx.font = 'bold 28px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Reflecting on 2025: LLM-Centric Development', canvas.width / 2, canvas.height - 70)

  ctx.font = '18px Arial, sans-serif'
  ctx.fillStyle = '#4a5568'
  ctx.fillText('ajeetkumarsingh.tech', canvas.width / 2, canvas.height - 40)

  // Download the result
  const link = document.createElement('a')
  link.download = 'Reflecting-01-social.png'
  link.href = canvas.toDataURL('image/png')
  link.click()

  console.log('Social image generated and downloaded!')
}

// Load your image (update this URL if needed)
img.src = 'https://ajeetkumarsingh.tech/images/Reflecting-01.png'

// Polyfill for roundRect if needed
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, radius) {
    this.beginPath()
    this.moveTo(x + radius, y)
    this.lineTo(x + w - radius, y)
    this.quadraticCurveTo(x + w, y, x + w, y + radius)
    this.lineTo(x + w, y + h - radius)
    this.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
    this.lineTo(x + radius, y + h)
    this.quadraticCurveTo(x, y + h, x, y + h - radius)
    this.lineTo(x, y + radius)
    this.quadraticCurveTo(x, y, x + radius, y)
    this.closePath()
  }
}
```

## Quick Fix Option 2: Temporary Fallback

While creating the padded image, temporarily use a different approach by adding multiple og:image tags with different dimensions.
