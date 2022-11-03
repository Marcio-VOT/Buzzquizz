
const promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promisse.then(adicionaQuizz);
promisse.catch(function (){alert("erro")});


function adicionaQuizz(resultadoAPI){
    const array = resultadoAPI.data;
    const quizzLista = document.querySelector(".quizzes__lista");
    quizzLista.innerHTML = "";

    for(let i = 0; i < array.length; i++){
        quizzLista.innerHTML +=`
        <div class="quizz x${array[i].id}">
        <img src="${array[i].image}" alt="gato"/>
        <span>${array[i].title}</span>
        </div>
        `
        console.log("a")
    }
}
