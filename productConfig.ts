/**
 * HeelUp central design configuration.
 * Founders: edit proportions, colors, and placements here — the viewer reads these live.
 * All recovery-support values are CONCEPT ONLY until clinically/mechanically validated.
 */

export type BootMode = 'sock' | 'outdoor' | 'indoor' | 'shower'

export const brand = {
  name: 'HeelUp',
  short: 'HU',
  tagline: 'One Sock. Three Boots. More Life While You Heal.',
  disclaimer:
    'Conceptual industrial design prototype — not a clinically validated orthopedic device.',
} as const

/** Soft gray / charcoal / off-white / muted electric cyan */
export const palette = {
  softGray: '#8A9199',
  softGrayLight: '#B0B6BC',
  softGrayDark: '#6A7178',
  charcoal: '#1A1D21',
  charcoalMid: '#2A2F35',
  charcoalSoft: '#3A4048',
  offWhite: '#F2F4F5',
  textile: '#9AA1A8',
  textilePad: '#A8AEB4',
  polymer: '#4A5058',
  strap: '#3D434A',
  strapAccent: '#5A6168',
  cyan: '#5EC8D4',
  cyanMuted: '#3A9AA6',
  cyanDeep: '#2A7A84',
  skin: '#C4A484',
  skinShadow: '#A88868',
  leather: '#2C3036',
  leatherAccent: '#3E444C',
  fleece: '#6E757C',
  fleeceLight: '#8A9199',
  rubber: '#1E2226',
  translucent: '#A8D8E0',
  highlight: '#5EC8D4',
} as const

/**
 * Anatomical + sock geometry (meters-ish units scaled for the scene).
 * Foot is plantarflexed relative to shin — clinician-set incline is display-only.
 */
export const anatomy = {
  /** Shin/calf length from ankle to just below knee */
  calfLength: 0.42,
  calfRadiusTop: 0.055,
  calfRadiusAnkle: 0.038,
  footLength: 0.26,
  footWidth: 0.095,
  footHeight: 0.065,
  heelRadius: 0.045,
  /** Default plantarflexion (degrees). CONCEPT ONLY — not a clinical prescription. */
  defaultPlantarflexionDeg: 20,
  /** Adjustable range for design exploration only */
  plantarflexionMinDeg: 0,
  plantarflexionMaxDeg: 35,
  ankleY: 0,
} as const

export const coreSock = {
  shaftHeight: 0.4,
  thickness: 0.006,
  paddingAchilles: 0.012,
  paddingHeel: 0.014,
  color: palette.textile,
  padColor: palette.textilePad,
  cuffColor: palette.softGrayLight,
} as const

export const sideSplints = {
  length: 0.18,
  width: 0.028,
  thickness: 0.004,
  color: palette.polymer,
  /** Offset from ankle center along calf */
  offsetY: 0.08,
  lateralOffset: 0.042,
} as const

export const ankleStraps = {
  width: 0.028,
  thickness: 0.004,
  color: palette.strap,
  /** Cross angle relative to horizontal */
  crossAngleDeg: 35,
} as const

export const underfootStrap = {
  width: 0.032,
  thickness: 0.005,
  color: palette.strapAccent,
  /** Where strap leaves the footbed (0 = heel, 1 = toe) */
  forefootAnchor: 0.45,
  calfAnchorY: 0.22,
} as const

export const outdoorBoot = {
  shaftHeight: 0.2,
  toeBoxLength: 0.08,
  toeBoxHeight: 0.07,
  soleThickness: 0.028,
  rockerLift: 0.012,
  color: palette.leather,
  accentColor: palette.leatherAccent,
  soleColor: palette.rubber,
  collarColor: palette.charcoalSoft,
  /** Design proposal only — not certified safety footwear */
  reinforcedToeProposal: true,
} as const

export const indoorBoot = {
  shaftHeight: 0.12,
  toeRoom: 0.1,
  soleThickness: 0.018,
  color: palette.fleece,
  accentColor: palette.fleeceLight,
  soleColor: '#3A3E42',
  plushness: 0.01,
} as const

export const showerBoot = {
  shaftHeight: 0.38,
  coverOpacity: 0.35,
  coverColor: palette.translucent,
  collarColor: palette.cyanMuted,
  collarRadiusInflated: 0.09,
  collarRadiusDeflated: 0.06,
  collarTubeRadius: 0.022,
  soleColor: palette.cyanDeep,
  bubbleCount: 12,
  bulbColor: palette.cyan,
} as const

export const explodeOffsets = {
  sock: [0, 0.02, 0] as [number, number, number],
  splints: [0.12, 0.05, 0] as [number, number, number],
  ankleStraps: [0, 0.14, 0.04] as [number, number, number],
  underfootStrap: [0, -0.08, 0.06] as [number, number, number],
  boot: [0, -0.18, 0.1] as [number, number, number],
  collar: [0, 0.28, 0] as [number, number, number],
} as const

export const cameraPresets = {
  default: { position: [0.55, 0.35, 0.75] as [number, number, number], target: [0, 0.12, 0.05] as [number, number, number] },
  hero: { position: [0.65, 0.4, 0.7] as [number, number, number], target: [0, 0.14, 0.04] as [number, number, number] },
  side: { position: [0.95, 0.18, 0.02] as [number, number, number], target: [0, 0.1, 0.05] as [number, number, number] },
  exploded: { position: [0.8, 0.45, 0.9] as [number, number, number], target: [0, 0.08, 0.05] as [number, number, number] },
} as const
