const donkey = document.querySelector('.donkey');
const pipe = document.querySelector('.pipe');
const jumpSound = new Audio('./imagens/aiai_1.wav');

let score = 0;
let jumps = 0;
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
    if (isGameOver) return;

    jumpSound.play();
    donkey.classList.add('jump');

    setTimeout(() => {
        donkey.classList.remove('jump');    
    }, 1000); 

    jumps++;
    updateScore();
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
