(() => {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const setMenu = (open) => {
    links?.classList.toggle('show', open);
    toggle?.classList.toggle('open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  const form = document.querySelector('.travel-search');
  if (!form) return;
  const input = form.querySelector('input');
  const cards = [...document.querySelectorAll('.travel-list .travel-card')];
  const status = document.querySelector('.travel-result');
  const category = document.querySelector('.travel-filters [aria-current="page"]')?.textContent.replace(/\s*\(\d+\)\s*$/, '').trim() || 'Alle Artikel';
  const normalize = text => text.toLocaleLowerCase('de-CH').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss');
  const apply = () => {
    const words = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const text = normalize(card.dataset.search);
      card.hidden = !words.every(word => text.includes(word));
      if (!card.hidden) count++;
    });
    status.textContent = `${count} Artikel · ${category}${words.length ? ' · Suchergebnis' : ''}`;
    document.querySelector('.travel-empty').hidden = count !== 0;
  };
  const readURL = () => {
    const url = new URL(location.href);
    input.value = url.searchParams.get('q') || '';
    apply();
  };
  input.addEventListener('input', () => {
    const url = new URL(location.href);
    if (input.value.trim()) url.searchParams.set('q', input.value.trim());
    else url.searchParams.delete('q');
    history.replaceState(null, '', url);
    apply();
  });
  form.addEventListener('submit', event => { event.preventDefault(); apply(); });
  form.addEventListener('reset', () => {
    const url = new URL(location.href);
    url.searchParams.delete('q');
    history.replaceState(null, '', url);
    setTimeout(() => { apply(); input.focus(); }, 0);
  });
  window.addEventListener('popstate', readURL);
  // Preserve older shared category URLs by resolving them to their crawlable pages.
  const oldCategory = new URL(location.href).searchParams.get('kategorie');
  const categoryLink = [...document.querySelectorAll('.travel-filters a')].find(a => a.textContent.replace(/\s*\(\d+\)\s*$/, '').trim() === oldCategory);
  if (oldCategory && categoryLink) {
    const target = new URL(categoryLink.href);
    const query = new URL(location.href).searchParams.get('q');
    if (query) target.searchParams.set('q', query);
    location.replace(target);
    return;
  }
  form.hidden = false;
  readURL();
})();
