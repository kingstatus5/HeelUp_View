import { create } from 'zustand'
import type { BootMode } from '../config/productConfig'
import { anatomy } from '../config/productConfig'

export type ThemeMode = 'dark' | 'light'
export type CameraPresetId = 'default' | 'hero' | 'side' | 'exploded' | 'reset'

interface ViewerState {
  mode: BootMode
  theme: ThemeMode
  exploded: boolean
  showBootUpper: boolean
  cutaway: boolean
  showFoot: boolean
  collarInflated: boolean
  plantarflexionDeg: number
  selectedId: string | null
  assemblyPlaying: boolean
  assemblyStep: number
  cameraPreset: CameraPresetId | null
  captureRequest: string | null

  setMode: (mode: BootMode) => void
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  setExploded: (v: boolean) => void
  setShowBootUpper: (v: boolean) => void
  setCutaway: (v: boolean) => void
  setShowFoot: (v: boolean) => void
  setCollarInflated: (v: boolean) => void
  setPlantarflexionDeg: (deg: number) => void
  setSelectedId: (id: string | null) => void
  playAssembly: () => void
  setAssemblyStep: (step: number) => void
  stopAssembly: () => void
  requestCameraPreset: (id: CameraPresetId) => void
  clearCameraPreset: () => void
  requestCapture: (kind: string) => void
  clearCapture: () => void
}

export const useViewerStore = create<ViewerState>((set, get) => ({
  mode: 'sock',
  theme: 'dark',
  exploded: false,
  showBootUpper: true,
  cutaway: false,
  showFoot: true,
  collarInflated: true,
  plantarflexionDeg: anatomy.defaultPlantarflexionDeg,
  selectedId: null,
  assemblyPlaying: false,
  assemblyStep: 0,
  cameraPreset: null,
  captureRequest: null,

  setMode: (mode) =>
    set({
      mode,
      selectedId: null,
      collarInflated: mode === 'shower' ? get().collarInflated : get().collarInflated,
    }),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
  setExploded: (exploded) => set({ exploded }),
  setShowBootUpper: (showBootUpper) => set({ showBootUpper }),
  setCutaway: (cutaway) => set({ cutaway }),
  setShowFoot: (showFoot) => set({ showFoot }),
  setCollarInflated: (collarInflated) => set({ collarInflated }),
  setPlantarflexionDeg: (plantarflexionDeg) => set({ plantarflexionDeg }),
  setSelectedId: (selectedId) => set({ selectedId }),
  playAssembly: () => set({ assemblyPlaying: true, assemblyStep: 1, exploded: false }),
  setAssemblyStep: (assemblyStep) => set({ assemblyStep }),
  stopAssembly: () => set({ assemblyPlaying: false, assemblyStep: 0 }),
  requestCameraPreset: (cameraPreset) => set({ cameraPreset }),
  clearCameraPreset: () => set({ cameraPreset: null }),
  requestCapture: (captureRequest) => set({ captureRequest }),
  clearCapture: () => set({ captureRequest: null }),
}))
