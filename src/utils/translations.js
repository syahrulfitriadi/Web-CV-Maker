/**
 * CV Output Language Translations
 * Labels used in CV template output (section headers, placeholders, etc.)
 */

const translations = {
  id: {
    // Section Headers — Classic
    contact: 'KONTAK',
    skills: 'KEMAMPUAN',
    education: 'PENDIDIKAN',
    profileSummary: 'RINGKASAN PROFIL',
    workExperience: 'PENGALAMAN KERJA',
    certifications: 'SERTIFIKASI',

    // Section Headers — Modern
    contactModern: 'Contact',
    educationModern: 'Pendidikan',
    hardSkill: 'Tools & Hard Skill',
    softSkill: 'Soft Skill',
    summaryModern: 'Ringkasan',
    certificationsModern: 'Sertifikasi',
    experienceModern: 'Pengalaman',

    // Sub-labels
    hardSkillLabel: 'Hard Skills',
    softSkillLabel: 'Soft Skills',

    // Placeholders
    yourName: 'Nama Lengkap',
    yourNameModern: 'Nama Anda',
    jobTitle: 'Jabatan / Posisi',
    jobTitleModern: 'Posisi / Jabatan',
    present: 'Sekarang',
    gpaLabel: 'IPK',
    degreeOf: '',       // in Indonesian, no "of" between degree and field

    // UI (PDF export, preview page)
    popupBlocked: 'Popup diblokir oleh browser. Izinkan popup untuk situs ini, lalu coba lagi.',
    exportFailed: 'Gagal mengekspor PDF. Silakan coba lagi.',
  },

  en: {
    // Section Headers — Classic
    contact: 'CONTACT',
    skills: 'SKILLS',
    education: 'EDUCATION',
    profileSummary: 'PROFILE SUMMARY',
    workExperience: 'WORK EXPERIENCE',
    certifications: 'CERTIFICATIONS',

    // Section Headers — Modern
    contactModern: 'Contact',
    educationModern: 'Education',
    hardSkill: 'Tools & Hard Skills',
    softSkill: 'Soft Skills',
    summaryModern: 'Summary',
    certificationsModern: 'Certifications',
    experienceModern: 'Experience',

    // Sub-labels
    hardSkillLabel: 'Hard Skills',
    softSkillLabel: 'Soft Skills',

    // Placeholders
    yourName: 'Full Name',
    yourNameModern: 'Your Name',
    jobTitle: 'Job Title',
    jobTitleModern: 'Job Title',
    present: 'Present',
    gpaLabel: 'GPA',
    degreeOf: ' of ',   // English uses "of" between degree and field

    // UI (PDF export, preview page)
    popupBlocked: 'Popup blocked by browser. Please allow popups for this site and try again.',
    exportFailed: 'Failed to export PDF. Please try again.',
  },
}

/**
 * Get translated labels for a given language
 * @param {'id' | 'en'} lang
 * @returns {object}
 */
export function getTranslations(lang = 'id') {
  return translations[lang] || translations.id
}

export default translations
