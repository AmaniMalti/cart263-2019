"use strict";

/*****************

Baby shark
Amani Malti

A traumatising game for kids 1year to 4 year.
Shark is waiting for the baby to get to the bottom to eat it.
Needs to shout Stop to stop the shark from eating the baby.

******************/

$(document).ready(setup);
// Sound effects for the experience
let babySong = new Audio("assets/sounds/babyshark.mp3");

// song is playing during the whole game
babySong.loop = true;
let songPlay = babySong.play();
if (songPlay !== undefined) {
    songPlay.then(_ => {

    })
    .catch(error => {
      console.log('Could not play song');
    });
  }

function setup() {

  // adding variables
  let shark = $('#shark');
  let hungryShark = $('#hungryShark');
  let sharkEat = $('#sharkEat')
  let baby = $('#baby');

  // more variables to calculate width and height of elements
  let babyHeight = $('#baby').height();
  let sharkHeight = $('#shark').height();
  let windowHeight = $( document ).height();
  let windowWidth = $( document ).width();

  // position the baby horizontally
  function setupBabyX(xPosition){
    baby.css({'left': xPosition +'px'});
  };

  // animate the movement of the baby vertically
  function animateBabyY(yPosition){
    baby.animate({top: yPosition + 'px' }, {easing: 'swing', duration: 2500,  complete: function() {animateSharkEatsBaby(yPosition, babyHeight, sharkHeight)}})
  };

  // animate the shark movement along the x position
  function animateShark(xPosition) {
    shark.animate({left: xPosition +'px'}, 2000);
  };

  // generate a random number along the width of the page for the horizontal positioning
  function generateRandomXPosition() {
   return Math.floor(Math.random() * windowWidth - 30);
  };

  // generate a random number along the height of the page for the vertical positioning
  function generateRandomYPosition() {
   return Math.floor(Math.random() * windowHeight);
  }

  // calculate height of baby element
  function getBabyHeight() {
    return baby.css('top');
  }

  // animate the shark eating baby
  function animateSharkEatsBaby(yPosition, babyHeight, sharkHeight) {
    shark.hide();
      hungryShark.css('left', shark.css('left'));
      hungryShark.show();
      baby.animate({top: yPosition + 'px' }, {easing: 'swing', duration: 1500,  complete: function() {animateSharkAteBaby(yPosition, babyHeight, sharkHeight)}});
  }

  // animate shark opening mouth and baby dropping into shark's mouth
  function animateSharkAteBaby(yPosition, babyHeight, sharkHeight) {
    baby.animate({top: yPosition + babyHeight * 2 + 'px'}, {easing: 'swing', duration: 500,  complete: function() {animateBabyEaten()}});
  }

  // transition to baby eaten image
  function animateBabyEaten() {
    hungryShark.hide();
    sharkEat.css('left', hungryShark.css('left'));
    baby.hide();
    sharkEat.show();
  }

  // generate a horizontal position for the baby
  var babyXPosition = generateRandomXPosition();
  // set the baby horizontal position
  setupBabyX(babyXPosition);
  // animate movement of shark to horizontal position
  animateShark(babyXPosition);
  // animate baby dropping to meet the shark vertically
  animateBabyY(windowHeight - sharkHeight - babyHeight);
 };
