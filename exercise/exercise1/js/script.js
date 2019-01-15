"use strict";

/*****************

Circle Eater
Pippin Barr

A simple game in which the player controls a shrinking circle with their mouse and tries
to overlap another circle (food) in order to grow bigger.

******************/

// Constants defining key quantities
const AVATAR_SIZE_GAIN = 50;
const AVATAR_SIZE_LOSS = 0.5;
// Constant for food - MAX SPEED
const MAX_SPEED_FOOD = 5;

// Avatar is an object defined by its properties
let avatar = {
  x: 0,
  y: 0,
  maxSize: 64,
  size: 64,
  active: true,
  color: '#cccc55'
}

// Food is an object defined by its properties
let food = {
  x: 0,
  y: 0,
  size: 64,
  color: '#55cccc',
  // Give the food object velocity properties
  vx: 3,
  vy: 3,
  // Give the food a maximum speed property (consider defining this value in a constant separately)
  maxSpeed: MAX_SPEED_FOOD,
}



// setup()
//
// Create the canvas, position the food, remove the cursor

function setup() {
  createCanvas(windowWidth,windowHeight);
  positionFood();
  noCursor();
}


// draw()
//
// Move the avatar, check for collisions, display avatar and food

function draw() {
  // Make sure the avatar is still alive - if not, we don't run
  // the rest of the draw loop
  if (!avatar.active) {
    // By using "return" the draw() function exits immediately
    return;
  }

  // Otherwise we handle the game
  background(0);
  updateAvatar();
  checkCollision();
  displayAvatar();
  displayFood();
  // Call updateFood() from draw()
  updateFood();

  // Check avatar size - returns game over when equal to zero
  gameOver();
}

// updateAvatar()
//
// Set the position to the mouse location
// Shrink the avatar
// Set it to inactive if it reaches a size of zero
function updateAvatar() {
  avatar.x = mouseX;
  avatar.y = mouseY;
  // Shrink the avatar and use constrain() to keep it to reasonable bounds
  avatar.size = constrain(avatar.size - AVATAR_SIZE_LOSS,0,avatar.maxSize);
  if (avatar.size === 0) {
    avatar.active = false;
  }
}

// checkCollision()
//
// Calculate distance of avatar to food
// Check if the distance is small enough to be an overlap of the two circles
// If so, grow the avatar and reposition the food
function checkCollision() {
  let d = dist(avatar.x,avatar.y,food.x,food.y);
  if (d < avatar.size/2 + food.size/2) {
    avatar.size = constrain(avatar.size + AVATAR_SIZE_GAIN,0,avatar.maxSize);
    positionFood();
  }
}

// displayAvatar()
//
// Draw the avatar in its current position, using its size and color
// Use push() and pop() around it all to avoid affecting the rest of the program
// with drawing commands
function displayAvatar() {
  push();
  noStroke();
  fill(avatar.color);
  ellipse(avatar.x,avatar.y,avatar.size);
  pop();
}

// displayFood()
//
// Draw the food in its current position, using its size and color
// Use push() and pop() around it all to avoid affecting the rest of the program
// with drawing commands
function displayFood() {
  push();
  noStroke();
  fill(food.color);
  ellipse(food.x,food.y,food.size);
  pop();
}

// positionFood()
//
// Set the food's position properties to random numbers within the canvas dimensions
function positionFood() {
  food.x = random(0,width);
  food.y = random(0,height);

  // Set a random velocity for the food based on its maximum speed in positionFood()
  food.vx = random(-food.maxSpeed, food.maxSpeed);
  food.vy = random(-food.maxSpeed, food.maxSpeed);
}

function updateFood() {
  // updates the food object's position based on its velocity, constrained to the canvas (it shouldn't go off-screen)
  food.x = constrain(food.x + food.vx, 0 + food.size/2, width - food.size/2);
  food.y = constrain(food.y + food.vy, 0 + food.size/2, height - food.size/2);

  if (random() % 2 === 0) {
    food.vx = random(-food.maxSpeed, food.maxSpeed);
    food.vy = random(-food.maxSpeed, food.maxSpeed);
  }
}

function gameOver() {
  if (avatar.size === 0) {
    textSize(20);
    textSize(30);
    textAlign(CENTER);
    fill(255);
    text("GAME OVER", width / 2, height / 2);
  }
}
