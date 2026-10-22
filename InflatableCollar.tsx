import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { showerBoot, anatomy } from '../../config/productConfig'
import { Selectable, useIsSelected, selectionEmissive, selectionIntensity } from './Selectable'

interface InflatableCollarProps {
  inflated: boolean
  position?: [number, number, number]
  animating?: boolean
}

export function InflatableCollar({
  inflated,
  position = [0, 0, 0],
  animating = false,
}: InflatableCollarProps) {
  const selected = useIsSelected('inflatableCollar')
  const bulbSelected = useIsSelected('inflationBulb')
  const ringRef = useRef<THREE.Mesh>(null)
  const target: number = inflated
    ? showerBoot.collarRadiusInflated
    : showerBoot.collarRadiusDeflated
  const current = useRef<number>(target)

  useFrame((_, dt) => {
    if (!ringRef.current) return
    const speed = animating ? 1.8 : 4
    current.current = THREE.MathUtils.damp(current.current, target, speed, dt)
    const s = current.current / showerBoot.collarRadiusInflated
    ringRef.current.scale.set(s, s * (0.85 + 0.15 * s), s)
  })

  const collarMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: showerBoot.collarColor,
        roughness: 0.45,
        metalness: 0.05,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
      }),
    [selected],
  )

  const bulbMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: showerBoot.bulbColor,
        roughness: 0.4,
        metalness: 0.08,
        emissive: selectionEmissive(bulbSelected),
        emissiveIntensity: selectionIntensity(bulbSelected),
      }),
    [bulbSelected],
  )

  const tubeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#7AB8C0',
        roughness: 0.5,
        metalness: 0.05,
        emissive: selectionEmissive(bulbSelected || selected),
        emissiveIntensity: selectionIntensity(bulbSelected || selected) * 0.5,
      }),
    [bulbSelected, selected],
  )

  const tubeCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(showerBoot.collarRadiusInflated * 0.7, 0, 0),
        new THREE.Vector3(0.12, -0.04, 0.06),
        new THREE.Vector3(0.14, -0.12, 0.1),
        new THREE.Vector3(0.1, -0.18, 0.12),
      ]),
    [],
  )
  const tubeGeom = useMemo(() => new THREE.TubeGeometry(tubeCurve, 20, 0.006, 6, false), [tubeCurve])

  return (
    <group position={position}>
      <Selectable id="inflatableCollar">
        <mesh
          ref={ringRef}
          position={[0, showerBoot.shaftHeight * 0.92, 0.02]}
          material={collarMat}
          castShadow
        >
          <torusGeometry args={[showerBoot.collarRadiusInflated, showerBoot.collarTubeRadius, 14, 28]} />
        </mesh>
        {/* Inner seal lip */}
        <mesh position={[0, showerBoot.shaftHeight * 0.92, 0.02]} material={collarMat}>
          <torusGeometry
            args={[
              inflated ? anatomy.calfRadiusTop + 0.01 : anatomy.calfRadiusTop + 0.02,
              0.008,
              8,
              20,
            ]}
          />
        </mesh>
      </Selectable>

      <Selectable id="inflationBulb">
        <mesh geometry={tubeGeom} material={tubeMat} castShadow />
        <mesh position={[0.1, showerBoot.shaftHeight * 0.92 - 0.2, 0.14]} material={bulbMat} castShadow>
          <sphereGeometry args={[inflated ? 0.028 : 0.022, 14, 12]} />
        </mesh>
        {/* Valve nub */}
        <mesh position={[0.1, showerBoot.shaftHeight * 0.92 - 0.175, 0.14]} material={tubeMat}>
          <cylinderGeometry args={[0.006, 0.008, 0.02, 8]} />
        </mesh>
      </Selectable>
    </group>
  )
}
