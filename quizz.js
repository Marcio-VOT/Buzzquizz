
const cabecalhoImg = document.querySelector('[data-img="cabecalho"]');

let quizzSelecionado;

selecionaQuizz();

function selecionaQuizz() {
    quizzSelecionado = localStorage.getItem("quizzSelecionado");

    if (quizzSelecionado === "" || quizzSelecionado === null) {
        alert("Desculpe, não conseguimos achar seu quizz!");
        window.open("./index.html", "_self");
    }

    quizzSelecionado = JSON.parse(quizzSelecionado);
}