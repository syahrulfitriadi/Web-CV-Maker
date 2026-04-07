# Editorial Design System: The Digital Curator

## 1. Overview & Creative North Star

This design system is built upon the philosophy of **"The Digital Curator."** In a professional landscape saturated with generic, template-driven resumes, this system seeks to position the user as a deliberate architect of information. 

By eschewing traditional "box-and-line" layouts in favor of high-end editorial principles, we create a visual narrative that feels like a premium publication. The system leverages intentional asymmetry, dramatic typographic scales, and tonal depth to move away from "functional utility" toward "curated experience." We replace rigid borders with breathing room and tactile layering, ensuring the designer’s work and history are presented with the same gravity as an art gallery exhibition.

---

## 2. Colors & Tonal Architecture

Our palette is anchored in a sophisticated interaction between atmospheric grays and a singular, vibrant sky-blue accent.

### Color Strategy
- **Primary & Accent:** The `primary` (#01658c) and `primary_container` (#87CEFA) provide the "signature" pop. These are used sparingly for emphasis, progress bars, and key interactive elements.
- **Surface Hierarchy:** We utilize the full Material tier of surfaces to create a sense of physical layering.
    - `surface_container_lowest` (#ffffff): Use for high-priority cards or "floating" portfolio highlights.
    - `surface` (#f7f9fb): The standard background "paper."
    - `surface_container_low` (#f2f4f6): Use for secondary sidebars or distinct timeline sections.

### The Rules of Engagement
- **The "No-Line" Rule:** Explicitly prohibit the use of 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts. For instance, a skills sidebar in `surface_container_low` should simply sit flush against the `surface` background.
- **Glass & Gradient:** For floating "hero" elements (like a profile image badge), use semi-transparent `surface_container_lowest` with a 20px backdrop blur to create a frosted glass effect. 
- **Signature Textures:** Main CTA backgrounds or header sections should utilize a subtle linear gradient transitioning from `primary` (#01658c) to `primary_container` (#87CEFA) at a 135-degree angle to add depth that flat hex codes cannot provide.

---

## 3. Typography

The typographic system utilizes a "High-Contrast Pairing" to establish authority and modernism.

*   **Display & Headings (Manrope):** Chosen for its geometric precision. Use `display-lg` for the name to create a bold, "masthead" feel. Manrope’s wide aperture provides an architectural quality to the document.
*   **Body & Labels (Work Sans):** Chosen for its exceptional legibility at small sizes. Work Sans has a slightly wider stance than typical sans-serifs, which feels more premium and less crowded in dense "Experience" or "Description" sections.

### Hierarchical Intent
- **Name/Masthead:** `display-lg` / `on_surface`.
- **Section Headers:** `headline-sm` / `primary` (All caps or tracking +10% for an editorial touch).
- **Body Text:** `body-md` / `on_surface_variant` for optimal readability and a softer "slate" tone.

---

## 4. Elevation & Depth

In this system, depth is a function of light and layering, not artificial outlines.

- **The Layering Principle:** Stack `surface-container` tiers to indicate importance. A "Featured Project" card should be `surface-container-lowest` (pure white) placed over a `surface-container-low` (light gray) background to create a "lifted" effect through color contrast alone.
- **Ambient Shadows:** For elements that require true elevation (e.g., a floating contact button), use a 32px blur with 6% opacity using the `on_surface` color tinted with a hint of `primary`. This mimics soft, natural studio lighting.
- **The "Ghost Border" Fallback:** If a layout requires a container boundary for accessibility, use the `outline_variant` (#bfc7cf) at **15% opacity**. This creates a "suggestion" of a line rather than a hard break.
- **Roundedness Scale:** 
    - Use `lg` (0.5rem) for standard cards.
    - Use `full` (9999px) for progress bars and badges to provide a modern, pill-shaped contrast to the editorial grid.

---

## 5. Components

### Timeline & Experience
Forbid the use of a vertical line connecting timeline dots. Instead, use a subtle background shift (a `surface_container_high` vertical pillar) or simply rely on the vertical spacing scale to align dates and titles.

### Progress Bars (Skills)
- **Track:** `surface_container_highest`.
- **Indicator:** A gradient from `primary` to `primary_container`.
- **Shape:** `full` (9999px) roundedness for a sleek, contemporary feel.

### Cards
Cards must not have borders. They are defined by a change to `surface_container_lowest` and a soft `Ambient Shadow`. Content inside cards should follow a strict `lg` padding rule to ensure the "editorial" white space is maintained.

### Input Fields & Search
- **State:** Use `surface_variant` for the background.
- **Active State:** Change background to `surface_container_lowest` and add a 2px `primary` bottom-border only, avoiding the "boxed" input look.

---

## 6. Do's and Don'ts

### Do
- **DO** use dramatic white space. If a section feels crowded, increase the spacing between the `headline-sm` and `body-md` by 50%.
- **DO** use the `primary_container` (#87CEFA) as a highlighter behind key words or phrases to draw the eye.
- **DO** align text to a multi-column editorial grid, but allow images or badges to break the grid (asymmetric overlap) for a custom feel.

### Don't
- **DON'T** use 100% black text. Always use `on_surface` or `on_surface_variant` to keep the palette feeling "Slate" and professional.
- **DON'T** use standard drop shadows. If an element looks like it's "floating" on a generic website, the shadow is too dark.
- **DON'T** use dividers. If you need to separate content, use a 24px or 32px vertical gap or a subtle tone change.