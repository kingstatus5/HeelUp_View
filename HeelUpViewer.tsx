import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, SoftShadows } from '@react-three/drei'
import { ProductAssembly } from './ProductAssembly'
import { CameraController } from './CameraPresets'
import { useViewerStore } from '../store/viewerStore'
import { STILL_PLANS, captureCanvasPng, downloadDataUrl } from '../utils/exportStills'

function FrameCapture() {
  const { gl, scene, camera } = useThree()
  const captureRequest = useViewerStore((s) => s.captureRequest)
  const clearCapture = useViewerStore((s) => s.clearCapture)
  const setMode = useViewerStore((s) => s.setMode)
  const setExploded = useViewerStore((s) => s.setExploded)
  const setCollarInflated = useViewerStore((s) => s.setCollarInflated)
  const requestCameraPreset = useViewerStore((s) => s.requestCameraPreset)

  useEffect(() => {
    if (!captureRequest) return
    const plan = STILL_PLANS.find((p) => p.kind === captureRequest)
    if (!plan) {
      clearCapture()
      return
    }

    setMode(plan.mode)
    setExploded(plan.exploded)
    if (plan.collarInflated != null) setCollarInflated(plan.collarInflated)
    requestCameraPreset(plan.camera)

    const t = window.setTimeout(() => {
      gl.render(scene, camera)
      const data = captureCanvasPng(gl.domElement, 2)
      downloadDataUrl(data, plan.filename)
      clearCapture()
    }, 950)

    return () => window.clearTimeout(t)
  }, [
    captureRequest,
    clearCapture,
    setMode,
    setExploded,
    setCollarInflated,
    requestCameraPreset,
    gl,
    scene,
    camera,
  ])

  return null
}

function StudioLighting({ dark }: { dark: boolean }) {
  return (
    <>
      <color attach="background" args={[dark ? '#0e1012' : '#e8ecee']} />
      <fog attach="fog" args={[dark ? '#0e1012' : '#e8ecee', 2.5, 7]} />
      <ambientLight intensity={dark ? 0.45 : 0.7} />
      <directionalLight
        castShadow
        position={[1.2, 2.4, 1.4]}
        intensity={dark ? 1.35 : 1.1}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-1.5, 1.2, -0.8]} intensity={dark ? 0.35 : 0.45} color="#5EC8D4" />
      <hemisphereLight
        intensity={0.35}
        color={dark ? '#8899aa' : '#ffffff'}
        groundColor={dark ? '#1a1d21' : '#c5cbcf'}
      />
      <SoftShadows size={16} samples={8} focus={0.85} />
      <ContactShadows
        position={[0, -0.14, 0.08]}
        opacity={dark ? 0.45 : 0.3}
        scale={2}
        blur={2.5}
        far={1.2}
      />
      <Environment preset="studio" environmentIntensity={dark ? 0.45 : 0.6} />
    </>
  )
}

export function HeelUpViewer() {
  const theme = useViewerStore((s) => s.theme)
  const dark = theme === 'dark'

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0.55, 0.35, 0.75], fov: 38, near: 0.05, far: 20 }}
        onPointerMissed={() => useViewerStore.getState().setSelectedId(null)}
      >
        <Suspense fallback={null}>
          <StudioLighting dark={dark} />
          <ProductAssembly />
          <CameraController />
          <FrameCapture />
        </Suspense>
      </Canvas>
    </div>
  )
}
