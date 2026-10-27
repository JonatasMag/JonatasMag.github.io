/* =============================================================
 * CONFIGURAÇÃO DO PORTFÓLIO: links e contatos.
 * Qualquer link deixado como "" some automaticamente do site.
 * ============================================================= */
window.PORTFOLIO_CONFIG = {
  // Usuário do GitHub: os repositórios aparecem sozinhos em "Outros projetos"
  githubUser: "JonatasMag",

  email: "chazaq.adm@gmail.com",
  phone: "+5547988499129",
  phoneLabel: "(47) 98849-9129",
  whatsapp: "https://wa.me/5547988499129",
  linkedin: "https://www.linkedin.com/in/jonatasmag/",

  // Currículo em PDF para baixar. Deixe "" para esconder o botão.
  cv: "",

  // Link público do dashboard Olist (Power BI > Arquivo > Inserir relatório > Publicar na Web).
  // Deixe "" para esconder o botão "Explorar o dashboard".
  powerbi: "https://app.powerbi.com/view?r=eyJrIjoiZGZlOGE4NjMtM2UwMi00ODZmLTg2MjItMDk4ZmM1Y2VkY2FlIiwidCI6IjY1OWNlMmI4LTA3MTQtNDE5OC04YzM4LWRjOWI2MGFhYmI1NyJ9",

  // Faixa "Clientes e projetos". Para incluir um cliente, copie um bloco, troque os dados
  // e coloque o logo em assets/img/clientes/. Deixe "site" vazio se não houver site.
  clientes: [
    { nome: "Realiza Consultoria Imobiliária", logo: "assets/img/clientes/realiza.png", segmento: "Imobiliária", entrega: "Site com busca de imóveis e área dos corretores com funil de clientes", site: "https://realiza.pages.dev" },
    { nome: "Oração e Palavra", logo: "assets/img/clientes/oracao-e-palavra.png", segmento: "Terceiro setor", entrega: "Site com painel de gestão de pedidos, conteúdos e equipe", site: "https://oracao-e-palavra.chazaq-adm.workers.dev" },
  ],

  // Repositórios que NÃO aparecem em "Outros projetos" (Olist, Varejo e Painel já têm seção própria).
  // Também dá para esconder um repositório pelo GitHub, com o tópico "ocultar".
  hideRepos: ["JonatasMag.github.io", "JonatasMag", "analise-ecommerce-olist", "analise-varejo-clientes", "painel-consultoria"],

  // Títulos com acento para os repositórios
  repoTitles: {
    "oracao-e-palavra": "Oração e Palavra",
  },

  // Métricas de visita: token do Cloudflare Web Analytics (opcional)
  cloudflareAnalyticsToken: "",
};
