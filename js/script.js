'use strict';

var buttonKamien = document.getElementById ('kamien');
var buttonPapier = document.getElementById ('papier');
var buttonNozyce = document.getElementById ('nozyce');

buttonKamien.addEventListener ('click',playerMove);
buttonPapier.addEventListener ('click',playerMove);
buttonNozyce.addEventListener ('click',playerMove);


function playerMove () {
    var userChoice = this.id;
    var computerChoice= computerMove();
    var theWinner;
    console.log (userChoice);
    console.log (computerChoice);
    // sprawdzam remis
    if (userChoice === computerChoice) {
         theWinner ='remis';
    }
    // sprawdzam mozliwosc wygrania gracza
    else if ((userChoice === 'kamien' && computerChoice === 'nozyce') || (userChoice === 'papier' && computerChoice === 'kamien') || (userChoice === 'nozyce' && computerChoice === 'papier')) {
        theWinner = 'human';
    }
    else {
        theWinner = 'computer';
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

function showScore (rezultat,rez2,win) {
    var tablicaWynikow = document.getElementById ('scoreBoard');
    tablicaWynikow.innerHTML += rezultat+' '+ rez2+ ' wygrał: ' + win + ' <br>';
}

