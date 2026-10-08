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

  cv: "assets/curriculo-jonatas-magalhaes.pdf",

  // Link público do dashboard Olist (Power BI > Arquivo > Inserir relatório > Publicar na Web).
  // Deixe "" para esconder o botão "Explorar o dashboard".
  powerbi: "https://app.powerbi.com/view?r=eyJrIjoiZGZlOGE4NjMtM2UwMi00ODZmLTg2MjItMDk4ZmM1Y2VkY2FlIiwidCI6IjY1OWNlMmI4LTA3MTQtNDE5OC04YzM4LWRjOWI2MGFhYmI1NyJ9",

  // Repositórios que NÃO aparecem em "Outros projetos" (o Olist já tem seção própria).
  // Também dá para esconder um repositório pelo GitHub, com o tópico "ocultar".
  hideRepos: ["JonatasMag.github.io", "JonatasMag", "analise-ecommerce-olist"],

  // Títulos com acento para os repositórios
  repoTitles: {
    "oracao-e-palavra": "Oração e Palavra",
  },

  // Métricas de visita: token do Cloudflare Web Analytics (opcional)
  cloudflareAnalyticsToken: "",
};
