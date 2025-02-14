'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

// preloader
const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});


// alternar barra de navegação do mobile
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});

// header ativo
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});

// efeito de inclinação do elemento
const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {

// obter a posição central do elemento de inclinação 
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;

  const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;

  this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${tiltPosY - (tiltPosY * 2)}deg)`;
}

addEventOnElements(tiltElements, "mousemove", initTilt);

addEventOnElements(tiltElements, "mouseout", function () {
  this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});

// tab content
const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContents = document.querySelectorAll("[data-tab-content]");

let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];

const filterContent = function () {

  if (!(lastActiveTabBtn === this)) {

    lastActiveTabBtn.classList.remove("active");
    lastActiveTabContent.classList.remove("active");

    this.classList.add("active");
    lastActiveTabBtn = this;

    const currentTabContent = document.querySelector(`[data-tab-content="${this.dataset.tabBtn}"]`);

    currentTabContent.classList.add("active");
    lastActiveTabContent = currentTabContent;
  }
}

addEventOnElements(tabBtns, "click", filterContent);

// cursor personalizado
const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [...document.querySelectorAll("button"), ...document.querySelectorAll("a")];

window.addEventListener("mousemove", function (event) {

  const posX = event.clientX;
  const posY = event.clientY;

// posição do ponto do cursor
  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;

// posição do contorno do cursor
  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);
});

// adiciona a classe hovered ao passar o mouse sobre hoverElements
addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

// remove a classe hovered ao tirar o mouse sobre hoverElements
addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});

document.addEventListener('DOMContentLoaded', function () {

// clona o elemento com o ID 'headline-scroll' para criar um efeito de rolagem contínua
  const headlineScroll = document.getElementById('headline-scroll');
  const clone = headlineScroll.cloneNode(true);
  headlineScroll.parentNode.appendChild(clone);

// define a largura dos elementos com base na largura do conteúdo
  const scrollWidth = headlineScroll.scrollWidth;
  headlineScroll.style.width = `${scrollWidth}px`;
  clone.style.width = `${scrollWidth}px`;
});

// cria e adiciona um estilo CSS para a animação de rolagem
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
@keyframes scroll {
  0% {
      transform: translateX(0);
  }
  100% {
      transform: translateX(-50%);
  }
}`;
document.head.appendChild(styleSheet);

// enviar os dados preenchidos no formulário diretamente pro e-mail
class FormSubmit {
  constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.formButton = document.querySelector(settings.button);
      if (this.form) {
      this.url = this.form.getAttribute("action");
      }
      this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
      this.form.innerHTML = this.settings.success;
  }

  displayError() {
      this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
      const formObject = {};
      const fields = this.form.querySelectorAll("[name]");
      fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
      });
      return formObject;
  }

  onSubmission(event) {
      event.preventDefault();
      event.target.disabled = true;
      event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
      try {
      this.onSubmission(event);
      await fetch(this.url, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          },
          body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
      } catch (error) {
      this.displayError();
      throw new Error(error);
      }
  }

  init() {
      if (this.form) this.formButton.addEventListener("click", this.sendForm);
      return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
  });
formSubmit.init();