"use strict";

/*****************

The metaphor of Sisyphus
Amani Malti

For my first project I was inspired to use the metaphor of The Myth of Sisyphus.
The metaphor of Sisyphus is working hard repetitively will not get you anywhere.
The purpose of this project is to be frustrated by placing each leafs on the tree branches and the wind would take them back to their place at a random time.
The work of placing them will never paid off because they will always get back to their original placement and it will bug you.
******************/

// Sound effects for the experience
let wind = new Audio("assets/sounds/wind.m4a");

// Variables for the leaf and tree

let $leaf;
let $tree;

// When the document is loaded we call the setup function
$(document).ready(setup);

// setup()
//
function setup() {
  let $leaf0 = $('#leaf0');
  let $leaf1 = $('#leaf1');
  let $leaf2 = $('#leaf2');
  let $leaf3 = $('#leaf3');
  let $leaf4 = $('#leaf4');
  let $leaf5 = $('#leaf5');
  let $leaf6 = $('#leaf6');
  let $leaf7 = $('#leaf7');
  let $leaf8 = $('#leaf8');
  let $leaf9 = $('#leaf9');
  let $tree = $('#tree');
  let $leaves = [$leaf0, $leaf1, $leaf2, $leaf3, $leaf4, $leaf5, $leaf6, $leaf7, $leaf8, $leaf9];

  // Set an interval of 500 milliseconds to update the state of the page
  setInterval(resetLeaves, 500);

  // Get the initial position of the leaves
  let $top = $leaf0.position().top;
  let $left = $leaf0.position().left;

  $tree.droppable();

  // Make the leaf object draggable
  $('.leaf').draggable();
}

//
function update($leaves) {
  // Reset the leaves position
  $leaves.each('LEAVES', resetLeaves);
}

function resetLeaves() {
  let r = Math.random();
  if (r < 0.1) {
    $('.leaf').css("top", 0);
    $('.leaf').css("left", 0);
    // adding sound effects
    wind.play();
  }
}
