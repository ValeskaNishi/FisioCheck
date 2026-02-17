import { STATUS_COLORS, EVALUATION_STATUS } from "../constants";

export const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status] ?? "default";
};

export const canEditEvaluation = (status: string): boolean => {
  return (
    status !== EVALUATION_STATUS.COMPLETED &&
    status !== EVALUATION_STATUS.CANCELLED
  );
};

export const canCancelEvaluation = (status: string): boolean => {
  return status === EVALUATION_STATUS.IN_PROGRESS;
};
