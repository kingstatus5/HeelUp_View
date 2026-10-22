import { useMemo } from 'react'
import * as THREE from 'three'
import { ankleStraps, anatomy } from '../../config/productConfig'
import { Selectable, useIsSelected, selectionEmissive, selectionIntensity } from './Selectable'

interface AnkleStrapsProps {
  position?: [number, number, number]
  fastened?: boolean
  opacity?: number
}

function StrapBand({
  rotation,
  material,
  fastened,
}: {
  rotation: [number, number, number]
  material: THREE.MeshStandardMaterial
  fastened: boolean
}) {
  const scale = fastened ? 1 : 0.85
  return (
    <group rotation={rotation} scale={[scale, scale, fastened ? 1 : 0.7]}>
      <mesh material={material} castShadow>
        <torusGeometry args={[anatomy.calfRadiusAnkle + 0.025, ankleStraps.thickness * 0.9, 8, 28, Math.PI * 1.35]} />
      </mesh>
      {/* Hook-and-loop tab */}
      <mesh position={[0.05, 0.01, 0.03]} rotation={[0.2, 0.4, 0.1]} material={material} castShadow>
        <boxGeometry args={[0.045, ankleStraps.width * 0.9, 0.006]} />
      </mesh>
    </group>
  )
}

export function AnkleStraps({
  position = [0, 0, 0],
  fastened = true,
  opacity = 1,
}: AnkleStrapsProps) {
  const selected = useIsSelected('ankleStraps')
  const cross = THREE.MathUtils.degToRad(ankleStraps.crossAngleDeg)

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: ankleStraps.color,
        roughness: 0.75,
        metalness: 0.05,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: opacity < 1,
        opacity,
      }),
    [selected, opacity],
  )

  return (
    <Selectable id="ankleStraps" groupProps={{ position: [position[0], position[1] + 0.06, position[2]] }}>
      <StrapBand rotation={[cross, 0, 0.15]} material={mat} fastened={fastened} />
      <StrapBand rotation={[-cross, Math.PI, -0.15]} material={mat} fastened={fastened} />
      {/* Small center anchor pad */}
      <mesh position={[0, 0, anatomy.calfRadiusAnkle + 0.02]} material={mat}>
        <boxGeometry args={[0.03, 0.03, 0.008]} />
      </mesh>
    </Selectable>
  )
}
