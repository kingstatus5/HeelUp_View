import { useMemo } from 'react'
import * as THREE from 'three'
import { outdoorBoot, anatomy } from '../../config/productConfig'
import { Selectable, useIsSelected, selectionEmissive, selectionIntensity } from './Selectable'
import { createFootShellGeometry, createRockerSoleGeometry } from './geometryHelpers'

interface OutdoorBootProps {
  plantarflexionDeg: number
  showUpper?: boolean
  cutaway?: boolean
  position?: [number, number, number]
  strapsFastened?: boolean
}

export function OutdoorBoot({
  plantarflexionDeg,
  showUpper = true,
  cutaway = false,
  position = [0, 0, 0],
  strapsFastened = true,
}: OutdoorBootProps) {
  const selected = useIsSelected('outdoorBoot')
  const toeSelected = useIsSelected('outdoorToe')
  const angle = THREE.MathUtils.degToRad(plantarflexionDeg)
  const opacity = cutaway ? 0.28 : 1

  const leather = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: outdoorBoot.color,
        roughness: 0.55,
        metalness: 0.12,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: opacity < 1,
        opacity,
        side: THREE.DoubleSide,
      }),
    [selected, opacity],
  )

  const accent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: outdoorBoot.accentColor,
        roughness: 0.5,
        metalness: 0.15,
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
        color: outdoorBoot.soleColor,
        roughness: 0.9,
        metalness: 0.05,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected) * 0.4,
      }),
    [selected],
  )

  const collar = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: outdoorBoot.collarColor,
        roughness: 0.8,
        metalness: 0.02,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: opacity < 1,
        opacity,
      }),
    [selected, opacity],
  )

  const toeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3A4048',
        roughness: 0.4,
        metalness: 0.35,
        emissive: selectionEmissive(toeSelected || selected),
        emissiveIntensity: selectionIntensity(toeSelected || selected),
        transparent: opacity < 1,
        opacity,
      }),
    [toeSelected, selected, opacity],
  )

  const strapMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2A2F35',
        roughness: 0.7,
        metalness: 0.08,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected) * 0.5,
      }),
    [selected],
  )

  const soleGeo = useMemo(
    () => createRockerSoleGeometry(anatomy.footLength * 0.95, anatomy.footWidth + 0.045, outdoorBoot.soleThickness),
    [],
  )
  const upperGeo = useMemo(
    () => createFootShellGeometry(anatomy.footLength * 0.88, anatomy.footWidth + 0.04, 0.09),
    [],
  )

  return (
    <group position={position}>
      <Selectable id="outdoorBoot">
        <group rotation={[-angle * 0.25, 0, 0]}>
          <mesh position={[0, -0.055, 0.02]} geometry={soleGeo} material={sole} castShadow receiveShadow />
          {/* Midsole stripe */}
          <mesh position={[0, -0.036, 0.05]} scale={[0.98, 0.45, 0.92]} geometry={soleGeo} material={accent} castShadow />
          {/* Heel rocker lift */}
          <mesh position={[0, -0.042, -0.02]} rotation={[0.18, 0, 0]} material={sole} castShadow>
            <boxGeometry args={[anatomy.footWidth + 0.03, outdoorBoot.soleThickness * 0.7, 0.08]} />
          </mesh>
          {/* Lug ribs */}
          {[-0.02, 0.04, 0.1, 0.16].map((z) => (
            <mesh key={z} position={[0, -0.068, z]} material={sole}>
              <boxGeometry args={[anatomy.footWidth + 0.02, 0.01, 0.022]} />
            </mesh>
          ))}
        </group>

        {showUpper && (
          <>
            <group rotation={[-angle * 0.25, 0, 0]}>
              <mesh position={[0, 0.01, 0.02]} geometry={upperGeo} material={leather} castShadow />
              {/* Protective side panels */}
              <mesh position={[anatomy.footWidth * 0.52, 0.035, 0.07]} material={accent} castShadow>
                <boxGeometry args={[0.01, 0.07, 0.12]} />
              </mesh>
              <mesh position={[-anatomy.footWidth * 0.52, 0.035, 0.07]} material={accent} castShadow>
                <boxGeometry args={[0.01, 0.07, 0.12]} />
              </mesh>
            </group>

            <mesh position={[0, outdoorBoot.shaftHeight * 0.45, 0.02]} material={leather} castShadow>
              <cylinderGeometry
                args={[
                  anatomy.calfRadiusAnkle + 0.032,
                  anatomy.calfRadiusAnkle + 0.042,
                  outdoorBoot.shaftHeight,
                  24,
                ]}
              />
            </mesh>

            <mesh position={[0, outdoorBoot.shaftHeight + 0.008, 0.02]} material={collar} castShadow>
              <torusGeometry args={[anatomy.calfRadiusAnkle + 0.03, 0.016, 10, 22]} />
            </mesh>

            {[0.05, 0.12].map((y, i) => (
              <mesh
                key={y}
                position={[0.02, y, anatomy.calfRadiusAnkle + 0.038]}
                rotation={[0, 0, strapsFastened ? 0 : 0.4]}
                scale={strapsFastened ? 1 : 0.85}
                material={strapMat}
                castShadow
              >
                <boxGeometry args={[0.085 - i * 0.01, 0.026, 0.007]} />
              </mesh>
            ))}
          </>
        )}
      </Selectable>

      {showUpper && (
        <Selectable id="outdoorToe">
          <mesh
            position={[0, 0.005, 0.19]}
            rotation={[-angle * 0.25, 0, 0]}
            material={toeMat}
            castShadow
          >
            <sphereGeometry args={[0.048, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
          </mesh>
          <mesh
            position={[0, -0.005, 0.205]}
            rotation={[-angle * 0.25, 0, 0]}
            scale={[1.15, 0.7, 0.9]}
            material={toeMat}
          >
            <boxGeometry args={[anatomy.footWidth * 0.7, outdoorBoot.toeBoxHeight * 0.45, outdoorBoot.toeBoxLength * 0.55]} />
          </mesh>
        </Selectable>
      )}
    </group>
  )
}
