import { supabase } from './supabaseClient'

/**
 * Fetch all resumes belonging to a user
 */
export async function fetchResumes(userId) {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Fetch a single resume by ID
 */
export async function fetchResumeById(resumeId) {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', resumeId)
    .single()

  if (error) throw error
  return data
}

/**
 * Create a new resume
 */
export async function createResume(userId, resumeData) {
  const { data, error } = await supabase
    .from('resumes')
    .insert({
      user_id: userId,
      title: resumeData.title || `CV ${new Date().toLocaleDateString('id-ID')}`,
      template_id: resumeData.selectedTemplate || 'classic',
      theme_color: resumeData.themeColor || '#0ea5e9',
      font_family: resumeData.fontFamily || 'inter',
      cv_language: resumeData.cvLanguage || 'id',
      photo_path: resumeData.photoPath || null,
      content: {
        personalInfo: {
          ...resumeData.personalInfo,
          photo: undefined,       // Don't store File object
          photoPreview: undefined, // Don't store base64 in DB
        },
        summary: resumeData.summary,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        certifications: resumeData.certifications,
      },
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update an existing resume
 */
export async function updateResume(resumeId, resumeData) {
  const { data, error } = await supabase
    .from('resumes')
    .update({
      title: resumeData.title,
      template_id: resumeData.selectedTemplate,
      theme_color: resumeData.themeColor,
      font_family: resumeData.fontFamily,
      cv_language: resumeData.cvLanguage,
      photo_path: resumeData.photoPath || null,
      content: {
        personalInfo: {
          ...resumeData.personalInfo,
          photo: undefined,
          photoPreview: undefined,
        },
        summary: resumeData.summary,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        certifications: resumeData.certifications,
      },
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Delete a resume
 */
export async function deleteResume(resumeId) {
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', resumeId)

  if (error) throw error
  return true
}
