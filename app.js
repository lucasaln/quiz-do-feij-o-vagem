// O Banco de Dados do Quiz (Um Array cheio de Objetos)
const perguntas = [
    {
        pergunta: "Qual é a necessidade de luz solar do feijão-vagem?",
        respostas: [
            { texto: "Meia-sombra (2h de sol por dia)", correta: false },
            { texto: "Sol pleno (pelo menos 4 a 6 horas por dia)", correta: true },
            { texto: "Sombra total (não gosta de sol direto)", correta: false },
            { texto: "Apenas luz artificial de LED", correta: false }
        ]
    },
    {
        pergunta: "Como deve ser feita a rega dessa planta?",
        respostas: [
            { texto: "Encharcar a terra todos os dias", correta: false },
            { texto: "Regar apenas 1 vez por mês", correta: false },
            { texto: "Manter o solo úmido, mas sem encharcar", correta: true },
            { texto: "Só regar quando a terra estiver rachando de seca", correta: false }
        ]
    },
    {
        pergunta: "O que a maioria das espécies de feijão-vagem precisa para crescer bem?",
        respostas: [
            { texto: "Ficar deitada no chão como rasteira", correta: false },
            { texto: "Ser plantada em vasos minúsculos", correta: false },
            { texto: "Ficar na geladeira antes de germinar", correta: false },
            { texto: "Tutoramento (suportes, estacas ou treliças para enrolar)", correta: true }
        ]
    },
    {
        pergunta: "Qual é o solo ideal para plantar feijão-vagem?",
        respostas: [
            { texto: "Terra de construção", correta: false },
            { texto: "Solo leve, bem drenado e rico em matéria orgânica", correta: true },
            { texto: "Areia pura de praia", correta: false },
            { texto: "Barro denso que acumula água", correta: false }
        ]
    },
    {
        pergunta: "Quando é a hora certa de colher a vagem?",
        respostas: [
            { texto: "Quando os grãos dentro estiverem enormes e saltando", correta: false },
            { texto: "Quando a vagem ficar marrom e seca", correta: false },
            { texto: "Quando a vagem estiver firme, quebradiça (fazendo 'croc') e com os grãos internos ainda pequenos", correta: true },
            { texto: "Exatamente 1 ano após o plantio", correta: false }
        ]
    }
];

// Selecionando os elementos do HTML
const elementoPergunta = document.getElementById('pergunta');
const elementoBotoes = document.getElementById('opcoes');
const btnProximo = document.getElementById('btn-proximo');
const textoProgresso = document.getElementById('progresso');
const telaQuiz = document.getElementById('quiz-screen');
const telaResultado = document.getElementById('resultado-screen');
const textoPontuacao = document.getElementById('pontuacao-texto');
const btnReiniciar = document.getElementById('btn-reiniciar');

let indicePerguntaAtual = 0;
let pontuacao = 0;

// Função para iniciar ou reiniciar o jogo
function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontuacao = 0;
    btnProximo.classList.add('escondido');
    telaResultado.classList.add('escondido');
    telaQuiz.classList.remove('escondido');
    mostrarPergunta();
}

// Função para colocar a pergunta na tela
function mostrarPergunta() {
    resetarEstado();
    let perguntaAtual = perguntas[indicePerguntaAtual];
    
    // Atualiza o texto da pergunta e progresso
    elementoPergunta.innerText = perguntaAtual.pergunta;
    textoProgresso.innerText = `Pergunta ${indicePerguntaAtual + 1} de ${perguntas.length}`;

    // Cria os botões para cada resposta possível
    perguntaAtual.respostas.forEach(resposta => {
        const botao = document.createElement('button');
        botao.innerText = resposta.texto;
        botao.classList.add('btn-resposta');
        
        // Se essa for a resposta correta, guardamos essa info no botão
        if (resposta.correta) {
            botao.dataset.correta = resposta.correta;
        }
        
        botao.addEventListener('click', selecionarResposta);
        elementoBotoes.appendChild(botao);
    });
}

// Limpa os botões antigos antes de mostrar a nova pergunta
function resetarEstado() {
    btnProximo.classList.add('escondido');
    while (elementoBotoes.firstChild) {
        elementoBotoes.removeChild(elementoBotoes.firstChild);
    }
}

// O que acontece quando o usuário clica em uma resposta
function selecionarResposta(evento) {
    const botaoClicado = evento.target;
    const estaCorreta = botaoClicado.dataset.correta === "true";
    
    if (estaCorreta) {
        pontuacao++;
        botaoClicado.classList.add("correto");
    } else {
        botaoClicado.classList.add("errado");
    }

    // Pinta todos os botões (mostra a certa em verde e errada em vermelho) e bloqueia o clique
    Array.from(elementoBotoes.children).forEach(botao => {
        if (botao.dataset.correta === "true") {
            botao.classList.add("correto");
        }
        botao.disabled = true; // Impede que a pessoa clique duas vezes
    });

    btnProximo.classList.remove('escondido'); // Mostra o botão de ir para a próxima
}

// Evento de clicar em "Próximo"
btnProximo.addEventListener('click', () => {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// Função para mostrar a tela final de pontuação
function mostrarResultado() {
    telaQuiz.classList.add('escondido');
    telaResultado.classList.remove('escondido');
    textoPontuacao.innerText = `Você acertou ${pontuacao} de ${perguntas.length} perguntas! 🥳`;
}

// Botão de jogar de novo
btnReiniciar.addEventListener('click', iniciarQuiz);

// Roda o jogo pela primeira vez
iniciarQuiz();