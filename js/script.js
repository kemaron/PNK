'use strict';

var buttonKamien = document.getElementById ('kamien');
var buttonPapier = document.getElementById ('papier');
var buttonNozyce = document.getElementById ('nozyce');

buttonKamien.addEventListener ('click',playerMove);
buttonPapier.addEventListener ('click',playerMove);
buttonNozyce.addEventListener ('click',playerMove);


function playerMove () {
    var userMove = this.id;
    computerMove();
    //showScore (userMove);    
    showScore ('tacos','pupos');     
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

function showScore (rezultat,rez2) {
    var tablicaWynikow = document.getElementById ('scoreBoard');
    tablicaWynikow.innerHTML += rezultat+' <br>'+ rez2;
}

