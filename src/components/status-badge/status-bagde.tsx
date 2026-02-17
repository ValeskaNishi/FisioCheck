import { Tag } from "antd";
import { getStatusColor } from "../../utils";
import { StatusBadgeProps } from "./interfaces";

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Tag
      color={getStatusColor(status)}
      style={{
        fontWeight: 600,
        borderRadius: 12,
        paddingInline: 10,
        textTransform: "capitalize",
      }}
    >
      {status}
    </Tag>
  );
}
