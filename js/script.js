'use strict';

var buttonNewGame = document.getElementById ('newGame');
var buttonKamien = document.getElementById ('kamien');
var buttonPapier = document.getElementById ('papier');
var buttonNozyce = document.getElementById ('nozyce');
var tablicaWynikow = document.getElementById ('scoreBoard');
var startGame = false;
var result = document.getElementById ('result');
var humanSum=0;
var computerSum=0;
var ileGier;

buttonNewGame.addEventListener ('click',newGame);
buttonKamien.addEventListener ('click',playerMove);
buttonPapier.addEventListener ('click',playerMove);
buttonNozyce.addEventListener ('click',playerMove);

//console.dir (buttonNewGame);

function newGame() {
    // zbezpieczam przed wpisaniem wartości z poza zakresu ilości gier (1-10), lub wciśnięciem Anuluj
    ileGier = window.prompt('Ile wygranych rund kończy grę?');
    if ((isNaN(ileGier)===true) || ileGier === null || ileGier <= 0 || ileGier >= 11) {
        tablicaWynikow.innerHTML ='Podaj liczbę z zakresu 1-10';
    }
    else {
        startGame = true; 
        buttonNewGame.innerHTML = 'Do ' + ileGier + ' wygranych';
        // czyszcze tablice z rezultatami
        result.innerHTML = ''; 
        tablicaWynikow.innerHTML ='';
        // czyszcze wyniki sumaryczne
        humanSum=0;
        computerSum=0;
    }
}

function playerMove () { 
    // sprawdzam, czy mogę zacząć nową grę - zmienna startGame
    if (startGame===true) {   
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
        showScore (userChoice,computerChoice,theWinner); 
    }
    else {
        tablicaWynikow.innerHTML ='Proszę wcisnąć "Nowa Gra", aby rozpocząć rozgrywkę';    
    }        
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

    // sprawdzam, czy osiągnięto wystarczającą ilość wygranych rund
    if (humanSum == ileGier || computerSum == ileGier) {
        tablicaWynikow.innerHTML += '<BR>GAME OVER';
        startGame = false;
        buttonNewGame.innerHTML = 'Nowa gra';
    }
}

