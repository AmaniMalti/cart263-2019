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

// more variables to calculate width and height of elements
  let babyHeight = $('#baby').height();
  let sharkHeight = $('#shark').height();
  let windowHeight = $( document ).height();
  let windowWidth = $( document ).width();

$(document).ready(setup);

function setup() {

  //Placing baby position on the X axis to animate the baby
  function animateBabyX(xPosition) {
    $('#baby').animate({
      left: '+=' + xPosition + 'px'
    });

  };
  // Placing baby position on the Y axis to animate the baby
  function animateBabyY(yPosition) {
    $('#baby').animate({
      top: yPosition + 'px'
    });
  };
  // Placing the shark on the X axis to animate the shark
  // Making the shark follow the baby movement on the X axis
  function animateShark(xPosition) {
    $('#shark').animate({
      left: '+=' + xPosition + 'px'
    });
  };
  // Making a function to the positioning of the animation to the X axis set as random
  // Making the images not go over the document width
  function generateRandomXPosition() {
    return Math.floor(Math.random() * $(document).width() - 30);
  };
  // Making the positioning of the animation to the Y axis set as random
  function generateRandomYPosition() {
    return Math.floor(Math.random() * $(document).height());
  }
  // Using the function generateRandomXPosition to generate the position of the baby and the shark randomly on the X axis
  var babyXPosition = generateRandomXPosition();
  animateBabyX(babyXPosition);
  animateShark(babyXPosition);
  // animate the baby to move down on the Y axis
  animateBabyY(height);
};
