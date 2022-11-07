if (localStorage.getItem("MeusQuizzes") == null) {
  localStorage.setItem("MeusQuizzes", "");
}

const urlFilter = /^https:\/\//i;
const colorFilter = /^#/i;
let quantPerguntas;
let quantNiveis;
let quiz = { title: "", image: "", questions: [], levels: [] };
let flag;
let testaPCT = [];
let passaQuizz;
document.querySelector(".container__voltar").style.display = "none";
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
function contrairPergunta(pergunta) {
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
            <img src="./img/Vector.svg" onclick="contrairPergunta(this)"/>
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
function testaPerguntas() {
  let alerta = true;
  for (i = 1; i <= quantPerguntas; i++) {
    const listaPergunta = document
      .getElementById(`x${i}`)
      .querySelectorAll(".criar-quizz__input");
    testaCor(listaPergunta[1].value);
    if (alerta) {
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
    if (alerta) {
      quiz.questions.push({
        title: listaPergunta[0].value,
        color: listaPergunta[1].value,
        answers: [
          {
            text: listaPergunta[2].value,
            image: listaPergunta[3].value,
            isCorrectAnswer: true,
          },
          {
            text: listaPergunta[4].value,
            image: listaPergunta[5].value,
            isCorrectAnswer: false,
          },
        ],
      });
      if (listaPergunta[6].value != "") {
        quiz.questions[i - 1].answers.push({
          text: listaPergunta[6].value,
          image: listaPergunta[7].value,
          isCorrectAnswer: false,
        });
      }
      if (listaPergunta[8].value != "") {
        quiz.questions[i - 1].answers.push({
          text: listaPergunta[8].value,
          image: listaPergunta[9].value,
          isCorrectAnswer: false,
        });
      }
    }
  }
  if (alerta === false) {
    alert("preencha as perguntas corretamente");
    quiz.questions = [];
  } else {
    document.querySelector(".criar-quizz__perguntas").classList.add("esconder");
    document.querySelector(".container__proximo").innerHTML = "Finalizar Quizz";
    document.querySelector(".criar-quizz__niveis").classList.remove("esconder");
    document
      .querySelector(".container__proximo")
      .setAttribute("onclick", "testaNiveis()");
    adicionaNiveis();
  }
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
function contrairNiveis(pergunta) {
  const node = document.querySelectorAll(".criar-quizz__niveis__info");
  for (let i = 0; i < node.length; i++) {
    node[i].classList.add("contraido");
  }
  pergunta.parentElement.parentElement.classList.remove("contraido");
}
function adicionaNiveis() {
  const seg_nivel = document.querySelector(".criar-quizz__niveis");
  for (let i = 1; i <= quantNiveis; i++) {
    seg_nivel.innerHTML += `
    <div id="a${i}" class="criar-quizz__niveis__info contraido">
    <div>
      <span>Nível ${i}</span>
      <img src="./img/Vector.svg" onclick="contrairNiveis(this)"/>
    </div>
    <input
      class="criar-quizz__input"
      type="text"
      placeholder="Título do nível"
      minLength="10"
    />
    <input
      class="criar-quizz__input"
      type="number"
      placeholder="% de acerto mínima"
      min="0"
      max="100"
    />
    <input
      class="criar-quizz__input"
      type="url"
      placeholder="URL da imagem do nível"
    />
    <input
      class="criar-quizz__input"
      type="text"
      placeholder="Descrição do nível"
      minLength="30"
    />
    </div>
    `;
  }
  document
    .querySelector(".criar-quizz__niveis__info")
    .classList.remove("contraido");
}
function testaNiveis() {
  let verifica = true;
  let porcentagemMin = 100;
  for (let i = 1; i <= quantNiveis; i++) {
    const listaNiveis = document
      .getElementById(`a${i}`)
      .querySelectorAll(".criar-quizz__input");

    if (listaNiveis[0].value.length < listaNiveis[0].minLength) {
      verifica = false;
    }
    if (
      !(
        Number(listaNiveis[1].value) >= listaNiveis[1].min &&
        Number(listaNiveis[1].value) <= listaNiveis[1].max
      )
    ) {
      verifica = false;
    }
    if (urlFilter.test(listaNiveis[2].value) != true) {
      verifica = false;
    }
    if (listaNiveis[3].value.length < listaNiveis[3].minLength) {
      verifica = false;
    }
    testaPCT.push(listaNiveis[1].value);
    if (verifica) {
      if (Number(listaNiveis[1].value) < porcentagemMin)
        porcentagemMin = Number(listaNiveis[1].value);
      quiz.levels.push({
        title: listaNiveis[0].value,
        image: listaNiveis[2].value,
        text: listaNiveis[3].value,
        minValue: listaNiveis[1].value,
      });
    }
  }
  for (let i = 0; i < testaPCT.length; i++) {
    for (let j = 0; j < testaPCT.length; j++) {
      if (j != i) {
        if (testaPCT[i] == testaPCT[j]) {
          verifica = false;
        }
      }
    }
  }
  if (porcentagemMin !== 0) {
    verifica = false;
  }

  if (verifica) {
    const promisse = axios.post(
      "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
      quiz
    );
    promisse.then(vaiProFinal);
    promisse.catch(function () {
      alert("erro em postar o quizz");
    });
  } else {
    alert("preencha os dados dos niveis corretamente");
    quiz.levels = [];
    testaPCT = [];
  }
}
function vaiProFinal(resposta) {
  adicionaFinal(resposta.data);
  document.querySelector(".criar-quizz__niveis").classList.add("esconder");
  document.querySelector(".container__proximo").innerHTML = "Acessar Quizz";
  document.querySelector(".criar-quiz__fim").classList.remove("esconder");
  document.querySelector(".container__voltar").style.display = "flex";
  document
    .querySelector(".container__proximo")
    .setAttribute("onclick", "abrirQuizz()");
}
function adicionaFinal(resposta) {
  passaQuizz = resposta;
  document.querySelector(".criar-quiz__fim").innerHTML = `
  <h2 class="subtitulo-final">Seu quizz está pronto!</h2>
  <div class="quizz-final" data-id="${resposta.id}">
  <img src="${resposta.image}" alt="gato"  />
  <span onclick="abrirQuizz()"
  >${resposta.title}</span
  >
  </div>
  `;
  let minhaQuizz = JSON.stringify(resposta) + ",";
  minhaQuizz += localStorage.getItem("MeusQuizzes");
  localStorage.setItem("MeusQuizzes", minhaQuizz);
}
function abrirQuizz() {
  let quizzSelecionado = passaQuizz;
  quizzSelecionado = JSON.stringify(quizzSelecionado);

  localStorage.setItem("quizzSelecionado", quizzSelecionado);

  window.open("./quizz.html", "_self");
}
