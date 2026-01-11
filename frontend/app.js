(() => {
  const burger = document.querySelector('[data-burger]');
  const nav = document.querySelector('.sp-nav');

  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target) || burger.contains(e.target)) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
})();
