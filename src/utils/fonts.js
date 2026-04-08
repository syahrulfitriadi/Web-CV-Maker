/**
 * Google Fonts configuration for CV templates.
 * Each font entry defines heading + body font stacks.
 */

export const FONT_OPTIONS = [
  // ─── Sans-Serif ───
  {
    id: 'inter',
    label: 'Inter',
    category: 'Sans-Serif',
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    preview: "'Inter', sans-serif",
  },
  {
    id: 'poppins',
    label: 'Poppins',
    category: 'Sans-Serif',
    heading: "'Poppins', system-ui, sans-serif",
    body: "'Poppins', system-ui, sans-serif",
    preview: "'Poppins', sans-serif",
  },
  {
    id: 'montserrat',
    label: 'Montserrat',
    category: 'Sans-Serif',
    heading: "'Montserrat', system-ui, sans-serif",
    body: "'Open Sans', system-ui, sans-serif",
    preview: "'Montserrat', sans-serif",
  },
  {
    id: 'manrope',
    label: 'Manrope',
    category: 'Sans-Serif',
    heading: "'Manrope', system-ui, sans-serif",
    body: "'Manrope', system-ui, sans-serif",
    preview: "'Manrope', sans-serif",
  },
  {
    id: 'raleway',
    label: 'Raleway',
    category: 'Sans-Serif',
    heading: "'Raleway', system-ui, sans-serif",
    body: "'Raleway', system-ui, sans-serif",
    preview: "'Raleway', sans-serif",
  },
  {
    id: 'dm-sans',
    label: 'DM Sans',
    category: 'Sans-Serif',
    heading: "'DM Sans', system-ui, sans-serif",
    body: "'DM Sans', system-ui, sans-serif",
    preview: "'DM Sans', sans-serif",
  },
  {
    id: 'nunito',
    label: 'Nunito',
    category: 'Sans-Serif',
    heading: "'Nunito', system-ui, sans-serif",
    body: "'Nunito', system-ui, sans-serif",
    preview: "'Nunito', sans-serif",
  },
  {
    id: 'roboto',
    label: 'Roboto',
    category: 'Sans-Serif',
    heading: "'Roboto', system-ui, sans-serif",
    body: "'Roboto', system-ui, sans-serif",
    preview: "'Roboto', sans-serif",
  },
  {
    id: 'source-sans',
    label: 'Source Sans',
    category: 'Sans-Serif',
    heading: "'Source Sans 3', system-ui, sans-serif",
    body: "'Source Sans 3', system-ui, sans-serif",
    preview: "'Source Sans 3', sans-serif",
  },

  // ─── Serif ───
  {
    id: 'playfair',
    label: 'Playfair Display',
    category: 'Serif',
    heading: "'Playfair Display', Georgia, serif",
    body: "'Playfair Display', Georgia, serif",
    preview: "'Playfair Display', serif",
  },
  {
    id: 'lora',
    label: 'Lora',
    category: 'Serif',
    heading: "'Lora', Georgia, serif",
    body: "'Lora', Georgia, serif",
    preview: "'Lora', serif",
  },
  {
    id: 'merriweather',
    label: 'Merriweather',
    category: 'Serif',
    heading: "'Merriweather', Georgia, serif",
    body: "'Merriweather', Georgia, serif",
    preview: "'Merriweather', serif",
  },
  {
    id: 'crimson',
    label: 'Crimson Text',
    category: 'Serif',
    heading: "'Crimson Text', Georgia, serif",
    body: "'Crimson Text', Georgia, serif",
    preview: "'Crimson Text', serif",
  },
  {
    id: 'libre-baskerville',
    label: 'Libre Baskerville',
    category: 'Serif',
    heading: "'Libre Baskerville', Georgia, serif",
    body: "'Libre Baskerville', Georgia, serif",
    preview: "'Libre Baskerville', serif",
  },

  // ─── Mixed (Heading + Body combo) ───
  {
    id: 'montserrat-opensans',
    label: 'Montserrat + Open Sans',
    category: 'Mixed',
    heading: "'Montserrat', system-ui, sans-serif",
    body: "'Open Sans', system-ui, sans-serif",
    preview: "'Montserrat', sans-serif",
  },
  {
    id: 'playfair-source',
    label: 'Playfair + Source Sans',
    category: 'Mixed',
    heading: "'Playfair Display', Georgia, serif",
    body: "'Source Sans 3', system-ui, sans-serif",
    preview: "'Playfair Display', serif",
  },
  {
    id: 'raleway-roboto',
    label: 'Raleway + Roboto',
    category: 'Mixed',
    heading: "'Raleway', system-ui, sans-serif",
    body: "'Roboto', system-ui, sans-serif",
    preview: "'Raleway', sans-serif",
  },
]

/**
 * Get font config by ID. Falls back to Inter if not found.
 */
export function getFontConfig(fontId) {
  return FONT_OPTIONS.find((f) => f.id === fontId) || FONT_OPTIONS[0]
}

/**
 * Legacy compatibility: map old 'sans'/'serif' values to new font IDs
 */
export function migrateFontId(fontId) {
  if (fontId === 'sans') return 'inter'
  if (fontId === 'serif') return 'playfair'
  return fontId
}
