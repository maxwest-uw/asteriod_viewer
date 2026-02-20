import * as THREE from 'three';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// TODO: set this up to handle different camera locations (aka observation from Earth)
camera.position.y = -4;

camera.lookAt(0, 0, 0);

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// Add a dim light behind the camera
var cameraLight = new THREE.PointLight(0xffffff, 1.0); // 0.5 is the intensity
cameraLight.position.copy(camera.position);
scene.add(cameraLight);
// scene.add(light);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

const loader = new PLYLoader();
const geometry = await loader.loadAsync( '../shape.ply' );
geometry.computeVertexNormals();
var material = new THREE.MeshPhongMaterial( { color: "#FFFFFF" } );
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// grabs the variable from the html
const speedInput = document.getElementById('speed');

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  const radius = 4;
  const speed = parseFloat(speedInput.value);
  const time = Date.now() * 0.001; // Convert to seconds
  
  cameraLight.position.x = Math.cos(time * speed) * radius;
  cameraLight.position.y = Math.sin(time * speed) * radius;

  mesh.rotation.z += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();