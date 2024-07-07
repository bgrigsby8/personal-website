import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// VARIABLES
let titleText = null;
let mixer;
let nameTextMesh;
let subtitleTextMesh
// let canvas = document.querySelector('.experienceCanvas');
// console.log(canvas)
let defaultCameraPos = {
	x: 0,
	y: 0.2,
	z: 1.5,
};
let defaultCameraRot = {
	x: -15 * (Math.PI / 180),
	y: 0,
	z: 0,
};
let contactCameraPos = {
	x: -0.15,
	y: 0,
	z: 0.48,
};
let contactCameraRot = {
	x: 0,
	y: 15 * (Math.PI / 180),
	z: 0,
};
let aboutCameraPos = {
	x: 0.55,
	y: -0.14,
	z: 0.40,
};
let aboutCameraRot = {
	x: 0,
	y: -10 * (Math.PI / 180),
	z: 0,
};
let resumeCameraPos = {
	x: 0.75,
	y: -0.125,
	z: 0.59,
};
let resumeCameraRot = {
	x: -90 * (Math.PI / 180),
	y: 0,
	z: 0,
};
let videoEditorCameraPos = {
	x: 0.32,
	y: -0.12,
	z: 0.66,
};
let videoEditorCameraRot = {
	x: -90 * (Math.PI / 180),
	y: 0,
	z: 2 * (Math.PI / 180),
};
let underbellyCameraPos = {
	x: -0.37,
	y: -0.12,
	z: 0.58,
};
let underbellyCameraRot = {
	x: -90 * (Math.PI / 180),
	y: 0,
	z: 32 * (Math.PI / 180),
};
let landmarkedCameraPos = {
	x: -0.03,
	y: -0.12,
	z: 0.53,
};
let landmarkedCameraRot = {
	x: -90 * (Math.PI / 180),
	y: 0,
	z: 0,
};

// Scene & Camera
// Look into putting this into an init function. Something like:
// function init() {
// 	scene = new THREE.Scene();
// 	camera = new THREE....
// }

// Setup handling of warning screen
document.getElementById('warning-exit').addEventListener('click', function(e) {
	document.getElementById('warning-screen').style.display = 'none';
})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
	75, 
	window.innerWidth / window.innerHeight, 
	0.1, 
	1000 
);
camera.position.set(defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z);
camera.rotation.set(defaultCameraRot.x, defaultCameraRot.y, defaultCameraRot.z);

