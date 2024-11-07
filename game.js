import * as THREE from 'three';
import {Paddle} from './paddle.js'

class Game {
	constructor(canvasWidth, canvasHeight) {
		this.paddles = [];
		this.scene = new THREE.Scene();
		this.inputs = {
			up: false,
			down: false,
			left: false,
			right: false
		}
		this.camera = new THREE.OrthographicCamera( canvasWidth / -2, canvasWidth / 2, canvasHeight / 2, canvasHeight / -2, 0.1, 1000 );
		this.camera.position.z = 20;
	}
	init() {
		this.paddles[0] = new Paddle(0.5, 2);
		this.paddles[0].setPosition(-6, 0);
		this.scene.add(this.paddles[0].mesh);

		this.paddles[1] = new Paddle(0.5, 2);
		this.paddles[1].setPosition(6, 0);
		this.scene.add(this.paddles[1].mesh);
	}
	update(deltaTime) {
		if (this.inputs.up)
			this.paddles[0].Move(1, deltaTime);
		if (this.inputs.down)
			this.paddles[0].Move(-1, deltaTime);
	}
	keyDown(event) {
		switch(event.key) {
			case "ArrowDown":
				this.inputs.down = true;
				break;
			case "ArrowUp":
				this.inputs.up = true;
				break;
			case "ArrowLeft":
				this.inputs.left = true;
				break;
			case "ArrowRight":
				this.inputs.right = true;
				break;
			default:
				return;
		}
	}
	keyUp(event) {
		switch(event.key) {
			case "ArrowDown":
				this.inputs.down = false;
				break;
			case "ArrowUp":
				this.inputs.up = false;
				break;
			case "ArrowLeft":
				this.inputs.left = false;
				break;
			case "ArrowRight":
				this.inputs.right = false;
				break;
			default:
				return;
		}
	}
	close() {

	}
}

export {Game}
