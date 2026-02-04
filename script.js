// Simple gallery loader and lightbox
// Instructions: Put your photos in images/photo1.jpg, photo2.jpg, ... up to photoN.
// This script will attempt to load up to maxPhotos and display those that exist.

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('galleryGrid');
  const maxPhotos = 24; // adjust if you want to allow more
  for (let i = 1; i <= maxPhotos; i++) {
    const src = `images/photo${i}.jpg`;
    // Preload to test if file exists
    const img = new Image();
    img.src = src;
    img.onload = () => addImageToGallery(src, `photo${i}`);
    // onerror -> skip silently
  }

  // lightbox elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function addImageToGallery(src, caption) {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item';
    const im = document.createElement('img');
    im.src = src;
    im.alt = caption;
    wrapper.appendChild(im);
    wrapper.addEventListener('click', () => {
      openLightbox(src, caption);
    });
    gallery.appendChild(wrapper);
  }

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption.replace(/photo/i, ''); // simple caption
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Improve in-page nav smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });
});
