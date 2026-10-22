import { useMemo } from 'react'
import * as THREE from 'three'
import { anatomy, palette } from '../../config/productConfig'
import { Selectable, useIsSelected, selectionEmissive, selectionIntensity } from './Selectable'
import { createFootShellGeometry } from './geometryHelpers'

/**
 * Simplified lower-leg + foot silhouette with adjustable plantarflexion.
 * Shin stays upright; foot rotates at the ankle so toes point downward.
 */
export function AnatomicalFoot({
  plantarflexionDeg,
  visible = true,
}: {
  plantarflexionDeg: number
  visible?: boolean
}) {
  const selected = useIsSelected('anatomicalFoot')
  const angle = THREE.MathUtils.degToRad(plantarflexionDeg)

  const skinMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: palette.skin,
        roughness: 0.85,
        metalness: 0.02,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: true,
        opacity: 0.5,
      }),
    [selected],
  )

  const footGeo = useMemo(
    () => createFootShellGeometry(anatomy.footLength * 0.85, anatomy.footWidth * 0.9, anatomy.footHeight * 0.7),
    [],
  )

  if (!visible) return null

  return (
    <Selectable id="anatomicalFoot">
      <mesh position={[0, anatomy.calfLength * 0.5, 0]} material={skinMat} castShadow>
        <cylinderGeometry
          args={[anatomy.calfRadiusTop, anatomy.calfRadiusAnkle, anatomy.calfLength, 28]}
        />
      </mesh>
      <mesh position={[0, anatomy.calfLength + 0.012, 0]} material={skinMat}>
        <sphereGeometry args={[anatomy.calfRadiusTop * 0.95, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
      </mesh>

      <group rotation={[-angle, 0, 0]}>
        <mesh position={[0, -0.01, 0.02]} geometry={footGeo} material={skinMat} castShadow />
        <mesh position={[0, 0.0, -0.01]} material={skinMat} castShadow>
          <sphereGeometry args={[anatomy.heelRadius * 0.78, 16, 12]} />
        </mesh>
      </group>
    </Selectable>
  )
}

export function useFootRotation(plantarflexionDeg: number) {
  return useMemo(
    () => [-THREE.MathUtils.degToRad(plantarflexionDeg), 0, 0] as [number, number, number],
    [plantarflexionDeg],
  )
}
