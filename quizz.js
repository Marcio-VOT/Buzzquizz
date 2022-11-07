let quizzSelecionado;

selecionaQuizz();
carregaQuizz();

function selecionaQuizz() {
  quizzSelecionado = localStorage.getItem("quizzSelecionado");

  if (quizzSelecionado === "" || quizzSelecionado === null) {
    alert("Desculpe, não conseguimos achar seu quizz!");
    window.open("./index.html", "_self");
  }

  quizzSelecionado = JSON.parse(quizzSelecionado);
}

function carregaQuizz() {
  const cabecalhoImg = document.querySelector('[data-cabecalho="imagem"]');
  const cabecalhoTitulo = document.querySelector('[data-cabecalho="titulo"]');

  cabecalhoImg.setAttribute("src", quizzSelecionado.image);
  cabecalhoTitulo.innerHTML = quizzSelecionado.title;
  document
    .querySelector(".container__proximo")
    .addEventListener("click", recarregarQuizz);
  carregaPerguntas();
}

function carregaPerguntas() {
  const perguntas = quizzSelecionado.questions;

  const containerQuizz = document.querySelector(".container-perguntas");
  containerQuizz.innerHTML = "";

  for (let i = 0; i < perguntas.length; i++) {
    const quizzPergunta = document.createElement("section");
    quizzPergunta.classList.add("quizz-pergunta");
    const containerTitulo = document.createElement("div");
    containerTitulo.classList.add("quizz-pergunta__titulo");
    containerTitulo.style.backgroundColor = perguntas[i].color;
    const tituloPergunta = document.createElement("h3");
    tituloPergunta.setAttribute("data-pergunta", "titulo-pergunta");
    tituloPergunta.innerHTML = perguntas[i].title;

    const containerRespostas = document.createElement("div");
    containerRespostas.classList.add("quizz-pergunta__respostas");

    const respostas = embaralharRespostas(perguntas[i].answers);

    for (let j = 0; j < respostas.length; j++) {
      const respostaAlternativa = document.createElement("div");
      respostaAlternativa.classList.add("resposta");
      respostaAlternativa.addEventListener("click", verificaResposta);
      const respostaImagem = document.createElement("img");
      respostaImagem.setAttribute("data-resposta", "imagem-resposta");
      const respostaTexto = document.createElement("span");

      respostaAlternativa.setAttribute(
        "data-valor",
        `${respostas[j].isCorrectAnswer}`
      );
      respostaImagem.src = respostas[j].image;
      respostaTexto.innerHTML = respostas[j].text;

      respostaAlternativa.appendChild(respostaImagem);
      respostaAlternativa.appendChild(respostaTexto);
      containerRespostas.appendChild(respostaAlternativa);
    }

    containerTitulo.appendChild(tituloPergunta);

    quizzPergunta.appendChild(containerTitulo);
    quizzPergunta.appendChild(containerRespostas);

    containerQuizz.appendChild(quizzPergunta);
  }
}

function embaralharRespostas(respostas) {
  respostas.sort(comparador);

  return respostas;
}

function comparador() {
  return Math.random() - 0.5;
}

function verificaResposta(elemento) {
  const respostaSelecionada = elemento.currentTarget;
  const containerRespostas = respostaSelecionada.parentNode;
  const todasRespostas = containerRespostas.childNodes;

  for (let i = 0; i < todasRespostas.length; i++) {
    todasRespostas[i].getAttribute("data-valor") !== "true"
      ? todasRespostas[i].classList.add("errado")
      : todasRespostas[i].classList.add("certo");

    if (todasRespostas[i] !== respostaSelecionada) {
      todasRespostas[i].classList.add("esbranquicar");
    }

    todasRespostas[i].style.pointerEvents = "none";
  }

  proximaPergunta(containerRespostas.parentNode);
}

function proximaPergunta(perguntaAtual) {
  const containerPerguntas = document.querySelector(".container-perguntas");
  const perguntas = [...containerPerguntas.children];

  for (let i = 0; i < perguntas.length - 1; i++) {
    if (perguntas[i] === perguntaAtual) {
      setTimeout(() => {
        perguntas[i + 1].scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }, 2000);
    }
  }

  const numAcertos = document.querySelectorAll(".certo").length;

  if (perguntas.length === numAcertos) {
    setTimeout(() => {
      mostrarResultado();
    }, 2000);
  }
}

function mostrarResultado() {
  //   const resultadoTitulo = containerResultado.querySelector("div");
  //   const resultadoResposta = document.querySelector(
  //     ".quizz-pergunta__respostas-final"
  //   );

  //   let tituloResultado = resultadoTitulo.querySelector("h3");
  //   tituloResultado.innerHTML = titulo;

  //   let imagemResultado = resultadoResposta.querySelector("img");
  //   let textoResultado = resultadoResposta.querySelector("span");
  //   imagemResultado.src = imagem;
  //   textoResultado.innerHTML = descricao;
  const containerResultado = document.querySelector(".quizz-pergunta-final");
  let acerto = verificaCerto();
  let maiorAcerto = -1;
  for (let i = 0; i < quizzSelecionado.levels.length; i++) {
    if (
      acerto >= quizzSelecionado.levels[i].minValue &&
      quizzSelecionado.levels[i].minValue > maiorAcerto
    ) {
      containerResultado.innerHTML = `
    <div class="quizz-pergunta__titulo">
        <h3>${acerto}% de acerto: ${quizzSelecionado.levels[i].title}</h3>
    </div>

    <div class="quizz-pergunta__respostas-final">
        <img src="${quizzSelecionado.levels[i].image}" class="quizz-pergunta__img-final"/>
        <span class="quizz-pergunta__texto-final">${quizzSelecionado.levels[i].text}</span>
    </div>
    `;
    }
  }
  containerResultado.classList.remove("esconder");

  //Mostrar Botões
  document.querySelector(".container__proximo").classList.remove("esconder");
  document.querySelector(".container__voltar").classList.remove("esconder");

  //Scrollar para a seção resultado
  containerResultado.scrollIntoView({ block: "start", behavior: "smooth" });
}

function recarregarQuizz() {
  //Reset respostas
  const respostas = [...document.querySelectorAll(".resposta")];

  respostas.forEach((resp) => {
    resp.classList.remove("esbranquicar");
    resp.classList.remove("certo");
    resp.classList.remove("errado");

    resp.style.pointerEvents = "auto";
  });
  carregaPerguntas();

  //Scrollar para o topo
  window.scrollTo(0, 0);

  //Esconde Resultado
  const containerResultado = document.querySelector(".quizz-pergunta-final");
  containerResultado.classList.add("esconder");

  //Esconde Botões
  document.querySelector(".container__proximo").classList.add("esconder");
  document.querySelector(".container__voltar").classList.add("esconder");
}
function verificaCerto() {
  let total = quizzSelecionado.questions.length;
  let acertos = total - document.querySelectorAll(".esbranquicar.certo").length;
  acertos = Math.floor((acertos * 100) / total);
  return acertos;
}
