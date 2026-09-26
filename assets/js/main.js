/* =========================================================
   Alexandre Delaboneta — Portfolio 2026
   GSAP · ScrollTrigger · SplitText · Lenis · Matter.js
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const html = document.documentElement;
  const body = document.body;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  if (reduced) html.classList.add("reduced");

  /* ---------------------------------------------------------
     DADOS — certificados
  --------------------------------------------------------- */
  const SCHOOLS = {
    dc: "Danki Code", ds: "Dev Samurai", rs: "Rocketseat", pg: "Profissão Programador",
    fr: "Full Stack Club", ht: "Hashtag Treinamentos", ud: "Udemy", al: "Alura",
    cv: "Curso em Vídeo", db: "Dev em Dobro", ar: "Ari Lima"
  };
  // [arquivo, título, ano, horas]
  const CERTS = [
    ["fr-03", "Bootcamp SaaS de Agendamentos para Clínicas", 2026, 14],
    ["ar", "Ari Lima — Cursos Online", 2026, 0],
    ["dc-15", "Infraestrutura Web", 2025, 12],
    ["dc-14", "Design para Web", 2025, 7],
    ["dc-13", "Lógica de Programação", 2025, 5],
    ["dc-12", "WordPress Completo", 2025, 13],
    ["dc-11", "WordPress Web Design Express", 2025, 13],
    ["dc-10", "Python Completo", 2025, 28],
    ["ud", "MCP & FastMCP: do Zero a 3 Projetos com Cursor", 2025, 7.5],
    ["ud-03", "Domine a Programação com IA — Cursor AI do Zero", 2025, 6],
    ["ud-02", "Gemini Prático — Apps, Vídeos com Veo 3 e Gemini CLI", 2025, 5],
    ["pg-02", "Profissão Programador — Nível 01: HTML & CSS", 2025, 6],
    ["pg-03", "Profissão Programador — Módulo 02: JavaScript", 2025, 0],
    ["pg-04", "Profissão Programador — Módulo 03: Front-end", 2025, 0],
    ["pg-05", "Profissão Programador — Módulo 04: Back-end", 2025, 0],
    ["rs-04", "NLW Pocket — Iniciantes Fullstack", 2025, 5],
    ["rs-03", "IA para Dados — Curso de Extensão", 2025, 5],
    ["rs-02", "NLW Agents — Avançado", 2025, 5],
    ["rs", "NLW Connect — React", 2025, 5],
    ["al-02", "Imersão IA — 3ª Edição (Google Gemini)", 2025, 6],
    ["ht-03", "Jornada Full Stack", 2025, 8],
    ["fr-02", "Full Stack Week — Autoatendimento para Restaurantes", 2025, 14],
    ["fr", "Full Stack Week — SaaS de Finanças com IA", 2024, 14],
    ["al", "Imersão Dev Back-End", 2024, 4],
    ["dc-09", "Node.js", 2024, 8],
    ["dc-08", "Banco de Dados", 2024, 5],
    ["dc-07", "Agência Web de Sucesso", 2024, 6],
    ["dc-06", "Criação de Apps com AI", 2024, 1],
    ["ds-23", "Painel de Admin Completo em Node.js e React", 2024, 0],
    ["ds-22", "PWA de Scanner e Consulta de Livros Físicos", 2024, 6],
    ["ds-21", "API de Envio para WhatsApp em Node.js", 2024, 0],
    ["ds-20", "Sistema de Gestão de Clientes (SQL)", 2024, 1],
    ["ds-19", "Banco de Dados Avançado", 2024, 3],
    ["ds-18", "Banco de Dados Básico", 2024, 4],
    ["ds-17", "Node.js Avançado", 2024, 16],
    ["ds-16", "Node.js Básico", 2024, 3],
    ["ds-15", "Pedido Online", 2024, 26],
    ["ds-14", "API GitHub", 2024, 8],
    ["ds-13", "Lista de Tarefas", 2024, 4],
    ["ds-12", "Fundamentos do React.js", 2024, 3],
    ["ds-11", "Curriculum HTML", 2024, 0],
    ["ds-10", "HTML para Programadores", 2024, 1],
    ["ds-09", "TODO List", 2024, 1],
    ["ds-08", "TypeScript Básico", 2024, 1],
    ["ds-07", "Gerador de Senha", 2024, 3],
    ["ds-06", "JavaScript Avançado", 2024, 8],
    ["ds-05", "JavaScript Básico", 2024, 5],
    ["ds-04", "Ping-Pong", 2024, 3],
    ["ds-03", "Lógica de Programação Avançada", 2024, 3],
    ["ds-02", "Lógica de Programação Básica", 2024, 1],
    ["ht-02", "Intensivão de JavaScript", 2024, 8],
    ["dc-05", "Front-end Completo 2.0", 2023, 9],
    ["dc-04", "Marketing Digital para Programadores", 2023, 7],
    ["dc-03", "Produtividade para Programadores", 2023, 3],
    ["dc-02", "Webmaster Front-end Completo", 2023, 82],
    ["dc", "JavaScript Completo", 2023, 14],
    ["db", "Semana do Zero ao Programador Contratado", 2023, 10],
    ["cv", "JavaScript", 2023, 40],
    ["ht", "Intensivão de JavaScript", 2023, 5],
    ["pg", "Profissão Programador", 2023, 110]
  ].map(([file, title, year, hours]) => ({
    file, title, year, hours, school: file.split("-")[0], schoolName: SCHOOLS[file.split("-")[0]]
  }));

  const STACK = ["JavaScript", "TypeScript", "Python", "SQL", "Inteligência Artificial", "RAG", "HTML", "CSS",
    "React.js", "Next.js", "Tailwind CSS", "Node.js", "Prisma", "Drizzle", "Mongoose", "Express.js", "Flask",
    "SQLAlchemy", "MySQL", "PostgreSQL", "MongoDB", "WordPress", "Elementor", "WooCommerce", "Crocoblock",
    "Jest", "Cypress", "Testing Library", "Figma", "Docker", "Git", "GitHub", "API's", "Electron", "FileZilla",
    "Excel", "Cloudflare"];

  const totalHours = Math.round(CERTS.reduce((a, c) => a + c.hours, 0));
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------------------------------------------------------
     Utilidades gerais sem dependência
  --------------------------------------------------------- */
  // relógio local de Blumenau
  const clock = $("[data-clock]");
  const tick = () => {
    if (!clock) return;
    clock.textContent = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(new Date());
  };
  tick(); setInterval(tick, 15000);

  // título ao trocar de aba
  // alterna o título enquanto a aba está ativa; chama de volta quando sai
  const TITLES = ["Portfólio | Alexandre Delaboneta", "Desenvolvedor Full Stack IA"];
  let titleIdx = 0, titleTimer = null;
  const startTitle = () => {
    clearInterval(titleTimer);
    document.title = TITLES[titleIdx = 0];
    titleTimer = setInterval(() => { titleIdx = (titleIdx + 1) % TITLES.length; document.title = TITLES[titleIdx]; }, 1500);
  };
  startTitle();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { clearInterval(titleTimer); document.title = "👀 Ei, volta aqui!"; }
    else startTitle();
  });
  const stackCount = $("[data-stack-count]");
  if (stackCount) stackCount.dataset.counter = STACK.length;

  const hoursEl = $("[data-hours]");
  if (hoursEl) { hoursEl.dataset.counter = totalHours; hoursEl.textContent = reduced || !hasGSAP ? totalHours : 0; }

  /* ---------------------------------------------------------
     Certificados — render
  --------------------------------------------------------- */
  const track = $(".rail__track");
  const filtersEl = $(".filters");
  const rail = $(".rail");
  let currentList = CERTS.slice();

  const certCard = (c, i) => `
    <button class="cert" data-index="${i}" data-cursor="Ver" aria-label="Ver certificado: ${c.title}">
      <span class="cert__img"><img src="./assets/certificados/thumb/${c.file}.webp" alt="" loading="lazy" decoding="async" width="520" height="366"></span>
      <span class="cert__title">${c.title}</span>
      <span class="cert__meta mono"><span>${c.schoolName}</span><span>${c.year}${c.hours ? " · " + String(c.hours).replace(".", ",") + "h" : ""}</span></span>
    </button>`;

  const renderRail = (list) => {
    currentList = list;
    track.innerHTML = list.map(certCard).join("");
    rail.scrollLeft = 0;
    updateRailProgress();
  };

  const rawCounts = CERTS.reduce((a, c) => (a[c.school] = (a[c.school] || 0) + 1, a), {});
  // escolas com um único certificado entram no filtro "Outros"
  CERTS.forEach((c) => (c.group = rawCounts[c.school] > 1 ? c.school : "outros"));
  SCHOOLS.outros = "Outros";
  const counts = CERTS.reduce((a, c) => (a[c.group] = (a[c.group] || 0) + 1, a), {});
  const order = Object.keys(counts).filter((k) => k !== "outros").sort((a, b) => counts[b] - counts[a]).concat(counts.outros ? ["outros"] : []);
  filtersEl.innerHTML = `<button class="filter is-active" data-filter="all" role="tab" aria-selected="true">Todos <sup>${CERTS.length}</sup></button>` +
    order.map((k) => `<button class="filter" data-filter="${k}" role="tab" aria-selected="false">${SCHOOLS[k]} <sup>${counts[k]}</sup></button>`).join("");

  const railProgress = $(".rail__progress span");
  function updateRailProgress() {
    const max = rail.scrollWidth - rail.clientWidth;
    const p = max > 0 ? rail.scrollLeft / max : 1;
    railProgress.style.transform = `scaleX(${Math.max(0.04, p)})`;
  }
  rail.addEventListener("scroll", updateRailProgress, { passive: true });

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn || btn.classList.contains("is-active")) return;
    $$(".filter", filtersEl).forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-selected", b === btn); });
    const key = btn.dataset.filter;
    const list = key === "all" ? CERTS.slice() : CERTS.filter((c) => c.group === key);
    if (hasGSAP && !reduced) {
      gsap.to(".cert", {
        y: 20, opacity: 0, duration: .25, stagger: .02, ease: "power2.in",
        onComplete: () => {
          renderRail(list);
          gsap.fromTo(".cert", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .05, ease: "expo.out" });
        }
      });
    } else renderRail(list);
  });

  renderRail(CERTS);

  // arrastar com mouse
  (() => {
    let down = false, startX = 0, startLeft = 0, moved = false;
    rail.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = rail.scrollLeft;
    });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) { moved = true; rail.classList.add("is-drag"); }
      rail.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      setTimeout(() => rail.classList.remove("is-drag"), 0);
    });
    rail.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  })();

  $$("[data-rail]").forEach((b) => b.addEventListener("click", () => {
    const card = $(".cert", track);
    const step = card ? (card.offsetWidth + 16) * 2 : 600;
    const to = rail.scrollLeft + (b.dataset.rail === "next" ? step : -step);
    if (hasGSAP) gsap.to(rail, { scrollLeft: to, duration: .9, ease: "expo.out" });
    else rail.scrollLeft = to;
  }));

  /* ---------------------------------------------------------
     Lightbox (na própria página, sem nova URL)
  --------------------------------------------------------- */
  const lb = $(".lightbox");
  const lbImg = $(".lightbox__frame img", lb);
  const lbTitle = $(".lightbox__title", lb);
  const lbInfo = $(".lightbox__info", lb);
  const lbCount = $(".lightbox__count", lb);
  let lbIndex = 0;

  const fillLightbox = (dir = 0) => {
    const c = currentList[lbIndex];
    const apply = () => {
      lbImg.src = `./assets/certificados/full/${c.file}.webp`;
      lbImg.alt = `Certificado — ${c.title}`;
      lbTitle.textContent = c.title;
      lbInfo.textContent = `${c.schoolName} · ${c.year}${c.hours ? " · " + String(c.hours).replace(".", ",") + " horas" : ""}`;
      lbCount.textContent = `${pad(lbIndex + 1)} / ${pad(currentList.length)}`;
    };
    if (hasGSAP && !reduced && dir) {
      gsap.timeline()
        .to(".lightbox__frame", { x: -60 * dir, opacity: 0, duration: .22, ease: "power2.in" })
        .add(apply)
        .fromTo(".lightbox__frame", { x: 60 * dir, opacity: 0 }, { x: 0, opacity: 1, duration: .6, ease: "expo.out" });
    } else apply();
  };

  const openLightbox = (i) => {
    lbIndex = i;
    fillLightbox();
    lb.showModal();
    // o dialog fica na "top layer": leva o cursor junto para ele continuar visível
    const cur = $(".cursor"); if (cur) lb.appendChild(cur);
    lenis && lenis.stop();
    if (hasGSAP && !reduced) {
      gsap.fromTo(".lightbox__backdrop", { opacity: 0 }, { opacity: 1, duration: .5 });
      gsap.fromTo(".lightbox__panel", { y: 60, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .8, ease: "expo.out" });
    }
  };
  const closeLightbox = () => {
    const done = () => {
      lb.close(); lenis && lenis.start();
      const cur = $(".cursor", lb); if (cur) body.insertBefore(cur, body.firstChild);
    };
    if (hasGSAP && !reduced) {
      gsap.to(".lightbox__panel", { y: 40, opacity: 0, duration: .3, ease: "power2.in" });
      gsap.to(".lightbox__backdrop", { opacity: 0, duration: .35, onComplete: done });
    } else done();
  };
  const step = (d) => { lbIndex = (lbIndex + d + currentList.length) % currentList.length; fillLightbox(d); };

  track.addEventListener("click", (e) => {
    const card = e.target.closest(".cert");
    if (card) openLightbox(+card.dataset.index);
  });
  $$("[data-close]", lb).forEach((el) => el.addEventListener("click", closeLightbox));
  $(".lightbox__nav--prev", lb).addEventListener("click", () => step(-1));
  $(".lightbox__nav--next", lb).addEventListener("click", () => step(1));
  lb.addEventListener("cancel", (e) => { e.preventDefault(); closeLightbox(); });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  // swipe no mobile
  (() => {
    let sx = null;
    lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      sx = null;
    });
  })();

  /* ---------------------------------------------------------
     Marquee — conteúdo
  --------------------------------------------------------- */
  $$(".marquee__inner").forEach((inner, i) => {
    const words = i ? STACK.slice().reverse() : STACK;
    const chunk = words.map((w) => `<span>${w}</span>`).join("");
    inner.innerHTML = chunk + chunk;
  });

  /* ---------------------------------------------------------
     Sem GSAP ou com movimento reduzido → versão estática
  --------------------------------------------------------- */
  let lenis = null;

  if (!hasGSAP || reduced) {
    body.classList.remove("is-loading");
    $(".traits").classList.add("no-pin");
    $(".playground").classList.add("no-physics");
    $(".playground__world").innerHTML = STACK.map((s) => `<span class="pill">${s}</span>`).join("");
    $$("[data-counter]").forEach((el) => (el.textContent = el.dataset.counter));
    $$("[data-meter]").forEach((m) => {
      $(".meter__val b", m).textContent = m.dataset.meter;
      $(".meter__bar span", m).style.transform = `scaleX(${m.dataset.meter / 100})`;
    });
    $$(".loader__ring,.quote__ring").forEach((r) => (r.style.strokeDashoffset = 0));
    $(".quote__letters") && ($(".quote__letters").style.opacity = 1);
    bindAnchors();
    bindMenu();
    return;
  }

  /* =========================================================
     A PARTIR DAQUI: EXPERIÊNCIA COMPLETA
  ========================================================= */
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });

  // ---------- Lenis (smooth scroll)
  if (typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    window.__lenis = lenis;
  }

  // ---------- Barra de progresso + nav que se esconde
  const nav = $(".nav");
  gsap.to(".progress span", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: .3 } });
  let lastY = 0;
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      if (!body.classList.contains("menu-open")) nav.classList.toggle("is-hidden", y > lastY && y > 300);
      lastY = y;
    }
  });

  // ---------- Cursor customizado
  if (finePointer) {
    html.classList.add("has-cursor");
    const cur = $(".cursor");
    const dot = $(".cursor__dot");
    const ring = $(".cursor__ring");
    const label = $(".cursor__label");
    gsap.set([dot, ring], { x: innerWidth / 2, y: innerHeight / 2 });
    const dx = gsap.quickTo(dot, "x", { duration: .12, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: .12, ease: "power3" });
    const rx = gsap.quickTo(ring, "x", { duration: .55, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: .55, ease: "power3" });
    window.addEventListener("pointermove", (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); }, { passive: true });
    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest("[data-cursor], a, button, [role='button']");
      cur.classList.remove("is-hover", "is-label");
      if (!el) return;
      if (el.dataset.cursor) { label.textContent = el.dataset.cursor; cur.classList.add("is-label"); }
      else cur.classList.add("is-hover");
    });
    document.addEventListener("pointerleave", () => gsap.to(cur, { opacity: 0, duration: .3 }));
    document.addEventListener("pointerenter", () => gsap.to(cur, { opacity: 1, duration: .3 }));
  }

  // ---------- Botões magnéticos
  if (finePointer) {
    $$(".round-btn, .nav__logo").forEach((el) => {
      const strength = .35;
      const xTo = gsap.quickTo(el, "x", { duration: .8, ease: "elastic.out(1, .4)" });
      const yTo = gsap.quickTo(el, "y", { duration: .8, ease: "elastic.out(1, .4)" });
      const host = el;
      host.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      });
      host.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  }

  // ---------- Âncoras + menu mobile
  bindAnchors();
  bindMenu();

  // ---------- Hero: rede neural interativa (canvas)
  heroNetwork();

  // ---------- Rotator de palavras (uma por vez)
  (() => {
    const words = $$(".rotator span");
    if (!words.length) return;
    gsap.set(words, { yPercent: 110, autoAlpha: 0 });
    gsap.set(words[0], { yPercent: 0, autoAlpha: 1 });
    const tl = gsap.timeline({ repeat: -1 });
    words.forEach((w, i) => {
      const next = words[(i + 1) % words.length];
      tl.to(w, { yPercent: -110, autoAlpha: 0, duration: .6, ease: "expo.in" }, "+=1.8")
        .fromTo(next, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .8, ease: "expo.out", immediateRender: false });
    });
  })();

  /* ---------------------------------------------------------
     LOADER → INTRO
  --------------------------------------------------------- */
  const heroSplits = $$("[data-hero-split]").map((el) => SplitText.create(el, { type: "chars", charsClass: "char" }));
  const heroChars = heroSplits.flatMap((s) => s.chars);
  gsap.set(heroChars, { yPercent: 115, rotate: 8, opacity: 0 });
  gsap.set(".hero__mark", { scale: 0, rotate: -200 });
  gsap.set(".hero__mark-ring", { strokeDashoffset: 4682 });
  gsap.set(".hero__mark-letters", { opacity: 0 });
  gsap.set([".hero__top > *", ".hero__bottom > *"], { y: 30, opacity: 0 });
  gsap.set(".hero__canvas", { opacity: 0 });

  const counter = { v: 0 };
  const countEl = $("[data-count]");
  const loaderTl = gsap.timeline({ paused: true });
  loaderTl
    .to(".loader__ring", { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 0)
    .to(counter, { v: 100, duration: 1.8, ease: "power2.inOut", onUpdate: () => (countEl.textContent = String(Math.round(counter.v)).padStart(3, "0")) }, 0)
    .fromTo(".loader__letters", { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 1.2 }, .6)
    .to(".loader__logo", { rotate: 360, scale: .9, duration: 1, ease: "expo.inOut" }, 1.8)
    .to(".loader__meta", { opacity: 0, y: 10, duration: .4, ease: "power2.in" }, 1.9)
    .to(".loader", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, 2.4)
    .add(() => { body.classList.remove("is-loading"); lenis && lenis.start(); }, 2.9)
    .add(introHero(), 2.75);

  gsap.set(".loader", { clipPath: "inset(0% 0% 0% 0%)" });
  Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 2500))])
    .then(() => loaderTl.play());

  function introHero() {
    return gsap.timeline()
      .to(heroChars, { yPercent: 0, rotate: 0, opacity: 1, duration: 1.4, stagger: .035 })
      .to(".hero__mark", { scale: 1, rotate: 0, duration: 1.8, ease: "expo.out" }, .2)
      .to(".hero__mark-ring", { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, .3)
      .to(".hero__mark-letters", { opacity: 1, duration: 1 }, 1)
      .to(".hero__canvas", { opacity: 1, duration: 2, ease: "power1.out" }, .2)
      .to([".hero__top > *", ".hero__bottom > *"], { y: 0, opacity: 1, stagger: .08, duration: 1.2 }, .6);
  }

  // hero sai de cena com scroll
  gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } })
    .to(".hero__line--1", { xPercent: -12, ease: "none" }, 0)
    .to(".hero__line--2", { xPercent: 10, ease: "none" }, 0)
    .to(".hero__title", { yPercent: 30, opacity: .15, ease: "none" }, 0)
    .to(".hero__glow", { scale: 1.4, opacity: 0, ease: "none" }, 0);

  /* ---------------------------------------------------------
     REVEALS GENÉRICOS
  --------------------------------------------------------- */
  $$("[data-split]").forEach((el) => {
    SplitText.create(el, {
      type: "lines", mask: "lines", linesClass: "ln", autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 110, duration: 1.3, stagger: .1,
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      })
    });
  });

  $$("[data-fade]").forEach((el) => {
    gsap.from(el, { y: 40, opacity: 0, duration: 1.4, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });

  $$(".section-head__line").forEach((el) => {
    gsap.from(el, { scaleX: 0, duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });

  // palavras que acendem conforme o scroll
  $$("[data-scrub-words]").forEach((el) => {
    const split = SplitText.create(el, { type: "words", wordsClass: "word" });
    gsap.fromTo(split.words, { opacity: .12 }, {
      opacity: 1, stagger: .1, ease: "none",
      scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: true }
    });
  });

  /* ---------------------------------------------------------
     SOBRE
  --------------------------------------------------------- */
  gsap.to(".about__photo-inner", {
    clipPath: "inset(0% 0 0 0 round 22px)", duration: 1.6, ease: "expo.inOut",
    scrollTrigger: { trigger: ".about__photo", start: "top 80%", once: true }
  });
  gsap.fromTo(".about__photo img", { yPercent: -12 }, {
    yPercent: 0, ease: "none", scrollTrigger: { trigger: ".about__photo", start: "top bottom", end: "bottom top", scrub: true }
  });
  gsap.from(".badge", { scale: 0, rotate: -180, duration: 1.4, ease: "back.out(1.6)", scrollTrigger: { trigger: ".about__photo", start: "top 70%", once: true } });

  if (finePointer) {
    const photo = $("[data-tilt]");
    const rX = gsap.quickTo(photo, "rotationX", { duration: .8, ease: "power3" });
    const rY = gsap.quickTo(photo, "rotationY", { duration: .8, ease: "power3" });
    photo.addEventListener("pointermove", (e) => {
      const r = photo.getBoundingClientRect();
      rY(((e.clientX - r.left) / r.width - .5) * 14);
      rX(-((e.clientY - r.top) / r.height - .5) * 14);
    });
    photo.addEventListener("pointerleave", () => { rX(0); rY(0); });
  }

  // contadores
  $$("[data-counter]").forEach((el) => {
    const o = { v: 0 };
    gsap.to(o, {
      v: +el.dataset.counter, duration: 2.2, ease: "power3.out",
      onUpdate: () => (el.textContent = Math.round(o.v)),
      scrollTrigger: { trigger: el, start: "top 92%", once: true }
    });
  });
  gsap.from(".stat", { y: 30, opacity: 0, stagger: .1, scrollTrigger: { trigger: ".stats", start: "top 90%", once: true } });

  /* ---------------------------------------------------------
     DIFERENCIAIS — scroll horizontal fixado
  --------------------------------------------------------- */
  const mm = gsap.matchMedia();
  const drawArt = (svg, opts = {}) => {
    const els = $$(".draw", svg).filter((p) => !p.hasAttribute("stroke-dasharray"));
    els.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 1000;
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    return gsap.to(els, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: .15, ...opts });
  };

  mm.add("(min-width: 900px)", () => {
    const trackEl = $(".traits__track");
    const dist = () => trackEl.scrollWidth - innerWidth;
    const horiz = gsap.to(trackEl, {
      x: () => -dist(), ease: "none",
      scrollTrigger: { trigger: ".traits", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    $$(".trait").forEach((card) => {
      drawArt($("svg", card), { paused: true, scrollTrigger: { trigger: card, containerAnimation: horiz, start: "left 85%", once: true } });
      gsap.from($$("h3, p", card), {
        y: 40, opacity: 0, stagger: .1,
        scrollTrigger: { trigger: card, containerAnimation: horiz, start: "left 75%", once: true }
      });
      gsap.fromTo($(".trait__art", card), { rotate: -8 }, { rotate: 8, ease: "none", scrollTrigger: { trigger: card, containerAnimation: horiz, start: "left right", end: "right left", scrub: true } });
    });
  });
  mm.add("(max-width: 899px)", () => {
    $$(".trait").forEach((card) => {
      drawArt($("svg", card), { scrollTrigger: { trigger: card, start: "top 80%", once: true } });
      gsap.from(card, { y: 60, opacity: 0, duration: 1.2, scrollTrigger: { trigger: card, start: "top 88%", once: true } });
    });
  });

  /* ---------------------------------------------------------
     POR QUE
  --------------------------------------------------------- */
  gsap.from(".why__row", {
    y: 50, opacity: 0, stagger: .1, duration: 1.2,
    scrollTrigger: { trigger: ".why__list", start: "top 85%", once: true }
  });

  /* ---------------------------------------------------------
     TEMA CLARO (seção Stack)
  --------------------------------------------------------- */
  const themeMeta = $('meta[name="theme-color"]');
  $$("[data-theme='light']").forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: "top 55%", end: "bottom 45%",
      onToggle: (self) => {
        body.classList.toggle("is-light", self.isActive);
        themeMeta.setAttribute("content", self.isActive ? "#f3f1ea" : "#0a0a0c");
      }
    });
  });

  /* ---------------------------------------------------------
     STACK — medidores
  --------------------------------------------------------- */
  $$("[data-meter]").forEach((m) => {
    const val = +m.dataset.meter;
    const o = { v: 0 };
    const b = $(".meter__val b", m);
    gsap.timeline({ scrollTrigger: { trigger: m, start: "top 88%", once: true } })
      .to($(".meter__bar span", m), { scaleX: val / 100, duration: 2, ease: "expo.inOut" }, 0)
      .to(o, { v: val, duration: 2, ease: "expo.inOut", onUpdate: () => (b.textContent = Math.round(o.v)) }, 0);
  });

  // ---------- Playground com física
  playground();

  // ---------- Marquee reagindo à velocidade do scroll
  (() => {
    const rows = $$(".marquee__row");
    const state = rows.map((row) => ({ inner: $(".marquee__inner", row), dir: +row.dataset.dir, x: 0, w: 0 }));
    const measure = () => state.forEach((s) => (s.w = s.inner.scrollWidth / 2));
    measure(); addEventListener("resize", measure);
    let vel = 0, sign = 1;
    const skewTo = rows.map((r) => gsap.quickTo(r, "skewX", { duration: .6, ease: "power3" }));
    gsap.ticker.add((t, dt) => {
      const v = lenis ? lenis.velocity : 0;
      vel += (v - vel) * .1;
      if (vel > .5) sign = 1; else if (vel < -.5) sign = -1;
      state.forEach((s, i) => {
        s.x -= s.dir * sign * (0.6 + Math.abs(vel) * .5) * (dt / 16.67);
        if (s.x <= -s.w) s.x += s.w;
        if (s.x > 0) s.x -= s.w;
        s.inner.style.transform = `translate3d(${s.x}px,0,0)`;
        skewTo[i](gsap.utils.clamp(-12, 12, vel * -.6 * s.dir));
      });
    });
  })();

  /* ---------------------------------------------------------
     CERTIFICADOS
  --------------------------------------------------------- */
  gsap.from(".filter", { y: 20, opacity: 0, stagger: .04, duration: .9, scrollTrigger: { trigger: ".filters", start: "top 92%", once: true } });
  gsap.from(".rail__track", {
    x: 260, opacity: 0, duration: 1.8, ease: "expo.out",
    scrollTrigger: { trigger: ".rail", start: "top 88%", once: true }
  });

  /* ---------------------------------------------------------
     QUOTE — logo se desenha
  --------------------------------------------------------- */
  gsap.timeline({ scrollTrigger: { trigger: ".quote", start: "top 75%", end: "center 45%", scrub: 1 } })
    .to(".quote__ring", { strokeDashoffset: 0, ease: "none" })
    .fromTo(".quote__letters", { opacity: 0 }, { opacity: 1, ease: "none" }, .4)
    .fromTo(".quote__logo", { rotate: -90 }, { rotate: 0, ease: "none" }, 0);

  /* ---------------------------------------------------------
     CONTATO
  --------------------------------------------------------- */
  gsap.from(".social", {
    yPercent: 60, opacity: 0, stagger: .12, duration: 1.3,
    scrollTrigger: { trigger: ".socials", start: "top 88%", once: true }
  });

  /* ---------------------------------------------------------
     FOOTER — nome gigante
  --------------------------------------------------------- */
  const footSplit = SplitText.create("[data-footer-split]", { type: "chars", charsClass: "char" });
  gsap.from(footSplit.chars, {
    yPercent: 100, stagger: { each: .05, from: "center" }, ease: "none",
    scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 1 }
  });
  if (finePointer) {
    const big = $(".footer__big");
    big.addEventListener("pointermove", (e) => {
      footSplit.chars.forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        gsap.to(c, { y: -Math.max(0, 1 - d / 260) * 40, duration: .6, ease: "power3", overwrite: "auto" });
      });
    });
    big.addEventListener("pointerleave", () => gsap.to(footSplit.chars, { y: 0, duration: 1, ease: "elastic.out(1, .4)" }));
  }

  // recalcula tudo depois que as imagens carregarem
  addEventListener("load", () => ScrollTrigger.refresh());

  /* =========================================================
     FUNÇÕES
  ========================================================= */
  function bindAnchors() {
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = id === "#inicio" || id === "#" ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      if (body.classList.contains("menu-open")) toggleMenu(false);
      if (lenis) lenis.scrollTo(target, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
      else if (target === 0) scrollTo({ top: 0, behavior: "smooth" });
      else target.scrollIntoView({ behavior: "smooth" });
    }));
  }

  function toggleMenu(force) {
    const open = typeof force === "boolean" ? force : !body.classList.contains("menu-open");
    const burger = $(".nav__burger");
    burger.setAttribute("aria-expanded", open);
    $(".menu").setAttribute("aria-hidden", !open);
    if (open) {
      body.classList.add("menu-open");
      lenis && lenis.stop();
      if (hasGSAP && !reduced) {
        gsap.fromTo(".menu__bg", { clipPath: "circle(0% at calc(100% - 40px) 40px)" }, { clipPath: "circle(150% at calc(100% - 40px) 40px)", duration: 1, ease: "expo.inOut" });
        gsap.fromTo(".menu__links a", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: .06, duration: 1, delay: .35 });
      } else $(".menu__bg").style.clipPath = "circle(150% at 50% 50%)";
    } else {
      lenis && lenis.start();
      if (hasGSAP && !reduced) {
        gsap.to(".menu__links a", { opacity: 0, duration: .25 });
        gsap.to(".menu__bg", { clipPath: "circle(0% at calc(100% - 40px) 40px)", duration: .8, ease: "expo.inOut", onComplete: () => body.classList.remove("menu-open") });
      } else body.classList.remove("menu-open");
    }
  }

  function bindMenu() {
    $(".nav__burger").addEventListener("click", () => toggleMenu());
    addEventListener("keydown", (e) => { if (e.key === "Escape" && body.classList.contains("menu-open")) toggleMenu(false); });
  }

  function heroNetwork() {
    const canvas = $(".hero__canvas");
    const ctx = canvas.getContext("2d");
    const hero = $(".hero");
    let w, h, dpr, nodes = [], running = true, raf;
    const mouse = { x: -9999, y: -9999, active: false };
    const pulses = [];

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = hero.offsetWidth; h = hero.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(120, Math.round((w * h) / 14000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.6 + .6
      }));
    };
    resize();
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 200); });

    hero.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    });
    hero.addEventListener("pointerleave", () => { mouse.active = false; mouse.x = mouse.y = -9999; });
    hero.addEventListener("click", (e) => {
      if (e.target.closest("a,button")) return;
      const r = canvas.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      pulses.push({ x: px, y: py, r: 0, a: 1 });
      nodes.forEach((n) => {
        const dx = n.x - px, dy = n.y - py, d = Math.hypot(dx, dy) || 1;
        if (d < 260) { n.vx += (dx / d) * (260 - d) / 40; n.vy += (dy / d) * (260 - d) / 40; }
      });
    });

    const LINK = 130, MOUSE_R = 190;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (mouse.active) {
          const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
          if (d < MOUSE_R && d > 1) { n.vx += (dx / d) * .025; n.vy += (dy / d) * .025; }
        }
        n.vx *= .985; n.vy *= .985;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp < .12) { n.vx += (Math.random() - .5) * .04; n.vy += (Math.random() - .5) * .04; }
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(243,241,234,${(1 - d / LINK) * .16})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        let near = 0;
        if (mouse.active) {
          const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
          if (d < MOUSE_R) {
            near = 1 - d / MOUSE_R;
            ctx.strokeStyle = `rgba(215,255,58,${near * .55})`;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
        ctx.fillStyle = near ? `rgba(215,255,58,${.5 + near * .5})` : "rgba(243,241,234,.55)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + near * 2, 0, Math.PI * 2); ctx.fill();
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.r += 6; p.a *= .94;
        ctx.strokeStyle = `rgba(215,255,58,${p.a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.stroke();
        if (p.a < .02) pulses.splice(i, 1);
      }
      if (running) raf = requestAnimationFrame(draw);
    };
    draw();
    new IntersectionObserver(([e]) => {
      const was = running; running = e.isIntersecting;
      if (running && !was) draw(); else if (!running) cancelAnimationFrame(raf);
    }).observe(hero);
  }

  function playground() {
    const box = $(".playground");
    const world = $(".playground__world");
    if (typeof window.Matter === "undefined") {
      box.classList.add("no-physics");
      world.innerHTML = STACK.map((s) => `<span class="pill">${s}</span>`).join("");
      return;
    }
    const { Engine, Bodies, Composite, Body, Mouse, MouseConstraint } = Matter;
    const styles = ["", "pill--acc", "pill--ghost", "", "pill--violet", "pill--serif", "", "pill--ghost"];
    let engine, pills = [], walls = [], running = false, started = false, raf, W, H;

    const build = () => {
      W = box.clientWidth; H = box.clientHeight;
      const small = W < 640;
      const fs = small ? 12 : Math.min(20, Math.max(14, W / 72));
      const hgt = small ? 34 : fs * 2.5;
      world.innerHTML = "";
      engine = Engine.create({ gravity: { y: 1 } });
      const t = 200;
      walls = [
        Bodies.rectangle(W / 2, H + t / 2, W * 3, t, { isStatic: true }),
        Bodies.rectangle(-t / 2, H / 2, t, H * 6, { isStatic: true }),
        Bodies.rectangle(W + t / 2, H / 2, t, H * 6, { isStatic: true })
      ];
      Composite.add(engine.world, walls);
      pills = STACK.map((label, i) => {
        const el = document.createElement("span");
        el.className = "pill " + styles[i % styles.length];
        el.style.setProperty("--fs", fs + "px");
        el.style.setProperty("--h", hgt + "px");
        if (small) el.style.setProperty("--pad", ".85em");
        el.innerHTML = (i % 3 === 0 ? "<i></i>" : "") + label;
        world.appendChild(el);
        const bw = el.offsetWidth, bh = el.offsetHeight;
        const b = Bodies.rectangle(
          40 + Math.random() * (W - 80), -Math.random() * H * 1.4 - bh,
          bw, bh,
          { chamfer: { radius: bh / 2 - 1 }, restitution: .45, friction: .08, frictionAir: .012, angle: (Math.random() - .5) * 1.2 }
        );
        Composite.add(engine.world, b);
        return { el, b, bw, bh };
      });

      if (finePointer) {
        const mouse = Mouse.create(box);
        ["mousewheel", "DOMMouseScroll", "wheel"].forEach((ev) => mouse.element.removeEventListener(ev, mouse.mousewheel));
        mouse.pixelRatio = 1;
        const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: .2, damping: .1, render: { visible: false } } });
        Composite.add(engine.world, mc);
      } else {
        box.onclick = (e) => {
          const r = box.getBoundingClientRect();
          const x = e.clientX - r.left, y = e.clientY - r.top;
          pills.forEach(({ b }) => {
            const dx = b.position.x - x, dy = b.position.y - y, d = Math.hypot(dx, dy) || 1;
            if (d < 220) Body.setVelocity(b, { x: (dx / d) * 12, y: -14 * (1 - d / 260) - 4 });
          });
        };
      }
    };

    const loop = () => {
      Engine.update(engine, 1000 / 60);
      for (const p of pills) {
        const { x, y } = p.b.position;
        p.el.style.transform = `translate3d(${x - p.bw / 2}px, ${y - p.bh / 2}px, 0) rotate(${p.b.angle}rad)`;
      }
      if (running) raf = requestAnimationFrame(loop);
    };

    const start = () => { if (running) return; running = true; loop(); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    ScrollTrigger.create({
      trigger: box, start: "top 75%", end: "bottom top",
      onToggle: (self) => {
        if (self.isActive) { if (!started) { build(); started = true; } start(); }
        else stop();
      }
    });

    $(".playground__reset").addEventListener("click", (e) => { e.stopPropagation(); stop(); build(); start(); });
    let rw = box.clientWidth, rt;
    addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        if (!started || Math.abs(box.clientWidth - rw) < 40) return;
        rw = box.clientWidth; const was = running; stop(); build(); if (was) start();
      }, 250);
    });
  }
})();
