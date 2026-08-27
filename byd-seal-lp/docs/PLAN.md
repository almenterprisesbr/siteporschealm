# BYD Seal LP — plano

Separado de `porsche-lp/` e do site da pizzaria. Mesmo repo git.

## Referência
- WIT (print a receber do usuário) — estilo alvo, vamos superar, não copiar.
- BYD Seal oficial: https://www.byd.com/br/car/seal — fonte de conteúdo/specs real.

## Conteúdo confirmado (extraído do site oficial)
- Tagline: "O Sedã Elétrico que Une Potência, Tecnologia e Sustentabilidade."
- Design "Ocean X Face", proporção "Golden Ratio" eixo/comprimento 0.61
- Comprimento 4800mm, entre-eixos 2920mm
- Tecnologia CTB (Cell to Body): rigidez torcional 40.500 Nm/°
- Bateria Blade: LFP, +5000 ciclos, teste de penetração sem fogo/fumaça
- Carregamento DC 150kW: 30%→80% em 30min
- Autonomia PBEV/INMETRO: até 372 km (versão base)
- Tela rotativa 15,6" (1920x1080), som Dynaudio 12 alto-falantes / 775W
- Rodas Blade Precision 19" (AWD), faróis duplo-U, lanterna Skyline
- Tema visual da marca: "estética oceânica" → acento azul-oceano (não amarelo/âmbar como no porsche-lp)

**Pendente (números variam por versão/trim, site oficial não expõe estático):**
0-100km/h, potência (CV), velocidade máxima — não inventar, aguardar confirmação
do usuário sobre qual trim (Design RWD vs Premium AWD) ou usar placeholder
editável até ele mandar.

## Decisão de escopo desta rodada
Usuário pediu pra focar primeiro no **giro** (viewer 360° interativo do carro,
arraste pra girar) — o centro de gravidade da hero. Resto da estrutura
(specs, galeria, contato) vem depois, mesmo padrão do porsche-lp.

Sem fotos/vídeo do carro ainda → giro construído como silhueta vetorial
outline (efeito "blueprint/hologram") em container 3D real (rotateY via
drag), pronto pra trocar por frames reais depois. Honesto como placeholder,
não finge ser foto.

## Pendências do usuário
1. Print do site WIT (referência visual).
2. Fotos/vídeo real do BYD Seal (ou autorização pra gerar via IA).
3. Trim/versão pra números de performance (0-100, CV, Vmax).
