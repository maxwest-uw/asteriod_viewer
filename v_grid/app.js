import * as THREE from 'three';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';


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
const ellipsoidMesh = new THREE.Mesh(ellipsoidGeometry, material);

// Create a canvas texture for the grid
const canvas = document.createElement('canvas');
// canvas.width = 512;
// canvas.height = 512;
canvas.width = 1440;
canvas.height = 720;
const ctx = canvas.getContext('2d');

// Fill background
ctx.fillStyle = '#ffffff00';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw grid lines
ctx.strokeStyle = '#4132c5';
ctx.lineWidth = 1;

// Vertical lines (longitude)
for (let i = 0; i <= 360; i += 30) {
    const x = (i / 360) * canvas.width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
}

// Horizontal lines (latitude)
for (let i = -90; i <= 90; i += 30) {
    const y = ((i + 90) / 180) * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
}


// const img    = canvas.toDataURL('image/png')
// document.write('<img src="'+img+'"/>');


const texture = new THREE.CanvasTexture(canvas);
var material = new THREE.MeshPhongMaterial( { map: texture } );
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

camera.rotation.x = 45 * Math.PI / 180;

renderer.render(scene, camera);