(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // PRELOADER
  const preloader = document.getElementById('preloader');
  const ringFill = document.querySelector('.preloader__ring-fill');
  const nav = document.getElementById('nav');

  function boot() {
    document.body.classList.add('is-ready');
    if (!window.gsap || reduceMotion) {
      preloader.style.display = 'none';
      nav.style.opacity = 1;
      revealAll();
      return;
    }
    const tl = gsap.timeline();
    tl.to(ringFill, { strokeDashoffset: 0, duration: .7, ease: 'power2.out' })
      .to(preloader, { autoAlpha: 0, duration: .5, ease: 'power1.out' }, '+=.1')
      .set(preloader, { display: 'none' })
      .to(nav, { opacity: 1, duration: .6, ease: 'power1.out' }, '<')
      .from('.hero__ghost', { autoAlpha: 0, duration: 1 }, '<')
      .from('.hero__copy', { y: 20, autoAlpha: 0, duration: .7 }, '-=.5')
      .from('.rig', { y: 30, autoAlpha: 0, duration: .8 }, '-=.4')
      .from('.hero__stats', { y: 16, autoAlpha: 0, duration: .6 }, '-=.3');
    setupReveal();
  }

  window.addEventListener('load', () => setTimeout(boot, reduceMotion ? 0 : 250));

  function revealAll() {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
  }

  function setupReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        gsap.to(entry.target, { autoAlpha: 1, y: 0, duration: .8, ease: 'power2.out' });
        io.unobserve(entry.target);
      });
    }, { threshold: .2 });
    els.forEach(el => io.observe(el));
  }

  // GIRO — drag-to-rotate 360 viewer
  const rig = document.getElementById('rig');
  const stage = document.getElementById('rigStage');
  const hint = document.getElementById('rigHint');
  const angleValue = document.getElementById('rigAngleValue');
  if (!rig || !stage) return;

  let angle = 18;   // leve ângulo inicial pra sugerir profundidade
  let dragging = false;
  let lastX = 0;
  let idleTimer = null;
  let autoRotate = true;

  function render() {
    const rad = (angle % 360) * Math.PI / 180;
    const squish = Math.max(.55, Math.abs(Math.cos(rad)));
    stage.style.transform = `rotateY(${angle}deg) scaleX(${squish})`;
    const shown = Math.round(((angle % 360) + 360) % 360);
    if (angleValue) angleValue.textContent = String(shown).padStart(3, '0');
  }

  function pointerDown(x) {
    dragging = true;
    autoRotate = false;
    lastX = x;
    hint.classList.add('is-hidden');
    clearTimeout(idleTimer);
  }
  function pointerMove(x) {
    if (!dragging) return;
    const dx = x - lastX;
    lastX = x;
    angle += dx * 0.5;
    render();
  }
  function pointerUp() {
    if (!dragging) return;
    dragging = false;
    idleTimer = setTimeout(() => { autoRotate = true; }, 3500);
  }

  rig.addEventListener('mousedown', e => pointerDown(e.clientX));
  window.addEventListener('mousemove', e => pointerMove(e.clientX));
  window.addEventListener('mouseup', pointerUp);

  rig.addEventListener('touchstart', e => pointerDown(e.touches[0].clientX), { passive: true });
  rig.addEventListener('touchmove', e => pointerMove(e.touches[0].clientX), { passive: true });
  rig.addEventListener('touchend', pointerUp);

  render();

  if (!reduceMotion) {
    (function loop() {
      if (autoRotate) {
        angle += 0.06;
        render();
      }
      requestAnimationFrame(loop);
    })();
  }
})();
