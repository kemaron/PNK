/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-template */
'use strict';


var buttonNewGame = document.getElementById('newGame');
var buttonStone = document.getElementById('kamien');
var buttonPaper = document.getElementById('papier');
var buttonScissors = document.getElementById('nozyce');
var scoreBoard = document.getElementById('scoreBoard');
var startGame = false;
var result = document.getElementById('result');
var humanSum = 0;
var computerSum = 0;
var howManyGames;

buttonNewGame.addEventListener('click', newGame);
buttonStone.addEventListener('click', playerMove);
buttonPaper.addEventListener('click', playerMove);
buttonScissors.addEventListener('click', playerMove);

function newGame () {
  // zbezpieczam przed wpisaniem wartości z poza zakresu ilości gier (1-10), lub wciśnięciem Anuluj
  howManyGames = window.prompt('Ile wygranych rund kończy grę?');
  if ((isNaN(howManyGames) === true) || howManyGames === null || howManyGames <= 0 || howManyGames >= 11) {
    scoreBoard.innerHTML = 'Podaj liczbę z zakresu 1-10';
  } 
  else {
    startGame = true;
    buttonNewGame.innerHTML = ('Do ' + [howManyGames] + ' wygranych');
    // czyszcze tablice z rezultatami
    result.innerHTML = '';
    scoreBoard.innerHTML = '';
    // czyszcze wyniki sumaryczne
    humanSum = 0;
    computerSum = 0;
  }
}

function playerMove () {
  // sprawdzam, czy mogę zacząć nową grę - zmienna startGame
  if (startGame === true) {
    var userChoice = this.id;
    var computerChoice = computerMove();
    var theWinner;
    // sprawdzam remis
    if (userChoice === computerChoice) {
      theWinner = 'remis';
    }
    // sprawdzam mozliwosc wygrania gracza
    else if ((userChoice === 'kamien' && computerChoice === 'nozyce') || (userChoice === 'papier' && computerChoice === 'kamien') || (userChoice === 'nozyce' && computerChoice === 'papier')) {
      theWinner = 'human';
      humanSum++;
    } 
    else {
      theWinner = 'computer';
      computerSum++;
    }
    showScore(userChoice, computerChoice, theWinner);
  } 
  else {
    scoreBoard.innerHTML = 'Proszę wcisnąć "Nowa Gra", aby rozpocząć rozgrywkę';
  }
}

function computerMove () {
  // losuje wynik ruchu komputera zgodnie ze wzorem:  Math.floor(Math.random()*(max-min+1)+min);
  var computerHand = Math.floor(Math.random() * 3 + 1);
  if (computerHand === 1) {
    computerHand = 'papier';
  } 
  else if (computerHand === 2) {
    computerHand = 'kamien';
  } 
  else {
    computerHand = 'nozyce';
  }
  return computerHand;
}

function showScore (player, computer, win) {
  if (win === 'remis') {
    scoreBoard.innerHTML = 'REMIS <br>';
  } 
  else if (win === 'human') {
    scoreBoard.innerHTML = ('WYGRAŁEŚ! Twój wybór to ' + [player] + ' ,a komputera ' + [computer] + '<br>');
  } 
  else {
    scoreBoard.innerHTML = ('PRZEGRAŁEŚ :-( Twój wybór to ' + [player] + ', a AI ' + [computer] + '<br>');
  }
  result.innerHTML = ([humanSum] + '-' + [computerSum]);
  endGame();
}

// sprawdzam, czy osiągnięto wystarczającą ilość wygranych rund
function endGame () {
  if (humanSum == howManyGames || computerSum == howManyGames) {
    scoreBoard.innerHTML += '<BR>GAME OVER';
    startGame = false;
    buttonNewGame.innerHTML = 'Nowa gra';
  }
}
