/* ==========================================================================
   Porsche Study — Hero Concept
   Preloader → luz revela o carro → UI entra em stagger.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof gsap !== 'undefined';

  /* ---------------------------------- Nav mobile ---------------------------------- */

  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav--open');
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    nav.querySelectorAll('.nav__links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------- Vídeo do hero ---------------------------------- */

  var stage = document.getElementById('heroStage');
  var video = document.getElementById('heroVideo');

  if (video && stage) {
    video.addEventListener('error', function () {
      stage.classList.add('no-video');
    }, true);

    // Se depois de um tempo curto nada carregou (ex: fonte ainda não existe
    // em src/assets/video/), assume o fallback também.
    setTimeout(function () {
      if (video.readyState === 0) stage.classList.add('no-video');
    }, 1200);
  }

  /* ---------------------------------- Timelines ---------------------------------- */

  function revealInstant() {
    document.querySelectorAll('.hero__reveal, .nav, .hero__lightpool')
      .forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    if (video) video.style.filter = 'brightness(1)';
    var pre = document.getElementById('preloader');
    if (pre) pre.style.display = 'none';
  }

  function runPreloader(onDone) {
    var ring = document.querySelector('.preloader__ring-fill');
    var word = document.querySelector('.preloader__word');
    var pre = document.getElementById('preloader');

    var tl = gsap.timeline({
      onComplete: function () {
        if (pre) pre.style.display = 'none';
        onDone();
      }
    });

    tl.fromTo(ring, { strokeDashoffset: 176 }, { strokeDashoffset: 30, duration: 1, ease: 'power2.out' })
      .fromTo(word, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }, '-=.7')
      .to(pre, { opacity: 0, duration: .6, ease: 'power2.inOut' }, '+=.25');
  }

  function runHeroReveal() {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.nav', { opacity: 1, duration: .6 }, 0)
      .to(video, { filter: 'brightness(1)', duration: 1.6, ease: 'power2.inOut' }, 0)
      .to('.hero__lightpool', { opacity: 1, duration: 1.4, ease: 'power2.out' }, .3)
      .to('.hero__reveal', {
        opacity: 1,
        y: 0,
        duration: .8,
        stagger: .12
      }, .9)
      .fromTo(video, { scale: 1.06 }, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0);
  }

  /* ---------------------------------- Boot ---------------------------------- */

  if (!hasGsap || reduceMotion) {
    revealInstant();
  } else {
    runPreloader(runHeroReveal);
  }
})();
