import { Evaluation } from "../../types/evaluations/interfaces";

export interface UseEvaluationsReturn {
  evaluations: Evaluation[];
  isLoading: boolean;
  errorMessage: string;
  removeEvaluation: (id: string) => Promise<void>;
  refreshEvaluations: () => Promise<void>;
}
