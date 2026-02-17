import { Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

export default function Header() {
  const navigate = useNavigate();

  return (
    <AntHeader className="header">
      <button
        type="button"
        className="headerLogo"
        onClick={() => navigate("/")}
      >
        <img
          src="/assets/images/fisiochecklogo.jpg"
          alt="FisioCheck Logo"
          className="headerLogoImage"
        />
        <div>
          <Title level={4} className="headerTitle">
            FisioCheck
          </Title>
          <Text className="headerSubtitle">Avaliação física do paciente</Text>
        </div>
      </button>
    </AntHeader>
  );
}
