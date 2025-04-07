import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "./PrivateRoute";
import Spinner from "../shared/components/Spinner";

// Fallback mientras se cargan los componentes
const Loading = () => <Spinner/>

// Lazy imports
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const Home = lazy(() => import("../app/Home"));
const ProfessionalLayout = lazy(() => import("../features/dashboard/layout/ProfessionalLayout"));
const ProfesionalDashboard = lazy(() => import("../features/dashboard/pages/ProfesionalDashboard"));
const Schedule = lazy(() => import("../features/schedule/pages/Schedule"));
const AddPatient = lazy(() => import("../features/patients/pages/AddPatient"));

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta protegida general */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Panel del profesional */}
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
    </Suspense>
  );
}
