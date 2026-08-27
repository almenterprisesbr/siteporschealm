# Plano — Hero Section "Porsche-style"

## 0. Onde isso vive

Este projeto (`porsche-lp/`) é **separado** do site da pizzaria (`sitepizza/`, na raiz).
Mesmo repositório git, pasta própria — não mistura assets nem CSS de um com o outro.

```
sitepizza/                     ← repo git (origin: siteporschealm)
├── index.html, css/, js/...   ← site da pizzaria (não mexer)
└── porsche-lp/                ← este projeto novo
    ├── references/            ← material de referência (vídeos/imagens que você manda)
    │   ├── videos/             01-turbotweak-918.mp4, 02-audi-etron.mp4
    │   ├── frames/             frames extraídos de cada vídeo, numerados por pasta
    │   ├── inbox/              solte referências novas aqui
    │   └── REFERENCES.md       análise de cada referência + o que copiar
    ├── src/                   ← código da landing page
    │   ├── index.html
    │   ├── css/
    │   ├── js/
    │   └── assets/
    │       ├── video/          hero em vídeo (mp4/webm) se formos usar
    │       ├── img/             imagens do carro, texturas
    │       ├── icons/           svg
    │       └── fonts/
    └── docs/
        └── PLAN.md             este arquivo
```

Fluxo de trabalho com referências: você joga o arquivo em `references/inbox/`,
eu analiso (extraio frames se for vídeo), documento em `REFERENCES.md`, e movo
para uma pasta numerada. Nada se perde, tudo fica rastreável.

## 1. O que já temos

Duas referências analisadas (ver `references/REFERENCES.md` para o detalhe):

1. **turbotweak / Porsche 918** — reveal do carro na luz vindo do preto, wordmark
   fantasma gigante atrás do carro, cards de vidro com leader line, CTA pílula branca.
2. **Audi e-tron** — preloader com logo acendendo em âmbar, luz como protagonista.

**Síntese de direção:** tela preta pura → luz revela o carro → interface entra
em stagger depois. Um único acento de cor. Tipografia leve.

## 2. Decisões técnicas — RESOLVIDAS

| Decisão | Escolhido |
|---|---|
| **Marca** | Estudo/portfólio pessoal. Não vai ao ar como site oficial da Porsche. Adicionado disclaimer discreto no rodapé ("projeto conceitual e não-oficial... sem afiliação com a Porsche AG") por transparência. |
| **Carro** | Você vai enviar a foto/vídeo do carro. Solte em `references/inbox/` ou direto em `src/assets/video/hero-car.mp4` (+ `.webm` se tiver). |
| **Reveal do carro** | Vídeo de fundo em loop (`<video autoplay muted loop>`), com fallback em CSS puro (gradiente de estúdio) enquanto o arquivo não existe — o site já roda sem quebrar. |
| **Stack** | HTML/CSS/JS puro + GSAP via CDN, igual ao site da pizza. Sem build step. |

## 3. Status da Fase 3 (protótipo)

✅ Scaffold construído em `src/index.html`, `src/css/style.css`, `src/js/main.js`:
- Preloader (anel + wordmark acendendo).
- Hero com stage de vídeo + vinheta + poça de luz + wordmark fantasma atrás do carro.
- Reveal em stagger via GSAP (nav → brilho do vídeo → poça de luz → wordmark →
  linhas do título → subcopy/CTA/card de specs/ícones/scroll cue).
- Card de specs com leader line apontando pro carro (visível só em desktop).
- Responsivo: painel vira scroll horizontal abaixo de 900px, nav vira hambúrguer.
- `prefers-reduced-motion` respeitado (pula direto pro estado final).
- Fallback automático caso o vídeo do carro ainda não exista (`stage.no-video`).

Verificado no preview local (`node dev-server.js` → `/porsche-lp/src/index.html`):
sem erros de console além dos 404 esperados do vídeo/poster ainda não enviados;
timeline do GSAP chega no estado final correto; grid de 2 colunas no desktop e
1 coluna no mobile sem overflow horizontal.

**Pendente para ficar 100% real:** o vídeo/imagem do carro
(`src/assets/video/hero-car.mp4`) e, se quiser, um poster
(`src/assets/img/hero-poster.jpg`) pro primeiro frame antes do vídeo carregar.

## 3. Estrutura de seções da hero (proposta inicial)

1. **Preloader** (~800ms–1s) — tela preta, logo/marca acende (estilo Audi ref).
2. **Nav** — logo esquerda, links centro/direita, hambúrguer mobile. Entra por
   último no stagger, ou fixo desde o início com opacidade baixa.
3. **Hero**:
   - Fundo: carro centralizado, frontal, saindo do preto com luz.
   - Wordmark fantasma atrás do carro (nome do modelo, gigante, baixa opacidade).
   - Headline esquerda (peso leve, 2–4 linhas).
   - Subcopy curto.
   - CTA pílula branca.
   - Painel de specs (direita) com leader line até o carro.
   - Poça de luz elíptica no chão (radial-gradient).
4. **Scroll cue** discreto no rodapé da hero.
5. Micro-interação de assinatura: um "sweep" de luz reaproveitado em divisores/
   underline (herdado da ref Audi).

## 4. Fases de execução

- **Fase 1 — Aprovação do plano e das referências** (você está aqui).
- **Fase 2 — Definir ativos**: carro (foto real vs. gerado), vídeo vs. imagem,
  paleta de acento, nome/marca do produto.
- **Fase 3 — Protótipo estático**: HTML/CSS da hero parada (sem animação),
  pra validar layout, tipografia, proporções.
- **Fase 4 — Animação**: preloader, reveal de luz, stagger de UI, sweep.
- **Fase 5 — Responsivo** (mobile primeiro quebra o layout de 2 colunas).
- **Fase 6 — Polish + commit/push automático** para o GitHub (siteporschealm).

## 5. Próximo passo

Preciso que você responda as 4 decisões da tabela acima (ou me diga "usa seu
julgamento" em alguma) pra eu começar a Fase 3.
