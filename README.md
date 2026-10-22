# HeelUp (HU) — Achilles Recovery System Viewer

Interactive browser-based 3D product concept viewer for **HeelUp**: one supportive Core Sock and three interchangeable boots (Outdoor, Indoor, Shower).

> **Conceptual industrial design prototype — not a clinically validated orthopedic device.**  
> All recovery-support claims, joint-motion limits, load-bearing properties, and safety features remain conceptual until clinically and mechanically validated.

**Tagline:** One Sock. Three Boots. More Life While You Heal.

## Stack

- React 19 + TypeScript + Vite
- Three.js + React Three Fiber + Drei
- Tailwind CSS v4
- Zustand (viewer state)

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Deploy (public shareable URL)

### Vercel

1. Push this project to a GitHub repository.
2. In [Vercel](https://vercel.com): **Add New Project** → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Deploy. Share the generated `*.vercel.app` URL.

CLI alternative:

```bash
npm i -g vercel
vercel
```

### Replit

1. Create a new Repl → import from GitHub or upload the project.
2. Set the run command to `npm run dev -- --host 0.0.0.0`.
3. Open the webview / published URL.

## Viewer features

| Control | Behavior |
| --- | --- |
| **Core Sock / Outside / Inside / Shower** | Switch product configurations (boots always include the Core Sock) |
| **Orbit / pan / zoom** | Drag, right-drag / two-finger pan, scroll / pinch |
| **Reset / Hero / Side profile** | Camera presets (side emphasizes plantarflexed incline) |
| **Explode** | Separates sock, splints, straps, and boot into layers |
| **Cutaway** | Transparent boot upper for internal inspection |
| **Boot upper** | Show/hide exterior enclosure |
| **Play assembly** | Four-step conceptual put-on sequence |
| **Collar inflated** | Shower mode inflation state |
| **Clinician-set incline** | Design-only plantarflexion display parameter |
| **PNG stills** | Hero, side, exploded, outdoor, indoor, shower exports |
| **Click any part** | Name, function, conceptual vs design-proposal status |
| **Light / Dark theme** | Studio lighting + UI |

Editable proportions, colors, and placements live in:

`src/config/productConfig.ts`

## Project layout

```
src/
  config/productConfig.ts      # Geometry, colors, camera presets
  config/componentInfo.ts      # Click-target copy + validation labels
  store/viewerStore.ts
  components/
    HeelUpViewer.tsx
    ProductControls.tsx
    AssemblyAnimation.tsx
    CameraPresets.tsx
    ProductAssembly.tsx
    models/
      AnatomicalFoot.tsx
      CoreSock.tsx
      SideSplints.tsx
      AnkleStraps.tsx
      UnderfootStrap.tsx
      OutdoorBoot.tsx
      IndoorBoot.tsx
      ShowerBoot.tsx
      InflatableCollar.tsx
  utils/exportStills.ts
```

## Design assumptions

1. The Core Sock is the shared support layer; boots are distinct environmental enclosures, not sole texture swaps.
2. Plantarflexion / heel incline is a **founder-facing display parameter** labeled clinician-set — concept only.
3. Lateral splints are thin sleeve-integrated stays, not a rigid calf shell.
4. Straps use simple hook-and-loop; no ratchets, dials, hinges, electronics, or mechanical angle locks.
5. Outdoor reinforced toe is a **design proposal**, not certified safety footwear.
6. Indoor boot is for resting / home movement visuals only — no sleep or unsupervised-walking claims.
7. Shower collar + cover illustrate a water-resistance *concept*, not guaranteed waterproofing or slip prevention.
8. Geometry is procedural and stylized for clarity and mobile performance, not a patient-specific orthotic CAD model.
9. Assembly animation is conceptual sequencing, not fitting instructions or medical guidance.

## Open design questions

These must be resolved with clinicians, biomechanical engineers, and manufacturers before any physical prototype claims:

1. **Splint rigidity** — How stiff should medial/lateral stays be? Polymer vs metal? Failure modes under gait loads?
2. **Sock fit** — Sizing system, donning for post-op swelling, pressure distribution over the Achilles repair site?
3. **Allowable joint motion** — Target plantarflexion range, permitted inversion/eversion, and how that maps to healing stages?
4. **Load transfer** — How much dorsiflexion resistance comes from the underfoot strap vs boot rocker vs clinician protocol?
5. **Boot attachment** — Retention method so boots don’t torque the sock/supports during transitions?
6. **Water sealing** — Inflatable collar pressure, leak paths at the shaft, cleanability, and failure in soapy water?
7. **Clinical validation** — What bench tests, gait lab metrics, and regulatory pathway (if any) are required before use claims?

## License / notice

Prototype visualization for founder design exploration and partner communication. Not for clinical use.
