(() => {
  const en = document.documentElement.lang === 'en';
  document.querySelectorAll('form[action="https://api.web3forms.com/submit"]').forEach(form => {
    const status = document.createElement('p');
    status.className = 'srac-form-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);
    let pending = false;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (pending || !form.reportValidity()) return;
      const fields = new FormData(form);
      const payload = {};
      fields.forEach((value, key) => {
        if (key !== 'redirect') payload[key] = key in payload ? `${payload[key]}, ${value}` : value;
      });
      const vehicle = form.elements.namedItem('vehicle');
      if (vehicle) payload.vehicle = vehicle.selectedOptions[0].textContent;
      const buttons = Array.from(form.querySelectorAll('[type="submit"]'));
      const labels = buttons.map(button => button.textContent);
      pending = true;
      buttons.forEach(button => {
        button.disabled = true;
        button.textContent = en ? 'Sending…' : 'Wird gesendet…';
      });
      form.setAttribute('aria-busy', 'true');
      status.classList.remove('is-error');
      status.textContent = en ? 'Sending your enquiry. Please wait a moment.' : 'Ihre Anfrage wird gesendet. Bitte warten Sie einen Moment.';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch(form.action, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload),
          signal: controller.signal
        });
        const result = await response.json();
        if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error(result.message || (result.body && result.body.message) || `HTTP ${response.status}`);
        window.location.assign(new URL(fields.get('redirect')).pathname);
      } catch (error) {
        console.error('Enquiry submission failed:', error);
        status.classList.add('is-error');
        status.textContent = en
          ? 'The sending service did not confirm your enquiry. Your entries are still here. Please contact us at info@swissrentacar.ch or +41 78 300 90 90 before submitting again.'
          : 'Der Versanddienst hat Ihre Anfrage nicht bestätigt. Ihre Eingaben bleiben erhalten. Bitte kontaktieren Sie uns unter info@swissrentacar.ch oder +41 78 300 90 90, bevor Sie erneut absenden.';
        if (error.name !== 'AbortError' && error.message !== 'Failed to fetch') {
          status.textContent += ` (${error.message})`;
        }
      } finally {
        clearTimeout(timeout);
        pending = false;
        form.removeAttribute('aria-busy');
        buttons.forEach((button, i) => { button.disabled = false; button.textContent = labels[i]; });
      }
    });
  });
})();
