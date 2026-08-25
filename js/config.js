/* ==========================================================================
   PIZZARIA DO ZÉ — CONFIGURAÇÃO
   --------------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para colocar o site no ar
   com os dados reais da pizzaria. Troque os valores abaixo e salve.
   ========================================================================== */

window.ZE = {
  /* ---------- Identidade ---------- */
  nome: 'Pizzaria do Zé',
  slogan: 'O melhor rodízio do centro',
  cidade: 'São Vicente',
  estado: 'SP',

  /* ---------- Contato ----------
     O telefone do WhatsApp deve estar no formato internacional, só números:
     55 (Brasil) + DDD + número.  Ex.: 5513999998888                        */
  whatsapp: '5513999998888',
  telefone: '(13) 3465-0000',

  /* ---------- Endereço ---------- */
  endereco: {
    rua: 'Rua Frei Gaspar, 000 — Centro',
    cidade: 'São Vicente — SP',
    cep: 'CEP 11310-000',
    // Cole aqui o link "Incorporar um mapa" do Google Maps (src do iframe).
    mapaEmbed: 'https://www.google.com/maps?q=Rua+Frei+Gaspar,+Centro,+S%C3%A3o+Vicente+-+SP&output=embed',
    mapaLink: 'https://www.google.com/maps/search/?api=1&query=Rua+Frei+Gaspar+Centro+S%C3%A3o+Vicente+SP'
  },

  /* ---------- Horários ---------- */
  horarios: [
    { dia: 'Segunda',       texto: 'Fechado',        destaque: false, fechado: true  },
    { dia: 'Terça a Quinta', texto: '18h — 23h',     destaque: false, fechado: false },
    { dia: 'Sexta',         texto: '18h — 23h',      destaque: true,  fechado: false },
    { dia: 'Sábado',        texto: '18h — 23h',      destaque: true,  fechado: false },
    { dia: 'Domingo',       texto: '18h — 23h',      destaque: true,  fechado: false }
  ],
  // Dias em que o rodízio acontece (0 = domingo … 6 = sábado)
  rodizioDias: [5, 6, 0],
  rodizioAbre: 18,   // hora de abertura (24h)
  rodizioFecha: 23,  // hora de fechamento (24h)

  /* ---------- Apps de entrega ----------
     Troque '#' pelo link real de cada app. Deixe '' para esconder o card.  */
  apps: [
    { id: 'ifood',    nome: 'iFood',    desc: 'Peça pelo maior app do Brasil', link: '#', cor: '#EA1D2C' },
    { id: 'keeta',    nome: 'Keeta',    desc: 'Entrega rápida na sua região',  link: '#', cor: '#FFC72C' },
    { id: '99food',   nome: '99Food',   desc: 'Cupons e frete promocional',    link: '#', cor: '#FF6B00' },
    { id: 'whatsapp', nome: 'Delivery próprio', desc: 'Peça direto com a gente pelo WhatsApp', link: 'whatsapp', cor: '#25D366' }
  ],

  /* ---------- Redes sociais ----------
     Deixe '' (vazio) para esconder a rede do site.                          */
  redes: [
    { id: 'instagram', nome: 'Instagram', user: '@pizzariadoze', link: '#' },
    { id: 'facebook',  nome: 'Facebook',  user: '/pizzariadoze', link: '#' },
    { id: 'tiktok',    nome: 'TikTok',    user: '@pizzariadoze', link: '#' },
    { id: 'whatsapp',  nome: 'WhatsApp',  user: 'Fale com a gente', link: 'whatsapp' }
  ],

  /* ---------- Rodízio ---------- */
  rodizio: {
    preco: 99.90,
    precoCrianca: 49.90,
    labelCrianca: '6 a 10 anos',
    labelGratis: 'até 5 anos',
    dias: 'Sexta a Domingo',
    horario: '18h às 23h'
  }
};
