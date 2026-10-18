(() => {
  'use strict';
  const previews = Array.from(document.querySelectorAll('.cs-shot'));
  const dialog = document.querySelector('#cs-lightbox');
  const image = document.querySelector('#cs-lightbox-image');
  const caption = document.querySelector('#cs-lightbox-caption');
  const counter = document.querySelector('#cs-lightbox-counter');
  const close = document.querySelector('#cs-lightbox-close');
  const previous = document.querySelector('#cs-lightbox-prev');
  const next = document.querySelector('#cs-lightbox-next');
  if (!previews.length || !dialog || !image) return;
  let current = 0;
  function show(index) {
    current = (index + previews.length) % previews.length;
    const item = previews[current];
    image.src = item.dataset.lightboxSrc;
    image.alt = item.dataset.lightboxAlt || 'Project screen';
    caption.textContent = image.alt;
    counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(previews.length).padStart(2, '0');
  }
  previews.forEach((item, index) => item.addEventListener('click', () => {
    show(index);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }));
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
  });
})();
