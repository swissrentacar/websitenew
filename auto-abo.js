(() => {
  const section = document.querySelector('.srac-abo');
  if (!section) return;
  const form = section.querySelector('form');
  const car = form.elements.vehicle;
  const duration = form.elements.duration;
  const kilometres = form.elements.kilometres;
  const en = section.dataset.language === 'en';
  const summary = section.querySelector('#abo-summary');
  const description = () => `${car.selectedOptions[0].textContent} · ${duration.value} ${en ? (duration.value === '1' ? 'month' : 'months') : (duration.value === '1' ? 'Monat' : 'Monate')} · ${Number(kilometres.value).toLocaleString('de-CH')} km/${en ? 'month' : 'Monat'}`;
  const prices = window.SRAC_ABO_PRICING;
  const update = () => {
    const pricing = prices[car.value];
    const packages = Object.keys(pricing.packages);
    const previousKm = kilometres.value;
    if (Array.from(kilometres.options).map(option => option.value).join(',') !== packages.join(',')) {
      kilometres.replaceChildren(...packages.map(km => new Option(`${Number(km).toLocaleString('de-CH')} km`, km)));
      kilometres.value = packages.includes(previousKm) ? previousKm : packages[0];
    }
    const total = pricing.packages[kilometres.value][Number(duration.value) - 1];
    const monthly = total / Number(duration.value);
    const money = value => Number(value).toLocaleString('de-CH', { maximumFractionDigits: 2 });
    summary.textContent = description();
    section.querySelector('#abo-selected-price').textContent = `CHF ${money(total)}`;
    section.querySelector('#abo-monthly-price').textContent = `CHF ${money(monthly)} / ${en ? 'month' : 'Monat'}`;
    section.querySelector('#abo-extra-km').textContent = `${en ? 'Extra kilometres' : 'Mehrkilometer'}: CHF ${pricing.extra.toFixed(2)}/km`;
    section.querySelector('#abo-total-field').value = total;
    section.querySelector('#abo-monthly-field').value = monthly.toFixed(2);
    section.querySelector('#abo-extra-field').value = pricing.extra.toFixed(2);
    section.querySelectorAll('[data-abo-detail]').forEach(panel => {
      panel.hidden = panel.dataset.aboDetail !== car.value;
    });
    section.querySelectorAll('[data-abo-car]').forEach(link => {
      const selected = link.dataset.aboCar === car.value;
      link.closest('.abo-card').classList.toggle('is-selected', selected);
      if (selected) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };
  section.classList.add('abo-enhanced');
  update();
  form.addEventListener('change', update);
  section.querySelectorAll('[data-abo-car]').forEach(link => {
    link.addEventListener('click', () => {
      car.value = link.dataset.aboCar;
      update();
      const heading = section.querySelector(`[data-abo-detail="${car.value}"] h3`);
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
  });
})();
