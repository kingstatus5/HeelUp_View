import { useMemo } from 'react'
import { explodeOffsets } from '../config/productConfig'
import { useViewerStore } from '../store/viewerStore'
import { useAssemblyDriver } from './AssemblyAnimation'
import { AnatomicalFoot } from './models/AnatomicalFoot'
import { CoreSock } from './models/CoreSock'
import { SideSplints } from './models/SideSplints'
import { AnkleStraps } from './models/AnkleStraps'
import { UnderfootStrap } from './models/UnderfootStrap'
import { OutdoorBoot } from './models/OutdoorBoot'
import { IndoorBoot } from './models/IndoorBoot'
import { ShowerBoot } from './models/ShowerBoot'

function lerpOffset(
  exploded: boolean,
  offset: [number, number, number],
  extra: [number, number, number] = [0, 0, 0],
): [number, number, number] {
  const k = exploded ? 1 : 0
  return [
    offset[0] * k + extra[0],
    offset[1] * k + extra[1],
    offset[2] * k + extra[2],
  ]
}

export function ProductAssembly() {
  const mode = useViewerStore((s) => s.mode)
  const exploded = useViewerStore((s) => s.exploded)
  const showBootUpper = useViewerStore((s) => s.showBootUpper)
  const cutaway = useViewerStore((s) => s.cutaway)
  const showFoot = useViewerStore((s) => s.showFoot)
  const collarInflated = useViewerStore((s) => s.collarInflated)
  const plantarflexionDeg = useViewerStore((s) => s.plantarflexionDeg)
  const setSelectedId = useViewerStore((s) => s.setSelectedId)

  const anim = useAssemblyDriver()

  const sockPos = useMemo(
    () => lerpOffset(exploded, explodeOffsets.sock, [0, anim.sockOffsetY, 0]),
    [exploded, anim.sockOffsetY],
  )
  const splintPos = useMemo(
    () => lerpOffset(exploded, explodeOffsets.splints),
    [exploded],
  )
  const anklePos = useMemo(
    () => lerpOffset(exploded, explodeOffsets.ankleStraps),
    [exploded],
  )
  const underPos = useMemo(
    () => lerpOffset(exploded, explodeOffsets.underfootStrap),
    [exploded],
  )
  const bootPos = useMemo(
    () => lerpOffset(exploded, explodeOffsets.boot, [0, anim.bootOffsetY, 0]),
    [exploded, anim.bootOffsetY],
  )

  const showBoot = mode !== 'sock' && anim.bootVisible
  const sockOpacity = cutaway && mode !== 'sock' ? 0.85 : 1

  return (
    <group
      position={[0, -0.05, 0]}
      onPointerMissed={() => setSelectedId(null)}
    >
      <AnatomicalFoot plantarflexionDeg={plantarflexionDeg} visible={showFoot} />

      {anim.sockVisible && (
        <>
          <CoreSock
            plantarflexionDeg={plantarflexionDeg}
            position={sockPos}
            opacity={sockOpacity}
          />
          <SideSplints position={splintPos} opacity={sockOpacity} />
          <AnkleStraps
            position={anklePos}
            fastened={anim.strapsFastened}
            opacity={sockOpacity}
          />
          <UnderfootStrap
            plantarflexionDeg={plantarflexionDeg}
            position={underPos}
            fastened={anim.strapsFastened}
            opacity={sockOpacity}
          />
        </>
      )}

      {showBoot && mode === 'outdoor' && (
        <OutdoorBoot
          plantarflexionDeg={plantarflexionDeg}
          showUpper={showBootUpper}
          cutaway={cutaway}
          position={bootPos}
          strapsFastened={anim.strapsFastened}
        />
      )}
      {showBoot && mode === 'indoor' && (
        <IndoorBoot
          plantarflexionDeg={plantarflexionDeg}
          showUpper={showBootUpper}
          cutaway={cutaway}
          position={bootPos}
          strapsFastened={anim.strapsFastened}
        />
      )}
      {showBoot && mode === 'shower' && (
        <ShowerBoot
          plantarflexionDeg={plantarflexionDeg}
          showUpper={showBootUpper}
          cutaway={cutaway}
          position={bootPos}
          collarInflated={collarInflated}
          collarAnimating={anim.collarAnimating}
          coverClosed={anim.coverClosed}
        />
      )}

      {/* Soft ground contact shadow catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.09, 0.08]} receiveShadow>
        <circleGeometry args={[0.45, 48]} />
        <shadowMaterial opacity={0.28} />
      </mesh>
    </group>
  )
}
