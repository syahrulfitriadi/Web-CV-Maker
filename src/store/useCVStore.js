import { create } from 'zustand'
import { getDummyData } from '../utils/dummyData'
import { createResume, updateResume } from '../lib/resumeService'
import { uploadPhoto, getPhotoUrl } from '../lib/storageService'

const defaultCV = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    photo: null,
    photoPreview: null,
    photoCrop: { scale: 1.2, posX: 50, posY: 20 },
  },
  summary: '',
  experience: [
    {
      id: crypto.randomUUID(),
      company: '',
      location: '',
      role: '',
      type: 'Full-time',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      gpa: '',
      startDate: '',
      endDate: '',
    },
  ],
  skills: {
    hard: [''],
    soft: [''],
  },
  certifications: [''],
  selectedTemplate: 'classic',
  themeColor: '#0ea5e9',
  fontFamily: 'inter',
  cvLanguage: 'id',
  currentStep: 0,
  _isDummyFilled: false,
  // Cloud sync state
  resumeId: null,       // ID of resume in Supabase (null = not saved yet)
  photoPath: null,      // Path of photo in Supabase Storage
  isSaving: false,
  saveError: null,
  lastSavedAt: null,
}

export const useCVStore = create((set, get) => ({
  ...defaultCV,

  // Navigation
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

  // Personal Info
  setPersonalInfo: (field, value) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, [field]: value },
    })),

  setPhoto: (file) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        set((state) => ({
          personalInfo: {
            ...state.personalInfo,
            photo: file,
            photoPreview: reader.result,
            photoCrop: { scale: 1.2, posX: 50, posY: 20 },
          },
        }))
      }
      reader.readAsDataURL(file)
    }
  },

  setPhotoCrop: (crop) =>
    set((state) => ({
      personalInfo: {
        ...state.personalInfo,
        photoCrop: { ...state.personalInfo.photoCrop, ...crop },
      },
    })),

  // Summary
  setSummary: (text) => set({ summary: text }),

  // Experience
  addExperience: () =>
    set((state) => ({
      experience: [
        ...state.experience,
        {
          id: crypto.randomUUID(),
          company: '',
          location: '',
          role: '',
          type: 'Full-time',
          startDate: '',
          endDate: '',
          current: false,
          bullets: [''],
        },
      ],
    })),

  removeExperience: (id) =>
    set((state) => ({
      experience: state.experience.filter((exp) => exp.id !== id),
    })),

  updateExperience: (id, field, value) =>
    set((state) => ({
      experience: state.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    })),

  addBullet: (expId) =>
    set((state) => ({
      experience: state.experience.map((exp) =>
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
      ),
    })),

  updateBullet: (expId, index, value) =>
    set((state) => ({
      experience: state.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              bullets: exp.bullets.map((b, i) => (i === index ? value : b)),
            }
          : exp
      ),
    })),

  removeBullet: (expId, index) =>
    set((state) => ({
      experience: state.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, bullets: exp.bullets.filter((_, i) => i !== index) }
          : exp
      ),
    })),

  // Education
  addEducation: () =>
    set((state) => ({
      education: [
        ...state.education,
        {
          id: crypto.randomUUID(),
          institution: '',
          degree: '',
          field: '',
          gpa: '',
          startDate: '',
          endDate: '',
        },
      ],
    })),

  removeEducation: (id) =>
    set((state) => ({
      education: state.education.filter((edu) => edu.id !== id),
    })),

  updateEducation: (id, field, value) =>
    set((state) => ({
      education: state.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    })),

  // Skills
  addSkill: (type) =>
    set((state) => ({
      skills: { ...state.skills, [type]: [...state.skills[type], ''] },
    })),

  updateSkill: (type, index, value) =>
    set((state) => ({
      skills: {
        ...state.skills,
        [type]: state.skills[type].map((s, i) => (i === index ? value : s)),
      },
    })),

  removeSkill: (type, index) =>
    set((state) => ({
      skills: {
        ...state.skills,
        [type]: state.skills[type].filter((_, i) => i !== index),
      },
    })),

  // Certifications
  addCertification: () =>
    set((state) => ({
      certifications: [...state.certifications, ''],
    })),

  updateCertification: (index, value) =>
    set((state) => ({
      certifications: state.certifications.map((c, i) => (i === index ? value : c)),
    })),

  removeCertification: (index) =>
    set((state) => ({
      certifications: state.certifications.filter((_, i) => i !== index),
    })),

  // Template & Theme
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  setThemeColor: (color) => set({ themeColor: color }),
  setFontFamily: (font) => set({ fontFamily: font }),

  // Language — auto-refills dummy data when switching if dummy is active
  setCvLanguage: (lang) => {
    const state = get()
    if (state._isDummyFilled) {
      const d = getDummyData(lang)
      set({
        cvLanguage: lang,
        personalInfo: {
          ...d.personalInfo,
          // Preserve user photo if they uploaded one
          photo: state.personalInfo.photo,
          photoPreview: state.personalInfo.photoPreview,
          photoCrop: state.personalInfo.photoCrop,
        },
        summary: d.summary,
        experience: d.experience,
        education: d.education,
        skills: d.skills,
        certifications: d.certifications,
      })
    } else {
      set({ cvLanguage: lang })
    }
  },

  // DEV: Auto-fill dummy data (uses current language)
  fillDummyData: () => {
    const lang = get().cvLanguage
    const d = getDummyData(lang)
    set({
      ...d,
      _isDummyFilled: true,
    })
  },

  // Cloud actions
  setResumeId: (id) => set({ resumeId: id }),

  saveToCloud: async (userId) => {
    const state = get()
    set({ isSaving: true, saveError: null })

    try {
      let photoPath = state.photoPath

      // Upload photo to Supabase Storage if there's a new local file
      if (state.personalInfo.photo && state.personalInfo.photo instanceof File) {
        const result = await uploadPhoto(userId, state.personalInfo.photo)
        photoPath = result.path
        set({ photoPath })
      }

      const resumeData = {
        title: state.personalInfo.name || `CV ${new Date().toLocaleDateString('id-ID')}`,
        selectedTemplate: state.selectedTemplate,
        themeColor: state.themeColor,
        fontFamily: state.fontFamily,
        cvLanguage: state.cvLanguage,
        photoPath,
        personalInfo: state.personalInfo,
        summary: state.summary,
        experience: state.experience,
        education: state.education,
        skills: state.skills,
        certifications: state.certifications,
      }

      let savedResume
      if (state.resumeId) {
        // Update existing
        savedResume = await updateResume(state.resumeId, resumeData)
      } else {
        // Create new
        savedResume = await createResume(userId, resumeData)
      }

      set({
        resumeId: savedResume.id,
        isSaving: false,
        lastSavedAt: new Date().toISOString(),
      })

      return { success: true, resumeId: savedResume.id }
    } catch (err) {
      set({ isSaving: false, saveError: err.message })
      return { success: false, error: err.message }
    }
  },

  loadFromCloud: (resume) => {
    const content = resume.content || {}
    const personalInfo = content.personalInfo || defaultCV.personalInfo

    // If there's a photo stored in Supabase Storage, get its public URL
    let photoPreview = null
    if (resume.photo_path) {
      photoPreview = getPhotoUrl(resume.photo_path)
    }

    set({
      resumeId: resume.id,
      selectedTemplate: resume.template_id || 'classic',
      themeColor: resume.theme_color || '#0ea5e9',
      fontFamily: resume.font_family || 'inter',
      cvLanguage: resume.cv_language || 'id',
      photoPath: resume.photo_path || null,
      personalInfo: {
        ...defaultCV.personalInfo,
        ...personalInfo,
        photo: null, // File objects can't be stored, will be null
        photoPreview: photoPreview,
      },
      summary: content.summary || '',
      experience: content.experience || defaultCV.experience,
      education: content.education || defaultCV.education,
      skills: content.skills || defaultCV.skills,
      certifications: content.certifications || defaultCV.certifications,
      _isDummyFilled: false,
      lastSavedAt: resume.updated_at,
    })
  },

  // Reset
  resetCV: () => set({ ...defaultCV, _isDummyFilled: false, currentStep: 0, resumeId: null, photoPath: null, isSaving: false, saveError: null, lastSavedAt: null }),
}))
