import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Coaches from "../pages/Coaches";
import Competencies from "../pages/Competencies";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Projects from "../pages/Projescts";
import Schools from "../pages/Schools";
import Sessions from "../pages/Sessions";
import Settings from "../pages/Settings";
import Teachers from "../pages/Teachers";
import Questions from "../pages/Questions";
import Questionnaires from "../pages/Questionnaires";

const RoutesConfig: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route
          path="/"
          element={
            <Layout>
              <ProtectedRoute />
            </Layout>
          }
        >
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="competencies" element={<Competencies />} />
          <Route path="schools" element={<Schools />} />
          <Route path="coaches" element={<Coaches />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="settings" element={<Settings />} />

          <Route path="questionnaires/:type" element={<Questionnaires />} />
          <Route path="questionnaire/:id/questions" element={<Questions />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;
