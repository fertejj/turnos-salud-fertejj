import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../app/Home";
import ProfessionalLayout from "../features/dashboard/layout/ProfessionalLayout";
import Schedule from "../features/schedule/pages/Schedule";
import ProfesionalDashboard from "../features/dashboard/pages/ProfesionalDashboard";
import AddPatient from "../features/patients/pages/AddPatient";



export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Ruta protegida general (redirige según rol) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      {/* Panel del profesional de la salud */}
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
        <Route path="pacientes/nuevo" element={<AddPatient />} />
      </Route>
    </Routes>
  )
}
