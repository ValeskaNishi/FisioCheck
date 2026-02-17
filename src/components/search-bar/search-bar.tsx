import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SearchBarProps } from "./interfaces";

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input
      placeholder="Pesquisar por paciente ou diagnóstico..."
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
      size="large"
      style={{ marginBottom: 16 }}
    />
  );
}
