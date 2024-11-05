import * as THREE from 'three';

var clock;
var camera;
var scene;
var renderer;
var paddleMaterial;
var mesh;
var running = true;
const speed = 5;
const canvasScale = 12;

const inputs = {
	up: false,
	down: false,
	left: false,
	right: false
}

function createSquare(width, height, material) {
	const vec = new THREE.Vector2(-1.0, 1.0).applyMatrix3;
	const geometry = new THREE.BufferGeometry(); 
	const vertices = new Float32Array( [ -width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2 ] ); 
	geometry.setIndex( [ 0, 1, 2, 2, 3, 0 ] ); 
	geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 2 ) ); 
	var square = new THREE.Mesh( geometry, material );
	return square;
}

function init() {
	let canvasRatio = window.innerWidth / window.innerHeight;
	let canvasWidth = canvasScale * canvasRatio;
	let canvasHeight = canvasScale;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	clock = new THREE.Clock();

	camera = new THREE.OrthographicCamera( canvasWidth / -2, canvasWidth / 2, canvasHeight / 2, canvasHeight / -2, 0.1, 1000 );
	camera.position.x = canvasWidth / 2;
	camera.position.y = -canvasHeight / 2;
	camera.position.z = 20;

	paddleMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

	scene = new THREE.Scene();
	mesh = createSquare(0.5, 2, paddleMaterial);
	mesh.position.x = 0.25;
	mesh.position.y = canvasScale / -2;
	scene.add(mesh);
}

function update(deltaTime) {

	let speedDelta = speed * deltaTime;
	if (inputs.up)
		mesh.position.y += speedDelta;
	if (inputs.down)
		mesh.position.y -= speedDelta;

	console.log(mesh.position);
}

function render() {
	update(clock.getDelta());
	renderer.render(scene, camera);
}

function keyDown(event) {
	switch(event.key) {
		case "ArrowDown":
			inputs.down = true;
			break;
		case "ArrowUp":
			inputs.up = true;
			break;
		case "ArrowLeft":
			inputs.left = true;
			break;
		case "ArrowRight":
			inputs.right = true;
			break;
		default:
			return;
	}
}

window.addEventListener("keydown", keyDown);

function keyUp(event) {
	switch(event.key) {
		case "ArrowDown":
			inputs.down = false;
			break;
		case "ArrowUp":
			inputs.up = false;
			break;
		case "ArrowLeft":
			inputs.left = false;
			break;
		case "ArrowRight":
			inputs.right = false;
			break;
		default:
			return;
	}
}

window.addEventListener("keyup", keyUp);

try {
	init();
	renderer.setAnimationLoop( render );
} catch(e) {
	console.log(e);
}