// pegando quizzes do usuario
let seguraQuizzesUsuario = [];
let seguraIdUsuario = [];
if (localStorage.getItem("MeusQuizzes") == null) {
  localStorage.setItem("MeusQuizzes", "");
} else {
  seguraQuizzesUsuario = localStorage.getItem("MeusQuizzes");
  seguraQuizzesUsuario = seguraQuizzesUsuario.substring(
    0,
    seguraQuizzesUsuario.length - 1
  );
  seguraQuizzesUsuario = "[" + seguraQuizzesUsuario + "]";
  seguraQuizzesUsuario = JSON.parse(seguraQuizzesUsuario);
  for (let i = 0; i < seguraQuizzesUsuario.length; i++) {
    seguraIdUsuario.push(seguraQuizzesUsuario[i].id);
  }
}
const promisse = axios.get(
  "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
);
promisse.then(adicionaQuizz);
promisse.catch(function () {
  alert("erro");
});

let listaQuizzes = [];

function adicionaQuizz(resultadoAPI) {
  const array = resultadoAPI.data;
  const quizzLista = document.querySelector(".quizzes__lista");
  quizzLista.innerHTML = "";
  let quizzesMeusQuizzes = document.querySelector(".quizzes__meus-quizzes");
  quizzesMeusQuizzes.innerHTML = `
  <div>
  <h2>Seus Quizzes</h2>
  <a href="./CriarQuizz.html"><button class="quizzes__btn-criar"><img src="./img/mais.svg"/></button></a>
</div>
<div class="quizzes__lista-usuario">

</div>`;
  if (localStorage.getItem("MeusQuizzes") != "") {
    quizzesMeusQuizzes.classList.remove("esconder");
    document.querySelector(".container__criar-quizz").classList.add("esconder");
    quizzesMeusQuizzes = document.querySelector(".quizzes__lista-usuario");
    for (let i = 0; i < seguraQuizzesUsuario.length; i++) {
      quizzesMeusQuizzes.innerHTML += `
        <div class="quizz" id="${i}" data-id="${seguraQuizzesUsuario[i].id}" onclick="abrirQuizzPessoal(this)">
        <img src="${seguraQuizzesUsuario[i].image}" alt="gato"/>
        <span>${seguraQuizzesUsuario[i].title}</span>
        </div>
        `;
    }
  }

  for (let i = 0; i < array.length; i++) {
    if (!RegExp(array[i].id).test(seguraIdUsuario)) {
      quizzLista.innerHTML += `
      <div class="quizz" data-id="${array[i].id}" onclick="abrirQuizz(this)">
      <img src="${array[i].image}" alt="gato"/>
      <span>${array[i].title}</span>
      </div>
      `;
      listaQuizzes.push(array[i]);
    }
  }
}

function abrirQuizz(quizz) {
  let quizzSelecionado = listaQuizzes.find(
    (item) => item.id === Number(quizz.getAttribute("data-id"))
  );
  quizzSelecionado = JSON.stringify(quizzSelecionado);

  localStorage.setItem("quizzSelecionado", quizzSelecionado);

  window.open("./quizz.html", "_self");
}
function abrirQuizzPessoal(quizz) {
  let quizzSelecionado = seguraQuizzesUsuario[quizz.id];
  quizzSelecionado = JSON.stringify(quizzSelecionado);
  localStorage.setItem("quizzSelecionado", quizzSelecionado);
  window.open("./quizz.html", "_self");
}
