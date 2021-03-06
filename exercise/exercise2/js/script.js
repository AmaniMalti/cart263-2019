"use strict";



//An Object-Oriented version of the Circle Eater program.
//The player moves a circle around with the mouse.
//Another circle represents food which the player eats by overlapping.
//The player circle shrinks over time, but grows when it eats.


// Constants for key quantities
const AVATAR_MAX_SIZE = 64;
const AVATAR_SIZE_LOSS_PER_FRAME = 0.1;
const FOOD_MIN_SIZE = 5;
const FOOD_MAX_SIZE = 100;

// Variables to store the two key objects
let avatar;
let food;
let foods = [];


// preload()
//
// Not needed

function preload() {

}


// setup()
//
// Create the canvas, avatar, and food, disable the cursor

function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,AVATAR_MAX_SIZE,AVATAR_SIZE_LOSS_PER_FRAME);
  for (let i = 0; i < 42; i++){
    foods.push(new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE,color(random(210),random(210),random(210)),2,2));
  }
   noCursor();
}


// draw()
//
// Clear the background
// Update the avatar and check for eating
// Display the avatar and food

function draw() {
  background(0);
  avatar.update();
  //check for collision
  for (let i = 0; i < foods.length; i++) {
	if (avatar.collide(foods[i])) {
		avatar.eat(foods[i]);
		break;
		}
	}
  avatar.display();
  //Display food
  for (let i = 0; i < foods.length; i++) {
	foods[i].update();
	foods[i].display();
	}
}
