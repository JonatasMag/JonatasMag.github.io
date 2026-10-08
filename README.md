# Portfólio — Jonatas Magalhães

Site estático (HTML, CSS e JavaScript puros), sem build. Roda direto no **GitHub Pages**: https://jonatasmag.github.io

A seção **Outros projetos** lê os repositórios públicos do GitHub toda vez que alguém abre a página. Cada repositório novo aparece no portfólio sozinho.

## Onde editar

São só dois arquivos. Para editar pelo GitHub: abra o arquivo, clique no lápis ✏️, altere e clique em **Commit changes**. O site se atualiza em cerca de 1 minuto.

### `assets/js/dados.js` (os textos do site)

| Bloco | O que aparece no site |
|---|---|
| `resultados` | O painel escuro do topo. Cada item vira um botão. `antes` e `depois` são os valores das barras; `destaque` é o número grande |
| `olist` | As abas do dashboard na seção Projeto Olist (imagem e legenda) |
| `trajetoria` | A linha do tempo. Cada cargo abre com um clique e mostra os feitos |
| `competencias` | As abas de competências. Cada item é `["Competência", "onde foi usada"]` |

Cuidado com as vírgulas e aspas: cada item termina com vírgula, e todo texto fica entre aspas.

### `assets/js/config.js` (links e contatos)

| Campo | Para que serve |
|---|---|
| `email`, `phone`, `whatsapp`, `linkedin` | Contatos. Deixe `""` para esconder um deles |
| `cv` | Caminho do currículo em PDF |
| `hideRepos` | Repositórios que não aparecem em "Outros projetos" |
| `repoTitles` | Títulos com acento, ex.: `"oracao-e-palavra": "Oração e Palavra"` |
| `cloudflareAnalyticsToken` | Opcional, para contar visitas |

## Trocar o currículo

Envie o novo PDF para `assets/` com o mesmo nome, `curriculo-jonatas-magalhaes.pdf`, substituindo o antigo.

## Controlando os projetos pelo próprio GitHub

Na página de cada repositório, clique na engrenagem ⚙️ ao lado de **About**:

- **Description:** vira o texto do card.
- **Website:** cria o botão "Ver no ar".
- **Topics:** `destaque` coloca o projeto no topo; `ocultar` esconde o projeto do portfólio.

Forks e repositórios arquivados são ignorados automaticamente. O botão de filtro por linguagem aparece quando há projetos em mais de uma linguagem.

## Testar no computador

Na pasta do site, rode `python -m http.server` e abra http://localhost:8000.
