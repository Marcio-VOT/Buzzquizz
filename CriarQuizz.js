let quantPerguntas
let quantNiveis
let quiz = {title:"", image:"", questions:[]}

function testaCriar(){
    const titulo = document.querySelector(".criar-quizz__comeco__info :nth-child(1)");
    const url = document.querySelector(".criar-quizz__comeco__info :nth-child(2)");
    const nPerguntas = document.querySelector(".criar-quizz__comeco__info :nth-child(3)");
    const nNiveis = document.querySelector(".criar-quizz__comeco__info :nth-child(4)");
    let alerta =""
    var re = /^https:\/\//i
    if(titulo.value.length < titulo.minLength || titulo.value.length > titulo.maxLength){
        alerta += `
        titulo pequeno, tamanho minimo de 20 letras`
    }
    if(re.test(url.value) != true){
       alerta += `
       Não é uma URL, insira uma URL válida`
    }
    if(nPerguntas.value < nPerguntas.min){
        alerta += `
        numero de perguntas pequeno, tamanho minimo de 3 perguntas`
    }
    if(nNiveis.value < nNiveis.min){
        alerta += `
        quantidade de niveis pequeno, tamanho minimo de 2 niveis`
    }
    if(alerta != ""){
        alert(alerta);
        alerta = "";
    }
    else{
        quantNiveis = nNiveis.value
        quantPerguntas = nPerguntas.value
        quiz.title = titulo.value;
        quiz.image = url.value
        document.querySelector(".criar-quizz__comeco").classList.add("esconder");
        document.querySelector(".container__proximo").innerHTML = "Prosseguir para criar níveis"
        document.querySelector(".criar-quizz__perguntas").classList.remove("esconder");
    }
}