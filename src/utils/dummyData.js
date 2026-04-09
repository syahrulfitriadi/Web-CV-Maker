/**
 * Dummy CV Data — bilingual (ID & EN)
 * Used by the "Dev Fill" button and auto-switches when language changes.
 */

export const dummyData = {
  id: {
    personalInfo: {
      name: 'Andi Pratama',
      title: 'Desainer Grafis',
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
        type: 'Magang',
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
        role: 'Desainer Grafis',
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
        'Desain Logo',
        'Desain Visual',
      ],
      soft: [
        'Kemampuan interpersonal',
        'Kreatif',
        'Pemecahan masalah',
        'Manajemen waktu',
        'Berpikir kritis',
      ],
    },
    certifications: [
      'Adobe Certified Professional – Photoshop, 2021',
      'Google UX Design Professional Certificate, 2022',
      'Certified Graphic Designer (CGD) – AIGA, 2021',
      'HubSpot Content Marketing Certification, 2022',
    ],
  },

  en: {
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
      'An entry-level Graphic Designer with 6 months of experience as a Graphic Design Intern at a multinational company. Specializing in logo design, 3D design, and digital illustration.',
    experience: [
      {
        id: crypto.randomUUID(),
        company: 'PT ABC',
        location: 'Jakarta, Indonesia',
        role: 'Graphic Designer Intern',
        type: 'Internship',
        startDate: 'January 2022',
        endDate: 'July 2022',
        current: false,
        bullets: [
          'Created visual designs for the company website and social media accounts.',
          'Developed visual concepts based on brand guidelines.',
          'Prepared initial drafts and presented ideas to the design lead.',
          'Collaborated with copywriters and social media coordinators to finalize designs.',
        ],
      },
      {
        id: crypto.randomUUID(),
        company: 'Freelance',
        location: 'Remote',
        role: 'Graphic Designer',
        type: 'Freelance',
        startDate: 'January 2020',
        endDate: 'December 2021',
        current: false,
        bullets: [
          'Reviewed design briefs and provided recommendations to clients.',
          'Negotiated with clients and determined final budgets.',
          'Revised designs based on client feedback.',
          'Ensured final designs and layouts were visually appealing.',
        ],
      },
    ],
    education: [
      {
        id: crypto.randomUUID(),
        institution: 'ABC University',
        degree: 'Bachelor',
        field: 'Visual Communication Design',
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
        'Logo Design',
        'Visual Design',
      ],
      soft: [
        'Interpersonal skills',
        'Creative thinking',
        'Problem solving',
        'Time management',
        'Critical thinking',
      ],
    },
    certifications: [
      'Adobe Certified Professional – Photoshop, 2021',
      'Google UX Design Professional Certificate, 2022',
      'Certified Graphic Designer (CGD) – AIGA, 2021',
      'HubSpot Content Marketing Certification, 2022',
    ],
  },
}

/**
 * Get dummy data for a specific language
 * Returns a fresh copy with new UUIDs each time
 */
export function getDummyData(lang = 'id') {
  const data = dummyData[lang] || dummyData.id
  return {
    ...data,
    experience: data.experience.map((exp) => ({
      ...exp,
      id: crypto.randomUUID(),
    })),
    education: data.education.map((edu) => ({
      ...edu,
      id: crypto.randomUUID(),
    })),
  }
}
