import { useMemo } from 'react'
import * as THREE from 'three'
import { anatomy, coreSock } from '../../config/productConfig'
import { Selectable, useIsSelected, selectionEmissive, selectionIntensity } from './Selectable'
import { createFootShellGeometry } from './geometryHelpers'

interface CoreSockProps {
  plantarflexionDeg: number
  opacity?: number
  position?: [number, number, number]
}

export function CoreSock({ plantarflexionDeg, opacity = 1, position = [0, 0, 0] }: CoreSockProps) {
  const selected = useIsSelected('coreSock')
  const angle = THREE.MathUtils.degToRad(plantarflexionDeg)

  const textile = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: coreSock.color,
        roughness: 0.92,
        metalness: 0.02,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: opacity < 1,
        opacity,
      }),
    [selected, opacity],
  )

  const pad = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: coreSock.padColor,
        roughness: 0.88,
        metalness: 0.01,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: opacity < 1,
        opacity,
      }),
    [selected, opacity],
  )

  const cuff = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: coreSock.cuffColor,
        roughness: 0.85,
        metalness: 0.02,
        emissive: selectionEmissive(selected),
        emissiveIntensity: selectionIntensity(selected),
        transparent: opacity < 1,
        opacity,
      }),
    [selected, opacity],
  )

  const footGeo = useMemo(
    () =>
      createFootShellGeometry(
        anatomy.footLength * 0.92,
        anatomy.footWidth + 0.018,
        anatomy.footHeight * 0.75 + coreSock.thickness,
      ),
    [],
  )

  const inclineLift = Math.sin(angle) * 0.035

  return (
    <Selectable id="coreSock" groupProps={{ position }}>
      {/* Knee-high shaft with slight oval scale */}
      <group scale={[1.05, 1, 0.95]}>
        <mesh position={[0, coreSock.shaftHeight * 0.5, 0]} material={textile} castShadow receiveShadow>
          <cylinderGeometry
            args={[
              anatomy.calfRadiusTop + coreSock.thickness,
              anatomy.calfRadiusAnkle + coreSock.thickness,
              coreSock.shaftHeight,
              32,
            ]}
          />
        </mesh>
      </group>

      {/* Soft rolled cuff */}
      <mesh position={[0, coreSock.shaftHeight + 0.006, 0]} material={cuff} castShadow>
        <torusGeometry args={[anatomy.calfRadiusTop + 0.006, 0.014, 12, 28]} />
      </mesh>

      {/* Achilles padding — posterior vertical pad */}
      <mesh
        position={[0, 0.09, -(anatomy.calfRadiusAnkle + 0.012)]}
        material={pad}
        castShadow
      >
        <capsuleGeometry args={[0.022, 0.08, 6, 12]} />
      </mesh>

      <group rotation={[-angle, 0, 0]}>
        {/* Contoured sock foot */}
        <mesh position={[0, -0.005 + inclineLift * 0.15, 0.02]} geometry={footGeo} material={textile} castShadow receiveShadow />

        {/* Padded heel cup */}
        <mesh position={[0, 0.0 + inclineLift * 0.2, -0.015]} material={pad} castShadow>
          <sphereGeometry args={[anatomy.heelRadius + 0.01, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
        </mesh>

        {/* Inclined footbed wedge — clinician-set visual */}
        <mesh
          position={[0, -0.028 + inclineLift * 0.4, 0.06]}
          rotation={[-angle * 0.4, 0, 0]}
          material={pad}
          castShadow
        >
          <boxGeometry args={[anatomy.footWidth * 0.85, 0.018 + inclineLift * 0.5, 0.12]} />
        </mesh>

        {/* Subtle midfoot knit rings */}
        {[0.07, 0.11, 0.15].map((z) => (
          <mesh key={z} position={[0, 0.012, z]} rotation={[Math.PI / 2, 0, 0]} material={cuff}>
            <torusGeometry args={[0.046, 0.0035, 6, 24]} />
          </mesh>
        ))}
      </group>
    </Selectable>
  )
}
