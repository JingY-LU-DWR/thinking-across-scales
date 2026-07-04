# Journey Index Page Specification

## Purpose

Design the index page for the **Journeys** section of my Quarto website.

This is NOT a travel blog.

It is an atlas of places that fundamentally transformed how I think.

The page should communicate curiosity, reflection, exploration, and intellectual growth.

This page serves as the primary navigation page for all Journey articles.

---

# Philosophy

Places do not simply appear on a map.

They become part of how we understand the world.

Every journey represents a shift in perspective.

The map is therefore not merely geographic.

It is a map of an evolving mind.

---

# Hero

Title

# Journeys

Subtitle

**Places that reshaped how I see the world.**

Intro paragraph

Some places taught me ecology.

Some taught me systems.

Some taught me computation.

Some revealed entirely new ways of seeing.

Together they became the foundation of Thinking Across Scales.

The introduction should feel calm, personal, and reflective.

Do not make it sound like a travel website.

---

# Main Component

Create a large interactive world map.

The map should become the visual centerpiece of this page.

Design goals

• minimalist

• elegant

• lots of whitespace

• muted colors

• editorial feeling

No decorative graphics.

No unnecessary animations.

---

# Locations

Display clickable markers for the following locations.

Everglades

Yellowstone

Yunnan

Tibet

Maine

Sacramento

Design the map so additional locations can easily be added later.

---

# Interaction

When the user hovers over a marker

display

Journey title

Location

One-line description

When clicked

navigate to the corresponding Journey page.

Example

Everglades

↓

journeys/everglades.qmd

---

# Selected Journey Preview

Below the map create a featured preview panel.

Display

Large landscape image

Journey title

Location

Years

Short description

Read Journey button

The preview should automatically update depending on which marker is selected.

If interactive updating is not practical in Quarto, display the Everglades preview as the default placeholder.

---

# Future Extensibility

Design the page so future features can easily be added without redesigning the layout.

Possible future additions include

Timeline

Journey categories

Search

Filters

Connections between places

Animated route

These future features should not be implemented now.

Only leave sufficient space in the design.

---

# Design Language

Reuse the visual language established on the Landing Page.

Large typography

Editorial spacing

Rounded cards

Natural color palette

Minimal interface

Responsive layout

Bootstrap Grid

---

# Technical Requirements

Use Quarto.

Use Bootstrap components when appropriate.

Write semantic HTML through Quarto fenced divs.

Keep the code modular and easy to maintain.

Avoid unnecessary JavaScript.

Generate production-quality Quarto code.

---

# Overall Impression

The page should not feel like Google Maps.

It should feel like opening the first page of an atlas documenting the evolution of a scientific mind.

The user should immediately understand that these journeys are intellectual journeys rather than tourist destinations.