import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import AppRoutes from "./routes/routes";
import "./styles/global.css";

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
