You are the design architect for my Quarto website "Thinking Across Scales."

The Essays page is already completed and establishes the site's visual language.

Your task is to redesign ONLY the Atlas landing page so it matches the same editorial style and design system.

DO NOT redesign the rest of the website.
The Atlas should feel like browsing a living map of ideas rather than navigating a collection of files.

========================================================
DESIGN PHILOSOPHY
========================================================

This is NOT a GIS portal.

This is NOT a travel blog.

This is NOT a documentation website.

This is an editorial website for an environmental scientist.

The Atlas is a collection of places that shaped the way I think.

Readers should browse ideas through SPACE and TIME.

The page should feel like opening a beautifully designed atlas rather than browsing a list of blog posts.

Maintain the same typography, spacing, colors, and editorial aesthetic already established on the Essays landing page.

Use the existing custom.css and design system.

========================================================
PAGE STRUCTURE
========================================================

Hero

↓

Section 1
Thinking Through Space

↓

Section 2
Thinking Through Time

↓

Section 3
Featured Journey

========================================================
HERO
========================================================

Keep the same editorial hero style as Essays.

Heading:

Atlas

Tagline:

Places that shaped the way I think.

Introduction:

A growing atlas of landscapes, field observations, and journeys that changed the way I see ecological systems.

Do not use large decorative graphics.

Leave generous whitespace.

========================================================
SECTION 1
Thinking Through Space
========================================================

This is the signature feature of the Atlas.

Replace the current table/listing with an embedded interactive world map.

The map should become the primary navigation.

Requirements:

• minimalist light basemap
• warm earth colors
• no GIS software appearance
• no heavy controls
• responsive

Each journey is represented by a simple circular marker.

Example locations:

California

Everglades

Guizhou

Qinghai

Inner Mongolia

Beijing

Hainan

Hover:

show a small floating editorial card

including

photo

title

year

Read Story →

Click:

navigate directly to the corresponding journey page.

Do NOT create a full GIS application.

Think "editorial map."

========================================================
SECTION 2
Thinking Through Time
========================================================

Replace the current listing with an interactive horizontal timeline.

This should NOT be a static timeline.

Create a draggable horizontal slider.

Years displayed:

2009

2011

2013

2017

2022

2026

When the user moves the slider,

display ONE editorial journey card below.

The card includes

photo

location

title

short description

themes

Read Story →

The timeline is another way of navigating the Atlas.

It represents how the author's thinking evolved over time.

Keep interactions elegant and minimal.

========================================================
SECTION 3
Featured Journey
========================================================

Do NOT display multiple cards.

Display ONE large featured journey.

Layout:

photo on the left

editorial content on the right

Include

Editor's Pick

Title

Location

Year

Short excerpt

Read Story →

Large photography should dominate.

Think magazine cover story.

========================================================
STYLE
========================================================

Use the existing design language already developed for Essays.

Warm ivory background

Soft paper colors

Minimal borders

Editorial serif headings

Generous whitespace

Subtle hover animations

No Bootstrap appearance.

No dashboard appearance.

No GIS software appearance.

========================================================
IMPLEMENTATION
========================================================

Preserve Quarto compatibility.

Reuse existing CSS whenever possible.

Only create new reusable CSS classes when necessary.

Do not duplicate styles.

Keep HTML semantic.

Keep the page responsive.

The page should become the visual centerpiece of the Atlas section.