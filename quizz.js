
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
    console.log(quizzSelecionado);
}

function carregaQuizz() {
    const cabecalhoImg = document.querySelector('[data-cabecalho="imagem"]');
    const cabecalhoTitulo = document.querySelector('[data-cabecalho="titulo"]');

    cabecalhoImg.setAttribute("src", quizzSelecionado.image);
    cabecalhoTitulo.innerHTML = quizzSelecionado.title;

    carregaPerguntas();
}

function carregaPerguntas() {
    const perguntas = quizzSelecionado.questions;

    const containerQuizz = document.querySelector(".container-perguntas");

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
        
        console.log(respostas.length);
        for (let j = 0; j < respostas.length; j++) {
            const respostaAlternativa = document.createElement("div");
            respostaAlternativa.classList.add("resposta");
            respostaAlternativa.addEventListener("click", verificaResposta);
            const respostaImagem = document.createElement("img");
            respostaImagem.setAttribute("data-resposta","imagem-resposta");
            const respostaTexto = document.createElement("span");

            respostaAlternativa.setAttribute("data-valor", `${respostas[j].isCorrectAnswer}`);
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

function embaralharRespostas(respostas){

    respostas.sort(comparador);

    return respostas;

}

function comparador() { 
    return Math.random() - 0.5; 
}

function verificaResposta(elemento){
    const respostaSelecionada = elemento.currentTarget;
    const containerRespostas = respostaSelecionada.parentNode;
    const todasRespostas = containerRespostas.childNodes;

    for (let i = 0; i < todasRespostas.length; i++) {

        todasRespostas[i].getAttribute("data-valor") !== "true"? todasRespostas[i].classList.add("errado") : todasRespostas[i].classList.add("certo");
        
        if (todasRespostas[i] !== respostaSelecionada) {
            todasRespostas[i].classList.add("esbranquicar");
        }

        todasRespostas[i].style.pointerEvents = "none";
        
    }
    console.log(todasRespostas);
}

function proximaPergunta(perguntaAtual){
    const containerPerguntas = document.querySelector(".container-perguntas");
    const perguntas = containerPerguntas.childNodes;

    for (let i = 0; i < perguntas.length; i++) {
        const index = perguntas.Inde
        
    }
}