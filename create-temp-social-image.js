import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Simple script to copy and rename the image while we create a proper social version
const sourcePath = path.join(__dirname, 'public', 'images', 'Reflecting-01.png')
const targetPath = path.join(__dirname, 'public', 'images', 'Reflecting-01-social.png')

try {
  // For now, copy the original image to the social version
  // This will at least make the reference work
  fs.copyFileSync(sourcePath, targetPath)
  console.log('✅ Created Reflecting-01-social.png (temporary copy)')
  console.log('📝 Now you can use the social image generator to create a properly padded version')
} catch (error) {
  console.error('❌ Error creating social image:', error)
}
