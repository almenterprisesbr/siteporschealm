/* ==========================================================================
   PIZZARIA DO ZÉ — interações e animações
   Depende de: GSAP + ScrollTrigger + Lenis (carregados no index.html)
   ========================================================================== */
(() => {
'use strict';

const CFG = window.ZE, MENU = window.CARDAPIO;
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const isDesktop = () => window.matchMedia('(min-width:861px)').matches;
const reduced   = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
const brl = n => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

gsap.registerPlugin(ScrollTrigger);

/* ══════════ ÍCONES ══════════ */
const ICO = {
  whatsapp:'<path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm7.5 18.4c-.3.9-1.8 1.7-2.5 1.8-.6.1-1.4.1-2.3-.1a19 19 0 0 1-8.3-7.3c-.6-1-1-2.1-1-3.2 0-1.2.6-1.8.9-2.1.2-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5l1 2.4c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.5 2.7 1.7.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2.3 1.1c.3.2.5.2.6.4.1.1.1.6-.2 1.4Z"/>',
  instagram:'<path d="M11 3h10a8 8 0 0 1 8 8v10a8 8 0 0 1-8 8H11a8 8 0 0 1-8-8V11a8 8 0 0 1 8-8Zm0 3a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V11a5 5 0 0 0-5-5H11Zm5 4.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM22.8 8a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2Z"/>',
  facebook:'<path d="M18 29V17.5h3.9l.6-4.5H18v-2.9c0-1.3.4-2.2 2.3-2.2h2.4V3.2c-.4 0-1.8-.2-3.5-.2-3.5 0-5.8 2.1-5.8 6v3.3H9.4V17h4v12H18Z"/>',
  tiktok:'<path d="M21.6 3h-4.3v18.1a3.6 3.6 0 1 1-3.6-3.6c.4 0 .7 0 1 .1v-4.4a8 8 0 1 0 6.9 7.9V11.7a9.7 9.7 0 0 0 5.6 1.8V9.2a5.6 5.6 0 0 1-5.6-5.6c0-.2 0-.4 0-.6Z"/>',
  ifood:'<path d="M9 5h14a4 4 0 0 1 4 4v3H5V9a4 4 0 0 1 4-4Zm18 10v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-8h22Zm-13 3H9v3h5v-3Z"/>',
  moto:'<path d="M25 12h-3l-2-4h-6v3h4.2l1.5 3H12a7 7 0 1 0 2.5 8h4.2A7 7 0 1 0 25 12ZM7 25a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm18 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"/>',
  bolt:'<path d="M18 2 6 18h7l-3 12 14-17h-8l2-11Z"/>'
};
const appIco = id => ({ ifood: ICO.ifood, keeta: ICO.moto, '99food': ICO.bolt, whatsapp: ICO.whatsapp }[id] || ICO.ifood);
const svg = (p, vb = '0 0 32 32') => `<svg viewBox="${vb}">${p}</svg>`;

/* ══════════ LINKS ══════════ */
const waLink = (msg = '') =>
  `https://wa.me/${CFG.whatsapp}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;
const telLink = () => 'tel:+' + CFG.whatsapp;

/* ══════════ 1. PRELOADER ══════════ */
/* Revela o site uma única vez. É chamado pelo fim da animação do preloader
   OU por um timer de segurança — porque se a aba abrir em segundo plano o
   requestAnimationFrame fica congelado e a animação nunca terminaria,
   deixando o visitante preso na tela de carregamento.                      */
let revealed = false;
function revealSite() {
  if (revealed) return;
  revealed = true;
  gsap.set('#preloader', { display: 'none' });
  document.body.classList.add('loaded');
  heroIn();
}

function preloader() {
  const bar = $('.preloader__bar i'), pct = $('.preloader__pct');
  const st = { v: 0 };

  gsap.timeline()
    .to(st, {
      v: 100, duration: reduced ? .3 : 1.5, ease: 'power2.inOut',
      onUpdate() { const n = Math.round(st.v); bar.style.width = n + '%'; pct.textContent = n + '%'; }
    })
    .to('.preloader__inner', { opacity: 0, y: -22, duration: .4, ease: 'power2.in' }, '-=.15')
    .to('.preloader__curtain', {
      scaleY: 1, duration: .8, ease: 'expo.inOut',
      onStart() { document.body.classList.add('loaded'); }
    }, '-=.2')
    .add(revealSite, '-=.35');

  // rede de segurança: no máximo 4,5s presos no preloader
  setTimeout(revealSite, 4500);
}

/* ══════════ 2. SMOOTH SCROLL ══════════ */
let lenis = null;
function smooth() {
  if (reduced || typeof Lenis === 'undefined') return;
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.6 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const goTo = target => {
  const el = typeof target === 'string' ? $(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ══════════ 3. CURSOR ══════════ */
function cursor() {
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const c = $('#cursor');
  const xTo = gsap.quickTo(c, 'x', { duration: .35, ease: 'power3' });
  const yTo = gsap.quickTo(c, 'y', { duration: .35, ease: 'power3' });
  window.addEventListener('mousemove', e => { xTo(e.clientX); yTo(e.clientY); });
  document.addEventListener('mouseover', e => {
    c.classList.toggle('is-hover', !!e.target.closest('[data-hover],a,button'));
  });
}

/* ══════════ 4. NAV ══════════ */
function nav() {
  const el = $('#nav'), links = $('#navLinks'), burger = $('#burger');
  let last = 0;

  ScrollTrigger.create({
    start: 'top -80', end: 99999,
    onUpdate(self) {
      const y = self.scroll();
      el.classList.toggle('is-stuck', y > 80);
      el.classList.toggle('is-hidden', y > last && y > 400 && !links.classList.contains('is-open'));
      last = y;
    }
  });

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (lenis) open ? lenis.stop() : lenis.start();
  });

  // rolagem suave + fecha menu mobile
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    e.preventDefault();
    if (links.classList.contains('is-open')) burger.click();
    goTo(id);
  }));

  // link ativo
  $$('#navLinks a').forEach(a => {
    const sec = $(a.getAttribute('href'));
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 45%',
      onToggle: s => a.classList.toggle('is-active', s.isActive)
    });
  });

  status();
  setInterval(status, 60000);
}

function status() {
  const el = $('#navStatus'); if (!el) return;
  const now  = new Date();
  const dia  = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  const rod  = CFG.rodizioDias.includes(dia);
  const util = dia >= 2 && dia <= 4;
  const aberto = (rod || util) && h >= CFG.rodizioAbre && h < CFG.rodizioFecha;

  el.classList.toggle('is-open', aberto);
  el.querySelector('em').textContent =
    aberto ? (rod ? 'Rodízio rolando agora' : 'Aberto agora') : 'Fechado no momento';
}

/* ══════════ 5. SPLIT DE TEXTO ══════════ */
function splitWords(root) {
  const walk = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        if (!n.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
          const o = document.createElement('span'); o.className = 'w';
          const i = document.createElement('span'); i.className = 'wi'; i.textContent = part;
          o.appendChild(i); frag.appendChild(o);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && !n.classList.contains('w')) walk(n);
    });
  };
  walk(root);
  return $$('.wi', root);
}

function splitChars(el) {
  const txt = el.textContent;
  el.textContent = '';
  return [...txt].map(ch => {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch === ' ' ? ' ' : ch;
    el.appendChild(s);
    return s;
  });
}

/* ══════════ 6. HERO ══════════ */
const HERO_ING = [
  { f: 'manjericao', x: 7,  y: 24, w: 92, r: -18, d: .9 },
  { f: 'queijo',     x: 13, y: 64, w: 78, r: 12,  d: .6 },
  { f: 'pimenta',    x: 4,  y: 45, w: 70, r: 26,  d: 1.2, sm: true },
  { f: 'azeitona',   x: 20, y: 12, w: 54, r: 0,   d: .75, sm: true },
  { f: 'tomate',     x: 87, y: 30, w: 86, r: 14,  d: .8 },
  { f: 'pepperoni',  x: 92, y: 60, w: 66, r: -8,  d: 1.1 },
  { f: 'cogumelo',   x: 26, y: 9,  w: 74, r: -22, d: .65, sm: true },
  { f: 'manjericao', x: 84, y: 74, w: 58, r: 140, d: 1,   sm: true }
];

function buildIngredients() {
  const box = $('#heroIng'); if (!box) return [];
  const small = window.innerWidth < 760;
  return HERO_ING.filter(i => !(small && i.sm)).map(i => {
    const img = new Image();
    img.src = `assets/ingredientes/${i.f}.svg`;
    img.alt = '';
    img.style.cssText =
      `left:${i.x}%;top:${i.y}%;--w:clamp(${Math.round(i.w * .42)}px,${(i.w / 15).toFixed(1)}vw,${i.w}px)`;
    img.dataset.depth = i.d;
    img.dataset.rot = i.r;
    box.appendChild(img);
    return img;
  });
}

function heroIn() {
  const chars = $$('.hero__title [data-split]').flatMap(splitChars);
  const ings  = buildIngredients();
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.from(chars, { yPercent: 118, duration: 1.15, stagger: .028 })
    .from('.hero__eyebrow', { y: 20, opacity: 0, duration: .7 }, '-=.85')
    .from('.hero__sub',     { y: 26, opacity: 0, duration: .8 }, '-=.6')
    .from('.hero__cta',     { y: 26, opacity: 0, duration: .8 }, '-=.65')
    .from('.hero__glow', { opacity: 0, scale: .7, duration: 1.6 }, '-=1')
    .from('.seal', { scale: 0, rotate: -140, duration: 1.2, ease: 'back.out(1.5)' }, '-=.9')
    .from('#heroPizza', { yPercent: 42, scale: .82, rotate: -22, duration: 1.6 }, '-=1.3')
    .to(ings, {
      opacity: 1, duration: .8, stagger: { each: .07, from: 'random' },
      onStart() { ings.forEach(floatIng); }
    }, '-=1.1')
    .to('.scrollcue', { opacity: 1, duration: .5 }, '-=.5')
    .to('.wafloat',   { y: 0, duration: .8, ease: 'back.out(1.4)' }, '-=.4');

  gsap.set('.scrollcue', { opacity: 0 });
  document.body.classList.add('is-ready');
}

function floatIng(img) {
  const r = +img.dataset.rot;
  gsap.set(img, { rotate: r });
  gsap.to(img, {
    y: gsap.utils.random(-26, -12), rotate: r + gsap.utils.random(-14, 14),
    duration: gsap.utils.random(2.6, 4.4), ease: 'sine.inOut',
    yoyo: true, repeat: -1, delay: gsap.utils.random(0, 1.4)
  });
}

function heroScroll() {
  if (reduced) return;

  gsap.to('#heroPizza', {
    yPercent: 22, rotate: 46, scale: 1.08, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.hero__glow', {
    opacity: 0, scale: 1.3, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: '60% top', scrub: .6 }
  });
  gsap.to('.hero__content', {
    y: -90, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: '65% top', scrub: .6 }
  });
  gsap.to('.seal', {
    y: -140, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: '55% top', scrub: .6 }
  });
  $$('#heroIng img').forEach(img => {
    gsap.to(img, {
      y: `+=${-140 * img.dataset.depth}`, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
  });
}

/* ══════════ 7. CONTADORES ══════════ */
function countUp() {
  $$('[data-count]').forEach(el => {
    const end = parseFloat(el.dataset.count), pre = el.dataset.prefix || '';
    const dec = end % 1 !== 0;
    const o = { v: 0 };
    gsap.to(o, {
      v: end, duration: 1.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate() { el.textContent = pre + (dec ? brl(o.v) : Math.round(o.v)); }
    });
  });
}

/* ══════════ 8. REVEALS ══════════ */
function reveals() {
  $$('[data-lines]').forEach(el => {
    const words = splitWords(el);
    gsap.from(words, {
      yPercent: 115, duration: 1, ease: 'expo.out', stagger: .045,
      scrollTrigger: { trigger: el, start: 'top 86%' }
    });
  });

  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    onEnter: b => gsap.to(b, {
      opacity: 1, y: 0, duration: .9, ease: 'expo.out', stagger: .1, overwrite: true
    })
  });

  // cards com stagger
  [['.price__card', .1], ['.app', .09], ['.soc', .07], ['.hours li', .05],
   ['.factsbar__grid div', .1]].forEach(([sel, st]) => {
    const items = $$(sel); if (!items.length) return;
    gsap.from(items, {
      y: 44, opacity: 0, duration: .9, ease: 'expo.out', stagger: st,
      scrollTrigger: { trigger: items[0].parentElement, start: 'top 82%' }
    });
  });
}

/* ══════════ 9. MARQUEE ══════════ */
function marquee() {
  const sets = [
    { el: $('#mq1'), items: ['Rodízio de sexta a domingo', 'Refil grátis de refri', 'Espaço kids incluso', 'R$ 99,90 por pessoa'], dir: -1 },
    { el: $('#mq2'), items: ['Clássicas', 'Gourmet', 'Da casa', 'Doces', 'Delivery todo dia'], dir: 1 }
  ];

  sets.forEach(({ el, items, dir }) => {
    if (!el) return;
    const chunk = items.map((t, i) =>
      `<span>${i % 2 ? `<em>${t}</em>` : t}<i></i></span>`).join('');
    el.innerHTML = chunk.repeat(4);

    const w = el.scrollWidth / 4;
    gsap.set(el, { x: dir < 0 ? 0 : -w });
    gsap.to(el, {
      x: dir < 0 ? -w : 0, duration: 22, ease: 'none', repeat: -1,
      modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % w) }
    });
  });
}

/* ══════════ 10. PASSOS (scroll horizontal) ══════════ */
const HOW_ING = [
  { f: 'tomate',    x: 4,  y: 14, w: 46, r: 12  },
  { f: 'azeitona',  x: 92, y: 20, w: 36, r: -18 },
  { f: 'manjericao',x: 8,  y: 78, w: 44, r: -24 },
  { f: 'pimenta',   x: 94, y: 72, w: 40, r: 20  }
];

function buildHowIngredients() {
  const box = $('#howIng'); if (!box) return;
  HOW_ING.forEach(i => {
    const img = new Image();
    img.src = `assets/ingredientes/${i.f}.svg`;
    img.alt = '';
    img.style.cssText = `left:${i.x}%;top:${i.y}%;--w:clamp(30px,${(i.w / 15).toFixed(1)}vw,${i.w}px)`;
    box.appendChild(img);
    gsap.to(img, {
      y: gsap.utils.random(-22, -10), rotate: i.r + gsap.utils.random(-10, 10),
      duration: gsap.utils.random(3, 4.6), ease: 'sine.inOut', yoyo: true, repeat: -1
    });
  });
}

function steps() {
  const track = $('#steps'), sec = $('#how');
  if (!track || !sec) return;

  buildHowIngredients();
  const nowEl = $('#stepNow'), bar = $('#stepBar');
  const total = $$('.step', track).length;
  const real = $$('.step:not(.step--cta)', track).length;
  const setProgress = p => {
    if (nowEl) nowEl.textContent = String(Math.min(real, Math.round(p * (total - 1)) + 1)).padStart(2, '0');
    if (bar) bar.style.width = (100 / total) + Math.round(p * (100 - 100 / total)) + '%';
  };

  if (!isDesktop() || reduced) {
    const vp = track.parentElement;
    vp.style.cssText = 'overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px';
    $$('.step', track).forEach(s => s.style.scrollSnapAlign = 'start');
    vp.addEventListener('scroll', () => {
      const p = vp.scrollLeft / (vp.scrollWidth - vp.clientWidth || 1);
      setProgress(p);
    }, { passive: true });
    return;
  }

  const dist = () => track.scrollWidth - track.parentElement.offsetWidth;
  if (dist() <= 0) return;

  gsap.to(track, {
    x: () => -dist(), ease: 'none',
    scrollTrigger: {
      trigger: sec, start: 'center center', end: () => '+=' + dist() * 1.15,
      pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
      onUpdate: self => setProgress(self.progress)
    }
  });
}

/* ══════════ 9b. PARALLAX NOS TEXTOS GIGANTES DE FUNDO ══════════ */
function ghostParallax() {
  if (reduced) return;
  [['.how__ghost', 70], ['.foot__giant', 40]].forEach(([sel, dist]) => {
    const el = $(sel); if (!el) return;
    // ambos os elementos são centralizados via CSS com transform:translateX(-50%);
    // fixamos essa base em xPercent para o GSAP poder animar "x" (em px) por cima,
    // sem perder a centralização.
    gsap.set(el, { xPercent: -50 });
    gsap.fromTo(el, { x: dist }, {
      x: -dist, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
    });
  });
}

/* ══════════ 10a. TILT 3D NOS CARTÕES ══════════ */
/* Substitui o lift por CSS nesses cartões: o GSAP passa a controlar todo o
   transform (inclinação + elevação), então o :hover do CSS para eles é
   redundante enquanto o JS está ativo — mas continua servindo de fallback
   em touch/reduced-motion, quando esta função nem roda.                    */
function tilt(selector, max = 9) {
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches || reduced) return;
  $$(selector).forEach(el => {
    gsap.set(el, { transformPerspective: 800, transformStyle: 'preserve-3d' });
    const rx = gsap.quickTo(el, 'rotationX', { duration: .6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: .6, ease: 'power3' });
    const ty = gsap.quickTo(el, 'y', { duration: .6, ease: 'power3' });

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      ry(px * max); rx(-py * max); ty(-8);
    });
    el.addEventListener('mouseleave', () => { rx(0); ry(0); ty(0); });
  });
}

/* ══════════ 10b. BOTÕES MAGNÉTICOS ══════════ */
function magnets() {
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches || reduced) return;
  $$('[data-magnet]').forEach(el => {
    const strength = 22;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      gsap.to(el, { x: x * strength, y: y * strength, duration: .5, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }));
  });
}

/* ══════════ 11. CARDÁPIO ══════════ */
function cardapio() {
  const tabsBox = $('#menuTabs'), panelsBox = $('#menuPanels');
  if (!tabsBox || !MENU) return;

  MENU.categorias.forEach((cat, idx) => {
    // aba
    const tab = document.createElement('button');
    tab.className = 'menu__tab';
    tab.type = 'button';
    tab.role = 'tab';
    tab.id = 'tab-' + cat.id;
    tab.setAttribute('aria-controls', 'panel-' + cat.id);
    tab.setAttribute('aria-selected', idx === 0);
    tab.dataset.hover = '';
    tab.innerHTML = `<span>${cat.nome}</span>`;
    tabsBox.appendChild(tab);

    // painel
    const panel = document.createElement('div');
    panel.className = 'menu__panel' + (idx === 0 ? ' is-on' : '');
    panel.id = 'panel-' + cat.id;
    panel.role = 'tabpanel';
    panel.setAttribute('aria-labelledby', tab.id);

    const sizes = cat.precoUnico ? '' :
      `<div class="menu__sizes">${MENU.tamanhos.map(t =>
        `<div><b>${t.nome}</b><span>${t.fatias}</span></div>`).join('')}</div>`;

    panel.innerHTML = `
      <div class="menu__intro">
        <div><h3>${cat.nome} — <em>${cat.chamada}</em></h3><p>${cat.desc}</p></div>
        ${sizes}
      </div>
      <div class="menu__list">${cat.itens.map(it => dishHTML(it, cat)).join('')}</div>`;
    panelsBox.appendChild(panel);

    tab.addEventListener('click', () => selectTab(cat.id));
  });

  function selectTab(id) {
    $$('.menu__tab', tabsBox).forEach(t =>
      t.setAttribute('aria-selected', t.id === 'tab-' + id));
    $$('.menu__panel', panelsBox).forEach(p => p.classList.toggle('is-on', p.id === 'panel-' + id));
    const on = $('#panel-' + id);
    gsap.fromTo($$('.dish', on),
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: .55, ease: 'expo.out', stagger: .035, overwrite: true });
    ScrollTrigger.refresh();
  }

  // anima a primeira categoria ao entrar na seção
  ScrollTrigger.create({
    trigger: '#cardapio', start: 'top 70%', once: true,
    onEnter: () => gsap.from($$('.menu__panel.is-on .dish'), {
      y: 26, opacity: 0, duration: .7, ease: 'expo.out', stagger: .045
    })
  });
}

function dishHTML(it, cat) {
  const tags = (it.tags || []).map(t => `<span class="tag tag--${t}">${
    { top: 'Mais pedida', novo: 'Novidade', picante: 'Picante', veg: 'Veg' }[t] || t
  }</span>`).join('');

  let precos;
  if (cat.precoUnico) {
    precos = it.incluso
      ? `<div class="dish__solo dish__free">Incluso</div>`
      : `<div class="dish__solo">R$ ${brl(it.precoUnico)}</div>`;
  } else {
    precos = `<div class="dish__prices">${MENU.tamanhos.map((t, i) =>
      `<span>${brl(it.precos[i])}<small>${t.nome}</small></span>`).join('')}</div>`;
  }

  return `<article class="dish">
    <div>
      <div class="dish__name">${it.nome}${tags}</div>
      <p class="dish__desc">${it.desc}</p>
    </div>
    ${precos}
  </article>`;
}

/* ══════════ 12. DADOS DINÂMICOS ══════════ */
function fillData() {
  // dias do rodízio
  const days = $('#days');
  if (days) {
    const nomes = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    days.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d =>
      `<span class="${CFG.rodizioDias.includes(d) ? 'on' : ''}">${nomes[d]}</span>`).join('');
  }

  // apps de entrega
  const apps = $('#appsGrid');
  if (apps) apps.innerHTML = CFG.apps.filter(a => a.link).map(a => `
    <a class="app" href="${a.link === 'whatsapp' ? waLink(`Olá! Quero fazer um pedido para entrega na ${CFG.nome}.`) : a.link}"
       target="_blank" rel="noopener" style="--c:${a.cor}" data-hover>
      <div class="app__ico ${a.id === 'keeta' ? 'app__ico--dark' : ''}">${svg(appIco(a.id))}</div>
      <div><h3>${a.nome}</h3><p>${a.desc}</p></div>
      <span class="app__go">Pedir agora <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
    </a>`).join('');

  // redes sociais
  const socHTML = CFG.redes.filter(r => r.link).map(r => `
    <a class="soc" href="${r.link === 'whatsapp' ? waLink() : r.link}" target="_blank" rel="noopener" data-hover>
      <div class="soc__ico">${svg(ICO[r.id] || ICO.instagram)}</div>
      <div><b>${r.nome}</b><span>${r.user}</span></div>
    </a>`).join('');
  if ($('#socialGrid')) $('#socialGrid').innerHTML = socHTML;
  if ($('#footSocial')) $('#footSocial').innerHTML = CFG.redes.filter(r => r.link).map(r =>
    `<a href="${r.link === 'whatsapp' ? waLink() : r.link}" target="_blank" rel="noopener">${r.nome}</a>`).join('');

  // endereço
  const addr = $('#addrBox');
  if (addr) addr.innerHTML =
    `<b>${CFG.nome}</b>${CFG.endereco.rua}<br>${CFG.endereco.cidade}<span>${CFG.endereco.cep}</span>`;

  // horários
  const hours = $('#hoursList');
  if (hours) hours.innerHTML = CFG.horarios.map(h => `
    <li class="${h.destaque ? 'hot' : ''} ${h.fechado ? 'off' : ''}">
      <span>${h.dia}</span>
      <b>${h.texto}${h.destaque ? '<em>rodízio</em>' : ''}</b>
    </li>`).join('');

  // mapa + telefone + whatsapp
  if ($('#mapFrame')) $('#mapFrame').src = CFG.endereco.mapaEmbed;
  if ($('#mapBtn'))   $('#mapBtn').href = CFG.endereco.mapaLink;
  if ($('#telNum'))   $('#telNum').textContent = CFG.telefone;
  if ($('#telLink'))  $('#telLink').href = telLink();
  if ($('#footTel'))  { $('#footTel').textContent = CFG.telefone; $('#footTel').href = telLink(); }
  if ($('#footWa'))   $('#footWa').href = waLink();
  if ($('#waFloat'))  $('#waFloat').href = waLink(`Olá! Vim pelo site da ${CFG.nome}.`);
  if ($('#year'))     $('#year').textContent = new Date().getFullYear();

  // botões "reservar" levam ao formulário
  $$('[data-cta-reserva]').forEach(b => b.setAttribute('href', '#reserva'));
}

/* ══════════ 13. FORMULÁRIO DE RESERVA ══════════ */
function bookingForm() {
  const form = $('#bookForm'); if (!form) return;

  // data mínima = hoje
  const d = $('#bData');
  const hoje = new Date().toISOString().split('T')[0];
  d.min = hoje; d.value = hoje;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const req = ['#bNome', '#bData', '#bHora', '#bPessoas'];
    let ok = true;
    req.forEach(s => {
      const f = $(s);
      const bad = !f.value.trim();
      f.classList.toggle('err', bad);
      if (bad && ok) { f.focus(); ok = false; }
    });
    if (!ok) return;

    const v = id => $(id).value.trim();
    const dt = new Date(v('#bData') + 'T12:00:00');
    const dataFmt = dt.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
    const kids = v('#bCriancas');
    const obs = v('#bObs');

    const msg =
      `Olá! Quero reservar uma mesa na ${CFG.nome}.\n\n` +
      `*Nome:* ${v('#bNome')}\n` +
      `*Dia:* ${dataFmt}\n` +
      `*Horário:* ${v('#bHora')}\n` +
      `*Pessoas:* ${v('#bPessoas')}\n` +
      (kids !== '0' ? `*Crianças:* ${kids}\n` : '') +
      (obs ? `*Observação:* ${obs}\n` : '') +
      `\nPode confirmar pra mim?`;

    window.open(waLink(msg), '_blank', 'noopener');
  });

  form.addEventListener('input', e => e.target.classList.remove('err'));
}

/* ══════════ 14. BOOT ══════════ */
function init() {
  smooth();
  cursor();
  fillData();
  cardapio();
  bookingForm();
  nav();
  reveals();
  countUp();
  marquee();
  steps();
  magnets();
  ghostParallax();
  tilt('.price__card', 5);
  tilt('.app', 9);
  tilt('.soc', 9);
  heroScroll();
  preloader();

  window.addEventListener('resize', () => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();

})();
