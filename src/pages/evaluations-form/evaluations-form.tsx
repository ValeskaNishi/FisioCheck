import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Slider,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/loading";
import { EVALUATION_STATUS } from "../../constants";
import {
  createEvaluation,
  getEvaluationById,
  updateEvaluation,
} from "../../services/evaluations";
import { EvaluationRouteParams } from "../../types/evaluation-route-params";
import { EvaluationFormData, EvaluationStatus } from "../../types/evaluations";
import { getPainColor } from "../../utils";

const { Title, Text } = Typography;
const { TextArea } = Input;

const statusOptions: EvaluationStatus[] = [
  EVALUATION_STATUS.IN_PROGRESS,
  EVALUATION_STATUS.COMPLETED,
  EVALUATION_STATUS.CANCELLED,
];

const painScaleMarks = { 0: "0", 3: "3", 6: "6", 10: "10" };

const initialFormValues: Partial<EvaluationFormData> = {
  painScale: 0,
  status: EVALUATION_STATUS.IN_PROGRESS,
};

export default function EvaluationForm() {
  const { id } = useParams<
    keyof EvaluationRouteParams
  >() as Partial<EvaluationRouteParams>;
  const navigate = useNavigate();
  const [form] = Form.useForm<EvaluationFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(!!id);
  const [painValue, setPainValue] = useState(0);

  const isEditing = !!id;

  useEffect(() => {
    if (!id) return;

    const fetchEvaluation = async () => {
      try {
        const data = await getEvaluationById(id);
        form.setFieldsValue(data);
        setPainValue(data.painScale);
      } catch {
        message.error("Não foi possível carregar a avaliação.");
        navigate("/");
      } finally {
        setIsFetching(false);
      }
    };

    fetchEvaluation();
  }, [id, form, navigate]);

  const handleSubmit = async (formData: EvaluationFormData) => {
    try {
      setIsSubmitting(true);

      if (isEditing && id) {
        await updateEvaluation(id, formData);
        message.success("Avaliação atualizada com sucesso!");
      } else {
        await createEvaluation(formData);
        message.success("Avaliação criada com sucesso!");
      }

      navigate("/");
    } catch {
      message.error("Não foi possível salvar a avaliação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) return <Loading />;

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
        <Flex vertical gap={4} style={{ marginBottom: 20 }}>
          <Title level={3} style={{ margin: 0 }}>
            {isEditing ? "Editar avaliação" : "Nova avaliação"}
          </Title>
          <Text type="secondary">
            Preencha os dados abaixo para{" "}
            {isEditing ? "atualizar" : "cadastrar"} a avaliação.
          </Text>
        </Flex>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={initialFormValues}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="patientName"
                label="Nome do paciente"
                rules={[
                  { required: true, message: "Informe o nome do paciente." },
                ]}
              >
                <Input placeholder="Ex: João Santos" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="evaluationDate"
                label="Data da avaliação"
                rules={[
                  { required: true, message: "Informe a data da avaliação." },
                ]}
              >
                <Input type="date" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="physiotherapist"
                label="Fisioterapeuta"
                rules={[
                  {
                    required: true,
                    message: "Informe o nome do fisioterapeuta.",
                  },
                ]}
              >
                <Input placeholder="Ex: Dra. Ana Lima" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="affectedRegion"
                label="Região afetada"
                rules={[
                  { required: true, message: "Informe a região afetada." },
                ]}
              >
                <Input placeholder="Ex: Coluna lombar" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="mainComplaint"
                label="Queixa principal"
                rules={[
                  { required: true, message: "Informe a queixa principal." },
                ]}
              >
                <TextArea
                  rows={3}
                  placeholder="Descreva a queixa principal do paciente..."
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="clinicalDiagnosis"
                label="Diagnóstico clínico"
                rules={[
                  { required: true, message: "Informe o diagnóstico clínico." },
                ]}
              >
                <Input placeholder="Ex: Lombalgia crônica" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Escala de dor">
                <Flex align="center" gap={12}>
                  <Tag
                    color={getPainColor(painValue)}
                    style={{
                      borderRadius: 12,
                      paddingInline: 12,
                      fontWeight: 600,
                    }}
                  >
                    {painValue}/10
                  </Tag>
                  <Text type="secondary">
                    Selecione o nível de dor informado pelo paciente.
                  </Text>
                </Flex>

                <Form.Item
                  name="painScale"
                  style={{ marginTop: 12, marginBottom: 0 }}
                >
                  <Slider
                    min={0}
                    max={10}
                    marks={painScaleMarks}
                    onChange={setPainValue}
                    styles={{ track: { background: getPainColor(painValue) } }}
                  />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item name="status" label="Status do Tratamento">
                <Select size="large">
                  {statusOptions.map((status) => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="treatmentPlan"
                label="Plano de tratamento"
                rules={[
                  { required: true, message: "Informe o plano de tratamento." },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Descreva o plano de tratamento..."
                />
              </Form.Item>
            </Col>
          </Row>

          <Flex gap={12} wrap>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              {isEditing ? "Salvar alterações" : "Criar avaliação"}
            </Button>
            <Button onClick={() => navigate("/")} disabled={isSubmitting}>
              Cancelar
            </Button>
          </Flex>
        </Form>
      </Card>
    </div>
  );
}
