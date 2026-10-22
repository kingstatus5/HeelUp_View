import { useCallback, type ReactNode } from 'react'
import { useViewerStore } from '../../store/viewerStore'
import type { ThreeEvent } from '@react-three/fiber'

interface SelectableProps {
  id: string
  children: ReactNode
  groupProps?: Record<string, unknown>
}

export function Selectable({ id, children, groupProps }: SelectableProps) {
  const setSelectedId = useViewerStore((s) => s.setSelectedId)
  const selectedId = useViewerStore((s) => s.selectedId)
  const selected = selectedId === id

  const onClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      setSelectedId(id)
    },
    [id, setSelectedId],
  )

  return (
    <group
      {...groupProps}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
    >
      {children}
      {selected && (
        <mesh visible={false}>
          {/* selection driven via emissive on children materials via SelectionGlow */}
        </mesh>
      )}
    </group>
  )
}

export function useIsSelected(id: string) {
  return useViewerStore((s) => s.selectedId === id)
}

export function selectionEmissive(selected: boolean, base = '#000000') {
  return selected ? '#5EC8D4' : base
}

export function selectionIntensity(selected: boolean) {
  return selected ? 0.35 : 0
}
