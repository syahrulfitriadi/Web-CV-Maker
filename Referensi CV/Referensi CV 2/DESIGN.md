# Design System Specification

## 1. Overview & Creative North Star: "The Digital Curator"

This design system moves away from the rigid, box-heavy templates of traditional resumes toward a "Digital Curator" aesthetic. The goal is to present information not as a list, but as a high-end editorial experience. We achieve this by prioritizing breathable whitespace, intentional asymmetry, and a sophisticated layering of surfaces. 

By utilizing the clean, geometric nature of **Manrope** for headlines and the functional clarity of **Work Sans** for body text, we create a hierarchy that feels both authoritative and approachable. This system rejects the "standard" 1px border approach in favor of **Tonal Layering**, where depth is communicated through subtle shifts in background color rather than structural lines.

---

## 2. Colors: Tonal Sophistication

The palette is anchored by a high-end light blue (`primary_container: #87CEFA`), balanced by deep professional tones and a multi-tiered neutral scale.

### The "No-Line" Rule
Traditional dividers are strictly prohibited. Section boundaries must be defined solely through background color shifts. For example, the left sidebar should utilize `surface_container_low`, while the main content area sits on the base `surface`. This creates a clear functional split without the visual clutter of a vertical line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine paper. 
- **Base Layer:** `surface` (#f8f9fa)
- **Secondary Sectioning:** `surface_container_low` (#f3f4f5)
- **Interactive/Floating Elements:** `surface_container_lowest` (#ffffff)
- **Emphasis Blocks:** `primary_container` (#87cefa)

### The Glass & Gradient Rule
To move beyond a flat, "out-of-the-box" feel, use **Glassmorphism** for floating elements (like profile badges or sticky navigation). Apply a semi-transparent `surface` color with a `backdrop-blur` of 12px–20px. 

For primary calls-to-action (CTAs) or high-level section headers, use a subtle **Signature Gradient**:
- **From:** `primary` (#01658c)
- **To:** `primary_fixed_dim` (#88cffb)
- **Angle:** 135 degrees.

---

## 3. Typography: The Editorial Voice

The typography scale is designed to create a dramatic contrast between "Display" information and "Utility" information.

*   **Display & Headlines (Manrope):** Use `display-lg` for the primary name and `headline-md` for major section headers. The geometric nature of Manrope provides a modern, premium architectural feel.
*   **Body & Labels (Work Sans):** Use `body-md` for descriptions and `label-md` for metadata (dates, locations). Work Sans offers superior legibility at smaller scales, ensuring the professional content is easily scannable.
*   **Case Styling:** Section headers (using the `#87CEFA` background) should utilize `title-sm` with `uppercase` styling and `letter-spacing: 0.05em` to mirror high-end editorial layouts.

---

## 4. Elevation & Depth: Atmospheric Hierarchy

This system relies on "Soft Lift" rather than "Hard Shadows."

### The Layering Principle
Achieve depth by stacking tiers. Place a `surface_container_lowest` card on a `surface_container_low` background. The subtle contrast (pure white vs. light grey) provides a natural lift that feels integrated into the environment.

### Ambient Shadows
When a floating effect is required (e.g., a "Download CV" button), use **Ambient Shadows**:
- **Color:** `on_surface` (#191c1d) at 6% opacity.
- **Blur:** 24px - 32px.
- **Spread:** -4px.
This mimics natural light rather than a digital "drop shadow."

### The "Ghost Border" Fallback
If a border is required for accessibility, use a **Ghost Border**: the `outline_variant` token at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
- **Primary:** `xl` roundedness (0.75rem). Uses the Signature Gradient. Text is `on_primary` (#ffffff).
- **Secondary:** `xl` roundedness. Surface is `secondary_container`, text is `on_secondary_container`.
- **States:** On hover, increase the shadow blur; on press, shift the background to `primary_fixed_dim`.

### Cards & Content Blocks
Forbid the use of divider lines between "Experience" entries. Instead, use a `1.5rem` vertical spacing (from the spacing scale) and lead with a `title-md` in the `primary` color.

### Chips (Skills & Tags)
- **Style:** Use `full` roundedness (pill shape).
- **Color:** `surface_container_highest` with `on_surface_variant` text.
- **Interaction:** On hover, transition to `primary_container` to provide a subtle "splash" of the signature accent color.

### Input Fields
- **Surface:** `surface_container_low`.
- **Border:** Ghost Border (15% `outline_variant`).
- **Focus:** Transition the border to 100% `primary` and add a 4px soft glow using the `primary` color at 10% opacity.

### Timeline/Progress Indicators
In the "Experience" section, use a 2px wide line in `outline_variant` (20% opacity). The "nodes" should be `primary` solid circles with a 4px `primary_container` outer ring to create a "pulsing" focus on key milestones.

---

## 6. Do's and Don'ts

### Do:
- **Do** use `primary_container` (#87CEFA) as a structural highlight (e.g., header backgrounds) rather than just text color.
- **Do** use asymmetrical margins. A wider right margin in the main content area creates a "gallery" feel.
- **Do** leverage `surface_bright` for areas meant to pop against the standard `surface`.

### Don't:
- **Don't** use black (#000000) for text. Always use `on_surface` (#191c1d) to maintain a soft, premium contrast.
- **Don't** use standard 1px solid dividers. If you feel the need to separate, use a background color shift or whitespace.
- **Don't** use `DEFAULT` roundedness for primary elements; stick to `xl` or `full` to maintain the modern, approachable professional aesthetic.
- **Don't** crowd the sidebar. The sidebar is the "breath" of the document; ensure it has at least `2rem` of internal padding.