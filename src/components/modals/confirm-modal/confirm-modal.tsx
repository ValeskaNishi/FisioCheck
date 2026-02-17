import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

export function showDeleteConfirm(onConfirm: () => Promise<void>) {
  confirm({
    title: "Confirmar exclusão",
    icon: <ExclamationCircleOutlined />,
    content: "Essa ação não pode ser desfeita. Deseja continuar?",
    okText: "Excluir",
    okType: "danger",
    cancelText: "Cancelar",
    centered: true,
    maskClosable: false,
    okButtonProps: { danger: true },
    onOk: onConfirm,
  });
}
