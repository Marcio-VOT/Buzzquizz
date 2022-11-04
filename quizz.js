
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
}