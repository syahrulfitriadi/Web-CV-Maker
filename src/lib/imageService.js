import imageCompression from 'browser-image-compression'

// Konfigurasi
const MAX_INPUT_SIZE_MB = 10      // Tolak file > 10MB langsung
const MAX_OUTPUT_SIZE_MB = 0.5    // Target kompresi: ~500KB (safety margin besar)
const MAX_DIMENSION = 800         // Resize ke max 800×800px
const QUALITY = 0.9               // JPEG quality 90% — tajam, hampir identik asli

/**
 * Validasi & kompres foto profil
 * @param {File} file — File gambar dari input
 * @returns {Promise<{ file: File, preview: string } | { error: string }>}
 */
export async function processProfilePhoto(file) {
  // 1. Validasi tipe file
  const validTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!validTypes.includes(file.type)) {
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

  // 3. Kompres & resize
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: MAX_OUTPUT_SIZE_MB,
      maxWidthOrHeight: MAX_DIMENSION,
      useWebWorker: true,
      initialQuality: QUALITY,
      fileType: 'image/jpeg', // Selalu output JPEG untuk konsistensi ukuran
    })

    // 4. Generate preview (base64) dari file yang SUDAH dikompres
    const preview = await imageCompression.getDataUrlFromFile(compressedFile)

    const originalKB = Math.round(file.size / 1024)
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
        reduction: Math.round((1 - compressedFile.size / file.size) * 100),
      },
    }
  } catch (err) {
    console.error('Image compression failed:', err)
    return {
      error: 'Gagal memproses gambar. Coba file lain.',
    }
  }
}
