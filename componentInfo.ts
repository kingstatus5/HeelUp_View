export type ValidationStatus = 'conceptual' | 'design-proposal'

export interface ComponentInfo {
  id: string
  name: string
  function: string
  status: ValidationStatus
  statusLabel: string
}

export const COMPONENT_INFO: Record<string, ComponentInfo> = {
  anatomicalFoot: {
    id: 'anatomicalFoot',
    name: 'Anatomical Silhouette',
    function:
      'Reference lower-leg and foot form so sock and boots can be fitted visually. Not a patient-specific scan.',
    status: 'conceptual',
    statusLabel: 'Conceptual reference',
  },
  coreSock: {
    id: 'coreSock',
    name: 'HU Core Sock',
    function:
      'Knee-high structured textile foundation with padded Achilles region, heel cup, and shaped footbed. Intended as the reusable support layer worn under all boots.',
    status: 'conceptual',
    statusLabel: 'Conceptual — unvalidated',
  },
  sideSplints: {
    id: 'sideSplints',
    name: 'Lateral Ankle Splints',
    function:
      'Slim left/right polymer or metal elements in textile sleeves to suggest medial-lateral ankle stability. Rigidity and load path are open design questions.',
    status: 'conceptual',
    statusLabel: 'Conceptual — unvalidated',
  },
  ankleStraps: {
    id: 'ankleStraps',
    name: 'Ankle Stability Straps',
    function:
      'Crossed hook-and-loop straps inspired by athletic ankle braces. Placement and tension are concept-only.',
    status: 'conceptual',
    statusLabel: 'Conceptual — unvalidated',
  },
  underfootStrap: {
    id: 'underfootStrap',
    name: 'Underfoot Support Strap',
    function:
      'Strap from mid/forefoot underside toward the calf to visually illustrate resistance to unwanted dorsiflexion. Does not guarantee protection.',
    status: 'conceptual',
    statusLabel: 'Conceptual — unvalidated',
  },
  outdoorBoot: {
    id: 'outdoorBoot',
    name: 'HU Outdoor Boot',
    function:
      'Rugged higher-cut enclosure with protective panels, padded collar, and rocker-style outsole for outdoor environments. Accommodates the full sock assembly.',
    status: 'conceptual',
    statusLabel: 'Conceptual — unvalidated',
  },
  outdoorToe: {
    id: 'outdoorToe',
    name: 'Reinforced Toe Enclosure',
    function:
      'Design proposal for added toe protection on the outdoor boot. Not certified steel-toe or safety footwear.',
    status: 'design-proposal',
    statusLabel: 'Design proposal — not certified',
  },
  indoorBoot: {
    id: 'indoorBoot',
    name: 'HU Indoor Boot',
    function:
      'Soft, lightly padded mid-height enclosure for home use with broad straps and a non-marking outsole. Not claimed safe for sleep or unsupervised walking.',
    status: 'conceptual',
    statusLabel: 'Conceptual — unvalidated',
  },
  showerBoot: {
    id: 'showerBoot',
    name: 'HU Shower Boot',
    function:
      'Translucent waterproof-concept enclosure for wet environments. Water resistance illustrated only — not guaranteed waterproofing or slip prevention.',
    status: 'conceptual',
    statusLabel: 'Conceptual — unvalidated',
  },
  inflatableCollar: {
    id: 'inflatableCollar',
    name: 'Inflatable Calf Collar',
    function:
      'Muted-cyan inflatable ring intended to suggest a seal against water ingress at the upper calf. Seal effectiveness is unvalidated.',
    status: 'conceptual',
    statusLabel: 'Conceptual — unvalidated',
  },
  inflationBulb: {
    id: 'inflationBulb',
    name: 'Hand Inflation Bulb',
    function:
      'Simple hand pump and tube for conceptual collar inflation. No electronics or pressure regulation shown.',
    status: 'conceptual',
    statusLabel: 'Conceptual — unvalidated',
  },
  showerSole: {
    id: 'showerSole',
    name: 'Bubble Traction Sole',
    function:
      'Soft rubber outsole with rounded bubble pods for wet-environment traction aesthetics. Slip resistance is not proven.',
    status: 'conceptual',
    statusLabel: 'Conceptual — unvalidated',
  },
}

export function getComponentInfo(id: string | null): ComponentInfo | null {
  if (!id) return null
  return COMPONENT_INFO[id] ?? null
}
