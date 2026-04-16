import { supabase } from './supabaseClient'

const BUCKET = 'cv-photos'

/**
 * Upload a photo to Supabase Storage
 * Files are stored under: cv-photos/{userId}/{filename}
 */
export async function uploadPhoto(userId, file) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `${userId}/${fileName}`

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error

  // Return the public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(data.path)

  return {
    path: data.path,
    publicUrl: urlData.publicUrl,
  }
}

/**
 * Delete a photo from Supabase Storage
 */
export async function deletePhoto(filePath) {
  if (!filePath) return

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([filePath])

  if (error) throw error
  return true
}

/**
 * Get the public URL for a stored photo
 */
export function getPhotoUrl(filePath) {
  if (!filePath) return null

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filePath)

  return data.publicUrl
}
