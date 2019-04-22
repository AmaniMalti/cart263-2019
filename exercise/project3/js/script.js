/*****************

Babysitter Game
Amani Malti

TODO: Add description of game
******************/

// initialize variables used for three js 3D rendering
var container, camera, controls, scene, renderer, startOverlay, gameOverOverlay, winnerOverlay, rayCaster;

// 3D objects that will be draggable
var objects = [];
// Array will hold 3D baby object
var babyObject = [];
// Array that holds all safeToy objects - all spheres
var safeToyObject = [];
// variable to keep track of number of times baby played with a toy to check
// for game over condition
var toyPlay = 0;
// initialize gameOver variable to false
var gameOver = false;
// initialize won variable to false
var won = false;
// initialize mouse variable as a THREE vector of 2 dimentions
var mouse = new THREE.Vector2();

// call the setup function
setup();
// call the animate function
animate();

// function that sets up the elements and functionalities
function setup() {
  // create a new div which will be contained in the body html tag
  container = document.createElement('div');
  document.body.appendChild(container);

  // calling adding the add start overlay function
  addStartOverlay();
  addGameOverOverlay();
  addWinnerOverlay();

  // Setup for the camera in a 3D perspective
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.35, 5000);
  camera.position.set(0, 1500, 500);

  // Setup for the controls
  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 5.0;
  controls.zoomSpeed = 2.2;
  controls.panSpeed = 1.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  // creating a scene using Three Js
  scene = new THREE.Scene();

  // Setup the background by giving the 6 images of the cube
  var loader = new THREE.CubeTextureLoader().setPath('assets/images/').load([
    'px.jpg', 'nx.jpg',
    'py.jpg', 'ny.jpg',
    'pz.jpg', 'nz.jpg'
  ], function(texture) {
    var pmremGenerator = new THREE.PMREMGenerator(texture);
    pmremGenerator.update(renderer);
    var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
    pmremCubeUVPacker.update(renderer);

    var envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

    // adding light on the scene
    scene.add(new THREE.AmbientLight(0x505050));

    // setting up another light, this one is a spot light
    var light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 3000);
    light.angle = Math.PI / 4;

    light.castShadow = true;
    light.shadow.camera.near = 500;
    light.shadow.camera.far = 4000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    // adding spotlight to the scene
    scene.add(light);

    // loading the 3D baby gltf file and adding it to the scene
    var loader = new THREE.GLTFLoader().setPath('assets/gltf/');
    loader.load('BabyModel.gltf', function(gltf) {
      scene.add(gltf.scene);
    });

    // setup the spheres, 10 in total
    var sphereGeometry = new THREE.SphereGeometry(40, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    for (var i = 0; i < 10; i++) {
      var material = new THREE.MeshLambertMaterial({
        // give each a random color
        color: Math.random() * 0xffffff
      });
      // create a new sphere
      var sphere = new THREE.Mesh(sphereGeometry, material);
      // set the position as random
      sphere.position.set(Math.random() * 1000 - 500, Math.random() * 600 - 300, Math.random() * 800 - 400);
      // add created sphere to the scene
      scene.add(sphere);
      // add sphere to objects array
      objects.push(sphere);
      // add sphere object to safeToy object array
      safeToyObject.push(sphere);
    }

    // set up the rectangles, 20 in total
    var geometry = new THREE.BoxBufferGeometry(40, 40, 40);
    for (var i = 0; i < 20; i++) {
      var toy = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
        // give each a random color
        color: Math.random() * 0xffffff
      }));
      // set position as random
      toy.position.set(Math.random() * 1000 - 600, Math.random() * 600 - 200, Math.random() * 800 - 300);
      // set rotation as random
      toy.rotation.x = Math.random() * 2 * Math.PI;
      toy.rotation.y = Math.random() * 2 * Math.PI;
      toy.rotation.z = Math.random() * 2 * Math.PI;
      // set scale as random
      toy.scale.x = Math.random() * 2 + 1;
      toy.scale.y = Math.random() * 2 + 1;
      toy.scale.z = Math.random() * 2 + 1;
      // give and receive shadow
      toy.castShadow = true;
      toy.receiveShadow = true;
      // add rectangle to the scene
      scene.add(toy);
      // add rectangle to objects array
      objects.push(toy);
    }

    // generate the background
    pmremGenerator.dispose();
    pmremCubeUVPacker.dispose();
    scene.background = texture;
  });

  // create rendering three js object
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  // set up the rendering object
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaOutput = true;
  // add render element to the div container
  container.appendChild(renderer.domElement);
  // set up an event listener on window resize, call the resize function
  window.addEventListener('resize', onWindowResize, false);

  // set up of the three js drag controls
  var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
  // on drag start, don't enable controls
  dragControls.addEventListener('dragstart', function() {
    controls.enabled = false;
  });
  // on drag end, enbale controls
  dragControls.addEventListener('dragend', function() {
    controls.enabled = true;
  });

  // set up Three js raycaster, this enables to track clicks on 3D objects
  rayCaster = new THREE.Raycaster();
  renderer.domElement.addEventListener('click', raycast, false);

  // use responsive voice to give instructions on how to win the game
  responsiveVoice.speak("Baby is bored. In this game, you must entertain the baby by dragging the spheres on the baby. Rectangular toys are dangerous for baby.", "UK English Female");

  // when click on overlay, hide the start overlay
  var startOverlay = $('.start');
  startOverlay.click(
    function() {
      startOverlay.hide();
    }
  );
}

