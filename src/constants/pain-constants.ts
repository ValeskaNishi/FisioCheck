export const PAIN_COLORS = {
  LOW: "#52c41a",
  MEDIUM: "#faad14",
  HIGH: "#ff4d4f",
} as const;

export const PAIN_THRESHOLDS = {
  LOW: 3,
  MEDIUM: 6,
  HIGH: 10,
} as const;

export const PAIN_LABELS: Record<number, string> = {
  0: "Sem dor",
  1: "Dor muito leve",
  2: "Dor leve",
  3: "Dor leve a moderada",
  4: "Dor moderada",
  5: "Dor moderada a intensa",
  6: "Dor intensa",
  7: "Dor muito intensa",
  8: "Dor extremamente intensa",
  9: "Dor insuportável",
  10: "Pior dor possível",
};
