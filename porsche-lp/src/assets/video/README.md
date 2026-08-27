# Vídeo do hero

Solte aqui o vídeo (ou imagem) do carro que você vai enviar. O código já
está lendo estes nomes exatos:

- `hero-car.mp4` (obrigatório — fallback universal)
- `hero-car.webm` (opcional — mais leve, o navegador prioriza se existir)

E em `../img/`:
- `hero-poster.jpg` (opcional — primeiro frame mostrado antes do vídeo carregar)

## Recomendações
- Carro centrado, visão frontal, saindo de um fundo bem escuro/preto —
  é o que faz o efeito de "revelar na luz" funcionar (ver `references/REFERENCES.md`).
- Loop perfeito (início e fim casando) ou pelo menos um corte suave.
- Sem áudio, ou o `<video>` precisa continuar com `muted` (autoplay exige).
- Peso baixo: ideal < 6–8MB pro hero não travar o carregamento da página.
- Se for uma foto só (sem vídeo), me avisa — troco o `<video>` por uma
  `<img>` com a mesma animação de luz.

Assim que o arquivo cair aqui, o placeholder de fundo (`hero__stage.no-video`)
some sozinho e o vídeo real assume.
