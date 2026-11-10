(() => {
  // Enable or disable the offer on all pages.
  const popupEnabled = true;
  if (!popupEnabled) return;

  const popup = document.querySelector('.anniversary-popup');
  if (!popup || typeof popup.showModal !== 'function') return;

  popup.querySelector('.anniversary-popup__close').addEventListener('click', () => {
    popup.close();
  });

  popup.addEventListener('click', (event) => {
    if (event.target !== popup) return;
    const bounds = popup.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      popup.close();
    }
  });

  popup.showModal();
})();
