# Portfólio — Jônatas Magalhães

Site estático (HTML, CSS e JavaScript puros), sem build. Ele roda direto no **GitHub Pages**.

A seção **Projetos** lê seus repositórios públicos do GitHub toda vez que alguém abre a página. Por isso, cada repositório novo que você criar aparece no portfólio sozinho.

## Como publicar (uma vez só)

1. Entre no GitHub e crie um repositório **público** com o nome exato **`JonatasMag.github.io`**.
2. Na página do repositório, clique em **"uploading an existing file"**.
3. Arraste para lá **todo o conteúdo desta pasta**: `index.html`, a pasta `assets`, o arquivo `.nojekyll` e este README. Depois clique em **Commit changes**.
4. Vá em **Settings → Pages** e confira se a fonte está como *Deploy from a branch → main → / (root)*.
5. Em 1 a 2 minutos o site estará no ar em **https://jonatasmag.github.io**

## O que editar

Tudo fica em **`assets/js/config.js`**:

| Campo | Para que serve |
|---|---|
| `linkedin` | Cole o endereço do seu perfil para os ícones do LinkedIn aparecerem |
| `instagram` | Opcional |
| `cv` | Coloque o PDF em `assets/` com o nome `curriculo-jonatas-magalhaes.pdf` e preencha `"assets/curriculo-jonatas-magalhaes.pdf"` |
| `hideRepos` | Repositórios que não devem aparecer |
| `featuredRepos` | Repositórios que aparecem primeiro, com selo "Destaque" |
| `repoTitles` | Títulos com acento, ex.: `"oracao-e-palavra": "Oração e Palavra"` |

Para editar direto no GitHub, abra o arquivo, clique no lápis ✏️, altere e clique em **Commit changes**. O site se atualiza em cerca de 1 minuto.

## Controlando os projetos pelo próprio GitHub

Você não precisa mexer no código para organizar os projetos. Basta usar a engrenagem ⚙️ ao lado de **About**, na página de cada repositório:

- **Description:** vira o texto do card. Escreva uma frase clara sobre o problema que o projeto resolve.
- **Website:** cria o botão "Ver no ar". Serve para o link de um dashboard publicado, de um site etc.
- **Topics:** viram etiquetas no card (ex.: `power-bi`, `sql`, `python`). Dois tópicos especiais:
  - `destaque` coloca o projeto no topo, com selo;
  - `ocultar` esconde o projeto do portfólio.

Forks e repositórios arquivados são ignorados automaticamente.

## LinkedIn ↔ GitHub

Para ligar os dois lados:
- **No LinkedIn:** em *Perfil → Adicionar seção → Recomendado → Website*, adicione `https://jonatasmag.github.io` como "Portfólio". Em *Projetos*, adicione os principais repositórios com link.
- **No GitHub:** em *Settings → Public profile*, coloque o portfólio em **Website** e o LinkedIn em **Social accounts**.

## Testar no computador

Basta abrir o `index.html` no navegador com dois cliques. Se os projetos não carregarem assim, rode `python -m http.server` dentro da pasta e abra http://localhost:8000.
