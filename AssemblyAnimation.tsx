import { useEffect, useRef } from 'react'
import { useViewerStore } from '../store/viewerStore'

const STEP_MS = 1600

/**
 * Drives the four-step conceptual assembly sequence.
 * Motion is illustrative only — not medical instructions.
 */
export function useAssemblyDriver() {
  const playing = useViewerStore((s) => s.assemblyPlaying)
  const step = useViewerStore((s) => s.assemblyStep)
  const mode = useViewerStore((s) => s.mode)
  const setAssemblyStep = useViewerStore((s) => s.setAssemblyStep)
  const stopAssembly = useViewerStore((s) => s.stopAssembly)
  const setCollarInflated = useViewerStore((s) => s.setCollarInflated)
  const setMode = useViewerStore((s) => s.setMode)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!playing) {
      if (timer.current) window.clearTimeout(timer.current)
      return
    }

    if (step === 1) {
      // Sock over foot — show sock foundation first
      setCollarInflated(false)
    }

    if (step === 2 && mode === 'sock') {
      // If founders start from sock-only, demonstrate entry into Outdoor by default
      setMode('outdoor')
    }

    if (step === 4 && mode === 'shower') {
      setCollarInflated(true)
    }

    if (step >= 4) {
      timer.current = window.setTimeout(() => stopAssembly(), STEP_MS)
      return
    }

    timer.current = window.setTimeout(() => {
      setAssemblyStep(step + 1)
    }, STEP_MS)

    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [playing, step, mode, setAssemblyStep, stopAssembly, setCollarInflated, setMode])

  return {
    playing,
    step,
    /** 0..1 visibility / offset helpers for the scene */
    sockOffsetY: playing && step < 1 ? 0.35 : playing && step === 1 ? 0.12 : 0,
    sockVisible: !playing || step >= 1,
    bootVisible: !playing || step >= 2,
    bootOffsetY: playing && step === 2 ? -0.12 : 0,
    strapsFastened: !playing || step >= 3,
    coverClosed: !playing || step >= 4 || mode !== 'shower',
    collarAnimating: playing && step >= 4 && mode === 'shower',
  }
}

export const ASSEMBLY_LABELS = [
  '',
  '1 · Sock over anatomical silhouette',
  '2 · Sock-covered foot enters selected boot',
  '3 · Support & enclosure straps fasten',
  '4 · Enclosure settles' + ('' as string),
] as const

export function assemblyStepLabel(step: number, mode: string) {
  if (step <= 0) return ''
  if (step === 1) return '1 · Sock moves over the anatomical foot/leg'
  if (step === 2) return '2 · Sock-covered foot enters the boot'
  if (step === 3) return '3 · Support and enclosure straps fasten'
  if (step === 4) {
    if (mode === 'shower') return '4 · Cover closes & collar inflates'
    if (mode === 'outdoor') return '4 · Outdoor boot secured'
    if (mode === 'indoor') return '4 · Indoor boot secured'
    return '4 · Assembly complete'
  }
  return ''
}
