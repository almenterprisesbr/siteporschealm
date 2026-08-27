/* ==========================================================================
   Porsche Taycan — Hero Concept

   O scroll controla o tempo do vídeo (estilo Apple) e cada texto (.cue)
   aparece na faixa de segundos definida em data-in / data-out no HTML.

   Para ajustar quando cada texto entra: mexa no HTML, não aqui.
   Para ajustar a velocidade do scroll: mexa em --hero-scroll no CSS.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof gsap !== 'undefined';

  var hero = document.getElementById('hero');
  var video = document.getElementById('heroVideo');
  var stage = document.getElementById('heroStage');
  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var rail = document.getElementById('rail');
  var railFill = document.getElementById('railFill');
  var scrollCue = document.getElementById('scrollCue');

  var SMOOTHING = 0.12;   // quanto o vídeo "persegue" o scroll (menor = mais suave)
  var FALLBACK_DURATION = 10;

  /* ---------------------------------- Nav mobile ---------------------------------- */

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

  /* ---------------------------------- Cues ---------------------------------- */

  var cues = [].map.call(document.querySelectorAll('.cue'), function (el) {
    return {
      el: el,
      start: parseFloat(el.dataset.in) || 0,
      end: parseFloat(el.dataset.out) || 0,
      active: false,
      tick: null
    };
  });

  function updateCues(t) {
    for (var i = 0; i < cues.length; i++) {
      var c = cues[i];
      var on = t >= c.start && t < c.end;
      if (on !== c.active) {
        c.active = on;
        c.el.classList.toggle('is-active', on);
        if (c.tick) c.tick.classList.toggle('is-on', on);
      }
    }
  }

  function buildTicks(duration) {
    if (!rail) return;
    var line = rail.querySelector('.rail__line');
    cues.forEach(function (c) {
      var tick = document.createElement('span');
      tick.className = 'rail__tick';
      tick.style.top = Math.min(100, (c.start / duration) * 100) + '%';
      line.appendChild(tick);
      c.tick = tick;
    });
  }

  /* ---------------------------------- Vídeo ---------------------------------- */

  var canScrub = false;
  var duration = FALLBACK_DURATION;

  if (video) {
    video.addEventListener('loadedmetadata', function () {
      if (video.duration && isFinite(video.duration)) duration = video.duration;
      canScrub = true;
      if (rail && !rail.dataset.built) {
        rail.dataset.built = '1';
        buildTicks(duration);
      }
    });

    video.addEventListener('error', function () {
      if (stage) stage.classList.add('no-video');
      canScrub = false;
    }, true);

    setTimeout(function () {
      if (video.readyState === 0) {
        if (stage) stage.classList.add('no-video');
      }
      if (rail && !rail.dataset.built) {
        rail.dataset.built = '1';
        buildTicks(duration);
      }
    }, 2000);
  }

  /* ---------------------------------- Scroll → tempo do vídeo ---------------------------------- */

  function heroProgress() {
    if (!hero) return 0;
    var rect = hero.getBoundingClientRect();
    var span = hero.offsetHeight - window.innerHeight;
    if (span <= 0) return 0;
    var p = -rect.top / span;
    return p < 0 ? 0 : p > 1 ? 1 : p;
  }

  var smoothTime = 0;
  var userScrolled = false;

  function loop() {
    var p = heroProgress();
    var target = p * duration;

    smoothTime += (target - smoothTime) * SMOOTHING;
    if (Math.abs(target - smoothTime) < 0.004) smoothTime = target;

    // Só mexe no vídeo se ele estiver pronto e não estiver no meio de um seek.
    if (canScrub && !video.seeking) {
      if (Math.abs(video.currentTime - smoothTime) > 1 / 48) {
        try { video.currentTime = smoothTime; } catch (e) { /* seek recusado, tenta no próximo frame */ }
      }
    }

    updateCues(smoothTime);
    if (railFill) railFill.style.height = (p * 100) + '%';

    // nav sólida depois que o hero termina
    if (nav) nav.classList.toggle('nav--solid', p >= 1);

    // some com o "role" assim que o usuário começa
    if (scrollCue && !userScrolled && p > 0.01) {
      userScrolled = true;
      scrollCue.style.opacity = '0';
    }

    requestAnimationFrame(loop);
  }

  /* ---------------------------------- Entrada ---------------------------------- */

  // showAllCues: só no modo reduced-motion, onde os textos viram uma
  // lista empilhada e legível em vez de aparecerem por segundo.
  function revealInstant(showAllCues) {
    if (nav) nav.style.opacity = '1';
    if (video) video.style.filter = 'brightness(1)';
    var lightpool = document.querySelector('.hero__lightpool');
    if (lightpool) lightpool.style.opacity = '1';
    if (rail) rail.classList.add('is-visible');
    if (scrollCue) scrollCue.style.opacity = '1';
    var pre = document.getElementById('preloader');
    if (pre) pre.style.display = 'none';
    if (showAllCues) {
      cues.forEach(function (c) { c.active = true; c.el.classList.add('is-active'); });
    }
  }

  function runPreloader(onDone) {
    var ring = document.querySelector('.preloader__ring-fill');
    var word = document.querySelector('.preloader__word');
    var pre = document.getElementById('preloader');

    gsap.timeline({
      onComplete: function () {
        if (pre) pre.style.display = 'none';
        onDone();
      }
    })
      .fromTo(ring, { strokeDashoffset: 176 }, { strokeDashoffset: 30, duration: 1, ease: 'power2.out' })
      .fromTo(word, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }, '-=.7')
      .to(pre, { opacity: 0, duration: .6, ease: 'power2.inOut' }, '+=.25');
  }

  function runHeroReveal() {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.nav', { opacity: 1, duration: .6 }, 0)
      .to(video, { filter: 'brightness(1)', duration: 1.6, ease: 'power2.inOut' }, 0)
      .to('.hero__lightpool', { opacity: 1, duration: 1.4, ease: 'power2.out' }, .3)
      .call(function () {
        if (rail) rail.classList.add('is-visible');
        if (scrollCue && !userScrolled) scrollCue.style.opacity = '1';
      }, null, 1.0);

    requestAnimationFrame(loop);
  }

  /* ---------------------------------- Reveal on scroll (specs / design / contato) ---------------------------------- */

  function setCount(el, val) {
    var decimals = parseInt(el.dataset.decimals || '0', 10);
    el.textContent = (el.dataset.prefix || '') + val.toFixed(decimals) + (el.dataset.suffix || '');
  }

  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    if (reduceMotion) { setCount(el, target); return; }

    var duration = 1400;
    var start = null;

    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      setCount(el, target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var revealEls = [].slice.call(document.querySelectorAll('[data-reveal]'));

  if (revealEls.length) {
    if ('IntersectionObserver' in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          [].forEach.call(entry.target.querySelectorAll('[data-count]'), animateCount);
          io.unobserve(entry.target);
        });
      }, { threshold: .25 });

      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('is-in');
        [].forEach.call(el.querySelectorAll('[data-count]'), function (c) { setCount(c, parseFloat(c.dataset.count)); });
      });
    }
  }

  /* ---------------------------------- Boot ---------------------------------- */

  if (reduceMotion) {
    revealInstant(true);
  } else if (!hasGsap) {
    revealInstant(false);
    requestAnimationFrame(loop);
  } else {
    runPreloader(runHeroReveal);
  }
})();
