# Referências — Hero Section

Arquivo vivo. Cada referência nova entra aqui com o que ela ensina.

---

## 01 — turbotweak / Porsche 918 Spyder  ⭐ referência principal

`videos/01-turbotweak-918.mp4` · 736×414 · 60fps · 11,5s
Frames extraídos (1 fps): `frames/01-turbotweak-918/opti_01..11.png`

### Timeline do reveal

| t | O que acontece |
|---|---|
| 0–2s | Fundo preto absoluto. Só o **contorno** do carro existe — highlights de borda no capô, para-brisa e faróis. Poça de luz elíptica no chão. Brasão Porsche já visível no topo. |
| 2–4s | A luz **sobe** (key light frontal). A carroceria emerge do preto. O wordmark fantasma **"918"** aparece atrás do carro. |
| 4–6s | Brilho total. UI entra em **stagger**: nav → headline (esquerda) → subcopy → CTA → cards (direita). |
| 6–11s | Estado final. **Zoom-out sutil** — o carro assenta ~4% menor. Idle quase imperceptível. |

### Anatomia da tela

```
┌──────────────────────────────────────────────────────────┐
│  ◆ turbotweak          [brasão]      FAQ  Contact  About ☰│
│                                                          │
│  Elevate Your          ╭───918───╮      ┌──────────────┐ │
│  Drive to             (   ghost   )     │ Specs        │ │
│  Extraordinary         ╰─────────╯      │ texto...     │ │
│  Heights                  ▄▄▄▄▄         │ [View more]  │ │
│                        ▟███████▙        └───────┬──────┘ │
│  Crafting Power,      ███████████ ◄─────────────╯        │
│  Performance...        ▜███████▛         ⬡ Aftermarket   │
│                                          ⬡ Performance   │
│  ( Get started )      ═══════════        ⬡ texto...      │
│                    ░░ poça de luz ░░                     │
└──────────────────────────────────────────────────────────┘
```

### O que copiar
- **Preto real** (`#000`), não cinza-escuro. O contraste é o produto.
- Carro **centralizado, frontal, simétrico** — vira o eixo da composição.
- **Wordmark gigante e fantasma** atrás do carro (opacidade ~8–12%, outline).
- **Poça de luz elíptica** no chão — vende o "estúdio", não é sombra comum.
- Cards de vidro com **linha-guia (leader line)** apontando pro carro. Detalhe técnico, alto valor percebido.
- Headline em peso **light/regular**, não bold. Elegância > agressividade.
- CTA em **pílula branca sólida** — único ponto 100% branco da tela.
- Trilho vertical de ícones circulares à direita.

### O que evitar
- Texto sobre a área iluminada do carro (perde legibilidade).
- Mais de um acento de cor. Aqui só o brasão tem cor.

---

## 02 — re:source / Audi e-tron GT

`videos/02-audi-etron.mp4` · 480×360 · 30fps · 4s
Frames extraídos (2 fps): `frames/02-audi-etron/resource_01..08.png`

### O que ensina
- **Logo glow-in**: os 4 anéis acendem em âmbar quente sobre preto puro, como filamento ligando. Ótimo para um *preloader* de 800ms antes do hero.
- **A luz é o herói**: nos closes da traseira, o carro é quase invisível — só a **barra de LED** define a forma.
- **Sweep sequencial** na seta do pisca: animação direcional que "corre". Reaproveitável em divisores, underline de link e barra de progresso de scroll.
- Paleta: preto + âmbar/vermelho quente. Zero cor neutra intermediária.

### O que copiar
- Preloader com logo acendendo.
- Um **elemento de luz que corre** como assinatura de movimento do site.

---

## Síntese — o "DNA" da nossa hero

> **Escuridão total → a luz revela o produto → a interface chega depois.**

O produto aparece primeiro e sozinho. A UI é convidada, não anfitriã.

| Princípio | Aplicação |
|---|---|
| Preto como tela, não como fundo | `#000` puro, sem gradiente cinza |
| Luz conta a história | Reveal por brilho/exposição, não por fade genérico |
| Um só acento de cor | Todo o resto é branco/cinza |
| Tipografia leve e larga | Peso 300–400, tracking negativo em display |
| Movimento contido | Easing longo, sem bounce, sem overshoot |
| Hierarquia por atraso | Stagger define o que importa mais |

---

## Inbox

Referências novas: jogar em `references/inbox/`.
Eu analiso, extraio frames, documento aqui e movo pra pasta numerada.
