document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('atlas-map');
  const markerLayer = document.getElementById('atlas-map-markers');
  const mapCard = document.getElementById('atlas-map-card');
  const timelineSlider = document.getElementById('atlas-timeline-slider');
  const timelineStops = document.getElementById('atlas-timeline-stops');
  const timelineYear = document.getElementById('atlas-timeline-year');
  const timelineCard = document.getElementById('atlas-timeline-card');
  let mapView = null;

  if (!mapContainer || !markerLayer || !mapCard || !timelineSlider || !timelineStops || !timelineYear || !timelineCard) {
    return;
  }

  // Helper to remove stray plain <p> nodes containing only a year inside the timeline header.
  const cleanupTimelineHeader = () => {
    try {
      const header = document.querySelector('.atlas-timeline-header');
      if (!header) return;
      Array.from(header.querySelectorAll('p')).forEach((p) => {
        const txt = (p.textContent || '').trim();
        if (/^\d{4}$/.test(txt) && !p.id && !p.className) {
          p.remove();
        }
      });
    } catch (e) {
      // ignore
    }
  };

  // Observe the header for late DOM insertions (some renderers may inject nodes after DOMContentLoaded)
  try {
    const headerEl = document.querySelector('.atlas-timeline-header');
    if (headerEl && typeof MutationObserver !== 'undefined') {
      const mo = new MutationObserver(() => cleanupTimelineHeader());
      mo.observe(headerEl, { childList: true, subtree: false });
    }
    // Initial cleanup in case duplicate already present
    cleanupTimelineHeader();
  } catch (e) {
    // silent
  }

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const journeyHref = (place) => `./${place.slug}.html`;

  const renderMapCard = (place) => {
    // Build card body HTML and a photo container we will populate below.
    mapCard.innerHTML = `
      <div class="atlas-map-card-photo atlas-photo" role="img" aria-label="Editorial landscape study of ${escapeHtml(place.title)}"></div>
      <div class="atlas-map-card-body">
        <p class="atlas-card-meta">${escapeHtml(place.location)} · ${escapeHtml(place.year)}</p>
        <h3>${escapeHtml(place.title)}</h3>
        <p>${escapeHtml(place.summary)}</p>
        <a class="essay-card-link" href="${journeyHref(place)}">Read Story →</a>
      </div>
    `;

    // Attempt to load a real hero image for the place; fall back to the CSS gradient class
    try {
      const photoEl = mapCard.querySelector('.atlas-map-card-photo');
      if (photoEl) {
        const slug = place.slug || (place.photo || '');
        const fallbackClass = `atlas-photo--${escapeHtml(place.photo || place.slug)}`;
        // Apply fallback class immediately so CSS gradient shows while we load the hero
        photoEl.classList.add(fallbackClass);

        const heroPath = `../assets/images/journeys/${slug}/hero.jpg`;
        const img = new Image();
        img.onload = () => {
          photoEl.style.backgroundImage = `url('${heroPath}')`;
          // remove fallback gradient class once image is applied
          photoEl.classList.remove(fallbackClass);
        };
        img.onerror = () => {
          // keep fallback class; nothing else to do
        };
        img.src = heroPath;
      }
    } catch (e) {
      // Non-fatal: leave existing markup/CSS in place
    }
  };

  const renderTimelineCard = (place) => {
    const themes = (place.themes || [])
      .map((theme) => `<span class="atlas-theme">${escapeHtml(theme)}</span>`)
      .join('');

    timelineYear.textContent = place.year;
    timelineCard.innerHTML = `
      <div class="atlas-timeline-card-photo atlas-photo" role="img" aria-label="Editorial landscape study of ${escapeHtml(place.title)}"></div>
      <div class="atlas-timeline-card-copy">
        <p class="atlas-timeline-location">${escapeHtml(place.location)} · ${escapeHtml(place.year)}</p>
        <h3>${escapeHtml(place.storyTitle)}</h3>
        <p>${escapeHtml(place.description)}</p>
        <div class="atlas-theme-list">${themes}</div>
        <a class="essay-card-link" href="${journeyHref(place)}">Read Story →</a>
      </div>
    `;

    // Try to load hero image for timeline card; fall back to CSS gradient class
    try {
      const photoEl = timelineCard.querySelector('.atlas-timeline-card-photo');
      if (photoEl) {
        const slug = place.slug || (place.photo || '');
        const fallbackClass = `atlas-photo--${escapeHtml(place.photo || place.slug)}`;
        photoEl.classList.add(fallbackClass);

        const heroPath = `../assets/images/journeys/${slug}/hero.jpg`;
        const img = new Image();
        img.onload = () => {
          photoEl.style.backgroundImage = `url('${heroPath}')`;
          photoEl.classList.remove(fallbackClass);
        };
        img.onerror = () => {
          // keep fallback gradient
        };
        img.src = heroPath;
      }
    } catch (e) {
      // silent
    }
  };

  const setActiveMarker = (marker) => {
    if (mapView && marker?.dataset?.placeId) {
      mapView.setActiveMarkerByPlaceId(marker.dataset.placeId);
      return;
    }

    markerLayer.querySelectorAll('.atlas-map-marker').forEach((item) => {
      item.classList.toggle('is-active', item === marker);
    });
  };

  const setActiveTimelineStop = (index) => {
    timelineStops.querySelectorAll('.atlas-timeline-stop').forEach((stop, stopIndex) => {
      stop.classList.toggle('is-active', stopIndex === index);
    });
  };

  const renderTimelineStops = (places, onSelect) => {
    timelineStops.innerHTML = places
      .map((place) => `<button class="atlas-timeline-stop" type="button" data-year="${escapeHtml(place.year)}">${escapeHtml(place.year)}</button>`)
      .join('');

    timelineStops.querySelectorAll('.atlas-timeline-stop').forEach((button, index) => {
      button.addEventListener('click', () => onSelect(index));
    });
  };

  const renderMarkers = async (places) => {
    if (!window.MapboxView || !window.MapboxView.createMapView) {
      throw new Error('Mapbox map layer unavailable.');
    }

    const accessToken = window.APP_CONFIG?.MAPBOX_TOKEN;
    if (!accessToken) {
      throw new Error('Mapbox token is missing in APP_CONFIG.');
    }

    mapView = await window.MapboxView.createMapView({
      mapContainer,
      markerLayer,
      places,
      accessToken,
      journeyHref,
      onMarkerHover: (place, markerElement) => {
        setActiveMarker(markerElement);
        renderMapCard(place);
      },
      onMarkerFocus: (place, markerElement) => {
        setActiveMarker(markerElement);
        renderMapCard(place);
      },
    });

    mapView.setActiveMarkerByIndex(0);
  };

  const loadPlaces = async () => {
    const response = await fetch('../data/places.json');

    if (!response.ok) {
      throw new Error('Unable to load atlas data.');
    }

    return response.json();
  };

  loadPlaces()
    .then(async (places) => {
      const timelinePlaces = places
        .filter((place) => place.timeline)
        .sort((first, second) => Number(first.year) - Number(second.year));

      let timelineIndex = 0;

      const selectTimelinePlace = (index) => {
        timelineIndex = index;
        timelineSlider.value = String(index);
        renderTimelineCard(timelinePlaces[index]);
        setActiveTimelineStop(index);
        // Minimal cleanup: remove stray paragraph nodes that contain only the year
        // (some renderers or DOM transforms may inject an extra <p> with the year).
        try {
          const header = document.querySelector('.atlas-timeline-header');
          if (header) {
            Array.from(header.querySelectorAll('p')).forEach((p) => {
              const txt = (p.textContent || '').trim();
              // remove plain <p> that is just a 4-digit year and has no id/class
              if (/^\d{4}$/.test(txt) && !p.id && !p.className) {
                p.remove();
              }
            });
          }
        } catch (e) {
          // silent fallback; do not break timeline functionality
        }
      };

      await renderMarkers(places);
      renderMapCard(places[0]);

      // --- Featured Journey card image: use canonical hero from places data ---
      try {
        const featuredPlace = places.find(p => p.featured) || places[0];
        if (featuredPlace && featuredPlace.slug) {
          const featuredPhotoEl = document.querySelector('.atlas-feature-photo');
          if (featuredPhotoEl) {
            // Prefer canonical hero.jpg inside the journey folder
            const heroPath = `../assets/images/journeys/${featuredPlace.slug}/hero.jpg`;

            // Helper to test image existence
            const testImage = (src) => new Promise((resolve) => {
              const img = new Image();
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
              img.src = src;
            });

            let chosen = null;
            if (await testImage(heroPath)) {
              chosen = heroPath;
            } else {
              // Fallback: try to read the journey page and extract the hero image used there
              try {
                const resp = await fetch(`./${featuredPlace.slug}.html`);
                if (resp.ok) {
                  const html = await resp.text();
                  const m = html.match(/<img[^>]+class=["']?[^"'>]*journey-hero-image[^"'>]*["']?[^>]*src=["']([^"']+)["']/i);
                  if (m && m[1]) {
                    chosen = m[1];
                  }
                }
              } catch (e) {
                // ignore fetch/parsing errors
              }
            }

            if (chosen) {
              featuredPhotoEl.style.backgroundImage = `url('${chosen}')`;
            }

            // update aria-label to reflect actual place
            featuredPhotoEl.setAttribute('aria-label', `Editorial landscape study of ${featuredPlace.title}`);
          }
        }
      } catch (e) {
        // Non-fatal; leave existing markup/CSS in place
      }

      timelineSlider.max = String(Math.max(timelinePlaces.length - 1, 0));
      renderTimelineStops(timelinePlaces, selectTimelinePlace);
      selectTimelinePlace(0);

      timelineSlider.addEventListener('input', (event) => {
        const { value } = event.target;
        selectTimelinePlace(Number(value));
      });
    })
    .catch(() => {
      mapCard.innerHTML = `
        <div class="atlas-map-card-body">
          <p class="atlas-card-meta">Atlas</p>
          <h3>Journey data unavailable</h3>
          <p>The map and timeline need the local atlas data file in order to render.</p>
        </div>
      `;
      timelineCard.innerHTML = `
        <div class="atlas-timeline-card-copy">
          <p class="atlas-timeline-location">Atlas</p>
          <h3>Timeline unavailable</h3>
          <p>The page could not load the local atlas data.</p>
        </div>
      `;
    });
});
