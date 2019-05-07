let button = document.getElementById('button');
let score = document.getElementById('score');
let player = document.getElementById('player');
let header = document.querySelector('h1');
let poab = document.getElementById('poab');
let dotcom = document.getElementById('dotcom');
let header2 = document.querySelector('h2');
let header4 = document.querySelector('h4');
let highScores = document.querySelectorAll('.scores');
let scoreBoard = document.getElementById('scoreboard');
let playAgain = document.querySelector('.play-again');

let counter;
let timer;

// timer function

function startTimer(duration, display) {
    let timer = duration,
        minutes;
    counter = setInterval(function () {
        let minutes = parseInt(timer / 60, 10);

        minutes = minutes < 10 ? "00" + minutes : minutes;
        minutes = minutes >= 10 && minutes < 100 ? "0" + minutes : minutes;
        minutes = minutes >= 100 ? minutes : minutes;

        display.innerHTML = minutes;

        if (++timer < 0) {
            timer = duration;
        }

        console.log(minutes);

    }, 1000);
}

// stop timer function

function stopCounter() {
    clearInterval(counter);
}

// hides button

function hideButton() {
    setTimeout(function () {
        button.parentElement.style.display = 'none';
    }, 1500);
}

// Button functionality

function buttonFunc(e) {
    e.preventDefault();

    
    setTimeout(function(){
    header.classList.add('hide');
        }, 1250);
    
    // header3s.forEach(function (header3) {
    //     header3.classList.add('hide');
    // });

    setTimeout(function(){
        poab.classList.add('hide');
    }, 500);

    setTimeout(function(){
        dotcom.classList.add('hide');
    }, 250);

    button.parentElement.classList.add('hide');
    hideButton();

    player.setAttribute('contenteditable', false);
    player.style.cursor = 'default';

    let start = 0;

    startTimer(start, score);
    endGame();

    button.removeEventListener('click', buttonFunc);
    
}

// click event

button.addEventListener('click', buttonFunc);

// Game over functions

function endGame() {
    let frame = document.querySelector('html');
    frame.addEventListener('mouseleave', gameOver);
    frame.addEventListener('mouseup', gameOver);
}

function gameOver(e) {
    console.log('GAME OVER');
    let paContainer = document.getElementById('pa-container');

    // put settimeouts on these for cascade effect

    header2.appendChild(document.createTextNode('GAME OVER'));
    header2.classList.add('show');
    paContainer.style.display = 'block';

    setTimeout(function(){
        scoreBoard.classList.add('show');
        header4.appendChild(document.createTextNode('HIGH SCORE'));
        header4.classList.add('show');
    }, 250);
    
    setTimeout(function(){
        // paContainer.style.display = 'block';
        playAgain.classList.add('show');
    }, 850);
    

    storeScoreInLocalStorage();

    highScores.forEach(function (score) {
        let playerName = localStorage.getItem('playername');
        let highScore = localStorage.getItem('highscore');
            
        score.appendChild(document.createTextNode(`${playerName} ${highScore}`));
    });
    
    for(let i = 0; i < highScores.length; i++){
        setTimeout(function() {
            highScores[i].classList.add('show');
        }, 500 * (i + 1));
    }

    stopCounter();

    let frame = document.querySelector('html');
    frame.removeEventListener('mouseleave', gameOver);
    frame.removeEventListener('mouseup', gameOver);
}

// score say SUP

score.addEventListener('dblclick', saySup);

function saySup(e) {
    e.preventDefault();
    score.innerHTML = 'SUP'
}

// refresh page

playAgain.addEventListener('click', newGame);

function newGame() {
    location.reload();
}

// store in local storage

function storeScoreInLocalStorage() {
    let playerName = player.textContent;
    let finalScore = score.textContent;

    if(localStorage.getItem('highscore') === null || Number(localStorage.getItem('highscore')) < Number(finalScore)) {
        localStorage.setItem('highscore', finalScore);
        localStorage.setItem('playername', playerName);
    } 
}
