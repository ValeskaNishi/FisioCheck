export const EVALUATION_STATUS = {
  IN_PROGRESS: "Em andamento",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado",
} as const;

export const STATUS_COLORS: Record<string, string> = {
  [EVALUATION_STATUS.IN_PROGRESS]: "processing",
  [EVALUATION_STATUS.COMPLETED]: "success",
  [EVALUATION_STATUS.CANCELLED]: "error",
};

export const STATUS_ICONS: Record<string, string> = {
  [EVALUATION_STATUS.IN_PROGRESS]: "sync",
  [EVALUATION_STATUS.COMPLETED]: "check-circle",
  [EVALUATION_STATUS.CANCELLED]: "close-circle",
};
