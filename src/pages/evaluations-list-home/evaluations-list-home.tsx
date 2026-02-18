import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Typography, Tooltip, Flex } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEvaluations } from "../../hooks/use-evaluations";
import { showDeleteConfirm } from "../../components/modals/confirm-modal";
import { Evaluation, EvaluationStatus } from "../../types/evaluations";
import { EVALUATION_STATUS } from "../../constants";
import { formatDate } from "../../utils";
import PainScale from "../../components/pain-scale/pain-scale";
import StatusBadge from "../../components/status-badge/status-bagde";
import Loading from "../../components/loading/loading";
import SearchBar from "../../components/search-bar/search-bar";

const { Title, Text } = Typography;

const statusFilters = [
  { text: EVALUATION_STATUS.IN_PROGRESS, value: EVALUATION_STATUS.IN_PROGRESS },
  { text: EVALUATION_STATUS.COMPLETED, value: EVALUATION_STATUS.COMPLETED },
  { text: EVALUATION_STATUS.CANCELLED, value: EVALUATION_STATUS.CANCELLED },
];

export default function EvaluationsListHome() {
  const navigate = useNavigate();
  const { evaluations, isLoading, errorMessage, removeEvaluation } =
    useEvaluations();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteEvaluation = (id: string) => {
    showDeleteConfirm(() => removeEvaluation(id));
  };

  const searchEvaluations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return evaluations;

    return evaluations.filter((evaluation) => {
      const patientName = evaluation.patientName.toLowerCase();
      const diagnosis = evaluation.clinicalDiagnosis.toLowerCase();
      return patientName.includes(term) || diagnosis.includes(term);
    });
  }, [evaluations, searchTerm]);

  const totalCount = evaluations.length;
  const filteredCount = searchEvaluations.length;

  const columns: ColumnsType<Evaluation> = [
    {
      title: "Paciente",
      dataIndex: "patientName",
      key: "patientName",
      sorter: (a, b) => a.patientName.localeCompare(b.patientName),
    },
    {
      title: "Data",
      dataIndex: "evaluationDate",
      key: "evaluationDate",
      render: (date: string) => formatDate(date),
      sorter: (a, b) =>
        new Date(a.evaluationDate).getTime() -
        new Date(b.evaluationDate).getTime(),
      width: 140,
    },
    {
      title: "Diagnóstico",
      dataIndex: "clinicalDiagnosis",
      key: "clinicalDiagnosis",
      responsive: ["md"],
    },
    {
      title: "Dor",
      dataIndex: "painScale",
      key: "painScale",
      render: (value: number) => <PainScale value={value} />,
      sorter: (a, b) => a.painScale - b.painScale,
      width: 90,
      align: "center",
    },
    {
      title: "Status do Tratamento",
      dataIndex: "status",
      key: "status",
      render: (status: EvaluationStatus) => <StatusBadge status={status} />,
      filters: statusFilters,
      onFilter: (value, record) => record.status === value,
      width: 200,
    },
    {
      title: "Ações",
      key: "actions",
      width: 170,
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Visualizar">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/evaluation-detail/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => navigate(`/evaluation-form-edit/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteEvaluation(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Loading />;

  if (errorMessage) {
    return (
      <Flex style={{ padding: 24, maxWidth: 1400, margin: "0 auto" }}>
        <Text type="danger">{errorMessage}</Text>
      </Flex>
    );
  }

  return (
    <div
      style={{ padding: 24, maxWidth: 1400, margin: "0 auto", width: "100%" }}
    >
      <Space orientation="vertical" size={4} style={{ marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          Lista de avaliações físicas do paciente
        </Title>
        <Text type="secondary">
          {searchTerm.trim()
            ? `${filteredCount} de ${totalCount} avaliações encontradas`
            : `${totalCount} avaliações cadastradas`}
        </Text>
      </Space>

      <Flex
        justify="space-between"
        align="center"
        gap={12}
        wrap
        style={{ marginBottom: 16 }}
      >
        <Flex flex={1} style={{ minWidth: 280, maxWidth: 520 }}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </Flex>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/new-evaluation")}
        >
          Nova avaliação
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={searchEvaluations}
        rowKey="id"
        pagination={{ pageSize: 8, showSizeChanger: false }}
        locale={{
          emptyText: "Nenhuma avaliação encontrada",
          filterConfirm: "Salvar",
          filterReset: "Limpar",
        }}
        scroll={{ x: 700 }}
        bordered
      />
    </div>
  );
}
