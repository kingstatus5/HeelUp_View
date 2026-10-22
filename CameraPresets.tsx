import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { cameraPresets } from '../config/productConfig'
import { useViewerStore } from '../store/viewerStore'

export function CameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()
  const preset = useViewerStore((s) => s.cameraPreset)
  const clearCameraPreset = useViewerStore((s) => s.clearCameraPreset)
  const animating = useRef(false)
  const fromPos = useRef(new THREE.Vector3())
  const toPos = useRef(new THREE.Vector3())
  const fromTarget = useRef(new THREE.Vector3())
  const toTarget = useRef(new THREE.Vector3())
  const t = useRef(0)

  useEffect(() => {
    if (!preset || !controlsRef.current) return
    const key = preset === 'reset' ? 'default' : preset
    const conf = cameraPresets[key as keyof typeof cameraPresets] ?? cameraPresets.default

    fromPos.current.copy(camera.position)
    toPos.current.set(...conf.position)
    fromTarget.current.copy(controlsRef.current.target)
    toTarget.current.set(...conf.target)
    t.current = 0
    animating.current = true
  }, [preset, camera])

  useFrame((_, dt) => {
    if (!animating.current || !controlsRef.current) return
    t.current = Math.min(1, t.current + dt * 1.4)
    const e = 1 - Math.pow(1 - t.current, 3)
    camera.position.lerpVectors(fromPos.current, toPos.current, e)
    controlsRef.current.target.lerpVectors(fromTarget.current, toTarget.current, e)
    controlsRef.current.update()
    if (t.current >= 1) {
      animating.current = false
      clearCameraPreset()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={0.35}
      maxDistance={2.8}
      maxPolarAngle={Math.PI * 0.92}
      target={[0, 0.12, 0.05]}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
    />
  )
}

export function resetCameraAction() {
  useViewerStore.getState().requestCameraPreset('reset')
}
