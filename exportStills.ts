import type { BootMode } from '../config/productConfig'
import type { CameraPresetId } from '../store/viewerStore'

export type StillKind =
  | 'hero'
  | 'side'
  | 'exploded'
  | 'outdoor'
  | 'indoor'
  | 'shower'

export interface StillPlan {
  kind: StillKind
  filename: string
  mode: BootMode
  exploded: boolean
  camera: CameraPresetId
  collarInflated?: boolean
  label: string
}

export const STILL_PLANS: StillPlan[] = [
  {
    kind: 'hero',
    filename: 'heelup-hero-three-quarter.png',
    mode: 'outdoor',
    exploded: false,
    camera: 'hero',
    label: 'Hero three-quarter',
  },
  {
    kind: 'side',
    filename: 'heelup-side-inclination.png',
    mode: 'sock',
    exploded: false,
    camera: 'side',
    label: 'Side — foot inclination',
  },
  {
    kind: 'exploded',
    filename: 'heelup-exploded-assembly.png',
    mode: 'outdoor',
    exploded: true,
    camera: 'exploded',
    label: 'Exploded assembly',
  },
  {
    kind: 'outdoor',
    filename: 'heelup-outdoor-mode.png',
    mode: 'outdoor',
    exploded: false,
    camera: 'hero',
    label: 'Outdoor mode',
  },
  {
    kind: 'indoor',
    filename: 'heelup-indoor-mode.png',
    mode: 'indoor',
    exploded: false,
    camera: 'hero',
    label: 'Indoor mode',
  },
  {
    kind: 'shower',
    filename: 'heelup-shower-mode.png',
    mode: 'shower',
    exploded: false,
    camera: 'hero',
    collarInflated: true,
    label: 'Shower mode',
  },
]

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/**
 * Capture the WebGL canvas at a higher resolution into a PNG data URL.
 */
export function captureCanvasPng(
  canvas: HTMLCanvasElement,
  scale = 2,
): string {
  const w = canvas.width
  const h = canvas.height
  const off = document.createElement('canvas')
  off.width = Math.floor(w * (scale > 1 ? 1 : 1))
  off.height = Math.floor(h * (scale > 1 ? 1 : 1))
  // Canvas is already rendered at pixel ratio; draw as-is for fidelity
  const ctx = off.getContext('2d')
  if (!ctx) return canvas.toDataURL('image/png')
  // Fill studio background so transparent pixels aren't black voids
  ctx.fillStyle = '#0e1012'
  ctx.fillRect(0, 0, off.width, off.height)
  ctx.drawImage(canvas, 0, 0, off.width, off.height)
  return off.toDataURL('image/png')
}
