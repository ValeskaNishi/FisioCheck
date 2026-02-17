import { EvaluationStatus } from "./types";

export interface Evaluation {
  id: string;
  patientName: string;
  evaluationDate: string;
  physiotherapist: string;
  mainComplaint: string;
  clinicalDiagnosis: string;
  affectedRegion: string;
  painScale: number;
  treatmentPlan: string;
  status: EvaluationStatus;
}
