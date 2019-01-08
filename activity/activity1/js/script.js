"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let avatar = {
  x: 0,
  y: 0,
  maxSize: 100,
  size: 100,
  active: true,
  color: '#cccc55'
}

let food = {
  x:0,
  y:0,
  size: 64,
  color: '#fae'
}
// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas(windowWidth,windowHeight);
  food.x = random(0,width);
  food.y = random(0,height);
  noCursor();

}

// draw()
//
// Description of draw()

function draw() {
  background('#fae');
  updateAvatar();
  checkCollision();
  displayAvatar();
  displayfood();
  dist();
}
function updateAvatar() {
  avatar.x = mouseX;
  avatar.y = mouseY;
  avatar.size = avatar.size - 0.5;
  //avatar.size -= 0.5;
  avatar.size = constrain(avatar.size,0,avatar.maxSize);
    if (avatar.size === 0) {
      avatar.active = false;
}
}

function displayAvatar(){
  push();
  noStroke();
  fill(0);
  ellipse(avatar.x,avatar.y,avatar.size);
  pop();
}

function displayfood(){
  push();
  noStroke();
  fill(255);
  ellipse(food.x,food.y,food.size);
  pop();
}

/*
function checkCollision(){
  let d = dist(avatar.x,avatar.y.food.x,food.y);
  if (d < avatar.size/2 + food.size/2);{
    avatar.size= constrain (avatar.size+50,0,avatar.maxSize);
    food.x= random(0,width);
    food.y= random(0,height);
  }
}*/
function checkCollision() {
  let d = dist(avatar.x,avatar.y,food.x,food.y);
  if (d < avatar.size/2 + food.size/2) {
    avatar.size = constrain(avatar.size + healthGain,0,avatar.maxSize);
    food.x = random(0,width);
    food.y = random(0,height);
  }
}
