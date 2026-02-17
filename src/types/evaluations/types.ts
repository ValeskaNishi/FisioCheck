import { Evaluation } from "./interfaces";

export type EvaluationStatus = "Em andamento" | "Concluído" | "Cancelado";

export type EvaluationFormData = Omit<Evaluation, "id">;
