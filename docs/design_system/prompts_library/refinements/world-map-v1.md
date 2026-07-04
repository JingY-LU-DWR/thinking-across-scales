The Mapbox map is working correctly.

Please improve the implementation without changing the overall architecture.

Current implementation

- Mapbox GL JS
- Locations are loaded from data/places.json
- Markers are created correctly
- Clicking markers navigates to Journey pages

However, several improvements are needed.

---

## 1. Automatically fit the map to all locations

Remove the fixed

```javascript
center: [...]
zoom: ...
```

Instead, after all markers are created:

- Create a mapboxgl.LngLatBounds object.
- Extend the bounds with every location.
- Call map.fitBounds(bounds).

Use approximately

padding: 80

maxZoom: 2.8

This ensures the map automatically adjusts whenever new places are added.

Do not hard-code the map center.

---

## 2. Improve the default world view

The initial map should display North America and East Asia together.

The current view is centered too far over the Indian Ocean.

The map should feel like a global atlas.

---

## 3. Improve marker styling

Replace the default black markers with a cleaner editorial style.

Use small circular markers.

White fill.

Dark border.

Subtle hover animation.

Markers should feel elegant rather than like Google Maps.

---

## 4. Improve popups

Current popup only displays title and summary.

Instead display

Journey title

Region

Summary

A small "Read Journey →" link

Use clean typography.

Rounded popup.

Maximum width around 260px.

---

## 5. Better map interaction

Disable

rotation

pitch

double-click zoom

Enable

mouse wheel zoom

drag

touch navigation

The interaction should feel calm.

---

## 6. Remove unnecessary UI

Hide

Mapbox attribution (if legally permitted)

Compass

Rotation controls

Keep the interface minimal.

---

## 7. Improve code organization

Split the implementation into reusable functions.

Example

initializeMap()

loadPlaces()

createMarkers()

fitMapToPlaces()

The code should become modular and easier to maintain.

---

## 8. Future compatibility

Keep the implementation compatible with future additions such as

Timeline

Journey filtering

Marker categories

Animated routes

Do not implement these features now.

Simply organize the code so future expansion is straightforward.

---

Do not redesign the page.

Only improve the Mapbox component.

The goal is to create a reusable World Map component for the entire website.