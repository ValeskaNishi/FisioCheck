import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  Flex,
  message,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/loading";
import { showDeleteConfirm } from "../../components/modals/confirm-modal";
import PainScale from "../../components/pain-scale/pain-scale";
import StatusBadge from "../../components/status-badge/status-bagde";
import {
  deleteEvaluation,
  getEvaluationById,
} from "../../services/evaluations";
import { EvaluationRouteParams } from "../../types/evaluation-route-params";
import { Evaluation } from "../../types/evaluations";
import { formatDate } from "../../utils";

const { Title, Text } = Typography;

export default function EvaluationDetail() {
  const { id } = useParams<
    keyof EvaluationRouteParams
  >() as EvaluationRouteParams;
  const navigate = useNavigate();

  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const data = await getEvaluationById(id);
        setEvaluation(data);
      } catch {
        message.error("Não foi possível carregar a avaliação.");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluation();
  }, [id, navigate]);

  const handleDelete = () => {
    showDeleteConfirm(async () => {
      try {
        await deleteEvaluation(id);
        message.success("Avaliação excluída com sucesso!");
        navigate("/");
      } catch {
        message.error("Não foi possível excluir a avaliação.");
      }
    });
  };

  if (isLoading) return <Loading />;
  if (!evaluation) return null;

  return (
    <div
      style={{ padding: 24, maxWidth: 1400, margin: "0 auto", width: "100%" }}
    >
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/")}
        style={{ marginBottom: 16 }}
      >
        Voltar
      </Button>

      <Card>
        <Flex vertical gap={16} style={{ marginBottom: 20 }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>
              {evaluation.patientName}
            </Title>
            <Text type="secondary">
              Avaliação realizada em {formatDate(evaluation.evaluationDate)}
            </Text>
          </div>

          <Flex gap={12} justify="flex-end" wrap>
            <Tooltip title="Editar avaliação">
              <Button
                icon={<EditOutlined />}
                onClick={() => navigate(`/evaluation-form-edit/${id}`)}
              >
                Editar
              </Button>
            </Tooltip>
            <Tooltip title="Excluir avaliação">
              <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
                Excluir
              </Button>
            </Tooltip>
          </Flex>
        </Flex>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Data">
            {formatDate(evaluation.evaluationDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Fisioterapeuta">
            {evaluation.physiotherapist}
          </Descriptions.Item>
          <Descriptions.Item label="Status do Tratamento">
            <StatusBadge status={evaluation.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Escala de dor">
            <PainScale value={evaluation.painScale} />
          </Descriptions.Item>
          <Descriptions.Item label="Queixa principal">
            {evaluation.mainComplaint}
          </Descriptions.Item>
          <Descriptions.Item label="Diagnóstico clínico">
            {evaluation.clinicalDiagnosis}
          </Descriptions.Item>
          <Descriptions.Item label="Região afetada">
            {evaluation.affectedRegion}
          </Descriptions.Item>
          <Descriptions.Item label="Plano de tratamento">
            {evaluation.treatmentPlan}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
