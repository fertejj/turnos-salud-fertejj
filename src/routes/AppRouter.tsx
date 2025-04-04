import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import ProfesionalDashboard from "../pages/dashboard/ProfesionalDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

import ProfessionalLayout from "../layout/ProfessionalLayout";
import Schedule from "../pages/dashboard/professional/Schedule";

export default function AppRouter() {
  return (
    <Routes>
      {/* Autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Inicio (redirige según rol) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      {/* Panel profesional (layout compartido) */}
      <Route
        path="/dashboard/profesional"
        element={
          <PrivateRoute allowedRoles={["profesional"]}>
            <ProfessionalLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<ProfesionalDashboard />} />
        <Route path="agendar" element={<Schedule />} />
      </Route>

      {/* Panel administrador */}
      <Route
        path="/dashboard/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
