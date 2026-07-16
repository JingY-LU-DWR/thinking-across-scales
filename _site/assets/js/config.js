// Loader for Mapbox config: attempts to synchronously load a local config file
// (`config.local.js`) and falls back to `config.example.js` if not present.
// This keeps the real token out of the repository while preserving the
// existing `window.APP_CONFIG.MAPBOX_TOKEN` consumer API used by `map.js`.
(function () {
  const currentScript = document.currentScript;
  const base = currentScript ? currentScript.src.replace(/\/[^\/]*$/, '/') : './';

  function tryLoadSync(src) {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', src, false); // synchronous on purpose so downstream scripts see APP_CONFIG
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        // Execute the loaded script in global scope. The loaded file should set window.APP_CONFIG.
        (0, eval)(xhr.responseText);
        return true;
      }
    } catch (e) {
      // fail silently and fall back
    }
    return false;
  }

  const local = base + 'config.local.js';
  const example = base + 'config.example.js';

  if (!tryLoadSync(local)) {
    if (!tryLoadSync(example)) {
      // Final fallback: ensure APP_CONFIG exists so consumers won't throw.
      window.APP_CONFIG = window.APP_CONFIG || { MAPBOX_TOKEN: '' };
    }
  }
})();