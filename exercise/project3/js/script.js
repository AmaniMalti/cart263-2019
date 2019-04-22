/*****************

Babysitter Game
Amani Malti

TODO: Add description of game
******************/

// initialize variables used for three js 3D rendering
var container, camera, controls, scene, renderer, startOverlay;

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

  // use responsive voice to give instructions on how to win the game
  responsiveVoice.speak("Baby is hungry. In this game, you must feed the baby by dragging the spheres on the baby.", "UK English Female");

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

function addStartOverlay() {
  // Adding start overlay with text
  startOverlay = document.createElement('div');
  startOverlay.setAttribute('class', 'start');
  var h1 = document.createElement("H1");
   h1.innerHTML = "Start Game - Click to start";
   startOverlay.appendChild(h1);
   document.body.appendChild(startOverlay);
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
}
