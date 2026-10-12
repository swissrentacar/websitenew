document.querySelectorAll('.van-fleet-slider').forEach(slider => {
  const viewport = slider.querySelector('.van-fleet-viewport');
  const track = slider.querySelector('.van-fleet-track');
  const cards = [...track.children];
  const controls = slider.querySelector('.van-fleet-controls');
  const count = slider.querySelector('.van-fleet-count');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  let touchStart;
  const english = slider.dataset.language === 'en';
  const centered = slider.classList.contains('van-fleet-centered');

  function show(next, announce = true) {
    slider.style.setProperty('--fleet-direction', next < index ? -1 : 1);
    index = (next + cards.length) % cards.length;
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === index);
      if (centered) {
        card.classList.toggle('is-previous', i === (index - 1 + cards.length) % cards.length);
        card.classList.toggle('is-next', i === (index + 1) % cards.length);
      }
      card.inert = i !== index;
      card.setAttribute('aria-hidden', String(i !== index));
    });
    count.setAttribute('aria-live', announce ? 'polite' : 'off');
    count.textContent = `${index + 1} / ${cards.length}`;
  }

  function schedule() {
    clearInterval(timer);
    if (!reducedMotion.matches && !document.hidden &&
        !slider.matches(':hover') && !slider.contains(document.activeElement)) {
      timer = setInterval(() => show(index + 1, false), 8000);
    }
  }

  function navigate(step) {
    show(index + step);
    schedule();
  }

  slider.classList.add('is-ready');
  controls.hidden = false;
  cards.forEach((card, i) => {
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', english ? 'slide' : 'Folie');
    card.setAttribute('aria-label', `${i + 1} / ${cards.length}`);
  });
  slider.querySelector('.van-fleet-prev').addEventListener('click', () => navigate(-1));
  slider.querySelector('.van-fleet-next').addEventListener('click', () => navigate(1));
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  viewport.addEventListener('touchstart', event => {
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    clearInterval(timer);
  }, { passive: true });
  viewport.addEventListener('touchend', event => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) navigate(dx < 0 ? 1 : -1);
    touchStart = null;
    schedule();
  }, { passive: true });
  viewport.addEventListener('touchcancel', () => { touchStart = null; schedule(); });
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', schedule);
  slider.addEventListener('focusin', () => clearInterval(timer));
  slider.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', schedule);
  show(0, false);
  schedule();
});
