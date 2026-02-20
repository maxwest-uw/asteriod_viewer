import * as THREE from 'three';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Set Observer
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const sep_x = parseFloat(document.getElementById('sep_x').value);
const sep_y = parseFloat(document.getElementById('sep_y').value);
const sep_z = parseFloat(document.getElementById('sep_z').value);
camera.position.x = sep_x;
camera.position.y = sep_y;
camera.position.z = sep_z;

camera.lookAt(0, 0, 0);

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// Set Sun
var Light = new THREE.PointLight(0xffffff, 1.0); // 0.5 is the intensity
const ssp_x = parseFloat(document.getElementById('ssp_x').value);
const ssp_y = parseFloat(document.getElementById('ssp_y').value);
const ssp_z = parseFloat(document.getElementById('ssp_z').value);
Light.position.x = ssp_x;
Light.position.y = ssp_y;
Light.position.z = ssp_z;
scene.add(Light);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

const loader = new PLYLoader();
const geometry = await loader.loadAsync( '../shape.ply' );
geometry.computeVertexNormals();

var material = new THREE.MeshPhongMaterial( { color: "#FFFFFF" } );
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// const loader = new OBJLoader();
// const geometry = await loader.loadAsync( 'hektor.obj' );
// scene.add(geometry);
// geometry.computeVertexNormals();

// var material = new THREE.MeshPhongMaterial( { color: "#FFFFFF" } );
// var mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );

renderer.render(scene, camera);
render();