# Design System Documentation
## Thinking Across Scales

**Version:** 1.0  
**Created:** 2024  
**Purpose:** Unified visual identity across all website pages

---

## Overview

A cohesive design system that treats the entire "Thinking Across Scales" website as one integrated editorial publication. The system draws inspiration from Nature Magazine, MIT Press, Kinfolk, National Geographic, and Monocle—balancing scientific credibility, editorial elegance, and timeless minimalism.

The design prioritizes:
- **Editorial clarity** through generous whitespace and typography hierarchy
- **Scientific credibility** via restrained, professional aesthetics
- **Earth-tone warmth** with accessible, calming colors
- **Photography as storytelling** with large, high-quality imagery
- **Consistency** across Home, Atlas, Essays, Writing, and About pages

---

## Color Palette

All colors are defined as CSS custom properties in `:root` for easy maintenance.

| Token | Value | Usage | Hex |
|-------|-------|-------|-----|
| `--color-bg-primary` | Warm Ivory | Page backgrounds, primary surface | #F7F3EC |
| `--color-bg-secondary` | Soft Paper | Sections, callouts, alternatives | #F1EBE2 |
| `--color-text-primary` | Charcoal | Body text, headings | #2F2F2F |
| `--color-text-secondary` | Slate Gray | Secondary text, captions | #5C6964 |
| `--color-text-light` | Warm Taupe | Muted text, subtle labels | #8A7B6E |
| `--color-accent` | Burnt Umber | Links, labels, highlights | #8A6A45 |
| `--color-accent-secondary` | Slate Gray | Secondary accent elements | #5C6964 |
| `--color-border` | Warm Gray | Dividers, borders | #D8CEC0 |
| `--color-white` | Pure White | Cards, overlays | #FFFFFF |
| `--color-black` | Pure Black | Strong contrast elements | #000000 |

### Color Usage Philosophy

- **Primary backgrounds** create a paper-like, warm environment
- **Text colors** maintain accessibility (WCAG AA) while preserving editorial feel
- **Accent colors** draw attention without feeling corporate
- **Borders and dividers** are subtle but present, creating gentle visual structure
- **NO bright blues, greens, or other web 2.0 colors** — entire palette stays within natural, earthy tones

---

## Typography System

### Font Families

- **Headings (h1–h6):** Serif fonts (`--font-serif`)
  - Iowan Old Style, Palatino Linotype, Book Antiqua, Georgia, fallback serif
  - Creates formal, editorial, academic authority
  
- **Body Text:** Sans-serif (`--font-sans`)
  - Inter, system fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)
  - Modern, readable, excellent on screens
  - Contrasts with serif headings for visual interest

### Font Sizes (Responsive)

All sizes use `clamp()` for fluid scaling across devices:

