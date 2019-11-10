// Import stylesheets
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

let camera;
let control;
let scene;
let renderer;
let geometry; 
let material;
let mesh;
let geometry2; 
let material2;
let mesh2;

const canvas: HTMLCanvasElement = document.querySelector("#app > canvas") as HTMLCanvasElement;

init();
animate();

function randomNum() {
  var buf = new Uint8Array(10);
  window.crypto.getRandomValues(buf);
  return buf[0];
}

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;
  
  const controls = new OrbitControls( camera );

  scene = new THREE.Scene();

  geometry = new THREE.ConeGeometry(0.1, 0.1, 200);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-0.25, 0, 0);

  geometry2 = new THREE.ConeGeometry(0.1, 0.1, 200);
  material2 = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.5,
    wireframe: true
  });

  mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.set(0.25, 0, 0);

  scene.add(mesh);

  scene.add(mesh2);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += randomNum() / 10000 * 3.55;
  mesh.rotation.y += randomNum() / 10000 * 3.55;
  mesh.rotation.z += randomNum() / 10000 * 3.55;

  mesh2.rotation.x += Math.random() / 10;
  mesh2.rotation.y += Math.random() / 10;
  mesh2.rotation.z += Math.random() / 10;

  renderer.render(scene, camera);
}