(() => {
  const key = 'portfolio-theme';
  const system = matchMedia('(prefers-color-scheme: dark)');
  const page = document.documentElement;
  let preference = null;
  let button;

  function readPreference() {
    try {
      const value = localStorage.getItem(key);
      return ['dark', 'light'].includes(value) ? value : null;
    } catch {
      return null;
    }
  }

  function applyTheme() {
    const theme = preference || (system.matches ? 'dark' : 'light');
    page.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === 'dark' ? '#191a20' : '#f3f0e9';
    button?.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  preference = readPreference();
  applyTheme();
  system.addEventListener('change', applyTheme);
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      preference = readPreference();
      applyTheme();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    button = document.querySelector('.theme-toggle');
    button.hidden = false;
    applyTheme();
    button.addEventListener('click', () => {
      preference = page.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch { /* Keep this tab's choice. */ }
      applyTheme();
    });
  });
})();
