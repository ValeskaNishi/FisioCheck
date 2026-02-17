import { Tag } from "antd";
import { getPainColor } from "../../utils";
import { PainScaleProps } from "./interfaces";

export default function PainScale({ value }: PainScaleProps) {
  return (
    <Tag
      color={getPainColor(value)}
      style={{
        fontWeight: 600,
        borderRadius: 12,
        paddingInline: 10,
      }}
    >
      {value}/10
    </Tag>
  );
}