| Element | Desktop | Mobile | CSS Variable |
|---------|---------|--------|--------------|
| h1 | 3.8rem | 2.6rem | `--type-h1: clamp(2.6rem, 5.5vw, 3.8rem)` |
| h2 | 2.8rem | 1.85rem | `--type-h2: clamp(1.85rem, 3.8vw, 2.8rem)` |
| h3 | 1.8rem | 1.3rem | `--type-h3: clamp(1.3rem, 2.3vw, 1.8rem)` |
| Body | 1.025rem | 1.025rem | `--type-body: 1.025rem` |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--line-tight` | 1.1 | Compact headings |
| `--line-snug` | 1.2 | Headings |
| `--line-normal` | 1.6 | Default body |
| `--line-relaxed` | 1.75 | Reading-heavy sections |
| `--line-loose` | 1.95 | Maximum readability |

### Letter Spacing

- **Headings:** `--ls-tight: -0.03em` — tighter, more impactful
- **Body:** `--ls-normal: 0em` — standard spacing
- **Labels/Caps:** `--ls-label: 0.24em` — elegant expansion
- **Uppercase:** `--ls-caps: 0.28em` — formal letter spacing

---

## Spacing System

Consistent spacing scale based on `--space-*` variables:

```
--space-xs:   0.5rem    (8px)
--space-sm:   0.875rem  (14px)
--space-md:   1.25rem   (20px)
--space-lg:   1.75rem   (28px)
--space-xl:   2.5rem    (40px)
--space-2xl:  3.5rem    (56px)
--space-3xl:  5rem      (80px)
```

**Usage:**
- Padding: `padding: var(--space-lg);`
- Margins: `margin-bottom: var(--space-md);`
- Gaps: `gap: var(--space-lg);`

---

## Component Library

### 1. **Navbar**

**Styling:**
- Warm gradient background (primary → secondary)
- Thin bottom border in warm gray (`--color-border`)
- Subtle shadow (0 1px 2px)
- Serif brand name, serif font stack
- Lightweight navigation links (400 weight, smaller font)
- Active state: bold + bottom border accent

**Key Features:**
- NO Bootstrap blue anywhere
- Editorial feel, not web-app-like
- Brand name slightly larger, serif
- Generous spacing between nav items
- Smooth color transitions on hover

**CSS Variables Used:**
```css
--color-bg-primary, --color-bg-secondary
--color-border, --color-accent
--font-serif, --type-label
```

### 2. **Feature Cards**

**Styling:**
- White background, soft border
- Rounded corners (var(--radius-md))
- Subtle shadow (var(--shadow-sm)) on hover only
- Image-first layout (large aspect ratio)
- NO lift animation — just shadow deepens

**Key Features:**
- Less "UI-y", more editorial blocks
- Large images dominate
- Minimal padding, lots of whitespace
- Category label in accent color
- Link with subtle arrow animation

### 3. **Editorial Blocks**

**Styling:**
- White or transparent backgrounds
- Thin border in warm gray
- Generous padding (var(--space-lg))
- Subtle shadow on hover
- Images have soft borders, not standalone

**Used for:**
- Quote callouts
- Highlight panels
- Editorial spreads
- Section introductions

### 4. **Links & Buttons**

**Styling:**
- No colored buttons — text-based
- Links: underlined in accent color with offset
- Hover: color deepens, no decoration change
- Magazine style: "Read Essay →" with right arrow
- Arrow animates on hover (subtle 2-3px movement)

**Philosophy:**
- Links should feel like part of prose, not UI controls
- Buttons are restrained, never bright
- Interactions are subtle and elegant

### 5. **Essays Landing (Editorial Spread)**

**Layout:**
- Asymmetric grid: 1.5fr left column + 0.85fr right column
- Main feature: large image (3:2 aspect ratio)
- Rail features: stacked cards (2:1 aspect ratio)
- Separator lines between rail items

**Styling:**
- Serif headlines with generous sizing
- Accent color for category labels
- Generous gap between grid items (var(--space-3xl))
- Soft borders on images, rounded corners

---

## Spacing & Layout

### Section Padding
```css
section {
  padding: var(--space-3xl) 0;  /* 5rem top/bottom */
}
```

### Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);  /* 1.75rem sides */
}
```

### Grid & Flexbox
- Gap: `gap: var(--space-lg);` for most elements
- Generous gaps between items create editorial breathing room
- Responsive: Single column on mobile, multi-column on desktop

---

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Desktop | > 1024px | Full layout, large typography |
| Tablet | 768px–1024px | Grid adjusts, font sizes scale |
| Mobile | < 768px | Single column, reduced padding |

**Mobile-Specific:**
- Section padding: `var(--space-2xl)` instead of `--space-3xl`
- Font sizes scale down with `clamp()`
- Navbar: compact spacing, smaller font
- Cards/components: single column only

---

## Border & Radius System

```css
--radius-sm:  12px   /* Small elements (icons, badges) */
--radius-md:  16px   /* Cards, panels, images */
--radius-lg:  20px   /* Large callouts */
--radius-xl:  24px   /* Extra-large components */
```

**No hard corners anywhere** — everything has gentle rounding for editorial feel.

---

## Shadow System

Shadows are **subtle and editorial**, never harsh or prominent:

```css
--shadow-sm:  0 8px 16px rgba(47, 47, 47, 0.06);
--shadow-md:  0 12px 28px rgba(47, 47, 47, 0.08);
--shadow-lg:  0 16px 40px rgba(47, 47, 47, 0.10);
```

**Usage:**
- Default: no shadow
- Hover: `--shadow-sm` or `--shadow-md`
- Cards: `--shadow-sm` always visible, `--shadow-md` on hover
- Modals/overlays: `--shadow-lg` for depth

---

## Transitions & Animations

```css
--transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
```

**Philosophy:**
- Transitions should feel refined, not zippy
- Cubic-bezier easing is more natural than `ease-in-out`
- Most hover states use quick color transitions (0.15s)
- Larger movements (cards lifting) use the full transition (0.25s)

---

## Utilities

### Text Utilities
```css
.text-muted        /* Use --color-text-light */
.text-accent       /* Use --color-accent */
.lead              /* Large, editorial intro text */
.caption           /* Small, uppercase labels */
```

