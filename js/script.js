'use strict';

var buttonKamien = document.getElementById ('kamien');
var buttonPapier = document.getElementById ('papier');
var buttonNozyce = document.getElementById ('nozyce');
var buttonNewGame = document.getElementById ('newGame');
var result = document.getElementById ('result');
var humanSum=0;
var computerSum=0;

buttonNewGame.addEventListener ('click',newGame);
buttonKamien.addEventListener ('click',playerMove);
buttonPapier.addEventListener ('click',playerMove);
buttonNozyce.addEventListener ('click',playerMove);

function newGame() {
    var ileGier = window.prompt('Ile wygranych rund kończy grę?');    
    console.log (ileGier);
}

function playerMove () {
    var userChoice = this.id;
    var computerChoice= computerMove();
    var theWinner;
    // sprawdzam remis
    if (userChoice === computerChoice) {
         theWinner ='remis';
    }
    // sprawdzam mozliwosc wygrania gracza
    else if ((userChoice === 'kamien' && computerChoice === 'nozyce') || (userChoice === 'papier' && computerChoice === 'kamien') || (userChoice === 'nozyce' && computerChoice === 'papier')) {
        theWinner = 'human';
        humanSum ++;
    }
    else {
        theWinner = 'computer';
        computerSum++;
    }
         
    //showScore (userMove);    
    showScore (userChoice,computerChoice,theWinner);     
}

function computerMove () {
    // losuje wynik ruchu komputera zgodnie ze wzorem:  Math.floor(Math.random()*(max-min+1)+min);
    var computerHand =  Math.floor(Math.random()*(3-1+1)+1);
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

function showScore (player,computer,win) {
    var tablicaWynikow = document.getElementById ('scoreBoard');
    if (win === 'remis') {
        tablicaWynikow.innerHTML = 'REMIS <br>';    
    }
    else if (win === 'human') {
        tablicaWynikow.innerHTML = 'WYGRAŁEŚ! Twój wybór to '+ player + ' ,a komputera ' + computer + '<br>'; 
    }
    else {
        tablicaWynikow.innerHTML = 'PRZEGRAŁEŚ :-( Twój wybór to '+ player + ' ,a AI ' + computer + '<br>'; 
    }
    result.innerHTML = humanSum + '-' + computerSum;
}

