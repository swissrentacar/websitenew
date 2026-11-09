(() => {
  const grid = document.querySelector('#monthly-rental-cars');
  const controls = document.querySelector('.abo-carousel-controls');
  if (!grid || !controls) return;
  const cards = Array.from(grid.querySelectorAll('.abo-card'));
  const previous = controls.querySelector('.abo-carousel-prev');
  const next = controls.querySelector('.abo-carousel-next');
  const count = controls.querySelector('.abo-carousel-count');
  const mobile = window.matchMedia('(max-width:640px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  const position = card => card.getBoundingClientRect().left - grid.getBoundingClientRect().left + grid.scrollLeft - grid.clientLeft - 2;
  const update = () => {
    controls.hidden = !mobile.matches;
    if (!mobile.matches) return;
    index = cards.reduce((nearest, card, i) => Math.abs(position(card) - grid.scrollLeft) < Math.abs(position(cards[nearest]) - grid.scrollLeft) ? i : nearest, 0);
    count.textContent = `${index + 1} / ${cards.length}`;
    previous.disabled = index === 0;
    next.disabled = index === cards.length - 1;
  };
  const go = target => {
    if (!mobile.matches) return;
    index = Math.max(0, Math.min(cards.length - 1, target));
    grid.scrollTo({ left: position(cards[index]), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };
  previous.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  grid.addEventListener('scroll', update, { passive: true });
  grid.addEventListener('keydown', event => {
    if (!mobile.matches || event.target !== grid) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      go(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  const resize = () => {
    if (mobile.matches) grid.scrollTo({ left: position(cards[index]), behavior: 'instant' });
    update();
  };
  window.addEventListener('resize', resize);
  update();
})();
