let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}; //Using the || default operator to set the score = 0,0,0 if score doesn't exist

updateScoreElement();  

function playGame(playerMove){

const computerMove = pickComputerMove();

let result = '';
if (playerMove === 'scissors'){
    if (computerMove === 'Rock') {
        result = 'You lose.';
    } else if (computerMove === 'Paper'){
        result = 'You win.';
    } else if (computerMove === 'Scissors'){
        result = 'Tie.';
    }
} else if (playerMove === 'paper'){
    if (computerMove === 'Rock') {
        result = 'You win.';
    } else if (computerMove === 'Paper'){
        result = 'Tie.';
    } else if (computerMove === 'Scissors'){
        result = 'You lose.';
    }
} else if(playerMove === 'rock'){
    if (computerMove === 'Rock') {
        result = 'Tie.';
    } else if (computerMove === 'Paper'){
        result = 'You lose.';
    } else if (computerMove === 'Scissors'){
        result = 'You win.';
    }
}

if (result === 'You win.'){
    score.wins++;
}else if(result === 'You lose.'){
    score.losses++;
}else if(result === 'Tie.'){
    score.ties++;
}

localStorage.setItem('score', JSON.stringify(score)); //Save score in local storage

updateScoreElement(); //Update the score on the page
document.querySelector('.js-result').innerText = result; //Update text indicating result
document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer` //Update text incating the players' moves
}

function pickComputerMove(){
const randomNumber = Math.random();

let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'Rock';  
} else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'Paper'; 
} else if(randomNumber >= 2/3 && randomNumber < 1){ 
    computerMove = 'Scissors';  
}

console.log(computerMove);
return computerMove;
}

function updateScoreElement(){
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;  
}