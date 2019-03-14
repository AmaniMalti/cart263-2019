"use strict";

/*****************

Baby shark
Amani Malti

A traumatising game for kids 1year to 4 year.
Shark is waiting for the baby to get to the bottom to eat it.
Needs to shout Stop to stop the shark from eating the baby.

******************/

// Sound effects for the experience
let babySong = new Audio("assets/sounds/babyshark.mp3");

// adding variables
let shark;
let hungryShark;
let sharkEat;
let baby;

$(document).ready(setup);

function setup() {

}
//song is playing during the whole game
babySong.loop = true;
babySong.play();
