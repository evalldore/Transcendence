import * as THREE from 'three';
import {Game} from './game.js'

const canvasRatio = window.innerWidth / window.innerHeight;
const canvasScale = 12;
const canvasWidth = canvasScale * canvasRatio;
const canvasHeight = canvasScale;
var renderer;
var clock;
var game;

function keyDown(event) {
	game.keyDown(event);
}

function keyUp(event) {
	game.keyUp(event);
}

function render() {
	game.update(clock.getDelta());
	renderer.render(game.scene, game.camera);
}

try {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	clock = new THREE.Clock();
	game = new Game(canvasWidth, canvasHeight);
	game.init();
	window.addEventListener("keydown", keyDown);
	window.addEventListener("keyup", keyUp);
	renderer.setAnimationLoop(render);
} catch(e) {
	console.log(e);
}