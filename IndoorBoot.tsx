import { useMemo } from 'react'
import * as THREE from 'three'
import { indoorBoot, anatomy } from '../../config/productConfig'
import { Selectable, useIsSelected, selectionEmissive, selectionIntensity } from './Selectable'
import { createFootShellGeometry, createRockerSoleGeometry } from './geometryHelpers'

interface IndoorBootProps {
  plantarflexionDeg: number
  showUpper?: boolean
  cutaway?: boolean
  position?: [number, number, number]
  strapsFastened?: boolean
}

export function IndoorBoot({
  plantarflexionDeg,
  showUpper = true,
  cutaway = false,
  position = [0, 0, 0],
  strapsFastened = true,
}: IndoorBootProps) {
  const selected = useIsSelected('indoorBoot')
  const angle = THREE.MathUtils.degToRad(plantarflexionDeg)
  const opacity = cutaway ? 0.3 : 1

  const fleece = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: indoorBoot.color,
        roughness: 0.95,
        metalness: 0,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: opacity < 1,
        opacity,
      }),
    [selected, opacity],
  )

  const plush = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: indoorBoot.accentColor,
        roughness: 0.98,
        metalness: 0,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: opacity < 1,
        opacity,
      }),
    [selected, opacity],
  )

  const sole = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: indoorBoot.soleColor,
        roughness: 0.85,
        metalness: 0.05,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected) * 0.4,
      }),
    [selected],
  )

  const strap = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4A5058',
        roughness: 0.75,
        metalness: 0.05,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected) * 0.5,
      }),
    [selected],
  )

  const soleGeo = useMemo(
    () => createRockerSoleGeometry(anatomy.footLength * 0.95, anatomy.footWidth + 0.055, indoorBoot.soleThickness),
    [],
  )
  const upperGeo = useMemo(
    () => createFootShellGeometry(anatomy.footLength * 0.9, anatomy.footWidth + 0.05, 0.085 + indoorBoot.plushness),
    [],
  )

  return (
    <Selectable id="indoorBoot" groupProps={{ position }}>
      <group rotation={[-angle * 0.2, 0, 0]}>
        <mesh position={[0, -0.048, 0.02]} geometry={soleGeo} material={sole} castShadow receiveShadow />
        <mesh position={[0, -0.036, 0.02]} scale={[1.02, 0.35, 1.01]} geometry={soleGeo} material={plush} />

        {showUpper && (
          <>
            <mesh position={[0, 0.015, 0.02]} geometry={upperGeo} material={fleece} castShadow />
            {/* Soft toe puff */}
            <mesh position={[0, 0.02, 0.2]} material={plush} castShadow>
              <sphereGeometry args={[0.05, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            </mesh>
            <mesh position={[0, indoorBoot.shaftHeight * 0.5, 0.03]} material={fleece} castShadow>
              <cylinderGeometry
                args={[
                  anatomy.calfRadiusAnkle + 0.038,
                  anatomy.calfRadiusAnkle + 0.048,
                  indoorBoot.shaftHeight,
                  20,
                ]}
              />
            </mesh>
            <mesh position={[0, indoorBoot.shaftHeight + 0.002, 0.03]} material={plush} castShadow>
              <torusGeometry args={[anatomy.calfRadiusAnkle + 0.036, 0.015, 8, 18]} />
            </mesh>
            {[0.04, 0.09].map((y) => (
              <mesh
                key={y}
                position={[0.01, y, anatomy.calfRadiusAnkle + 0.046]}
                rotation={[0, 0, strapsFastened ? 0 : 0.5]}
                scale={[strapsFastened ? 1 : 0.8, 1, 1]}
                material={strap}
                castShadow
              >
                <boxGeometry args={[0.1, 0.03, 0.009]} />
              </mesh>
            ))}
          </>
        )}
      </group>
    </Selectable>
  )
}
