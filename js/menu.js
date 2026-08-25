/* ==========================================================================
   PIZZARIA DO ZÉ — CARDÁPIO
   --------------------------------------------------------------------------
   ⚠️  ATENÇÃO: os sabores e preços abaixo são um MODELO de exemplo.
       Substitua pelos sabores e valores REAIS da pizzaria antes de publicar.

   Como editar:
   • precos: [broto, media, grande]  — use números, sem "R$" e com ponto.
   • Para remover um item, apague a linha inteira.
   • Para adicionar, copie uma linha e mude os dados.
   • tags: 'novo' | 'top' | 'picante' | 'veg'  (opcional, vira selo colorido)
   ========================================================================== */

window.CARDAPIO = {
  /* Tamanhos exibidos no cabeçalho da tabela */
  tamanhos: [
    { id: 'broto',  nome: 'Broto',  fatias: '4 fatias'  },
    { id: 'media',  nome: 'Média',  fatias: '8 fatias'  },
    { id: 'grande', nome: 'Grande', fatias: '12 fatias' }
  ],

  categorias: [
    {
      id: 'classicas',
      nome: 'Clássicas',
      chamada: 'As que nunca saem de moda',
      desc: 'O básico bem feito. Massa de fermentação natural, molho de tomate italiano e mussarela de verdade.',
      icone: 'pizza',
      itens: [
        { nome: 'Mussarela',            desc: 'Mussarela, molho de tomate, orégano e azeitona',              precos: [39.90, 54.90, 69.90], tags: ['top'] },
        { nome: 'Calabresa',            desc: 'Calabresa fatiada, cebola em rodelas e orégano',              precos: [42.90, 57.90, 72.90], tags: ['top'] },
        { nome: 'Marguerita',           desc: 'Mussarela, tomate em rodelas, manjericão fresco e parmesão',  precos: [42.90, 57.90, 72.90], tags: [] },
        { nome: 'Portuguesa',           desc: 'Presunto, ovo, cebola, ervilha, azeitona e mussarela',        precos: [44.90, 59.90, 74.90], tags: [] },
        { nome: 'Frango com Catupiry',  desc: 'Frango desfiado temperado e catupiry original',               precos: [46.90, 61.90, 76.90], tags: ['top'] },
        { nome: 'Napolitana',           desc: 'Mussarela, tomate, parmesão ralado e alho frito',             precos: [42.90, 57.90, 72.90], tags: [] },
        { nome: 'Toscana',              desc: 'Linguiça toscana artesanal, mussarela e pimenta calabresa',   precos: [44.90, 59.90, 74.90], tags: ['picante'] },
        { nome: 'Bauru',                desc: 'Presunto, mussarela, tomate e orégano',                       precos: [44.90, 59.90, 74.90], tags: [] },
        { nome: 'Milho Verde',          desc: 'Milho, mussarela, requeijão e um toque de orégano',           precos: [41.90, 55.90, 70.90], tags: ['veg'] }
      ]
    },

    {
      id: 'gourmet',
      nome: 'Gourmet',
      chamada: 'Pra quem quer ir além',
      desc: 'Ingredientes selecionados, combinações que a gente testou muito antes de colocar no cardápio.',
      icone: 'chef',
      itens: [
        { nome: 'Pepperoni Artesanal',    desc: 'Pepperoni importado, mussarela de búfala e mel picante',        precos: [54.90, 71.90, 89.90], tags: ['top'] },
        { nome: 'Parma com Rúcula',       desc: 'Presunto de parma, rúcula fresca, parmesão e tomate seco',      precos: [58.90, 76.90, 94.90], tags: [] },
        { nome: 'Quatro Queijos Especial',desc: 'Mussarela, gorgonzola, parmesão e catupiry',                    precos: [56.90, 73.90, 91.90], tags: ['top'] },
        { nome: 'Camarão ao Alho',        desc: 'Camarão salteado no alho e azeite, catupiry e cheiro-verde',    precos: [64.90, 84.90, 104.90], tags: [] },
        { nome: 'Filé Mignon com Cheddar',desc: 'Filé em cubos, cheddar cremoso e cebola caramelizada',          precos: [62.90, 81.90, 99.90], tags: ['novo'] },
        { nome: 'Brie com Damasco',       desc: 'Queijo brie, geleia de damasco e nozes',                        precos: [59.90, 77.90, 95.90], tags: ['novo'] },
        { nome: 'Berinjela Mediterrânea', desc: 'Berinjela grelhada, tomate seco, azeitona preta e manjericão',  precos: [52.90, 69.90, 86.90], tags: ['veg'] }
      ]
    },

    {
      id: 'casa',
      nome: 'Da Casa',
      chamada: 'Criação do Zé',
      desc: 'Nossas exclusivas. Você não vai encontrar essas combinações em nenhum outro lugar.',
      icone: 'estrela',
      itens: [
        { nome: 'A Zé',            desc: 'Calabresa, bacon, cheddar e cebola crispy — a mais pedida da casa',  precos: [52.90, 69.90, 86.90], tags: ['top'] },
        { nome: 'São Vicente',     desc: 'Frango, catupiry, milho e bacon crocante',                           precos: [51.90, 68.90, 85.90], tags: [] },
        { nome: 'Do Chef',         desc: 'Mussarela, tomate seco, rúcula e lascas de parmesão',                precos: [53.90, 70.90, 87.90], tags: [] },
        { nome: 'Costela BBQ',     desc: 'Costela desfiada, molho barbecue defumado e cebola roxa',            precos: [57.90, 75.90, 93.90], tags: ['novo'] },
        { nome: 'Portuguesa do Zé',desc: 'A portuguesa tradicional com o dobro do recheio',                    precos: [49.90, 66.90, 83.90], tags: [] },
        { nome: 'Frango com Bacon',desc: 'Frango desfiado, bacon, requeijão e milho',                          precos: [50.90, 67.90, 84.90], tags: [] },
        { nome: 'Diabo do Zé',     desc: 'Calabresa, jalapeño, pimenta biquinho e cheddar — pra quem aguenta', precos: [54.90, 71.90, 88.90], tags: ['picante'] }
      ]
    },

    {
      id: 'doces',
      nome: 'Doces',
      chamada: 'O final feliz',
      desc: 'Massa mais fininha, chocolate derretido na hora. A sobremesa que fecha o rodízio.',
      icone: 'coracao',
      itens: [
        { nome: 'Chocolate ao Leite',   desc: 'Chocolate ao leite derretido e granulado belga',          precos: [39.90, 52.90, 65.90], tags: ['top'] },
        { nome: 'Prestígio',            desc: 'Chocolate meio amargo e coco fresco ralado',              precos: [42.90, 55.90, 68.90], tags: [] },
        { nome: 'Romeu e Julieta',      desc: 'Goiabada cremosa com queijo minas',                       precos: [41.90, 54.90, 67.90], tags: [] },
        { nome: 'Banana Nevada',        desc: 'Banana, açúcar, canela e leite condensado',               precos: [39.90, 52.90, 65.90], tags: [] },
        { nome: 'Brigadeiro com Morango',desc: 'Brigadeiro cremoso e morangos frescos fatiados',         precos: [45.90, 58.90, 71.90], tags: ['top'] },
        { nome: 'Nutella com Morango',  desc: 'Nutella generosa, morango e açúcar de confeiteiro',       precos: [49.90, 63.90, 77.90], tags: ['novo'] }
      ]
    },

    {
      id: 'bebidas',
      nome: 'Bebidas',
      chamada: 'Pra acompanhar',
      desc: 'No rodízio, o refil de refrigerante já está incluso no valor. À vontade mesmo.',
      icone: 'copo',
      // Bebidas têm preço único — use precoUnico em vez de precos.
      precoUnico: true,
      itens: [
        { nome: 'Refil de refrigerante', desc: 'Exclusivo do rodízio — quantas vezes quiser',  precoUnico: 0, incluso: true, tags: ['top'] },
        { nome: 'Refrigerante lata',     desc: '350ml — Coca, Guaraná, Fanta ou Sprite',       precoUnico: 7.90,  tags: [] },
        { nome: 'Refrigerante 2 litros', desc: 'Coca, Guaraná, Fanta ou Sprite',               precoUnico: 15.90, tags: [] },
        { nome: 'Suco natural',          desc: '500ml — laranja, abacaxi, maracujá ou limão',  precoUnico: 12.90, tags: [] },
        { nome: 'Água mineral',          desc: '500ml sem gás',                                precoUnico: 5.00,  tags: [] },
        { nome: 'Água com gás',          desc: '500ml',                                        precoUnico: 6.00,  tags: [] },
        { nome: 'Cerveja long neck',     desc: '355ml — consulte as marcas disponíveis',       precoUnico: 12.90, tags: [] },
        { nome: 'Chopp gelado',          desc: '300ml tirado na hora',                         precoUnico: 11.90, tags: [] }
      ]
    }
  ]
};
