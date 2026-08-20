import * as THREE from "three";

type CrystalOpts = {
  radius: number;
  bodyHeight: number;
  tipHeight: number;
};

function hexRing(y: number, r: number, twist = Math.PI / 6): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + twist;
    pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
  }
  return pts;
}

function addFace(
  positions: number[],
  normals: number[],
  a: THREE.Vector3,
  b: THREE.Vector3,
  c: THREE.Vector3,
) {
  const n = new THREE.Vector3()
    .subVectors(b, a)
    .cross(new THREE.Vector3().subVectors(c, a))
    .normalize();
  positions.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
  normals.push(n.x, n.y, n.z, n.x, n.y, n.z, n.x, n.y, n.z);
}

/** Faceted double-terminated hexagonal crystal (quartz / candlestick body). */
export function buildCrystalGeometry(opts: CrystalOpts): THREE.BufferGeometry {
  const { radius, bodyHeight, tipHeight } = opts;
  const half = bodyHeight / 2;
  const girdle = hexRing(0, radius);
  const upper = hexRing(half, radius * 0.72);
  const lower = hexRing(-half, radius * 0.72);
  const apex = new THREE.Vector3(0, half + tipHeight, 0);
  const nadir = new THREE.Vector3(0, -half - tipHeight, 0);

  const positions: number[] = [];
  const normals: number[] = [];

  for (let i = 0; i < 6; i++) {
    const j = (i + 1) % 6;
    addFace(positions, normals, apex, upper[i], upper[j]);
    addFace(positions, normals, upper[i], girdle[i], girdle[j]);
    addFace(positions, normals, upper[i], girdle[j], upper[j]);
    addFace(positions, normals, girdle[i], lower[i], lower[j]);
    addFace(positions, normals, girdle[i], lower[j], girdle[j]);
    addFace(positions, normals, nadir, lower[j], lower[i]);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.computeBoundingSphere();
  return geo;
}
