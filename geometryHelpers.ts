import * as THREE from 'three'

/** Rounded foot volume: heel bulb + tapered forefoot along Z */
export function createFootShellGeometry(
  length: number,
  width: number,
  height: number,
  segments = 12,
): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  const hw = width / 2
  const heel = length * 0.18
  const toe = length * 0.82
  shape.moveTo(-hw * 0.75, -heel)
  shape.quadraticCurveTo(-hw, -heel * 0.2, -hw, heel * 0.5)
  shape.lineTo(-hw * 0.95, toe * 0.55)
  shape.quadraticCurveTo(-hw * 0.7, toe, 0, toe + length * 0.08)
  shape.quadraticCurveTo(hw * 0.7, toe, hw * 0.95, toe * 0.55)
  shape.lineTo(hw, heel * 0.5)
  shape.quadraticCurveTo(hw, -heel * 0.2, hw * 0.75, -heel)
  shape.quadraticCurveTo(0, -heel * 1.35, -hw * 0.75, -heel)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: true,
    bevelThickness: height * 0.18,
    bevelSize: Math.min(width, length) * 0.04,
    bevelSegments: 3,
    curveSegments: segments,
  })
  geo.rotateX(-Math.PI / 2)
  geo.translate(0, height * 0.35, 0)
  geo.computeVertexNormals()
  return geo
}

export function createRockerSoleGeometry(
  length: number,
  width: number,
  thickness: number,
): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  const hw = width / 2
  shape.moveTo(-hw * 0.85, -length * 0.12)
  shape.quadraticCurveTo(-hw, 0, -hw * 0.95, length * 0.35)
  shape.quadraticCurveTo(-hw * 0.75, length * 0.85, 0, length * 0.92)
  shape.quadraticCurveTo(hw * 0.75, length * 0.85, hw * 0.95, length * 0.35)
  shape.quadraticCurveTo(hw, 0, hw * 0.85, -length * 0.12)
  shape.quadraticCurveTo(0, -length * 0.22, -hw * 0.85, -length * 0.12)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: thickness * 0.25,
    bevelSize: width * 0.03,
    bevelSegments: 2,
    curveSegments: 10,
  })
  geo.rotateX(-Math.PI / 2)
  geo.translate(0, thickness * 0.5, 0)
  return geo
}
