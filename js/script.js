/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-template */
'use strict';

var params = {
  humanSum: 0,
  computerSum: 0,
  howManyGames: 0,
  startGame: false,
  progress: []   
};

var buttonNewGame = document.getElementById('newGame');
var scoreBoard = document.getElementById('scoreBoard');
var result = document.getElementById('result');

buttonNewGame.addEventListener('click', newGame);

// chowanie modala
function hideModal () {
  document.querySelector('#modal-overlay').classList.remove('show');
};
var closeButton = document.querySelector('.modal .close');
closeButton.addEventListener('click', hideModal);


var buttons = document.querySelectorAll('.player-move');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() { playerMove(this.getAttribute('data-move')) });  
}

function newGame () {
  // zbezpieczam przed wpisaniem wartości z poza zakresu ilości gier (1-10), lub wciśnięciem Anuluj
  params.howManyGames = window.prompt('Ile wygranych rund kończy grę?');
  if ((isNaN(params.howManyGames) === true) || params.howManyGames === null || params.howManyGames <= 0 || params.howManyGames >= 11) {
    scoreBoard.innerHTML = 'Podaj liczbę z zakresu 1-10';
  } 
  else {
    params.startGame = true;
    buttonNewGame.innerHTML = ('Do ' + [params.howManyGames] + ' wygranych');
    // czyszcze tablice z rezultatami
    result.innerHTML = '';
    scoreBoard.innerHTML = '';
    // czyszcze wyniki sumaryczne
    params.humanSum = 0;
    params.computerSum = 0;
    params.progress = [];
  }
}

function playerMove (userChoice) {
  // sprawdzam, czy mogę zacząć nową grę - zmienna params.startGame  
  if (params.startGame === true) {    
    var computerChoice = computerMove();
    var theWinner;
    // sprawdzam remis
    if (userChoice === computerChoice) {
      theWinner = 'remis';
    }
    // sprawdzam mozliwosc wygrania gracza
    else if ((userChoice === 'rock' && computerChoice === 'scissors') || (userChoice === 'paper' && computerChoice === 'rock') || (userChoice === 'scissors' && computerChoice === 'paper')) {
      theWinner = 'human';
      params.humanSum++;
    } 
    else {
      theWinner = 'computer';
      params.computerSum++;
    }
    
    // dane o wyniku partii wpisuje do obiektó w tabeli params.progress
    params.progress.push({User: userChoice, Computer: computerChoice, Result: theWinner});
    
    // wyświetlenie wyniku partii na tablicy
    showScore(userChoice, computerChoice, theWinner);
    
  } 
  else {
    scoreBoard.innerHTML = 'Proszę wcisnąć "Nowa Gra", aby rozpocząć rozgrywkę';
  }
}

function computerMove () {
  // losuje wynik ruchu komputera zgodnie ze wzorem:  Math.floor(Math.random()*(max+1));
  var computerHand = Math.floor(Math.random() * 3 + 1);
  if (computerHand === 1) {
    computerHand = 'paper';
  } 
  else if (computerHand === 2) {
    computerHand = 'rock';
  } 
  else {
    computerHand = 'scissors';
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
  result.innerHTML = ([params.humanSum] + '-' + [params.computerSum]);
  endGame();
}

// sprawdzam, czy osiągnięto wystarczającą ilość wygranych rund
function endGame () {
  if (params.humanSum == params.howManyGames || params.computerSum == params.howManyGames) {
    scoreBoard.innerHTML += '<BR>GAME OVER';
    params.startGame = false;
    buttonNewGame.innerHTML = 'Nowa gra';
    // wyświetlam modal z wynikiem
    document.querySelector('.modal .content').innerHTML = ('<h1> człowiek vs maszyna<br> ' + params.humanSum + ' - ' + params.computerSum + '</h1>');
    
    // ALTERNATYWA: document.querySelector('.modal .content').innerHTML += ('<table><tr><th>Runda</th><th>Gracz</th><th>Komputer</th><th>Zwycięzca</th></tr>');
   
    
    for (var i = 0; i < params.progress.length; i++) {      
      document.querySelector('.modal .content').innerHTML += ('<br>Runda: ' + (i+1) + ' | gracz: ' + params.progress[i].User + ' | maszyna: ' + params.progress[i].Computer +  ' | wygrał: ' + params.progress[i].Result);  
      // ALTERNATYWA: document.querySelector('.modal .content').innerHTML += ('<tr><td>' + (i+1) + '</td><td>' + params.progress[i].User + '</td><td>' + params.progress[i].Computer +  '</td><td>' + params.progress[i].Result + '</td></tr>' );
      
    }
    
    // ALTERNATYWA: document.querySelector('.modal .content').innerHTML += ('</table>');
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('#modal-one').classList.add('show');
  }
}
