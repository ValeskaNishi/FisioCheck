import { Evaluation, EvaluationFormData } from "../../types/evaluations";
import api from "../api/api";

const ENDPOINT = "/evaluations";

export const getEvaluations = async (): Promise<Evaluation[]> => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

export const getEvaluationById = async (id: string): Promise<Evaluation> => {
  const response = await api.get(`${ENDPOINT}/${id}`);
  return response.data;
};

export const createEvaluation = async (
  data: EvaluationFormData,
): Promise<Evaluation> => {
  const response = await api.post(ENDPOINT, data);
  return response.data;
};

export const updateEvaluation = async (
  id: string,
  data: EvaluationFormData,
): Promise<Evaluation> => {
  const response = await api.put(`${ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteEvaluation = async (id: string): Promise<void> => {
  await api.delete(`${ENDPOINT}/${id}`);
};
