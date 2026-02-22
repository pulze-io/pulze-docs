// Override primary color based on current product section
// Scene Manager: #14C9E1 | RenderFlow: #9E3CEC | Project Dream: #F97316
(function () {
  var lastPath = '';

  function hexToRGB(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return r + ' ' + g + ' ' + b;
  }

  function applyColor(root, hex) {
    var rgb = hexToRGB(hex);
    root.style.setProperty('--primary', rgb);
    root.style.setProperty('--primary-dark', rgb);
    root.style.setProperty('--primary-light', rgb);
  }

  function applyProductTheme() {
    var path = window.location.pathname;
    if (path === lastPath) return;
    lastPath = path;

    var root = document.documentElement;

    if (path.startsWith('/products/scene-manager')) {
      applyColor(root, '#14C9E1');
    } else if (path.startsWith('/products/renderflow')) {
      applyColor(root, '#9E3CEC');
    } else if (path.startsWith('/products/project-dream')) {
      applyColor(root, '#F97316');
    } else {
      root.style.removeProperty('--primary');
      root.style.removeProperty('--primary-dark');
      root.style.removeProperty('--primary-light');
    }
  }

  // Intercept pushState/replaceState to detect client-side navigation
  var origPushState = history.pushState;
  var origReplaceState = history.replaceState;

  history.pushState = function () {
    origPushState.apply(this, arguments);
    applyProductTheme();
  };

  history.replaceState = function () {
    origReplaceState.apply(this, arguments);
    applyProductTheme();
  };

  window.addEventListener('popstate', applyProductTheme);

  // Product card hover & dark mode fixes via injected CSS
  var style = document.createElement('style');
  style.textContent =
    '.pcard-sm:hover { border-color: #14C9E1 !important; }' +
    '.pcard-rf:hover { border-color: #9E3CEC !important; }' +
    '.pcard-pd:hover { border-color: #F97316 !important; }' +
    '.dark .pcard-sm:hover { border-color: #14C9E1 !important; }' +
    '.dark .pcard-rf:hover { border-color: #9E3CEC !important; }' +
    '.dark .pcard-pd:hover { border-color: #F97316 !important; }' +
    '.dark .pcard { border-color: rgba(255, 255, 255, 0.1) !important; }' +
    '.dark .pcard-title { color: #ffffff !important; }' +
    '.dark .pcard-desc { color: #9f9f9f !important; }';
  document.head.appendChild(style);

  // Initial apply
  applyProductTheme();
})();
