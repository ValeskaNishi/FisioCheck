import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Header from "../components/layout/header/header";
import EvaluationDetail from "../pages/evaluations-detail/evaluations-detail";
import EvaluationForm from "../pages/evaluations-form/evaluations-form";
import EvaluationsListHome from "../pages/evaluations-list-home/evaluations-list-home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<EvaluationsListHome />} />
          <Route path="/evaluation/:id" element={<EvaluationDetail />} />
          <Route path="/evaluation/:id/edit" element={<EvaluationForm />} />
          <Route path="/new-evaluation" element={<EvaluationForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
