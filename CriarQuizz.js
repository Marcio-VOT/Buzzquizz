const re = /^https:\/\//i
let quantPerguntas
let quantNiveis
let quiz = {title:"", image:"", questions:[]}

function testaCriar(){
    const titulo = document.querySelector(".criar-quizz__comeco__info :nth-child(1)");
    const url = document.querySelector(".criar-quizz__comeco__info :nth-child(2)");
    const nPerguntas = document.querySelector(".criar-quizz__comeco__info :nth-child(3)");
    const nNiveis = document.querySelector(".criar-quizz__comeco__info :nth-child(4)");
    let alerta =""
    const re = /^https:\/\//i
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
        adicionaPerguntas();
        
    }
}
function contrair(pergunta){
    const node = document.querySelectorAll(".criar-quizz__perguntas__info")
    for(let i = 0; i < node.length; i++){
        node[i].classList.add("contraido");
    }
    pergunta.parentElement.parentElement.classList.remove("contraido");

}

function adicionaPerguntas(){
    const perguntas = document.querySelector(".criar-quizz__perguntas")
    for(i=1; i < quantPerguntas; i++){
        perguntas.innerHTML += `
        <div id="x${i+1}" class="criar-quizz__perguntas__info contraido">
        <div>
            <span>Pergunta ${i+1}</span>
            <img src="./img/Vector.svg" onclick="contrair(this)"/>
        </div>
        <input class="criar-quizz__input" type="text" placeholder="Texto da pergunta"/>
        <input class="criar-quizz__input" type="text" placeholder="Cor de fundo da pergunta"/>
        
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
        `
        
    }
}

/*`
<div class="criar-quizz__perguntas__info contraido">
<div>
    <span>Pergunta ${i}</span>
    <img src="./img/Vector.svg" onclick="contrair(this)"/>
</div>
<input class="criar-quizz__input" type="text" placeholder="Texto da pergunta"/>
<input class="criar-quizz__input" type="text" placeholder="Cor de fundo da pergunta"/>

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
</div>`
*/

//const urlFilter = document.querySelectorAll(".criar-quizz__input#url")