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

## 2. Decisões técnicas em aberto (preciso da sua confirmação)

| Decisão | Opção A | Opção B |
|---|---|---|
| **Reveal do carro** | Vídeo de fundo (mp4/webm, leve, em loop) | Imagem estática do carro + CSS/JS anima luz por cima (`mix-blend-mode`, mask de brilho) |
| **Carro** | Você tem foto/render do carro específico (qual modelo/cor?) | Eu gero um render com IA (tenho ferramenta de geração de imagem/vídeo) |
| **Stack** | HTML+CSS+JS puro (igual ao site da pizza — GSAP via CDN pra animação) | Mesma coisa, mas como projeto Vite (build, mais organizado p/ crescer) |
| **Marca** | É pra ser genuinamente Porsche (nome, brasão, cores oficiais) | É um conceito/inspirado em estética Porsche, marca própria fictícia |

**Pergunta importante:** usar a marca "Porsche" (nome, brasão, wordmark) de forma
não-oficial em uma landing page pública é problema de marca registrada — só
faz sentido se for projeto pessoal/portfólio/estudo, não para publicar como
site comercial de terceiros usando a marca sem licença. Preciso saber o
propósito final pra te orientar certo nisso.

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
