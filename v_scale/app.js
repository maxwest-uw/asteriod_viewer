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

const pn = parseFloat(document.getElementById('pn').value);


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

const obj_loc = document.getElementById('obj_loc').value;
console.log("Object location:", obj_loc);



// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// if (obj_loc != "") {
//     const mesh = await new OBJLoader().loadAsync(obj_loc);
//     mesh.position.set(0, 0, 0);
//     scene.add(mesh);
// } else {
//     const ellipsoidGeometry = new THREE.SphereGeometry(1.5, 32, 16);

//     const b_a = parseFloat(document.getElementById('b_a').value);
//     const c_a = parseFloat(document.getElementById('c_a').value);
//     ellipsoidGeometry.scale(1, b_a, c_a);

//     var material = new THREE.MeshPhongMaterial( { color: "#FFFFFF" } );
//     const ellipsoidMesh = new THREE.Mesh(ellipsoidGeometry, material);

//     scene.add( ellipsoidMesh );

// }

// const axesHelper = new THREE.AxesHelper(5); // 5 is the length of the axes
// scene.add(axesHelper);

// renderer.render(scene, camera);

let maxRadius = 0;
let objectMesh;

if (obj_loc != "") {
    objectMesh = await new OBJLoader().loadAsync(obj_loc);
    objectMesh.position.set(0, 0, 0);
    scene.add(objectMesh);
} else {
    const ellipsoidGeometry = new THREE.SphereGeometry(1.5, 32, 16);
    const b_a = parseFloat(document.getElementById('b_a').value);
    const c_a = parseFloat(document.getElementById('c_a').value);
    ellipsoidGeometry.scale(1, b_a, c_a);
    
    var material = new THREE.MeshPhongMaterial( { color: "#FFFFFF" } );
    objectMesh = new THREE.Mesh(ellipsoidGeometry, material);
    scene.add(objectMesh);
}

// Get bounding sphere for radius
const boundingBox = new THREE.Box3().setFromObject(objectMesh);
maxRadius = boundingBox.getSize(new THREE.Vector3()).length() / 2;

// Adjust camera distance based on object size
const cameraDistance = maxRadius * 1.5; // 3x the radius for good view
camera.position.normalize().multiplyScalar(cameraDistance);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(maxRadius);
scene.add(axesHelper);

camera.rotation.x = pn * Math.PI / 180;

renderer.render(scene, camera);