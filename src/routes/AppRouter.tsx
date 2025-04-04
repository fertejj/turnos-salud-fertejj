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

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Ruta raíz que redirige según el rol */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      {/* Dashboards según el rol */}
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
      <Route
        path="/dashboard/profesional"
        element={
          <PrivateRoute>
            <ProfesionalDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/profesional/disponibilidad"
        element={
          <PrivateRoute allowedRoles={['profesional']}>
            <Disponibility />
          </PrivateRoute>
        }
      />
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