// window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// function that handles click on 3D objects such as the safeToy (spheres) and toys (rectangles)
function raycast(e) {
  // set up mouse
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  // add mouse to three js rayCaster to be able to track clicks
  rayCaster.setFromCamera(mouse, camera);
  //
  var intersects = rayCaster.intersectObjects(scene.children);
  if (intersects[0] && intersects[0].object) {
    var currentObject = intersects[0].object;
    if (currentObject.geometry.type == "SphereGeometry") {
      if (currentObject.position.x <= 200 && currentObject.position.x >= -200 && currentObject.position.y <= 200 && currentObject.position.y >= -200 && currentObject.position.z <= 200 && currentObject.position.z >= -200) {
        var sphereObject = intersects[0].object;
        responsiveVoice.speak("Good job! You entertained the baby.", "UK English Female");
        let babyBurp = new Audio("assets/sounds/babyLaugh.wav");
        babyBurp.play();
        scene.remove(intersects[0].object);
        safeToyObject.pop(intersects[0].object);
        if (safeToyObject.length == 0) {
          won = true;
          responsiveVoice.speak("Hurray! Baby played with all the toys! You won the game.", "UK English Female");
        }
      } else {
        responsiveVoice.speak("Safe toy must be placed on baby, otherwise he won't be able to play with it.", "UK English Female");
      }
    } else {
      if (currentObject.position.x <= 200 && currentObject.position.x >= -200 && currentObject.position.y <= 200 && currentObject.position.y >= -200 && currentObject.position.z <= 200 && currentObject.position.z >= -200) {
        responsiveVoice.speak("Not a safe toy object. Baby is upset!", "UK English Female");
        toyPlay++;
        let babyCry = new Audio("assets/sounds/cry.wav");
        babyCry.play();
        if (toyPlay > 2) {
          gameOver = true;
          responsiveVoice.speak("Game over. You are a bad babysitter!", "UK English Female");
        }
      }
    }
  }
}

//
function addStartOverlay() {
  // Adding start overlay with text
  startOverlay = document.createElement('div');
  startOverlay.setAttribute('class', 'start');
  var h1 = document.createElement("H1");
  h1.innerHTML = "Start Game - Click to start";
  startOverlay.appendChild(h1);
  document.body.appendChild(startOverlay);
}

// overlay setup for when game is over
function addGameOverOverlay() {
  gameOverOverlay = document.createElement('div');
  gameOverOverlay.setAttribute('class', 'gameOver');
  var h1 = document.createElement("H1");
  h1.innerHTML = "Game Over!";
  gameOverOverlay.appendChild(h1);
  document.body.appendChild(gameOverOverlay);
}

// overlay setup for when game is won
function addWinnerOverlay() {
  winnerOverlay = document.createElement('div');
  winnerOverlay.setAttribute('class', 'winner');
  var h1 = document.createElement("H1");
  h1.innerHTML = "You won!";
  winnerOverlay.appendChild(h1);
  document.body.appendChild(winnerOverlay);
}

// three js animate function
function animate() {
  requestAnimationFrame(animate);
  render();
}

// render the scene in the camera, update the controls
function render() {
  controls.update();
  renderer.render(scene, camera);
  // check if game is over and show gameOver overlay if true
  if (gameOver) {
    $('.gameOver').show();
  }
  // check if winner and show winner overlay if true
  if (won) {
    $('.winner').show();
  }
}
