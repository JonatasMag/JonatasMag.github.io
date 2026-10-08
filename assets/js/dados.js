/* =============================================================
 * CONTEÚDO DO PORTFÓLIO: textos dos painéis interativos.
 * Edite aqui para atualizar resultados, trajetória e competências.
 * ============================================================= */
window.PORTFOLIO_DADOS = {
  // Painel "antes e depois" do topo da página.
  // antes/depois: valores das barras. unidade: o que aparece ao lado do número.
  resultados: [
    {
      botao: "Ruptura de estoque",
      destaque: "−35%",
      titulo: "Menos produtos em falta na prateleira",
      empresa: "TudoExpress", setor: "Varejo e e-commerce",
      periodo: "em 3 meses",
      antes: 100, depois: 65, unidade: "índice (antes = 100)",
      como: "Montei KPIs de estoque no Power BI, implantei contagem rotativa e ajustei a reposição pelos itens que mais giravam.",
    },
    {
      botao: "Acuracidade",
      destaque: "+25%",
      titulo: "Estoque do sistema batendo com o físico",
      empresa: "Busscar", setor: "Indústria",
      periodo: "SKUs críticos da linha",
      antes: 100, depois: 125, unidade: "índice (antes = 100)",
      como: "Criei indicadores logísticos para os itens críticos e uma rotina Just in Time que eliminou paradas de linha por falta de material.",
    },
    {
      botao: "Gargalos",
      destaque: "−30%",
      titulo: "Abastecimento da produção mais fluido",
      empresa: "Busscar", setor: "Indústria",
      periodo: "fluxo de abastecimento",
      antes: 100, depois: 70, unidade: "índice (antes = 100)",
      como: "Reorganizei o fluxo de materiais até a linha e passei a monitorar desvios por indicador, em vez de apagar incêndio.",
    },
    {
      botao: "Tempo de busca",
      destaque: "24h → 6h",
      titulo: "Informação encontrada em um quarto do tempo",
      empresa: "Prefeitura de Presidente Figueiredo", setor: "Setor público",
      periodo: "arquivo e prontuários",
      antes: 24, depois: 6, unidade: "horas",
      como: "Padronizei o arquivamento, reestruturei o controle de dados e criei relatórios estatísticos para a coordenação.",
    },
  ],

  // Abas do dashboard Olist.
  olist: [
    {
      aba: "Visão executiva",
      imagem: "assets/img/olist/01_visao_executiva",
      legenda: "R$ 15,37 milhões em 96 mil pedidos. SP, RJ e MG concentram 62,6% da receita, e a Black Friday de 2017 elevou o faturamento em 53,6% no mês.",
    },
    {
      aba: "Logística",
      imagem: "assets/img/olist/02_logistica",
      legenda: "Depois do pico de vendas, o atraso subiu de 4% para 19% e só se normalizou em junho. O RJ atrasa 12% dos pedidos, quase três vezes SP.",
    },
    {
      aba: "Produtos",
      imagem: "assets/img/olist/03_produtos",
      legenda: "Nenhuma categoria passa de 10% da receita. Onde o frete pesa mais, como no Nordeste, o cliente só compra itens mais caros.",
    },
  ],

  // Linha do tempo (mais recente primeiro).
  trajetoria: [
    {
      cargo: "Assistente de Produção (Logística)", empresa: "Busscar", setor: "Indústria",
      periodo: "nov/2025 – fev/2026",
      feitos: [
        "Indicadores logísticos para SKUs críticos: acuracidade de estoque 25% maior.",
        "Fluxo de abastecimento reorganizado em rotina Just in Time: 30% menos gargalos.",
        "Monitoramento de desvios por indicador para melhoria contínua.",
      ],
    },
    {
      cargo: "Gerente de Loja", empresa: "TudoExpress Ltda", setor: "Varejo e e-commerce",
      periodo: "jul/2024 – ago/2025",
      feitos: [
        "KPIs no Power BI e contagem rotativa: ruptura 35% menor em 3 meses.",
        "Campanhas de Google Ads e Meta Ads otimizadas, com custo por aquisição menor.",
        "Margem maior com ponto de equilíbrio, ticket médio e novos fornecedores.",
        "Planilhas gerenciais de vendas, estoque e financeiro; liderança de equipe.",
      ],
    },
    {
      cargo: "Coordenador do SAME", empresa: "Prefeitura de Presidente Figueiredo", setor: "Setor público",
      periodo: "mar/2023 – out/2023",
      feitos: [
        "Arquivamento e controle de prontuários padronizados: busca de 24h para 6h.",
        "Relatórios estatísticos e dashboards para a coordenação.",
        "Automação de rotinas administrativas.",
      ],
    },
    {
      cargo: "Tesoureiro (voluntário)", empresa: "Igreja Pentecostal Unida do Brasil", setor: "Terceiro setor",
      periodo: "nov/2007 – nov/2016",
      feitos: [
        "Sistema de relatórios financeiros implantado e padronizado.",
        "Revisão dos fundos de desenvolvimento de 79 templos.",
        "Contas a pagar e receber, conciliação bancária e registro patrimonial.",
      ],
    },
  ],

  // Competências por grupo, com onde cada uma foi usada.
  competencias: {
    "Dados e BI": [
      ["Power BI", "Dashboard Olist de 3 páginas; KPIs de estoque na TudoExpress"],
      ["SQL", "7 consultas analíticas com CTEs e funções de janela no projeto Olist"],
      ["Python (pandas)", "ETL e modelo estrela do projeto Olist; análises do curso SENAI"],
      ["Excel avançado", "Planilhas gerenciais de vendas, estoque e financeiro"],
      ["Modelagem dimensional", "Esquema estrela com duas tabelas fato no projeto Olist"],
    ],
    "Processos e operações": [
      ["Gestão de estoque", "Ruptura −35% na TudoExpress; acuracidade +25% na Busscar"],
      ["Lean e 5S", "Rotina Just in Time e redução de gargalos na Busscar"],
      ["Logística 4.0", "Indicadores de abastecimento da linha de produção"],
      ["Padronização de processos", "Arquivo e prontuários na Prefeitura: busca de 24h para 6h"],
      ["Liderança de equipe", "Gestão de loja e de setor público"],
    ],
    "Sistemas": [
      ["SAP e TOTVS", "Operação diária de estoque e produção"],
      ["Tray e marketplaces", "Vendas online na TudoExpress"],
      ["Google Analytics", "Acompanhamento do funil de vendas"],
      ["Google Ads e Meta Ads", "Campanhas com custo por aquisição menor"],
    ],
  },
};
