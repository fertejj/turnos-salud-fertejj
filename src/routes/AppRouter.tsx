import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../app/Home";
import ProfessionalLayout from "../features/dashboard/layout/ProfessionalLayout";
import Schedule from "../features/schedule/pages/Schedule";
import ProfesionalDashboard from "../features/dashboard/pages/ProfesionalDashboard";



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
    </Routes>
  );
}
