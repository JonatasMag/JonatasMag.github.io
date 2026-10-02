(function () {
  "use strict";
  var C = window.PORTFOLIO_CONFIG || {};
  var githubUrl = C.githubUser ? "https://github.com/" + C.githubUser : "";

  function icon(id, cls) {
    return '<svg class="' + (cls || "") + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }
  function esc(text) {
    return String(text == null ? "" : text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Links simples (currículo, GitHub) ---------- */
  var linkMap = { cv: C.cv, github: githubUrl };
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var href = linkMap[el.getAttribute("data-link")];
    if (href) el.setAttribute("href", href);
    else el.remove();
  });
  // Se não houver currículo, o botão principal do topo vira "Entrar em contato"
  if (!C.cv) {
    var actions = document.querySelector(".hero-actions");
    if (actions) {
      actions.insertAdjacentHTML("afterbegin", '<a class="button button-primary" href="#contato">Entrar em contato ' + icon("i-arrow") + "</a>");
    }
  }

  /* ---------- Redes sociais ---------- */
  var socials = [
    { label: "GitHub", href: githubUrl, icon: "i-github" },
    { label: "LinkedIn", href: C.linkedin, icon: "i-linkedin" },
    { label: "Instagram", href: C.instagram, icon: "i-instagram" },
    { label: "WhatsApp", href: C.whatsapp, icon: "i-whatsapp" },
  ].filter(function (s) { return s.href; });

  document.querySelectorAll("[data-social]").forEach(function (box) {
    box.innerHTML = socials.map(function (s) {
      return '<a href="' + esc(s.href) + '" target="_blank" rel="noopener noreferrer" aria-label="' + s.label + '" title="' + s.label + '">' + icon(s.icon) + "</a>";
    }).join("");
  });

  var contact = document.querySelector("[data-contact]");
  if (contact) {
    var items = [];
    if (C.email) items.push('<a href="mailto:' + esc(C.email) + '">' + icon("i-mail") + esc(C.email) + "</a>");
    if (C.phone) items.push('<a href="tel:' + esc(C.phone) + '">' + icon("i-phone") + esc(C.phoneLabel || C.phone) + "</a>");
    socials.forEach(function (s) {
      items.push('<a href="' + esc(s.href) + '" target="_blank" rel="noopener noreferrer">' + icon(s.icon) + s.label + "</a>");
    });
    if (C.cv) items.push('<a href="' + esc(C.cv) + '" download>' + icon("i-download") + "Baixar currículo (PDF)</a>");
    contact.innerHTML = items.join("");
  }

  /* ---------- Menu mobile ---------- */
  var menuBtn = document.querySelector(".menu-button");
  var nav = document.querySelector(".main-nav");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuBtn.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

  /* ---------- Cabeçalho ao rolar ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Formulário (abre o e-mail já preenchido) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = d.get("subject") || "Contato pelo portfólio";
      var body = d.get("message") + "\n\n— " + d.get("name") + " (" + d.get("email") + ")";
      window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      form.querySelector(".form-success").hidden = false;
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Projetos do GitHub (automático) ---------- */
  var grid = document.getElementById("project-grid");
  if (!grid || !C.githubUser) return;

  var langColors = {
    Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6", HTML: "#e34c26", CSS: "#563d7c",
    "Jupyter Notebook": "#DA5B0B", SQL: "#e38c00", PLpgSQL: "#336790", TSQL: "#e38c00", R: "#198CE7",
    PowerShell: "#012456", Shell: "#89e051", Java: "#b07219", "C#": "#178600", PHP: "#4F5D95", Vue: "#41b883",
  };

  var smallWords = ["e", "de", "da", "do", "das", "dos", "com", "para", "em", "a", "o", "of", "and", "the"];
  function prettyName(name) {
    var titles = C.repoTitles || {};
    if (titles[name]) return titles[name];
    return name.replace(/[-_]+/g, " ").split(" ").map(function (w, i) {
      var lw = w.toLowerCase();
      if (i > 0 && smallWords.indexOf(lw) !== -1) return lw;
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(" ");
  }
  function formatDate(iso) {
    try { return new Date(iso).toLocaleDateString("pt-BR", { month: "short", year: "numeric" }); }
    catch (e) { return ""; }
  }
  function isFeatured(repo) {
    return (C.featuredRepos || []).indexOf(repo.name) !== -1 || (repo.topics || []).indexOf("destaque") !== -1;
  }

  function render(repos) {
    var hide = (C.hideRepos || []).map(function (n) { return n.toLowerCase(); });
    var list = repos.filter(function (r) {
      return !r.fork && !r.archived && hide.indexOf(r.name.toLowerCase()) === -1 && (r.topics || []).indexOf("ocultar") === -1;
    });
    list.sort(function (a, b) {
      var fa = isFeatured(a) ? 1 : 0, fb = isFeatured(b) ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    });
    if (C.maxRepos) list = list.slice(0, C.maxRepos);

    if (!list.length) {
      grid.innerHTML = '<p class="projects-empty">Novos projetos em breve. Acompanhe no <a href="' + githubUrl + '" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>';
      return;
    }

    grid.innerHTML = list.map(function (r) {
      var topics = (r.topics || []).filter(function (t) { return t !== "destaque" && t !== "ocultar"; }).slice(0, 4);
      var color = langColors[r.language] || "#77c0d6";
      return (
        '<article class="project-card' + (isFeatured(r) ? " featured" : "") + '">' +
          '<div class="project-top">' +
            (isFeatured(r) ? '<span class="badge">' + icon("i-star") + " Destaque</span>" : '<span class="label">Repositório</span>') +
            (r.stargazers_count ? '<span class="stars">' + icon("i-star") + r.stargazers_count + "</span>" : "") +
          "</div>" +
          "<h3>" + esc(prettyName(r.name)) + "</h3>" +
          "<p>" + esc(r.description || "Projeto publicado no GitHub.") + "</p>" +
          (topics.length ? '<div class="topics">' + topics.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>" : "") +
          '<div class="project-meta">' +
            (r.language ? '<span><i style="background:' + color + '"></i>' + esc(r.language) + "</span>" : "") +
            "<span>Atualizado em " + formatDate(r.pushed_at) + "</span>" +
          "</div>" +
          '<div class="project-links">' +
            '<a href="' + esc(r.html_url) + '" target="_blank" rel="noopener noreferrer">' + icon("i-github") + " Código</a>" +
            (r.homepage ? '<a href="' + esc(r.homepage) + '" target="_blank" rel="noopener noreferrer">' + icon("i-external") + " Ver no ar</a>" : "") +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  function showError() {
    grid.innerHTML = '<p class="projects-empty">Não foi possível carregar os repositórios agora. Veja todos no <a href="' + githubUrl + '" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>';
  }

  // Cache de 30 min no navegador do visitante (o GitHub limita 60 consultas/hora por visitante)
  var cacheKey = "gh-repos-" + C.githubUser;
  try {
    var cached = JSON.parse(sessionStorage.getItem(cacheKey) || "null");
    if (cached && Date.now() - cached.t < 30 * 60 * 1000) { render(cached.data); return; }
  } catch (e) { /* armazenamento indisponível: segue sem cache */ }

  fetch("https://api.github.com/users/" + encodeURIComponent(C.githubUser) + "/repos?per_page=100&sort=pushed", {
    headers: { Accept: "application/vnd.github+json" },
  })
    .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(function (data) {
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), data: data })); } catch (e) {}
      render(data);
    })
    .catch(showError);
})();
