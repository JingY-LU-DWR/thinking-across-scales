document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('atlas-map');
  const markerLayer = document.getElementById('atlas-map-markers');
  const mapCard = document.getElementById('atlas-map-card');
  const timelineSlider = document.getElementById('atlas-timeline-slider');
  const timelineStops = document.getElementById('atlas-timeline-stops');
  const timelineYear = document.getElementById('atlas-timeline-year');
  const timelineCard = document.getElementById('atlas-timeline-card');

  if (!mapContainer || !markerLayer || !mapCard || !timelineSlider || !timelineStops || !timelineYear || !timelineCard) {
    return;
  }

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const journeyHref = (place) => `./${place.slug}.html`;

  const projectPoint = (longitude, latitude) => {
    const x = 6 + ((longitude + 180) / 360) * 88;
    const y = 12 + ((90 - latitude) / 180) * 68;

    return { x, y };
  };

  const renderMapCard = (place) => {
    mapCard.innerHTML = `
      <div class="atlas-map-card-photo atlas-photo atlas-photo--${escapeHtml(place.photo || place.slug)}" role="img" aria-label="Editorial landscape study of ${escapeHtml(place.title)}"></div>
      <div class="atlas-map-card-body">
        <p class="atlas-card-meta">${escapeHtml(place.location)} · ${escapeHtml(place.year)}</p>
        <h3>${escapeHtml(place.title)}</h3>
        <p>${escapeHtml(place.summary)}</p>
        <a class="essay-card-link" href="${journeyHref(place)}">Read Story →</a>
      </div>
    `;
  };

  const renderTimelineCard = (place) => {
    const themes = (place.themes || [])
      .map((theme) => `<span class="atlas-theme">${escapeHtml(theme)}</span>`)
      .join('');

    timelineYear.textContent = place.year;
    timelineCard.innerHTML = `
      <div class="atlas-timeline-card-photo atlas-photo atlas-photo--${escapeHtml(place.photo || place.slug)}" role="img" aria-label="Editorial landscape study of ${escapeHtml(place.title)}"></div>
      <div class="atlas-timeline-card-copy">
        <p class="atlas-timeline-location">${escapeHtml(place.location)} · ${escapeHtml(place.year)}</p>
        <h3>${escapeHtml(place.storyTitle)}</h3>
        <p>${escapeHtml(place.description)}</p>
        <div class="atlas-theme-list">${themes}</div>
        <a class="essay-card-link" href="${journeyHref(place)}">Read Story →</a>
      </div>
    `;
  };

  const setActiveMarker = (marker) => {
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

  const renderMarkers = (places) => {
    markerLayer.innerHTML = '';

    places.forEach((place, index) => {
      const marker = document.createElement('a');
      const point = projectPoint(place.longitude, place.latitude);

      marker.className = 'atlas-map-marker';
      marker.href = journeyHref(place);
      marker.style.left = `${point.x}%`;
      marker.style.top = `${point.y}%`;
      marker.setAttribute('aria-label', `${place.title}, ${place.year}`);

      marker.addEventListener('mouseenter', () => {
        setActiveMarker(marker);
        renderMapCard(place);
      });

      marker.addEventListener('focus', () => {
        setActiveMarker(marker);
        renderMapCard(place);
      });

      markerLayer.appendChild(marker);

      if (index === 0) {
        setActiveMarker(marker);
      }
    });
  };

  const loadPlaces = async () => {
    const response = await fetch('../data/places.json');

    if (!response.ok) {
      throw new Error('Unable to load atlas data.');
    }

    return response.json();
  };

  loadPlaces()
    .then((places) => {
      const timelinePlaces = places
        .filter((place) => place.timeline)
        .sort((first, second) => Number(first.year) - Number(second.year));

      let timelineIndex = 0;

      const selectTimelinePlace = (index) => {
        timelineIndex = index;
        timelineSlider.value = String(index);
        renderTimelineCard(timelinePlaces[index]);
        setActiveTimelineStop(index);
      };

      renderMarkers(places);
      renderMapCard(places[0]);

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
