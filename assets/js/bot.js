/* =========================================================
   Atlas — assistente do portfólio (sem IA, sem backend)
   ========================================================= */
(() => {
  "use strict";
  const root = document.querySelector("[data-bot]");
  if (!root) return;

  const $ = (s) => root.querySelector(s);
  const panel = $(".bot__panel");
  const launcher = $(".bot__launcher");
  const body = $(".bot__body");
  const stream = $(".bot__stream");
  const form = $(".bot__form");
  const input = form.querySelector("input");
  const statusEl = $("[data-bot-status]");
  const G = window.gsap;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const anim = !!G && !reduced;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  const LINKS = `<div class="bot-links">
      <a href="https://www.instagram.com/imxandx/" target="_blank" rel="noopener">Instagram ↗</a>
      <a href="https://linkedin.com/in/alexandre-delaboneta" target="_blank" rel="noopener">LinkedIn ↗</a>
      <a href="https://github.com/imxandx" target="_blank" rel="noopener">GitHub ↗</a>
    </div>`;

  /* ---------- base de conhecimento ---------- */
  const INTENTS = [
    {
      id: "quem", chip: "Quem é o Alexandre?",
      q: "Quem é Alexandre Delaboneta?",
      keys: ["quem", "alexandre", "sobre", "apresent", "experiencia", "voce e", "ele e"],
      a: "Alexandre Delaboneta é um <b>Desenvolvedor Full Stack IA</b> com 3 anos de experiência, especializado em criar soluções digitais impactantes com foco em performance e usabilidade. Já são <b>mais de 200 projetos concluídos</b>, unindo habilidades técnicas avançadas a soft skills como versatilidade e trabalho em equipe."
    },
    {
      id: "formacao", chip: "Formação",
      q: "Alexandre faz faculdade ou tem formação acadêmica?",
      keys: ["faculdade", "formacao", "estuda", "graduacao", "academ", "uniasselvi", "diploma", "ensino"],
      a: "Ele está cursando <b>Ensino Superior em Inteligência Artificial e Machine Learning na Uniasselvi</b>, com conclusão prevista para 2027."
    },
    {
      id: "diferencial", chip: "Diferenciais",
      q: "O que diferencia o Alexandre como profissional?",
      keys: ["diferen", "por que", "porque", "vantag", "melhor", "escolher", "contratar"],
      a: "A combinação de <b>versatilidade técnica</b> (full stack + IA) com habilidades interpessoais, uma abordagem <b>focada em resultado</b> e muito aprendizado contínuo. Ele pensa o produto inteiro — não só a próxima linha de código."
    },
    {
      id: "contato", chip: "Contato",
      q: "Como posso falar com o Alexandre?",
      keys: ["contato", "falar", "conversar", "instagram", "insta", "linkedin", "whats", "email", "e-mail", "chamar", "mensagem"],
      a: "Por aqui, é só escolher o canal — ele responde rápido:" + LINKS
    },
    {
      id: "projetos", chip: "Projetos",
      q: "Onde vejo os projetos do Alexandre?",
      keys: ["projeto", "github", "portfolio", "trabalho", "repositorio", "codigo", "exemplo"],
      a: "No <b>GitHub</b>: <a href=\"https://github.com/imxandx\" target=\"_blank\" rel=\"noopener\">github.com/imxandx</a> — lá ele compartilha mais de 200 projetos concluídos."
    },
    {
      id: "stack", chip: "Stack",
      q: "Com quais tecnologias ele trabalha?",
      keys: ["stack", "tecnolog", "linguag", "ferrament", "react", "node", "python", "wordpress", "framework", "sabe"],
      a: "Dá uma olhada no playground da seção <a href=\"#stack\" data-bot-jump>Stack</a> 👀 — mas o resumo é: <b>JavaScript, TypeScript, Python, React, Next.js, Node.js, bancos SQL e NoSQL, WordPress/WooCommerce</b> e muita <b>Inteligência Artificial</b> (inclusive RAG)."
    }
  ];
  const SMALL = [
    { keys: ["oi", "ola", "eae", "e ai", "opa", "bom dia", "boa tarde", "boa noite", "salve"], a: "Oi! 👋 Que bom te ver por aqui. Sobre o que você quer saber?" },
    { keys: ["obrigad", "valeu", "vlw", "brigad", "top", "show"], a: "Imagina! 💚 Se precisar, é só chamar." },
    { keys: ["piada", "engracad", "rir"], a: "Por que o dev foi ao médico? Porque estava com <b>bug</b> no estômago. 🥁 …ok, eu sou só um bot." },
    { keys: ["bot", "robo", "atlas", "voce e uma ia", "chatgpt"], a: "Sou o <b>Atlas</b>, o guia deste portfólio — feito à mão pelo Alexandre. 🧭" }
  ];

  /* ---------- helpers ---------- */
  const norm = (s) => " " + s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ") + " ";
  const hhmm = () => new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date());
  const scrollDown = () => {
    if (anim) G.to(body, { scrollTop: body.scrollHeight, duration: .6, ease: "power3.out" });
    else body.scrollTop = body.scrollHeight;
  };
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
  let busy = false;
  const asked = new Set();

  function addMsg(html, who = "bot") {
    const el = document.createElement("div");
    el.className = `msg msg--${who}`;
    el.innerHTML = html + `<span class="msg__time">${who === "bot" ? "Atlas" : "Você"} · ${hhmm()}</span>`;
    stream.appendChild(el);
    if (anim) {
      G.from(el, { y: 16, opacity: 0, scale: .96, transformOrigin: who === "bot" ? "left bottom" : "right bottom", duration: .6, ease: "expo.out" });
      const rich = el.querySelector(".bot-links");
      if (who === "bot" && !rich && window.SplitText) {
        const split = SplitText.create(el, { type: "words", wordsClass: "word" });
        G.from(split.words, { opacity: 0, y: 6, filter: "blur(4px)", duration: .5, stagger: .018, ease: "power2.out" });
      }
      if (rich) G.from(rich.children, { opacity: 0, x: -10, stagger: .07, duration: .6, delay: .2, ease: "expo.out" });
    }
    scrollDown();
    return el;
  }

  async function botSay(html) {
    root.classList.add("is-typing");
    statusEl.textContent = "digitando…";
    const t = document.createElement("div");
    t.className = "msg msg--bot msg--typing";
    t.innerHTML = "<span></span><span></span><span></span>";
    stream.appendChild(t);
    scrollDown();
    const plain = html.replace(/<[^>]+>/g, "");
    await wait(Math.min(1500, 450 + plain.length * 6));
    t.remove();
    root.classList.remove("is-typing");
    statusEl.textContent = "online · responde na hora";
    addMsg(html, "bot");
  }

  function showOptions() {
    const box = document.createElement("div");
    box.className = "bot-options";
    box.innerHTML = INTENTS.map((i) => `<button class="bot-option" data-intent="${i.id}">${i.q}</button>`).join("");
    stream.appendChild(box);
    if (anim) G.from(box.children, { x: -14, opacity: 0, stagger: .05, duration: .55, ease: "expo.out", clearProps: "transform" });
    scrollDown();
  }
  const clearOptions = () => stream.querySelectorAll(".bot-options").forEach((o) => o.remove());

  async function answerIntent(intent, userText) {
    if (busy) return;
    busy = true;
    clearOptions();
    addMsg(escapeHTML(userText || intent.q), "user");
    asked.add(intent.id);
    await wait(250);
    await botSay(intent.a);
    await wait(700);
    await botSay("Posso ajudar com mais alguma coisa?");
    showOptions();
    busy = false;
  }

  function escapeHTML(s) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  async function handleFree(text) {
    const n = norm(text);
    let best = null, score = 0;
    INTENTS.forEach((i) => {
      const s = i.keys.reduce((acc, k) => acc + (n.includes(k) ? k.length : 0), 0);
      if (s > score) { score = s; best = i; }
    });
    if (best) return answerIntent(best, text);

    const small = SMALL.find((s) => s.keys.some((k) => n.includes(" " + k) || n.includes(k + " ")));
    busy = true;
    clearOptions();
    addMsg(escapeHTML(text), "user");
    await wait(250);
    await botSay(small ? small.a : "Não encontrei isso por aqui 🧭 Selecione uma das perguntas abaixo:");
    showOptions();
    busy = false;
  }

  async function start() {
    stream.innerHTML = `<span class="bot__day">Hoje · ${hhmm()}</span>`;
    asked.clear();
    busy = true;
    await wait(300);
    await botSay("Olá! 👋 Eu sou o <b>Atlas</b>, o guia do portfólio do Alexandre. Como posso ajudar você hoje?");
    showOptions();
    busy = false;
  }

  /* ---------- abrir / fechar ---------- */
  let open = false, started = false;
  function setOpen(v) {
    if (v === open) return;
    open = v;
    root.classList.toggle("is-open", v);
    root.classList.remove("has-unread", "show-teaser");
    launcher.setAttribute("aria-expanded", v);
    panel.setAttribute("aria-hidden", !v);
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const at = `${w - 34}px ${h + 52}px`;
    if (anim) {
      G.killTweensOf(panel);
      if (v) {
        G.set(panel, { visibility: "visible" });
        G.fromTo(panel, { clipPath: `circle(0px at ${at})` }, { clipPath: `circle(${Math.hypot(w, h + 60) + 20}px at ${at})`, duration: .9, ease: "expo.inOut" });
        G.fromTo(panel.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: .06, duration: .7, delay: .3, ease: "expo.out" });
      } else {
        G.to(panel, { clipPath: `circle(0px at ${at})`, duration: .6, ease: "expo.inOut", onComplete: () => G.set(panel, { visibility: "hidden" }) });
      }
    } else {
      panel.style.visibility = v ? "visible" : "hidden";
      panel.style.clipPath = v ? "none" : "";
    }
    if (v && !started) { started = true; start(); }
    if (v && fine) setTimeout(() => input.focus({ preventScroll: true }), 500);
  }

  launcher.addEventListener("click", () => setOpen(!open));
  $("[data-bot-close]").addEventListener("click", () => setOpen(false));
  $("[data-bot-reset]").addEventListener("click", () => { if (!busy) start(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && open) setOpen(false); });

  stream.addEventListener("click", (e) => {
    const b = e.target.closest("[data-intent]");
    if (!b) return;
    answerIntent(INTENTS.find((i) => i.id === b.dataset.intent));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;
    input.value = "";
    handleFree(text);
  });

  // links internos dentro do chat (#stack, #certificados)
  stream.addEventListener("click", (e) => {
    const a = e.target.closest("[data-bot-jump]");
    if (!a) return;
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (matchMedia("(max-width: 520px)").matches) setOpen(false);
    if (!target) return;
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- aparece depois do loader + convite ---------- */
  let dismissed = false;
  try { dismissed = sessionStorage.getItem("atlas-teaser") === "1"; } catch (_) {}
  setTimeout(() => {
    root.classList.add("is-ready");
  }, reduced ? 0 : 3400);
  setTimeout(() => {
    if (open || dismissed) return;
    root.classList.add("show-teaser", "has-unread");
    setTimeout(() => root.classList.remove("show-teaser"), 9000);
  }, reduced ? 1500 : 8000);
  $(".bot__teaser-x").addEventListener("click", () => {
    root.classList.remove("show-teaser");
    try { sessionStorage.setItem("atlas-teaser", "1"); } catch (_) {}
  });
  $(".bot__teaser").addEventListener("click", (e) => { if (!e.target.closest(".bot__teaser-x")) setOpen(true); });
})();
