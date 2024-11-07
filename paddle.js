import * as THREE from 'three';

const paddleMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const speed = 5;

class Paddle {
	constructor(width, height) {
		let geometry = new THREE.BufferGeometry(); 
		let vertices = new Float32Array( [ -width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2 ] ); 
		geometry.setIndex( [ 0, 1, 2, 2, 3, 0 ] ); 
		geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 2 ) ); 
		this.mesh = new THREE.Mesh( geometry, paddleMaterial );
	}
	Move(scale, deltaTime) {
		let y = this.mesh.position.y + (speed * scale) * deltaTime;
		y = Math.max(-6, Math.min(6, y));
		this.setPosition(this.mesh.position.x, y);
	}
	setPosition(x, y) {
		this.mesh.position.x = x;
		this.mesh.position.y = y;
	}
	getPosition() {
		return this.mesh.position;
	}
}

export {Paddle}