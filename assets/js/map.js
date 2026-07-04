document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('journey-map');
  const mapStatus = document.getElementById('map-status');

  if (!mapContainer) {
    return;
  }

  const styleUrl = 'mapbox://styles/mapbox/light-v11';
  const mapboxToken = '';
  let map;

  const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const initializeMap = () => {
    if (typeof mapboxgl === 'undefined') {
      if (mapStatus) {
        mapStatus.textContent = 'Mapbox library is unavailable.';
      }
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'mercator',
      renderWorldCopies: false,
      center: [15, 35],
      zoom: 1.3,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      doubleClickZoom: false,
      scrollZoom: true,
      touchZoomRotate: true,
      touchPitch: false,
      boxZoom: false
    });

    map.getCanvas().style.cursor = 'grab';
    map.on('load', () => {
      loadPlaces();
    });
  };

  const loadPlaces = async () => {
    try {
      const response = await fetch('../data/places.json');
      if (!response.ok) {
        throw new Error('Unable to load place data.');
      }

      const places = await response.json();
      createMarkers(places);
      fitMapToPlaces(places);

      if (mapStatus) {
        mapStatus.textContent = `${places.length} locations loaded.`;
      }
    } catch (error) {
      if (mapStatus) {
        mapStatus.textContent = 'Unable to load locations.';
      }
    }
  };

  const createMarkers = (places) => {
    places.forEach((place) => {
      console.log(place.title, place.longitude, place.latitude);

      const markerElement = document.createElement('button');
      markerElement.className = 'map-marker-pin';
      markerElement.type = 'button';
      markerElement.setAttribute('aria-label', place.title);

      const marker = new mapboxgl.Marker({
        element: markerElement,
        anchor: 'center'
      })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map);

      const popup = new mapboxgl.Popup({
        offset: 16,
        closeButton: false,
        closeOnClick: false,
        maxWidth: '260px'
      }).setHTML(`
        <div class="map-popup">
          <h3>${escapeHtml(place.title)}</h3>
          <p class="map-popup-region">${escapeHtml(place.region || place.country || '')}</p>
          <p class="map-popup-summary">${escapeHtml(place.summary || '')}</p>
          <a class="map-popup-link" href="${place.page}">Read Journey →</a>
        </div>
      `);

      marker.setPopup(popup);

      markerElement.addEventListener('mouseenter', () => {
        markerElement.classList.add('is-hovered');
      });

      markerElement.addEventListener('mouseleave', () => {
        markerElement.classList.remove('is-hovered');
      });

      markerElement.addEventListener('click', () => {
        if (place.page) {
          window.location.href = place.page;
        }
      });
    });
  };

  const fitMapToPlaces = (places) => {
    const bounds = new mapboxgl.LngLatBounds();

    places.forEach((place) => {
      bounds.extend([place.longitude, place.latitude]);
    });

    map.fitBounds(bounds, {
      padding: 80,
      maxZoom: 2.8
    });
  };

  initializeMap();
});
