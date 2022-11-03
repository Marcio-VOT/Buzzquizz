const urlFilter = /^https:\/\//i;
const colorFilter = /^#/i;
let quantPerguntas;
let quantNiveis;
let quiz = { title: "", image: "", questions: [] };

function testaCriar() {
  const titulo = document.querySelector(
    ".criar-quizz__comeco__info :nth-child(1)"
  );
  const url = document.querySelector(
    ".criar-quizz__comeco__info :nth-child(2)"
  );
  const nPerguntas = document.querySelector(
    ".criar-quizz__comeco__info :nth-child(3)"
  );
  const nNiveis = document.querySelector(
    ".criar-quizz__comeco__info :nth-child(4)"
  );
  let alerta = "";
  if (
    titulo.value.length < titulo.minLength ||
    titulo.value.length > titulo.maxLength
  ) {
    alerta += `
        titulo pequeno, tamanho minimo de 20 letras`;
  }
  if (urlFilter.test(url.value) != true) {
    alerta += `
       Não é uma URL, insira uma URL válida`;
  }
  if (nPerguntas.value < nPerguntas.min) {
    alerta += `
        numero de perguntas pequeno, tamanho minimo de 3 perguntas`;
  }
  if (nNiveis.value < nNiveis.min) {
    alerta += `
        quantidade de niveis pequeno, tamanho minimo de 2 niveis`;
  }
  if (alerta != "") {
    alert(alerta);
    alerta = "";
  } else {
    quantNiveis = nNiveis.value;
    quantPerguntas = nPerguntas.value;
    quiz.title = titulo.value;
    quiz.image = url.value;
    document.querySelector(".criar-quizz__comeco").classList.add("esconder");
    document.querySelector(".container__proximo").innerHTML =
      "Prosseguir para criar níveis";
    document
      .querySelector(".container__proximo")
      .setAttribute("onclick", "testaPerguntas()");
    document
      .querySelector(".criar-quizz__perguntas")
      .classList.remove("esconder");
    adicionaPerguntas();
  }
}
function contrair(pergunta) {
  const node = document.querySelectorAll(".criar-quizz__perguntas__info");
  for (let i = 0; i < node.length; i++) {
    node[i].classList.add("contraido");
  }
  pergunta.parentElement.parentElement.classList.remove("contraido");
}

function adicionaPerguntas() {
  const perguntas = document.querySelector(".criar-quizz__perguntas");
  for (i = 1; i <= quantPerguntas; i++) {
    perguntas.innerHTML += `
        <div id="x${i}" class="criar-quizz__perguntas__info contraido">
        <div>
            <span>Pergunta ${i}</span>
            <img src="./img/Vector.svg" onclick="contrair(this)"/>
        </div>
            <input class="criar-quizz__input" type="text" minLength="20" placeholder="Texto da pergunta"/>
            <input class="criar-quizz__input" type="text" maxLength="7" placeholder="Cor de fundo da pergunta"/>
        
        <span>Resposta correta</span>
            <input class="criar-quizz__input" type="text" placeholder="Resposta correta"/>
            <input class="criar-quizz__input" type="url" placeholder="URL da imagem"/>
        
        <span>Respostas incorretas</span>
        <div>
            <input class="criar-quizz__input" type="text" placeholder="Resposta incorreta 1"/>
            <input class="criar-quizz__input" type="url" placeholder="URL da imagem 1"/>    
        </div>
        
        <div>
            <input class="criar-quizz__input" type="text" placeholder="Resposta incorreta 2"/>
            <input class="criar-quizz__input" type="url" placeholder="URL da imagem 2"/>
        </div>
        
        <div>
            <input class="criar-quizz__input" type="text" placeholder="Resposta incorreta 3"/>
            <input class="criar-quizz__input" type="url" placeholder="URL da imagem 3"/>
        </div>
        </div>
        `;
  }
  document
    .querySelector(".criar-quizz__perguntas__info")
    .classList.remove("contraido");
}
let flag;
function testaPerguntas() {
  let alerta = true;
  for (i = 1; i <= quantPerguntas; i++) {
    const listaPergunta = document
      .getElementById(`x${i}`)
      .querySelectorAll(".criar-quizz__input");
    testaCor(listaPergunta[1].value);
    if (alerta === true) {
      alerta = flag;
    }
    if (listaPergunta[0].value.length < listaPergunta[0].minLength) {
      alerta = false;
    }
    if (listaPergunta[1].value.length != listaPergunta[1].maxLength) {
      alerta = false;
    }
    if (listaPergunta[2].value == "") {
      alerta = false;
    }
    if (urlFilter.test(listaPergunta[3].value) != true) {
      alerta = false;
    }
    if (listaPergunta[4].value == "") {
      alerta = false;
    }
    if (urlFilter.test(listaPergunta[5].value) != true) {
      alerta = false;
    }
    if (
      (listaPergunta[6].value == "" && listaPergunta[7].value != "") ||
      (listaPergunta[6].value != "" && listaPergunta[7].value == "")
    ) {
      alerta = false;
    }
    if (
      (listaPergunta[8].value == "" && listaPergunta[9].value != "") ||
      (listaPergunta[8].value != "" && listaPergunta[9].value == "")
    ) {
      alerta = false;
    }
    if (
      listaPergunta[6].value != "" &&
      listaPergunta[7].value != "" &&
      urlFilter.test(listaPergunta[7].value) != true
    ) {
      alerta = false;
    }
    if (
      listaPergunta[8].value != "" &&
      listaPergunta[9].value != "" &&
      urlFilter.test(listaPergunta[9].value) != true
    ) {
      alerta = false;
    }
  }
  if (alerta === false) alert("preencha as perguntas corretamente");
  else alert("deu tudo certo, vai dormir");
}

function testaCor(valor) {
  flag = true;

  if (valor.length != 7) {
    flag = false;
    console.log(valor.length + "erro cor 1");
  }
  if (!/[#]/gi.test(valor[0])) {
    flag = false;
    console.log(valor[0] + "erro cor 2");
  }
  for (let i = 1; i < valor.length; i++) {
    if (!/[0123456789]/gi.test(valor[i])) {
      if (!/[abcdef]/gi.test(valor[i])) {
        flag = false;
      }
    }
  }
}
//  /[abcdef]/gi
//const urlSelector = document.querySelectorAll(".criar-quizz__input#url")
