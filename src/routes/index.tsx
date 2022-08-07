import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";

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
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;
