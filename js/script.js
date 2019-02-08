'use strict';


var buttonKamien = document.getElementById ('kamien');
var buttonPapier = document.getElementById ('papier');
var buttonNozyce = document.getElementById ('nozyce');

buttonKamien.addEventListener ('click',playerMove);
buttonPapier.addEventListener ('click',playerMove);
buttonNozyce.addEventListener ('click',playerMove);


function playerMove () {
    var userMove = this.id;
    console.log (userMove);
    showScore (userMove);
    
};

function showScore (rezultat) {
    var tablicaWynikow = document.getElementById ('scoreBoard');
    tablicaWynikow.innerHTML += rezultat+' <br>';
}

