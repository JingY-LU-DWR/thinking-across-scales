(function attachMapboxView(global) {
  const MAPBOX_CSS_URL = 'https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css';
  const MAPBOX_JS_URL = 'https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js';

  let mapboxLoadPromise;

  const ensureMapboxAssets = () => {
    if (global.mapboxgl) {
      return Promise.resolve(global.mapboxgl);
    }

    if (mapboxLoadPromise) {
      return mapboxLoadPromise;
    }

    mapboxLoadPromise = new Promise((resolve, reject) => {
      if (!document.querySelector(`link[href="${MAPBOX_CSS_URL}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = MAPBOX_CSS_URL;
        document.head.appendChild(link);
      }

      const existingScript = document.querySelector(`script[src="${MAPBOX_JS_URL}"]`);
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(global.mapboxgl), { once: true });
        existingScript.addEventListener('error', () => reject(new Error('Unable to load Mapbox GL JS.')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = MAPBOX_JS_URL;
      script.async = true;
      script.addEventListener('load', () => resolve(global.mapboxgl), { once: true });
      script.addEventListener('error', () => reject(new Error('Unable to load Mapbox GL JS.')), { once: true });
      document.head.appendChild(script);
    });

    return mapboxLoadPromise;
  };

  const createStageContainer = (mapContainer, markerLayer) => {
    const existing = mapContainer.querySelector('.atlas-map-stage');
    if (existing) {
      return existing;
    }

    const stage = document.createElement('div');
    stage.className = 'atlas-map-stage';
    mapContainer.insertBefore(stage, mapContainer.firstChild);

    const staticBasemap = mapContainer.querySelector('.atlas-map-basemap');
    if (staticBasemap) {
      stage.appendChild(staticBasemap);
    }

    if (markerLayer) {
      stage.appendChild(markerLayer);
    }

    return stage;
  };

  const createCanvasContainer = (stageContainer) => {
    const existing = stageContainer.querySelector('.atlas-map-canvas');
    if (existing) {
      return existing;
    }

    const canvas = document.createElement('div');
    canvas.className = 'atlas-map-canvas';
    stageContainer.insertBefore(canvas, stageContainer.firstChild);
    return canvas;
  };

  const normalizeMapLayoutContainer = (mapContainer) => {
    mapContainer.classList.remove('page-columns');

    const mapShell = mapContainer.closest('.atlas-map-shell');
    if (mapShell) {
      mapShell.classList.remove('page-columns');
    }
  };

  const applyMapVisualFallbackToggles = (mapContainer, markerLayer) => {
    const staticBasemap = mapContainer.querySelector('.atlas-map-basemap');
    if (staticBasemap) {
      staticBasemap.style.display = 'none';
    }

    if (markerLayer) {
      markerLayer.innerHTML = '';
      markerLayer.style.display = 'none';
    }
  };

  const waitForMapLoad = (map) => new Promise((resolve) => {
    if (map.loaded()) {
      resolve();
      return;
    }

    map.once('load', () => resolve());
  });

  const waitForLayoutFrame = () => new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });

  const createMapView = async ({
    mapContainer,
    markerLayer,
    places,
    accessToken,
    journeyHref,
    onMarkerHover,
    onMarkerFocus,
  }) => {
    if (!accessToken) {
      throw new Error('Missing Mapbox access token.');
    }

    const mapboxgl = await ensureMapboxAssets();
    mapboxgl.accessToken = accessToken;

    normalizeMapLayoutContainer(mapContainer);
    applyMapVisualFallbackToggles(mapContainer, markerLayer);
    const mapStage = createStageContainer(mapContainer, markerLayer);
    const mapCanvas = createCanvasContainer(mapStage);

    const map = new mapboxgl.Map({
      container: mapCanvas,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'mercator',
      center: [10, 24],
      zoom: 1.2,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      dragPan: false,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      touchZoomRotate: false,
      keyboard: false,
    });

    await waitForMapLoad(map);
    await waitForLayoutFrame();
    map.resize();
    map.setProjection('mercator');
    map.setTerrain(null);
    map.setFog(null);

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
        map.resize();
      })
      : null;

    if (resizeObserver) {
      resizeObserver.observe(mapStage);
    }

    if (places.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      places.forEach((place) => bounds.extend([place.longitude, place.latitude]));
      map.fitBounds(bounds, {
        padding: 80,
        duration: 0,
        maxZoom: 2.6,
      });
    }

    const markerItems = places.map((place) => {
      const markerElement = document.createElement('a');
      markerElement.className = 'atlas-map-marker';
      markerElement.href = journeyHref(place);
      markerElement.dataset.placeId = place.id;
      markerElement.setAttribute('aria-label', `${place.title}, ${place.year}`);

      markerElement.addEventListener('mouseenter', () => {
        onMarkerHover(place, markerElement);
      });

      markerElement.addEventListener('focus', () => {
        onMarkerFocus(place, markerElement);
      });

      const marker = new mapboxgl.Marker({
        element: markerElement,
        anchor: 'center',
      })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map);

      return {
        place,
        marker,
        element: markerElement,
      };
    });

    const setActiveMarkerByElement = (activeElement) => {
      markerItems.forEach(({ element }) => {
        element.classList.toggle('is-active', element === activeElement);
      });
    };

    const setActiveMarkerByIndex = (index) => {
      if (index < 0 || index >= markerItems.length) {
        return;
      }

      setActiveMarkerByElement(markerItems[index].element);
    };

    const setActiveMarkerByPlaceId = (placeId) => {
      const markerItem = markerItems.find(({ place }) => place.id === placeId);
      if (!markerItem) {
        return;
      }

      setActiveMarkerByElement(markerItem.element);
    };

    return {
      setActiveMarkerByElement,
      setActiveMarkerByIndex,
      setActiveMarkerByPlaceId,
      destroy: () => {
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        markerItems.forEach(({ marker }) => marker.remove());
        map.remove();
      },
    };
  };

  global.MapboxView = {
    createMapView,
  };
}(window));
