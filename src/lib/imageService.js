import imageCompression from 'browser-image-compression'

// Konfigurasi
const MAX_INPUT_SIZE_MB = 10      // Tolak file > 10MB langsung
const MAX_OUTPUT_SIZE_MB = 0.5    // Target kompresi: ~500KB (safety margin besar)
const MAX_DIMENSION = 800         // Resize ke max 800×800px
const QUALITY = 0.9               // JPEG quality 90% — tajam, hampir identik asli

/**
 * Fallback compression menggunakan Canvas API jika browser-image-compression gagal.
 * Lebih reliable di mobile browser.
 */
function compressWithCanvas(file, maxDimension = MAX_DIMENSION, quality = QUALITY) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        try {
          // Calculate new dimensions
          let { width, height } = img
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width)
              width = maxDimension
            } else {
              width = Math.round((width * maxDimension) / height)
              height = maxDimension
            }
          }

          // Draw to canvas
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, width, height)
          ctx.drawImage(img, 0, 0, width, height)

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Canvas toBlob failed'))
                return
              }
              const compressedFile = new File([blob], file.name || 'photo.jpg', {
                type: 'image/jpeg',
              })
              resolve(compressedFile)
            },
            'image/jpeg',
            quality
          )
        } catch (err) {
          reject(err)
        }
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target.result
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Generate base64 data URL dari file
 */
function getDataUrlFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Validasi & kompres foto profil
 * @param {File} file — File gambar dari input
 * @returns {Promise<{ file: File, preview: string } | { error: string }>}
 */
export async function processProfilePhoto(file) {
  // 1. Validasi tipe file (dengan fallback ke extension untuk mobile browser)
  // Mobile browsers sering mengembalikan file.type kosong atau non-standard
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif']

  const fileType = (file.type || '').toLowerCase()
  const fileName = (file.name || '').toLowerCase()
  const hasValidType = fileType !== '' && validTypes.includes(fileType)
  const hasValidExt = validExtensions.some(ext => fileName.endsWith(ext))

  // Accept if EITHER MIME type OR file extension is valid (mobile fallback)
  // Also accept if file type starts with 'image/' (catch-all for unusual mobile formats)
  if (!hasValidType && !hasValidExt && !fileType.startsWith('image/')) {
    return {
      error: `Format tidak didukung (${file.type || 'unknown'}). Gunakan JPG, PNG, atau WebP.`,
    }
  }

  // 2. Validasi ukuran awal (tolak yang sangat besar)
  const sizeMB = file.size / (1024 * 1024)
  if (sizeMB > MAX_INPUT_SIZE_MB) {
    return {
      error: `Ukuran file terlalu besar (${sizeMB.toFixed(1)}MB). Maksimal ${MAX_INPUT_SIZE_MB}MB.`,
    }
  }

  // 3. Kompres & resize — coba browser-image-compression dulu, fallback ke Canvas API
  const originalKB = Math.round(file.size / 1024)

  try {
    let compressedFile

    try {
      // Primary: browser-image-compression (useWebWorker disabled for mobile reliability)
      compressedFile = await imageCompression(file, {
        maxSizeMB: MAX_OUTPUT_SIZE_MB,
        maxWidthOrHeight: MAX_DIMENSION,
        useWebWorker: false,  // WebWorker sering gagal di mobile
        initialQuality: QUALITY,
        fileType: 'image/jpeg',
      })
    } catch (primaryErr) {
      console.warn('Primary compression failed, using Canvas fallback:', primaryErr)
      // Fallback: Canvas API (lebih reliable di mobile)
      compressedFile = await compressWithCanvas(file, MAX_DIMENSION, QUALITY)
    }

    // 4. Generate preview (base64) dari file yang SUDAH dikompres
    const preview = await getDataUrlFromFile(compressedFile)

    const compressedKB = Math.round(compressedFile.size / 1024)

    console.log(
      `📷 Photo compressed: ${originalKB}KB → ${compressedKB}KB ` +
      `(${Math.round((1 - compressedFile.size / file.size) * 100)}% reduced)`
    )

    return {
      file: compressedFile,
      preview,
      meta: {
        originalSize: originalKB,
        compressedSize: compressedKB,
        reduction: Math.max(0, Math.round((1 - compressedFile.size / file.size) * 100)),
      },
    }
  } catch (err) {
    console.error('All image compression methods failed:', err)

    // Last resort: jika kompresi gagal, coba gunakan file asli sebagai preview
    try {
      const preview = await getDataUrlFromFile(file)
      console.log('📷 Using original file as fallback (no compression)')
      return {
        file: file,
        preview,
        meta: {
          originalSize: originalKB,
          compressedSize: originalKB,
          reduction: 0,
        },
      }
    } catch {
      return {
        error: 'Gagal memproses gambar. Coba file lain atau foto dari galeri.',
      }
    }
  }
}
