const donkey = document.querySelector('.donkey');
const pipe = document.querySelector('.pipe');
const failSound = new Audio('./imagens/aiai_1.wav'); // Som de erro ao colidir
const specialSound = new Audio('./imagens/acerto.wav'); // Som especial a cada 3 acertos

let score = 0;
let jumps = 0;
let successfulJumps = 0; // Contador de acertos seguidos
let isGameOver = false;

const scoreBoard = document.createElement('div');
scoreBoard.classList.add('score-board');
document.body.appendChild(scoreBoard);

const restartScreen = document.createElement('div');
restartScreen.id = 'game-over-screen';
restartScreen.classList.add('hidden');
restartScreen.innerHTML = `
    <p>Game Over</p>
    <button id="restart-btn">Recomeçar</button>
`;
document.body.appendChild(restartScreen);

const updateScore = () => {
    scoreBoard.innerHTML = `⏱️ Tempo: ${score} seg | 🦘 Pulos: ${jumps}`;
};

const jump = () => {
    if (isGameOver || donkey.classList.contains('jump')) return;

    donkey.classList.add('jump');

    setTimeout(() => {
        donkey.classList.remove('jump');
    }, 600); // Ajustado para bater com a animação do CSS

    jumps++;
    successfulJumps++;
    updateScore();

    if (successfulJumps === 3) {
        specialSound.play(); // Toca o som especial após 3 acertos seguidos
        successfulJumps = 0; // Reseta o contador
    }
};

const startTimer = () => {
    const timer = setInterval(() => {
        if (!isGameOver) {
            score++;
            updateScore();
        } else {
            clearInterval(timer);
        }
    }, 1000);
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const donkeyPosition = +window.getComputedStyle(donkey).bottom.replace('px', '');

    if (pipePosition < 100 && pipePosition > 0 && donkeyPosition < 60) { 
        isGameOver = true; 
        failSound.play(); // Toca o som de erro ao colidir

        pipe.style.animation = 'none'; 
        pipe.style.left = `${pipePosition}px`; 

        donkey.style.animation = 'none'; 
        donkey.style.bottom = `${donkeyPosition}px`; 

        donkey.src = './imagens/game-over.png';
        donkey.style.width = '150px';
        donkey.style.marginLeft = '50px';
        donkey.style.objectFit = 'contain';
        donkey.style.transform = 'scale(1.2)';

        restartScreen.style.display = 'flex';
    }
}, 10);

document.getElementById('restart-btn').addEventListener('click', () => {
    restartScreen.style.display = 'none';
    location.reload();
});

startTimer();
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
