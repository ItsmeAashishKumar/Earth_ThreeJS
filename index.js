import * as THREE from 'three'
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from './src/getStarfield.js'
import {getFresnelMat} from './src/getFresnelMat.js'

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000; // Increased far plane to encompass the star field
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

const stars = getStarfield();
scene.add(stars);

const texture = new THREE.TextureLoader().load('./texture/earthmap.jpg');
const geo = new THREE.IcosahedronGeometry(1.5, 16);
const mat = new THREE.MeshStandardMaterial({
  map: texture
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const texture2=new THREE.TextureLoader().load('./texture/earthlights.jpg')
const lightMat=new THREE.MeshBasicMaterial({
    map:texture2,
    blending:THREE.AdditiveBlending,
    opacity:0.2,
    transparent:true
})
const lightmesh=new THREE.Mesh(geo,lightMat)
scene.add(lightmesh)


const cloudTexture = new THREE.TextureLoader().load('./texture/earthcloudmaptrans.jpg');
//const cloudGeo = new THREE.IcosahedronGeometry(1.52, 16); // Slightly larger than the earth
const cloudMat = new THREE.MeshBasicMaterial({
  map: cloudTexture,
  blending: THREE.AdditiveBlending,
  opacity: 0.09,
  transparent: true,
  depthWrite: false // Ensures transparency is rendered correctly
});
const cloudMesh = new THREE.Mesh(geo, cloudMat);
cloudMesh.scale.setScalar(1.001)
scene.add(cloudMesh);


const FresnelMat=getFresnelMat()
const glowMesh=new THREE.Mesh(geo,FresnelMat)
scene.add(glowMesh)

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(-2, -0.5, 1);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  mesh.rotation.y += 0.0005;
  lightmesh.rotation.y+=0.0005
  cloudMesh.rotation.y+=0.0005
  glowMesh.rotation.y+=0.0005
}

animate();