### Spacing Utilities
```css
.mt-0, .mb-0       /* Remove margin */
.py-5              /* Padding: var(--space-2xl) vertical */
.py-lg-6           /* Large padding */
.g-4, .g-5         /* Grid gaps */
.mb-3, .mb-4       /* Margin bottom */
```

### Layout Utilities
```css
.row               /* CSS grid with gaps */
.align-items-center
.align-items-end
.border-top        /* Top border only */
.border-bottom     /* Bottom border only */
```

---

## Pages Overview

### Home (`index.qmd`)
- Hero section with large imagery
- Feature cards showcasing main concepts
- Navigation to Essays, Atlas, Writing
- Footer with links and metadata

### Essays (`ways-of-thinking/index.qmd`)
- Editorial hero with serif title
- Intro section with diagram
- Featured essays in asymmetric grid layout
- Footer callout with related resources

### Atlas (`journeys/index.qmd`)
- Map-based interface with markers
- Journey cards in grid layout
- Listings of all journeys
- Detailed stories with photo galleries

### Writing (`writing/index.qmd`)
- Article listings
- Typography-heavy reading experience
- Generous line-height and spacing
- Serif headings with sans-serif body

### About (`about.qmd`)
- Biography and context
- Long-form reading experience
- Large images interspersed with text
- Links to resources and archives

---

## CSS Architecture

### File Structure
- **Single file:** `assets/css/custom.css` (~450 lines)
- **Organization:** Comments divide into 14 logical sections
- **Variables:** All design tokens in `:root`
- **Specificity:** Low specificity, easy to override if needed

### Sections
1. Design Tokens
2. Reset & Base
3. Typography
4. Links & Interactions
5. Navbar
6. Layout & Sections
7. Cards & Components
8. Essays Styles
9. Journey Styles
10. Quotes & Callouts
11. Footer
12. Utilities
13. Legacy Components
14. Responsive

---

## Bootstrap Override Strategy

The design system overrides Bootstrap defaults:

```css
:root {
  --bs-body-bg: var(--color-bg-primary);
  --bs-body-color: var(--color-text-primary);
  --bs-link-color: var(--color-link);
  --bs-link-hover-color: var(--color-link-hover);
  --bs-border-color: var(--color-border);
  --bs-secondary-bg: var(--color-bg-secondary);
}
```

**Result:** Bootstrap components use our color palette automatically.

---

## Future Enhancements

### Phase 2: SCSS Variables
If the site grows, convert to SCSS with proper variable nesting:
```scss
$colors: (
  'bg-primary': #F7F3EC,
  'text-primary': #2F2F2F,
  ...
);
```

### Phase 3: Component Mixins
Create reusable component patterns:
```scss
@mixin editorial-card {
  background: var(--color-white);
  border: var(--border-thin) solid var(--color-border);
  // ...
}
```

### Phase 4: Dark Mode (Optional)
Define dark mode tokens if accessibility requires it.

---

## Browser Support

- **Modern browsers** (2020+): Full support
- **IE11:** Limited support (CSS variables not supported, but base styles apply)
- **Mobile browsers:** Full support with responsive breakpoints

---

## Testing Checklist

- ✅ All pages render without Pandoc warnings
- ✅ Home page displays with correct typography and spacing
- ✅ Essays page shows editorial grid correctly
- ✅ Atlas page maps display properly
- ✅ Writing page is readable
- ✅ About page shows proper layouts
- ✅ Navbar appears consistently across all pages
- ✅ Links have correct styling (underline, hover states)
- ✅ Cards have proper shadows and hover effects
- ✅ Mobile responsiveness works at all breakpoints
- ✅ Color palette appears consistent throughout
- ✅ No Bootstrap blue appears anywhere

---

## Maintenance Notes

### Adding New Components
1. Define any new colors in `:root` as `--color-*`
2. Add component styles after the existing components section
3. Use existing variables for colors, spacing, shadows
4. Test responsive behavior at 480px, 768px, 1024px
5. Keep specificity low for easy overrides

### Updating Colors
1. Change value in `:root` variable
2. All instances automatically update
3. NO hardcoded hex values in component styles

### Typography Changes
1. Modify `--type-*` variables in `:root`
2. Update responsive sizing with `clamp()`
3. Adjust line-height with `--line-*` tokens

---

## Contact & Questions

Design system created for "Thinking Across Scales" editorial website.
Maintain consistency across all pages using these guidelines.

