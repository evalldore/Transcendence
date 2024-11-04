import * as THREE from 'three';


const inputs = {
	up: false,
	down: false,
	left: false,
	right: false
}
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function render() {

	let delta = clock.getDelta();

	if (inputs.left)
		cube.rotation.x -= 1 * delta;
	if (inputs.right)
		cube.rotation.x += 1 * delta;
	if (inputs.up)
		cube.rotation.y -= 1 * delta;
	if (inputs.down)
		cube.rotation.y += 1 * delta;

	renderer.render( scene, camera );

}

renderer.setAnimationLoop( render );

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