import { useMemo } from 'react'
import * as THREE from 'three'
import { sideSplints, palette } from '../../config/productConfig'
import { Selectable, useIsSelected, selectionEmissive, selectionIntensity } from './Selectable'

interface SideSplintsProps {
  position?: [number, number, number]
  opacity?: number
}

export function SideSplints({ position = [0, 0, 0], opacity = 1 }: SideSplintsProps) {
  const selected = useIsSelected('sideSplints')

  const polymer = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: sideSplints.color,
        roughness: 0.35,
        metalness: 0.45,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: opacity < 1,
        opacity,
      }),
    [selected, opacity],
  )

  const sleeve = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: palette.softGrayDark,
        roughness: 0.9,
        metalness: 0.02,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected) * 0.5,
        transparent: opacity < 1,
        opacity: opacity * 0.85,
      }),
    [selected, opacity],
  )

  const y = sideSplints.offsetY
  const x = sideSplints.lateralOffset

  const one = (side: 1 | -1) => (
    <group key={side} position={[side * x, y, 0]} rotation={[0.08, 0, side * 0.04]}>
      <mesh material={sleeve} castShadow>
        <capsuleGeometry args={[sideSplints.width * 0.45, sideSplints.length * 0.75, 6, 10]} />
      </mesh>
      <mesh position={[0, 0, 0.003]} material={polymer} castShadow>
        <capsuleGeometry args={[sideSplints.width * 0.28, sideSplints.length * 0.7, 4, 10]} />
      </mesh>
    </group>
  )

  return (
    <Selectable id="sideSplints" groupProps={{ position }}>
      {one(1)}
      {one(-1)}
    </Selectable>
  )
}
