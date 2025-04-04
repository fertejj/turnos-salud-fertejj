import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import PatientDashboard from "../pages/dashboard/PatientDashboard";
import ProfesionalDashboard from "../pages/dashboard/ProfesionalDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import NewTurn from "../pages/dashboard/patient/NewTurn";
import MyTurns from "../pages/dashboard/patient/MyTurns";
import Disponibility from "../pages/dashboard/professional/Disponibility";
import ProfessionalLayout from "../layout/ProfessionalLayout";
import Schedule from "../pages/dashboard/professional/Schedule"; // crear este componente

export default function AppRouter() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Ruta raíz protegida */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      {/* Paciente */}
      <Route
        path="/dashboard/paciente"
        element={
          <PrivateRoute>
            <PatientDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/paciente/turnos/nuevo"
        element={
          <PrivateRoute>
            <NewTurn />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/paciente/mis-turnos"
        element={
          <PrivateRoute>
            <MyTurns />
          </PrivateRoute>
        }
      />

      {/* Profesional (con layout) */}
      <Route
        path="/dashboard/profesional"
        element={
          <PrivateRoute allowedRoles={['profesional']}>
            <ProfessionalLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<ProfesionalDashboard />} />
        <Route path="disponibilidad" element={<Disponibility />} />
        <Route path="agenda" element={<Schedule />} />
      </Route>

      {/* Admin */}
      <Route
        path="/dashboard/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