// Renderer
const renderer = new THREE.WebGLRenderer({
	// canvas: canvas,
	antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.minDistance = 0.5;
controls.maxDistance = 2;
controls.minAzimuthAngle = Math.PI * -0.15;
controls.maxAzimuthAngle = Math.PI * 0.15;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2;
controls.update();

// LOAD MODEL & ASSET
// -------------------- OLD STLYE. USE DRACO IF PERFORMANCE IS BAD -------------------------------------
const gltfLoader = new GLTFLoader();
gltfLoader.load('models/workbench.gltf', function (workbench) {
	workbench.scene.scale.set(0.01, 0.01, 0.01);
	workbench.scene.traverse(function (child) {
		if (child.isMesh) {
			if (child.name.includes("Tray")) {
				child.material.transparent = true;
				child.material.opacity = 0.2;
			}
			child.castShadow = true;
			child.receiveShadow = true;
		};
	});
	scene.add(workbench.scene);
	animate();

	// Load text & elements
	loadTitleText();

	// Add event listeners
	homeMenuListener();
	resumeMenuListener();
	aboutMenuListener();
	projectsMenuListener();
	contactMenuListener();
	sendEmailListener();
}, undefined, function (error) {
	console.error(error);
});

// ADD LIGHT
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight);
const roomLight = new THREE.PointLight(0xffffff, 3, 10);
roomLight.position.set(-0.5, 2, 0.5);
roomLight.castShadow = true;
roomLight.shadow.radius = 5;
roomLight.shadow.mapSize.width = 2048;
roomLight.shadow.mapSize.height = 2048;
roomLight.shadow.camera.far = 2.5;
roomLight.shadow.bias = -0.002;
scene.add(roomLight);

// SETUP HELPERS
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
// const gridHelper = new THREE.GridHelper(30, 30);
// scene.add(gridHelper);

// ADD CLOCK
const clock = new THREE.Clock();
console.log(clock)

function loadTitleText() {
	const loader = new FontLoader();
	const textMaterials = [
		new THREE.MeshPhongMaterial({ color: 0x171f27, flatShading: true}),
		new THREE.MeshPhongMaterial({ color: 0xffffff }),
	];

	// Load name
	loader.load('fonts/Inconsolata_Regular.json', function (font) {
		const nameTextGeometry = new TextGeometry('<Brad Grigsby/>', {
			font: font,
			size: 0.1,
			depth: 0.03,
			curveSegments: 12,
			bevelEnabled: false
		});

		nameTextMesh = new THREE.Mesh(nameTextGeometry, textMaterials);
		nameTextMesh.position.set(-0.47, 0.6, -0.03);
		scene.add(nameTextMesh);
	});

	// Load subtitle
	loader.load('fonts/Inconsolata_Regular.json', function (font) {
		const subtitleTextGeometry = new TextGeometry('<Software Engineer - NYC/>', {
			font: font,
			size: 0.05,
			depth: 0.03,
			curveSegments: 12,
			bevelEnabled: false,
		});

		subtitleTextMesh = new THREE.Mesh(subtitleTextGeometry, textMaterials);
		subtitleTextMesh.position.set(-0.4, 0.53, -0.03);
		scene.add(subtitleTextMesh)
	});
}

function homeMenuListener() {
	document.getElementById('home-menu').addEventListener('click', function(e) {
		e.preventDefault();
		enableOrbitControls();
		cameraToTarget(defaultCameraPos, defaultCameraRot, hideContactForm);
	})
}

function resumeMenuListener() {
	document.getElementById('resume-menu').addEventListener('click', function(e) {
		e.preventDefault();
		disableOrbitControls();
		cameraToTarget(resumeCameraPos, resumeCameraRot);
	});
}

function aboutMenuListener() {
	document.getElementById('about-menu').addEventListener('click', function(e) {
		e.preventDefault();
		disableOrbitControls();
		cameraToTarget(aboutCameraPos, aboutCameraRot);
	});
}

function projectsMenuListener() {
	document.getElementById('projects-menu').addEventListener('click', function(e) {
		e.preventDefault();
		disableOrbitControls();
		document.querySelector('.projects-dropdown').style.display = 'block'
	});

	document.querySelectorAll('.projects-dropdown a').forEach(item => {
		item.addEventListener('click', function(e) {
			e.preventDefault();
			const project = this.getAttribute('data-project');
			switch (project) {
			case 'videoEditor':
				cameraToTarget(videoEditorCameraPos, videoEditorCameraRot);
				break;
			case 'underbelly':
				cameraToTarget(underbellyCameraPos, underbellyCameraRot);
				break;
			case 'landmarked':
				cameraToTarget(landmarkedCameraPos, landmarkedCameraRot);
				break;
			}
		});
	});
}

function contactMenuListener() {
	document.getElementById('contact-menu').addEventListener('click', function(e) {
		e.preventDefault();
		disableOrbitControls();
		cameraToTarget(defaultCameraPos, defaultCameraRot, function() {
			document.getElementById('contact-form').style.display = 'block';
		});
	});
}

function hideContactForm () {
	document.getElementById('contact-form').style.display = 'none';
	enableOrbitControls();
}

function cameraToTarget(position, rotation, callback) {
	gsap.to(camera.position, {
		x: position.x,
		y: position.y,
		z: position.z,
		duration: 1,
		onComplete: callback,
	});

	gsap.to(camera.rotation, {
		x: rotation.x,
		y: rotation.y,
		z: rotation.z,
		duration: 1,
	});
}

function sendEmailListener () {
	document.getElementById('send-email').addEventListener('click', function(e) {
		const name = document.getElementById('name').value;
		const subject = document.getElementById('subject').value;
		const message = document.getElementById('message').value;

		emailjs.send("service_ag0be8b", "template_9scsxo5", {
			subject: subject,
			name: name,
			message: message
		}).then(function(response) {
			console.log('SUCCESS!', response,status, response.text);
		}, function(error) {
			console.log('FAILED...', error);
		});
		
		hideContactForm();
	})

	document.getElementById('contact-exit').addEventListener('click', function(e) {
		hideContactForm();
	})
}

function enableOrbitControls() {
	controls.enabled = true;
}

function disableOrbitControls() {
	controls.enabled = false;
}

// update camera, renderer on resize
function animate() {
	requestAnimationFrame(animate);

	if (mixer) {
		mixer.update(clock.getDelta());
	}
	renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}