import { useMemo } from 'react'
import * as THREE from 'three'
import { underfootStrap, anatomy } from '../../config/productConfig'
import { Selectable, useIsSelected, selectionEmissive, selectionIntensity } from './Selectable'

interface UnderfootStrapProps {
  plantarflexionDeg: number
  position?: [number, number, number]
  fastened?: boolean
  opacity?: number
}

export function UnderfootStrap({
  plantarflexionDeg,
  position = [0, 0, 0],
  fastened = true,
  opacity = 1,
}: UnderfootStrapProps) {
  const selected = useIsSelected('underfootStrap')
  const angle = THREE.MathUtils.degToRad(plantarflexionDeg)

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: underfootStrap.color,
        roughness: 0.7,
        metalness: 0.08,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: opacity < 1,
        opacity,
      }),
    [selected, opacity],
  )

  const loopMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#5A6168',
        roughness: 0.8,
        metalness: 0.05,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected) * 0.6,
        transparent: opacity < 1,
        opacity,
      }),
    [selected, opacity],
  )

  // Curve from under midfoot up the anterior shin
  const points = useMemo(() => {
    const midZ = anatomy.footLength * underfootStrap.forefootAnchor * 0.55
    const lift = fastened ? 0 : 0.08
    return [
      new THREE.Vector3(0, -0.04 - lift, midZ),
      new THREE.Vector3(0, -0.02, midZ * 0.7),
      new THREE.Vector3(0, 0.04, 0.04),
      new THREE.Vector3(0, underfootStrap.calfAnchorY * 0.5, anatomy.calfRadiusAnkle + 0.02),
      new THREE.Vector3(0, underfootStrap.calfAnchorY, anatomy.calfRadiusAnkle * 0.3),
    ]
  }, [fastened])

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 32, underfootStrap.width * 0.35, 8, false), [curve])

  return (
    <Selectable id="underfootStrap" groupProps={{ position }}>
      <group rotation={[-angle * 0.35, 0, 0]}>
        <mesh geometry={tube} material={mat} castShadow />
        {/* Underfoot pad */}
        <mesh
          position={[0, -0.045 - (fastened ? 0 : 0.05), anatomy.footLength * 0.22]}
          material={mat}
          castShadow
        >
          <boxGeometry args={[anatomy.footWidth * 0.7, 0.008, 0.06]} />
        </mesh>
      </group>
      {/* Hook-and-loop calf attachment */}
      <mesh
        position={[0, underfootStrap.calfAnchorY + (fastened ? 0 : 0.04), anatomy.calfRadiusAnkle * 0.2]}
        material={loopMat}
        castShadow
      >
        <boxGeometry args={[0.05, 0.035, 0.01]} />
      </mesh>
    </Selectable>
  )
}
