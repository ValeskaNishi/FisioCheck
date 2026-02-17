import { PAIN_COLORS, PAIN_THRESHOLDS } from "../constants";

export const getPainColor = (scale: number): string => {
  if (scale <= PAIN_THRESHOLDS.LOW) return PAIN_COLORS.LOW;
  if (scale <= PAIN_THRESHOLDS.MEDIUM) return PAIN_COLORS.MEDIUM;
  return PAIN_COLORS.HIGH;
};

export const getPainSeverity = (scale: number): "low" | "medium" | "high" => {
  if (scale <= PAIN_THRESHOLDS.LOW) return "low";
  if (scale <= PAIN_THRESHOLDS.MEDIUM) return "medium";
  return "high";
};
