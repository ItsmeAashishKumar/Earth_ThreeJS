// src/getStarfield.js
import * as THREE from 'three';

export default function getStarfield() {
  const starCount = 2000;
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

  const starPositions = new Float32Array(starCount * 3); // 3 values per star (x, y, z)
  for (let i = 0; i < starCount; i++) {
    const r = 500; // Radius for the star field sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPositions[i * 3 + 2] = r * Math.cos(phi);
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

  return new THREE.Points(starGeometry, starMaterial);
}
