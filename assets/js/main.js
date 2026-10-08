(function () {
  "use strict";
  var C = window.PORTFOLIO_CONFIG || {};
  var D = window.PORTFOLIO_DADOS || {};
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Abas acessíveis (setas do teclado mudam a aba) ---------- */
  function criarAbas(lista, rotulos, aoSelecionar) {
    lista.innerHTML = rotulos.map(function (r, i) {
      return '<button type="button" role="tab" id="' + lista.dataset.tabs + "-" + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(r) + "</button>";
    }).join("");
    var botoes = $$("button", lista);
    function selecionar(i, foco) {
      botoes.forEach(function (b, j) {
        b.setAttribute("aria-selected", String(i === j));
        b.tabIndex = i === j ? 0 : -1;
      });
      if (foco) botoes[i].focus();
      aoSelecionar(i);
    }
    botoes.forEach(function (b, i) {
      b.addEventListener("click", function () { selecionar(i); });
      b.addEventListener("keydown", function (e) {
        var n = botoes.length, k = e.key;
        if (k === "ArrowRight" || k === "ArrowDown") { e.preventDefault(); selecionar((i + 1) % n, true); }
        if (k === "ArrowLeft" || k === "ArrowUp") { e.preventDefault(); selecionar((i - 1 + n) % n, true); }
        if (k === "Home") { e.preventDefault(); selecionar(0, true); }
        if (k === "End") { e.preventDefault(); selecionar(n - 1, true); }
      });
    });
    selecionar(0);
  }

  /* ---------- Painel antes/depois ---------- */
  var listaRes = $('[data-tabs="resultados"]');
  if (listaRes && D.resultados) {
    var painel = $("#painel-resultados");
    var campo = function (n) { return $('[data-r="' + n + '"]', painel); };
    criarAbas(listaRes, D.resultados.map(function (r) { return r.botao; }), function (i) {
      var r = D.resultados[i];
      var max = Math.max(r.antes, r.depois);
      campo("destaque").textContent = r.destaque;
      campo("titulo").textContent = r.titulo;
      campo("empresa").textContent = r.empresa;
      campo("setor").textContent = r.setor + ", " + r.periodo;
      campo("antes").textContent = r.antes;
      campo("depois").textContent = r.depois;
      campo("unidade").textContent = "Escala: " + r.unidade;
      campo("como").textContent = r.como;
      painel.setAttribute("aria-labelledby", listaRes.dataset.tabs + "-" + i);
      var antes = $(".bar-before", painel), depois = $(".bar-after", painel);
      var w1 = (r.antes / max * 100) + "%", w2 = (r.depois / max * 100) + "%";
      if (reduz) { antes.style.width = w1; depois.style.width = w2; return; }
      antes.style.width = "0"; depois.style.width = "0";
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        antes.style.width = w1;
        setTimeout(function () { depois.style.width = w2; }, 180);
      }); });
    });
  }

  /* ---------- Dashboard Olist com abas e ampliação ---------- */
  var listaOlist = $('[data-tabs="olist"]');
  var lightbox = $("#lightbox");
  if (listaOlist && D.olist) {
    var shot = $(".shot"), fonte = $('[data-olist="src"]'), img = $('[data-olist="img"]'), legenda = $('[data-olist="legenda"]');
    criarAbas(listaOlist, D.olist.map(function (o) { return o.aba; }), function (i) {
      var o = D.olist[i];
      shot.classList.add("loading");
      fonte.srcset = o.imagem + "-900.webp 900w, " + o.imagem + ".webp 1546w";
      img.onload = function () { shot.classList.remove("loading"); };
      img.src = o.imagem + ".webp";
      img.alt = "Dashboard Olist, página " + o.aba + ": " + o.legenda;
      legenda.textContent = o.legenda;
      shot.dataset.full = o.imagem + ".webp";
      shot.setAttribute("aria-label", "Ampliar a página " + o.aba + " do dashboard");
    });
    if (lightbox && typeof lightbox.showModal === "function") {
      shot.addEventListener("click", function () {
        var li = $("img", lightbox);
        li.src = shot.dataset.full; li.alt = img.alt;
        lightbox.showModal();
      });
      $(".lb-close", lightbox).addEventListener("click", function () { lightbox.close(); });
      lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); });
    } else if (shot) {
      shot.addEventListener("click", function () { window.open(shot.dataset.full, "_blank", "noopener"); });
    }
  }

  /* ---------- Trajetória (abre e fecha ao clicar) ---------- */
  var tl = $("#timeline");
  if (tl && D.trajetoria) {
    tl.innerHTML = D.trajetoria.map(function (t, i) {
      return '<li' + (i === 0 ? ' class="open"' : "") + '><details' + (i === 0 ? " open" : "") + ">" +
        '<summary><span class="t-period">' + esc(t.periodo) + '</span><span class="t-role">' + esc(t.cargo) + "</span>" +
        '<span class="t-org">' + esc(t.empresa) + ", " + esc(t.setor.toLowerCase()) + '</span><span class="t-toggle" aria-hidden="true"></span></summary>' +
        '<ul class="t-body">' + t.feitos.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul></details></li>";
    }).join("");
    $$("details", tl).forEach(function (d) {
      d.addEventListener("toggle", function () { d.parentElement.classList.toggle("open", d.open); });
    });
  }

  /* ---------- Competências por grupo ---------- */
  var listaComp = $('[data-tabs="competencias"]'), skills = $("#skills");
  if (listaComp && D.competencias) {
    var grupos = Object.keys(D.competencias);
    criarAbas(listaComp, grupos, function (i) {
      skills.innerHTML = D.competencias[grupos[i]].map(function (s) {
        return "<li><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></li>";
      }).join("");
      skills.setAttribute("aria-labelledby", listaComp.dataset.tabs + "-" + i);
    });
  }

  /* ---------- Links e contatos ---------- */
  var githubUrl = C.githubUser ? "https://github.com/" + C.githubUser : "";
  $$('[data-link="cv"]').forEach(function (a) { if (C.cv) a.href = C.cv; else a.remove(); });
  var contatos = {
    email: C.email && { href: "mailto:" + C.email, text: C.email },
    whatsapp: C.whatsapp && { href: C.whatsapp, text: C.phoneLabel || "WhatsApp" },
    linkedin: C.linkedin && { href: C.linkedin },
    github: githubUrl && { href: githubUrl },
  };
  $$("[data-contact]").forEach(function (a) {
    var c = contatos[a.dataset.contact];
    if (!c) { a.closest("li").remove(); return; }
    a.href = c.href;
    if (c.text) a.textContent = c.text;
  });
  var copiar = $('[data-copy="email"]');
  if (copiar) {
    copiar.addEventListener("click", function () {
      var feito = function () {
        copiar.textContent = "E-mail copiado";
        copiar.classList.add("done");
        setTimeout(function () { copiar.textContent = "Copiar e-mail"; copiar.classList.remove("done"); }, 2400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(C.email).then(feito, function () { window.location.href = "mailto:" + C.email; });
      } else {
        window.location.href = "mailto:" + C.email;
      }
    });
  }

  /* ---------- Menu, topo e seção ativa ---------- */
  var menu = $(".menu"), menuMobile = $("#menu-mobile");
  if (menu) {
    menu.addEventListener("click", function () {
      var aberto = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!aberto));
      menu.setAttribute("aria-label", aberto ? "Abrir menu" : "Fechar menu");
      menuMobile.hidden = aberto;
    });
    menuMobile.addEventListener("click", function (e) {
      if (e.target.closest("a")) { menuMobile.hidden = true; menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-label", "Abrir menu"); }
    });
  }
  var topbar = $(".topbar");
  var aoRolar = function () { topbar.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", aoRolar, { passive: true }); aoRolar();
  if ("IntersectionObserver" in window) {
    var links = $$(".nav a");
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["resultados", "olist", "trajetoria", "competencias", "contato"].forEach(function (id) { var el = document.getElementById(id); if (el) obs.observe(el); });
  }
  $("#ano").textContent = new Date().getFullYear();

  /* ---------- Métricas de visita (opcional) ---------- */
  if (C.cloudflareAnalyticsToken) {
    var cf = document.createElement("script");
    cf.defer = true; cf.src = "https://static.cloudflareinsights.com/beacon.min.js";
    cf.setAttribute("data-cf-beacon", JSON.stringify({ token: C.cloudflareAnalyticsToken }));
    document.head.appendChild(cf);
  }

  /* ---------- Outros projetos do GitHub, com filtro por linguagem ---------- */
  var grid = $("#repos"), filtros = $("#filtros");
  if (!grid || !C.githubUser) return;
  var cores = { Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6", HTML: "#e34c26", CSS: "#563d7c", "Jupyter Notebook": "#DA5B0B", SQL: "#e38c00", PLpgSQL: "#336790" };
  var pequenas = ["e", "de", "da", "do", "das", "dos", "com", "para", "em"];
  function titulo(nome) {
    if ((C.repoTitles || {})[nome]) return C.repoTitles[nome];
    return nome.replace(/[-_]+/g, " ").split(" ").map(function (w, i) {
      return i > 0 && pequenas.indexOf(w.toLowerCase()) !== -1 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1);
    }).join(" ");
  }
  function data(iso) { try { return new Date(iso).toLocaleDateString("pt-BR", { month: "short", year: "numeric" }); } catch (e) { return ""; } }

  function mostrar(repos) {
    var ocultos = (C.hideRepos || []).map(function (n) { return n.toLowerCase(); });
    var lista = repos.filter(function (r) {
      return !r.fork && !r.archived && ocultos.indexOf(r.name.toLowerCase()) === -1 && (r.topics || []).indexOf("ocultar") === -1;
    }).sort(function (a, b) {
      var da = (a.topics || []).indexOf("destaque") !== -1, db = (b.topics || []).indexOf("destaque") !== -1;
      if (da !== db) return da ? -1 : 1;
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    });

    if (!lista.length) { grid.innerHTML = '<p class="muted">Novos projetos em breve.</p>'; return; }

    var linguagens = ["Todos"].concat(lista.map(function (r) { return r.language; }).filter(function (l, i, a) { return l && a.indexOf(l) === i; }));
    function desenhar(filtro) {
      var vis = filtro === "Todos" ? lista : lista.filter(function (r) { return r.language === filtro; });
      grid.innerHTML = vis.map(function (r) {
        return '<article class="repo"><h3>' + esc(titulo(r.name)) + "</h3>" +
          "<p>" + esc(r.description || "Projeto publicado no GitHub.") + "</p>" +
          '<div class="repo-meta">' + (r.language ? '<span><i style="background:' + (cores[r.language] || "#6f8fae") + '"></i>' + esc(r.language) + "</span>" : "") +
          "<span>Atualizado em " + data(r.pushed_at) + "</span></div>" +
          '<div class="repo-links"><a href="' + esc(r.html_url) + '" target="_blank" rel="noopener">Ver código</a>' +
          (r.homepage ? '<a href="' + esc(r.homepage) + '" target="_blank" rel="noopener">Ver no ar</a>' : "") + "</div></article>";
      }).join("");
    }
    if (linguagens.length > 2) {
      filtros.innerHTML = linguagens.map(function (l, i) {
        return '<button type="button" aria-pressed="' + (i === 0) + '">' + esc(l) + "</button>";
      }).join("");
      $$("button", filtros).forEach(function (b) {
        b.addEventListener("click", function () {
          $$("button", filtros).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
          desenhar(b.textContent);
        });
      });
    }
    desenhar("Todos");
  }

  var chave = "gh-repos-" + C.githubUser;
  try {
    var cache = JSON.parse(sessionStorage.getItem(chave) || "null");
    if (cache && Date.now() - cache.t < 30 * 60 * 1000) { mostrar(cache.data); return; }
  } catch (e) { /* sem armazenamento: segue sem cache */ }
  fetch("https://api.github.com/users/" + encodeURIComponent(C.githubUser) + "/repos?per_page=100&sort=pushed", { headers: { Accept: "application/vnd.github+json" } })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (d) { try { sessionStorage.setItem(chave, JSON.stringify({ t: Date.now(), data: d })); } catch (e) {} mostrar(d); })
    .catch(function () { grid.innerHTML = '<p class="muted">Não foi possível carregar os projetos agora. Veja todos em <a href="' + githubUrl + '" target="_blank" rel="noopener">github.com/' + esc(C.githubUser) + "</a>.</p>"; });
})();
