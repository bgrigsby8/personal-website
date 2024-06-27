import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load('public/main_model.glb', function(gltf) {
    scene.add(gltf.scene);
    animate();
}, undefined, function(error) {
    console.error(error);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Function to handle camera animation based on interactions
function moveCamera(targetPosition) {
    // Logic to animate camera to target position
}
