var engine = {
    "cores": ['green', 'purple', 'red', 'blue', 'yellow', 'orange', 'pink', 'grey', 'white', 'black'],
    "hexadecimais": {
        'green': '#36C925',
        'purple':'#AE25C9',
        'red': '#FF0000',
        'blue': '#0080FF',
        'yellow': '#FFFF00',
        'orange': '#FF5500',
        'pink': '#FF45CC',
        'grey': '#9B9B9B',
        'white': '#FFFFFF',
        'black': '#000000',
    },
    "moedas": 0,
}

const audioMoeda = new Audio('./assets/audio/certo2.mp3');
const audioErrou = new Audio('./assets/audio/explosion.mp3');
var respostaCorreta = "";

function sortearCor() {
    var indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
    var legendaCorDaCaixa = document.getElementById('cor-na-caixa');
    var nomeCorSorteada = engine.cores[indexCorSorteada];
    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();
    return engine.hexadecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor) {
    var caixaDasCores = document.getElementById('cor-atual');
    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage = "url('./assets/img/planet.png')";
    caixaDasCores.style.backgroundSize = '100%';
}

function atualizaPontuacao(valor) {
    var pontuacao = document.getElementById('pontuacao-atual');
    engine.moedas += valor;

    if (valor < 0) {
        audioErrou.play();
    } else {
        audioMoeda.play();
    }
        
    pontuacao.innerText = engine.moedas;

}

aplicarCorNaCaixa(sortearCor());

//API DE RECONHECIMENTO DE VOZ

var btnGravador = document.getElementById('btn-responder');
var transcricaoAudio = "";

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();

    gravador.continuos = false;
    gravador.lang = "eng-US";


    gravador.onstart = function () {
        btnGravador.innerText = "Estou ouvindo";

        btnGravador.style.backgroundColor = '#FFF';
        btnGravador.style.color = 'black';
    }

    gravador.onend = function () {
        btnGravador.innerText = "Responder";

        btnGravador.style.backgroundColor = 'transparent';
        btnGravador.style.color = 'white';
    }

    gravador.onresult = function(event){
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

        if (transcricaoAudio === respostaCorreta) {
            atualizaPontuacao(1);
        } else {
            atualizaPontuacao(-1);
        }

        console.log(transcricaoAudio);

        aplicarCorNaCaixa(sortearCor());
    }

} else {
    alert('Não tem suporte');
}

btnGravador.addEventListener('click', function (e){
    gravador.start();
})