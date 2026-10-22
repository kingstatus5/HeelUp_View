import { useEffect, useState } from 'react'
import { brand, anatomy, type BootMode } from '../config/productConfig'
import { getComponentInfo } from '../config/componentInfo'
import { useViewerStore } from '../store/viewerStore'
import { STILL_PLANS, type StillKind } from '../utils/exportStills'
import { assemblyStepLabel } from './AssemblyAnimation'

const MODES: { id: BootMode; label: string; short: string }[] = [
  { id: 'sock', label: 'Core Sock', short: 'Sock' },
  { id: 'outdoor', label: 'Outside', short: 'Outside' },
  { id: 'indoor', label: 'Inside', short: 'Inside' },
  { id: 'shower', label: 'Shower', short: 'Shower' },
]

function Toggle({
  active,
  onClick,
  children,
  dark,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  dark: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'bg-hu-cyan text-hu-charcoal'
          : dark
            ? 'bg-white/8 text-hu-soft hover:bg-white/12'
            : 'bg-black/5 text-hu-charcoal hover:bg-black/10'
      }`}
    >
      {children}
    </button>
  )
}

export function ProductControls() {
  const [toolsOpen, setToolsOpen] = useState(false)
  const theme = useViewerStore((s) => s.theme)
  const dark = theme === 'dark'
  const mode = useViewerStore((s) => s.mode)
  const exploded = useViewerStore((s) => s.exploded)
  const showBootUpper = useViewerStore((s) => s.showBootUpper)
  const cutaway = useViewerStore((s) => s.cutaway)
  const showFoot = useViewerStore((s) => s.showFoot)
  const collarInflated = useViewerStore((s) => s.collarInflated)
  const plantarflexionDeg = useViewerStore((s) => s.plantarflexionDeg)
  const selectedId = useViewerStore((s) => s.selectedId)
  const assemblyPlaying = useViewerStore((s) => s.assemblyPlaying)
  const assemblyStep = useViewerStore((s) => s.assemblyStep)
  const captureRequest = useViewerStore((s) => s.captureRequest)

  const setMode = useViewerStore((s) => s.setMode)
  const toggleTheme = useViewerStore((s) => s.toggleTheme)
  const setExploded = useViewerStore((s) => s.setExploded)
  const setShowBootUpper = useViewerStore((s) => s.setShowBootUpper)
  const setCutaway = useViewerStore((s) => s.setCutaway)
  const setShowFoot = useViewerStore((s) => s.setShowFoot)
  const setCollarInflated = useViewerStore((s) => s.setCollarInflated)
  const setPlantarflexionDeg = useViewerStore((s) => s.setPlantarflexionDeg)
  const playAssembly = useViewerStore((s) => s.playAssembly)
  const stopAssembly = useViewerStore((s) => s.stopAssembly)
  const requestCameraPreset = useViewerStore((s) => s.requestCameraPreset)
  const requestCapture = useViewerStore((s) => s.requestCapture)

  const info = getComponentInfo(selectedId)

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  const panel = dark
    ? 'hu-panel border border-white/10 bg-[#121417]/88 text-hu-offwhite'
    : 'hu-panel border border-black/8 bg-white/85 text-hu-charcoal'

  const muted = dark ? 'text-hu-gray' : 'text-[#5a6168]'
  const hairline = dark ? 'border-white/10' : 'border-black/8'

  return (
    <>
      {/* Brand header */}
      <header className={`pointer-events-none absolute left-0 right-0 top-0 z-20 p-4 sm:p-6`}>
        <div className="pointer-events-auto flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-display text-3xl tracking-tight sm:text-4xl">
              {brand.name}
              <span className="ml-2 text-hu-cyan">/{brand.short}</span>
            </p>
            <p className={`mt-1 max-w-md text-sm ${muted}`}>{brand.tagline}</p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium ${hairline} ${dark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
          >
            {dark ? 'Light' : 'Dark'} theme
          </button>
        </div>
      </header>

      {/* Mode switcher */}
      <div className="absolute bottom-4 left-1/2 z-20 flex w-[min(100%-1.5rem,36rem)] -translate-x-1/2 flex-col gap-2 sm:bottom-6">
        <div className={`flex gap-1 rounded-xl p-1.5 ${panel}`}>
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`flex-1 rounded-lg px-2 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                mode === m.id
                  ? 'bg-hu-cyan text-hu-charcoal shadow-sm'
                  : dark
                    ? 'text-hu-soft hover:bg-white/6'
                    : 'text-hu-charcoal/70 hover:bg-black/5'
              }`}
            >
              <span className="hidden sm:inline">{m.label}</span>
              <span className="sm:hidden">{m.short}</span>
            </button>
          ))}
        </div>
        {assemblyPlaying && (
          <p className={`rounded-lg px-3 py-2 text-center text-xs ${panel}`}>
            {assemblyStepLabel(assemblyStep, mode)}
            <span className={`ml-2 ${muted}`}>· conceptual assembly</span>
          </p>
        )}
      </div>

      {/* Mobile tools toggle */}
      <button
        type="button"
        onClick={() => setToolsOpen((v) => !v)}
        className={`absolute left-3 top-[4.75rem] z-30 rounded-md px-3 py-1.5 text-xs font-semibold sm:hidden ${panel}`}
      >
        {toolsOpen ? 'Hide tools' : 'Design tools'}
      </button>

      {/* Left design tools */}
      <aside
        className={`hu-scroll absolute bottom-28 left-3 top-24 z-20 w-[min(100%-1.5rem,17.5rem)] overflow-y-auto rounded-xl p-3 sm:left-5 sm:top-28 ${panel} ${
          toolsOpen ? 'block' : 'hidden sm:block'
        }`}
      >
        <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${muted}`}>
          View
        </p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          <Toggle dark={dark} active={exploded} onClick={() => setExploded(!exploded)}>
            Explode
          </Toggle>
          <Toggle dark={dark} active={cutaway} onClick={() => setCutaway(!cutaway)}>
            Cutaway
          </Toggle>
          <Toggle
            dark={dark}
            active={showBootUpper}
            onClick={() => setShowBootUpper(!showBootUpper)}
          >
            Boot upper
          </Toggle>
          <Toggle dark={dark} active={showFoot} onClick={() => setShowFoot(!showFoot)}>
            Silhouette
          </Toggle>
        </div>

        <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${muted}`}>
          Camera
        </p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          <Toggle dark={dark} active={false} onClick={() => requestCameraPreset('reset')}>
            Reset
          </Toggle>
          <Toggle dark={dark} active={false} onClick={() => requestCameraPreset('hero')}>
            Hero
          </Toggle>
          <Toggle dark={dark} active={false} onClick={() => requestCameraPreset('side')}>
            Side profile
          </Toggle>
          <Toggle dark={dark} active={false} onClick={() => requestCameraPreset('exploded')}>
            Exploded cam
          </Toggle>
        </div>

        <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${muted}`}>
          Motion
        </p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          <Toggle
            dark={dark}
            active={assemblyPlaying}
            onClick={() => (assemblyPlaying ? stopAssembly() : playAssembly())}
          >
            {assemblyPlaying ? 'Stop assembly' : 'Play assembly'}
          </Toggle>
          {mode === 'shower' && (
            <Toggle
              dark={dark}
              active={collarInflated}
              onClick={() => setCollarInflated(!collarInflated)}
            >
              Collar {collarInflated ? 'inflated' : 'deflated'}
            </Toggle>
          )}
        </div>

        <div className={`mb-3 border-t pt-3 ${hairline}`}>
          <label className={`mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] ${muted}`}>
            Clinician-set incline — concept only
          </label>
          <p className={`mb-2 text-[11px] leading-snug ${muted}`}>
            Display parameter for founders. Not a patient control. Not a treatment value.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={anatomy.plantarflexionMinDeg}
              max={anatomy.plantarflexionMaxDeg}
              step={1}
              value={plantarflexionDeg}
              onChange={(e) => setPlantarflexionDeg(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer accent-hu-cyan"
            />
            <span className="w-10 text-right text-xs font-medium tabular-nums">
              {plantarflexionDeg}°
            </span>
          </div>
        </div>

        <div className={`border-t pt-3 ${hairline}`}>
          <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${muted}`}>
            PNG stills
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {STILL_PLANS.map((p) => (
              <button
                key={p.kind}
                type="button"
                disabled={!!captureRequest}
                onClick={() => requestCapture(p.kind as StillKind)}
                className={`rounded-md px-2 py-1.5 text-left text-[11px] font-medium transition-colors ${
                  captureRequest === p.kind
                    ? 'bg-hu-cyan/30 text-hu-cyan'
                    : dark
                      ? 'bg-white/8 hover:bg-white/12'
                      : 'bg-black/5 hover:bg-black/10'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Selection inspector */}
      <aside
        className={`absolute bottom-28 right-3 top-auto z-20 w-[min(100%-1.5rem,17.5rem)] rounded-xl p-3 sm:right-5 sm:top-28 sm:bottom-auto ${panel} ${info ? '' : 'hidden sm:block'}`}
      >
        {info ? (
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${muted}`}>
              Component
            </p>
            <h2 className="mt-1 font-display text-2xl leading-tight">{info.name}</h2>
            <p
              className={`mt-2 inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                info.status === 'design-proposal'
                  ? 'bg-amber-500/20 text-amber-200'
                  : 'bg-hu-cyan/15 text-hu-cyan'
              }`}
            >
              {info.statusLabel}
            </p>
            <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{info.function}</p>
          </div>
        ) : (
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${muted}`}>
              Inspect
            </p>
            <h2 className="mt-1 font-display text-2xl leading-tight">Select a part</h2>
            <p className={`mt-2 text-sm leading-relaxed ${muted}`}>
              Click any component in the scene to see its name, intended function, and validation
              status. Orbit with drag · zoom with scroll or pinch · pan with right-drag or two-finger
              drag.
            </p>
          </div>
        )}
      </aside>

      {/* Disclaimer footer strip */}
      <p
        className={`pointer-events-none absolute bottom-[5.5rem] left-1/2 z-10 hidden w-[min(100%-2rem,40rem)] -translate-x-1/2 text-center text-[10px] leading-snug sm:block ${muted}`}
      >
        {brand.disclaimer}
      </p>
    </>
  )
}
