import { create } from 'zustand'

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
  currentStep: 0,
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

  // DEV: Auto-fill dummy data
  fillDummyData: () =>
    set({
      personalInfo: {
        name: 'Andi Pratama',
        title: 'Graphic Designer',
        email: 'andi@email.com',
        phone: '+62-851-3499-4328',
        address: 'Jakarta, Indonesia',
        website: 'www.andi.io',
        linkedin: 'linkedin.com/in/andi',
        photo: null,
        photoPreview: null,
      },
      summary:
        'Seorang entry-level Desainer Grafis dengan pengalaman 6 bulan sebagai Graphic Design Intern di salah satu perusahaan multinasional. Memiliki spesialisasi dalam desain logo, desain 3D, dan ilustrasi digital.',
      experience: [
        {
          id: crypto.randomUUID(),
          company: 'PT ABC',
          location: 'Jakarta, Indonesia',
          role: 'Graphic Designer Intern',
          type: 'Internship',
          startDate: 'Januari 2022',
          endDate: 'Juli 2022',
          current: false,
          bullets: [
            'Membuat desain visual untuk situs web perusahaan dan akun media sosial.',
            'Membuat konsep visual berdasarkan ketentuan brand.',
            'Membuat draft awal dan mempresentasikan ide kepada design lead.',
            'Bekerja sama dengan copywriter dan koordinator media sosial untuk finalisasi desain akhir.',
          ],
        },
        {
          id: crypto.randomUUID(),
          company: 'Freelance',
          location: 'Remote',
          role: 'Graphic Designer',
          type: 'Freelance',
          startDate: 'Januari 2020',
          endDate: 'Desember 2021',
          current: false,
          bullets: [
            'Mempelajari design brief dan memberi rekomendasi pada klien.',
            'Bernegosiasi dengan klien dan menentukan anggaran akhir.',
            'Merevisi desain berdasarkan feedback dari klien.',
            'Memastikan desain dan tata letak akhir menarik secara visual.',
          ],
        },
      ],
      education: [
        {
          id: crypto.randomUUID(),
          institution: 'Universitas ABC',
          degree: 'S1',
          field: 'DKV',
          gpa: '3.88',
          startDate: '2017',
          endDate: '2021',
        },
      ],
      skills: {
        hard: [
          'Adobe Photoshop',
          'Adobe Illustrator',
          'Adobe InDesign',
          'CorelDraw',
          'Logo design',
          'Visual design',
        ],
        soft: [
          'Kemampuan interpersonal',
          'Kreatif',
          'Pemecahan masalah',
          'Manajemen waktu',
          'Berpikir kritis',
        ],
      },
      certifications: ['Adobe Certified Professional – Photoshop, 2021'],
    }),

  // Reset
  resetCV: () => set({ ...defaultCV, currentStep: 0 }),
}))
