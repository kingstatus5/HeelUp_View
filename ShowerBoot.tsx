import { useMemo } from 'react'
import * as THREE from 'three'
import { showerBoot, anatomy, palette } from '../../config/productConfig'
import { Selectable, useIsSelected, selectionEmissive, selectionIntensity } from './Selectable'
import { InflatableCollar } from './InflatableCollar'
import { createFootShellGeometry, createRockerSoleGeometry } from './geometryHelpers'

interface ShowerBootProps {
  plantarflexionDeg: number
  showUpper?: boolean
  cutaway?: boolean
  position?: [number, number, number]
  collarInflated?: boolean
  collarAnimating?: boolean
  coverClosed?: boolean
}

export function ShowerBoot({
  plantarflexionDeg,
  showUpper = true,
  cutaway = false,
  position = [0, 0, 0],
  collarInflated = true,
  collarAnimating = false,
  coverClosed = true,
}: ShowerBootProps) {
  const selected = useIsSelected('showerBoot')
  const soleSelected = useIsSelected('showerSole')
  const angle = THREE.MathUtils.degToRad(plantarflexionDeg)
  const coverOpacity = cutaway ? 0.12 : showerBoot.coverOpacity * (coverClosed ? 1 : 0.2)

  const cover = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: showerBoot.coverColor,
        roughness: 0.12,
        metalness: 0.04,
        transmission: cutaway ? 0.08 : 0.62,
        thickness: 0.025,
        transparent: true,
        opacity: Math.max(coverOpacity, 0.18),
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        side: THREE.DoubleSide,
      }),
    [selected, coverOpacity, cutaway],
  )

  const sole = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: showerBoot.soleColor,
        roughness: 0.55,
        metalness: 0.08,
        emissive: selectionEmissive(soleSelected || selected),
        emissiveIntensity: selectionIntensity(soleSelected || selected),
      }),
    [soleSelected, selected],
  )

  const bubble = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: palette.cyanMuted,
        roughness: 0.35,
        metalness: 0.12,
        emissive: selectionEmissive(soleSelected),
        emissiveIntensity: selectionIntensity(soleSelected) * 0.6,
      }),
    [soleSelected],
  )

  const soleGeo = useMemo(
    () => createRockerSoleGeometry(anatomy.footLength * 0.92, anatomy.footWidth + 0.05, 0.02),
    [],
  )
  const footCoverGeo = useMemo(
    () => createFootShellGeometry(anatomy.footLength * 0.9, anatomy.footWidth + 0.048, 0.085),
    [],
  )

  const bubbles = useMemo(() => {
    const items: { pos: [number, number, number]; r: number }[] = []
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        items.push({
          pos: [(i - 1) * 0.032, -0.06, 0.02 + j * 0.045],
          r: 0.013 + ((i + j) % 3) * 0.003,
        })
      }
    }
    return items
  }, [])

  return (
    <group position={position}>
      <Selectable id="showerBoot">
        {showUpper && (
          <>
            <mesh
              position={[0, showerBoot.shaftHeight * 0.45, 0.02]}
              scale={[coverClosed ? 1 : 0.92, 1, coverClosed ? 1 : 0.92]}
              material={cover}
              castShadow
            >
              <cylinderGeometry
                args={[
                  anatomy.calfRadiusTop + 0.028,
                  anatomy.calfRadiusAnkle + 0.042,
                  showerBoot.shaftHeight * 0.9,
                  28,
                  1,
                  true,
                ]}
              />
            </mesh>
            <group rotation={[-angle * 0.2, 0, 0]}>
              <mesh position={[0, 0.01, 0.02]} geometry={footCoverGeo} material={cover} castShadow />
            </group>
          </>
        )}
      </Selectable>

      <Selectable id="showerSole">
        <group rotation={[-angle * 0.2, 0, 0]}>
          <mesh position={[0, -0.048, 0.02]} geometry={soleGeo} material={sole} castShadow receiveShadow />
          {bubbles.map((b, i) => (
            <mesh key={i} position={b.pos} material={bubble} castShadow>
              <sphereGeometry args={[b.r, 12, 10]} />
            </mesh>
          ))}
        </group>
      </Selectable>

      {showUpper && (
        <InflatableCollar
          inflated={collarInflated}
          animating={collarAnimating}
          position={[0, 0, 0]}
        />
      )}
    </group>
  )
}
