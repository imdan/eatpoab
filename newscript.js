// this file is incomplete, like myself, need to finish implementing some things...total button push func, high score getting and setting, probably more idk right now, i'll figure it out, what are you even doing here?


let button = document.getElementById('button'),
    score = document.getElementById('score'),
    player = document.getElementById('player'),
    listen = document.getElementById('listen'),
    header = document.querySelector('h1'),
    poab = document.getElementById('poab'),
    agame = document.getElementById('agame'),
    header2 = document.querySelector('h2'),
    header4 = document.querySelector('h4'),
    highScores = document.querySelectorAll('.scores'),
    scoreBoard = document.getElementById('scoreboard'),
    playAgain = document.querySelector('.play-again'),
    toStart = document.getElementById('toStart'),
    numberOfPushes = document.getElementById('numberOfPushes'),
    totalPushes = document.getElementById('totalPushes'),
    totalPushesCount = 420,
    startTime,
    endTime;

let counter,
    timer;

// get player name

document.addEventListener('DOMContentLoaded', getName);

function getName() {
    let playerName = localStorage.getItem('playername');

    if(playerName ===  null || playerName === 'player1') {
        player.innerHTML = 'player1';
        listen.classList.add('slideIn');
        
    } else {
        player.innerHTML = playerName;
    }
}

// get total pushes

document.addEventListener('DOMContentLoaded', getTotalPushes);

function getTotalPushes() {
    totalPushes.innerHTML = totalPushesCount;
}

function incrementPushes() {
    totalPushesCount += 1;
    totalPushes.innerHTML = totalPushesCount;
}

// hide listen on player focus

player.addEventListener('focus', () => {
    // let playerName = localStorage.getItem('playername');
    // if(playerName === null) {
    //     listen.classList.remove('slideIn');
    //     listen.classList.add('slideOut');
    // }

    listen.classList.remove('slideIn');
    listen.classList.add('slideOut');
});

player.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        e.preventDefault()
        player.blur();
    }
})


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

    console.log('button push');
    incrementPushes();

    startTime = new Date().getTime();

    listen.classList.remove('slideIn');
    listen.classList.add('slideOut');

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
        agame.classList.add('hide');
    }, 250);

    toStart.classList.remove('blink');
    toStart.classList.add('hide');

    // button.parentElement.classList.add('hide');
    // hideButton();

    player.setAttribute('contenteditable', false);
    player.style.cursor = 'default';

    let start = 0;

    startTimer(start, score);
    endGame();

    button.removeEventListener('click', buttonFunc);
    
}

// click event

button.addEventListener('click', buttonFunc);
button.addEventListener('touchstart', () => {
    navigator.vibrate(34);
})

// Game over functions

function endGame() {
    // let frame = document.querySelector('html');
    // frame.addEventListener('mouseleave', gameOver);
    // frame.addEventListener('mouseup', gameOver);
    button.addEventListener('click', () => {
        incrementPushes()
        gameOver()
    });
}

function gameOver(e) {
    console.log('GAME OVER');

    // button.classList.add('sink');
    button.classList.add('melt');
    

    endTime = new Date().getTime();
    timeDiff = (startTime - endTime) / 1000;

    timeDiff = timeDiff / 60;
    elapsedTime = Math.floor(Math.abs(timeDiff));
    console.log(elapsedTime);


    let paContainer = document.getElementById('pa-container');

    // put settimeouts on these for cascade effect

    header2.appendChild(document.createTextNode('game over'));
    header2.classList.add('show');
    paContainer.style.display = 'block';

    setTimeout(function(){
        scoreBoard.classList.add('show');
        header4.appendChild(document.createTextNode('high scores'));
        header4.classList.add('show');
        
    }, 220);

    // setTimeout(function(){
    //     numberOfPushes.classList.add('show');
    // }, 220);
    
    setTimeout(function(){
        // paContainer.style.display = 'block';
        button.style.display = 'none';
        playAgain.classList.add('blink');
    }, 2750);
    

    storeScoreInLocalStorage();

    highScores.forEach(function (score) {
        let playerName = localStorage.getItem('playername');
        let highScore = localStorage.getItem('highscore');
            
        score.appendChild(document.createTextNode(`${playerName} ${highScore}`));
    });
    
    for(let i = 0; i < highScores.length; i++){
        setTimeout(function() {
            highScores[i].classList.add('show');
        }, 420 * (i + 1));
    }

    stopCounter();

    let frame = document.querySelector('html');
    frame.removeEventListener('mouseleave', gameOver);
    frame.removeEventListener('mouseup', gameOver);
}

// score say SUP

score.addEventListener('dblclick', saySup);
score.addEventListener('click', (e) => {
    e.preventDefault();
    if (score.innerHTML == 'SUP') {goToSup(e)};
})

function saySup(e) {
    e.preventDefault();
    score.innerHTML = 'SUP'
}

function goToSup(e) {
    e.preventDefault();
    window.location.href = "https://www.sup.cool";
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
