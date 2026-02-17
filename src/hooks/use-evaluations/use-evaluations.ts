import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { deleteEvaluation, getEvaluations } from "../../services/evaluations";
import { Evaluation } from "../../types/evaluations";
import { UseEvaluationsReturn } from "./interfaces";

export function useEvaluations(): UseEvaluationsReturn {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const refreshEvaluations = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const evaluationsList = await getEvaluations();
      setEvaluations(evaluationsList);
    } catch {
      setErrorMessage("Erro ao carregar avaliações");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeEvaluation = useCallback(async (id: string) => {
    try {
      await deleteEvaluation(id);
      setEvaluations((previousEvaluations) =>
        previousEvaluations.filter((evaluation) => evaluation.id !== id),
      );
      message.success("Avaliação excluída com sucesso");
    } catch {
      message.error("Erro ao excluir avaliação");
    }
  }, []);

  useEffect(() => {
    refreshEvaluations();
  }, [refreshEvaluations]);

  return {
    evaluations,
    isLoading,
    errorMessage,
    removeEvaluation,
    refreshEvaluations,
  };
}
