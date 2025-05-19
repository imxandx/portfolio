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
  initializeChatbot();
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

// chatbot personalizado
function initializeChatbot() {

  const chatButton = document.getElementById('chatButton');
  const chatContainer = document.getElementById('chatContainer');
  const closeChat = document.getElementById('closeChat');
  const chatBody = document.getElementById('chatBody');

  // inicialmente, oculte o botão do chat
  chatButton.style.display = 'none';
  
  // mostrar o botão do chat após um pequeno delay
  setTimeout(() => {
    chatButton.style.display = 'flex';
  }, 1400);

  // definição das perguntas e respostas
  const questionsAndAnswers = [
      {
          question: "Quem é Alexandre Delaboneta?",
          answer: "Alexandre Delaboneta é um Desenvolvedor Full Stack IA com 3 anos de experiência, especializado em criar soluções digitais impactantes com foco em performance e usabilidade. Possui mais de 200 projetos concluídos e combina habilidades técnicas avançadas com soft skills como versatilidade e trabalho em equipe."
      },
      {
          question: "Como posso entrar em contato com o Alexandre?",
          answer: "Você pode entrar em contato com Alexandre para tirar suas dúvidas e afins nas seguintes plataformas: <br><br>• <b>Linkedin:</b> <a href='https://linkedin.com/in/alexandre-delaboneta' target='_blank' rel='noreferrer'>linkedin.com/in/alexandre-delaboneta</a><br>• <b>Email:</b> <a href='mailto:delabonetacoder@gmail.com'>delabonetacoder@gmail.com</a><br>• <b>GitHub:</b> <a href='https://github.com/imxandx' target='_blank' rel='noreferrer'>github.com/imxandx</a>"
      },
      {
          question: "O que diferencia o Alexandre como profissional?",
          answer: "Sua combinação única de versatilidade técnica (full stack + IA) com habilidades interpessoais, aliada a uma abordagem focada em resultados e aprendizado contínuo."
      },
      {
          question: "Quais são os objetivos profissionais do Alexandre?",
          answer: "Criar soluções digitais impactantes que atendam às necessidades reais de usuários e negócios, com alto foco em performance e usabilidade."
      },
      {
          question: "Onde posso ver os projetos do Alexandre?",
          answer: "No GitHub: <a href='https://github.com/imxandx' target='_blank' rel='noreferrer'>github.com/imxandx</a>, onde compartilha seus mais de 200 projetos concluídos."
      },
      {
          question: "Qual é a tabela de preços do Alexandre?",
          answer: "• <b>Landing-Pages:</b> R$800 a R$1.200<br>• <b>Mini-sites:</b> R$1.300 a R$2.000<br>• <b>Portfolios:</b> R$1.200 a R$3.000<br>• <b>Comerciais/Institucionais:</b> R$3.200 a R$7.000<br>• <b>Empresas/Corporações:</b> R$10.000 a R$15.000"
      },
      {
          question: "Alexandre faz alguma faculdade ou tem alguma formação acadêmica?",
          answer: "Ele está cursando Ensino Superior em Inteligência Artificial e Machine Learning na Uniasselvi, com data prevista de conclusão em 2027."
      }
  ];

  // função para abrir o chat
  chatButton.addEventListener('click', function() {
      chatContainer.style.display = 'flex';
      
      // se o chat estiver vazio, iniciar com a mensagem de boas-vindas
      if (chatBody.childElementCount === 0) {
          addBotMessage("Olá! Como posso ajudar você hoje?");
          showOptions();
      }
  });

  // função para fechar o chat
  closeChat.addEventListener('click', function() {
      chatContainer.style.display = 'none';
  });

  // adicionar mensagem do bot
  function addBotMessage(text) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message bot-message';
      messageDiv.innerHTML = text;
      chatBody.appendChild(messageDiv);
      scrollToBottom();
  }

  // adicionar mensagem do usuário
  function addUserMessage(text) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message user-message';
      messageDiv.textContent = text;
      chatBody.appendChild(messageDiv);
      scrollToBottom();
  }

  // mostrar opções de perguntas
  function showOptions() {
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'options-container';
      
      questionsAndAnswers.forEach(qa => {
          const optionButton = document.createElement('button');
          optionButton.className = 'option-button';
          optionButton.textContent = qa.question;
          
          optionButton.addEventListener('click', function() {
              // remover as opções após clicar
              optionsContainer.remove();
              
              // adicionar a pergunta como mensagem do usuário
              addUserMessage(qa.question);
              
              // simular um pequeno delay para parecer mais natural
              setTimeout(() => {
                  // adicionar a resposta como mensagem do bot
                  addBotMessage(qa.answer);
                  
                  // perguntar se o usuário tem mais perguntas
                  setTimeout(() => {
                      addBotMessage("Posso ajudar com mais alguma coisa?");
                      showOptions();
                  }, 1200);
              }, 600);
          });
          
          optionsContainer.appendChild(optionButton);
      });
      
      chatBody.appendChild(optionsContainer);
      scrollToBottom();
  }

  // função para rolar para o final do chat
  function scrollToBottom() {
      chatBody.scrollTop = chatBody.scrollHeight;
  }
};

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