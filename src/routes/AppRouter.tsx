import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../shared/components/ui/Spinner";
import { ROUTES } from "./routes";

const SpinnerFallback = (
  <div className="h-screen flex justify-center items-center">
    <Spinner />
  </div>
);

// Lazy imports
const PatientList = lazy(
  () => import("../features/patients/pages/PatientList")
);
const PatientDetail = lazy(
  () => import("../features/patients/pages/PatientDetail")
);
const PatientEditPage = lazy(
  () => import("../features/patients/pages/PatientEditPage")
);
const MedicalHistoryFormPage = lazy(
  () => import("../features/medical-history/pages/MedicalHistoryFormPage")
);
const MedicalHistoryDetailPage = lazy(
  () => import("../features/medical-history/pages/MedicalHistoryDetailPage")
);
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const Home = lazy(() => import("../app/Home"));
const NotFound = lazy(() => import("../shared/pages/NotFound"));
const Unauthorized = lazy(() => import("../shared/pages/Unauthorized"));
const ProfessionalLayout = lazy(
  () => import("../features/dashboard/layout/ProfessionalLayout")
);
const ProfesionalDashboard = lazy(
  () => import("../features/dashboard/pages/ProfesionalDashboard")
);
const AddPatient = lazy(() => import("../features/patients/pages/AddPatient"));
const CreateAppointment = lazy(
  () => import("../features/appointments/pages/CreateAppointment")
);
const AppointmentsList = lazy(
  () => import("../features/appointments/pages/AppointmentList")
);
const SettingsPage = lazy(
  () => import("../features/settings/pages/SettingsPage")
);
const EditMedicalHistoryPage = lazy(
  () => import("../features/medical-history/pages/EditMedicalHistoryPage")
);
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const PublicRoute = lazy(() => import("./PublicRoute"));

export default function AppRouter() {
  return (
    <Suspense fallback={SpinnerFallback}>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path={ROUTES.login}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.register}
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Ruta protegida de inicio */}
        <Route
          path={ROUTES.home}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Rutas protegidas del dashboard profesional */}
        <Route
          path={ROUTES.dashboard.profesional}
          element={
            <PrivateRoute allowedRoles={["profesional"]}>
              <ProfessionalLayout />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={SpinnerFallback}>
                <ProfesionalDashboard />
              </Suspense>
            }
          />

          <Route
            path="pacientes"
            element={
              <Suspense fallback={SpinnerFallback}>
                <PatientList />
              </Suspense>
            }
          />
          <Route
            path="pacientes/nuevo"
            element={
              <Suspense fallback={SpinnerFallback}>
                <AddPatient />
              </Suspense>
            }
          />
          <Route
            path="pacientes/:id"
            element={
              <Suspense fallback={SpinnerFallback}>
                <PatientDetail />
              </Suspense>
            }
          />
          <Route
            path="pacientes/:id/editar"
            element={
              <Suspense fallback={SpinnerFallback}>
                <PatientEditPage />
              </Suspense>
            }
          />

          {/* Historia Clínica */}
          <Route
            path="pacientes/:patientId/historia-clinica/nueva"
            element={
              <Suspense fallback={SpinnerFallback}>
                <MedicalHistoryFormPage />
              </Suspense>
            }
          />
          <Route
            path="pacientes/:patientId/historia/:entryId/editar"
            element={
              <Suspense fallback={SpinnerFallback}>
                <EditMedicalHistoryPage />
              </Suspense>
            }
          />
          <Route
            path="pacientes/:patientId/historia/:entryId"
            element={
              <Suspense fallback={SpinnerFallback}>
                <MedicalHistoryDetailPage />
              </Suspense>
            }
          />

          {/* Turnos */}
          <Route
            path="turnos"
            element={
              <Suspense fallback={SpinnerFallback}>
                <AppointmentsList />
              </Suspense>
            }
          />
          <Route
            path="turnos/nuevo"
            element={
              <Suspense fallback={SpinnerFallback}>
                <CreateAppointment />
              </Suspense>
            }
          />

          {/* Configuración */}
          <Route
            path="configuracion"
            element={
              <Suspense fallback={SpinnerFallback}>
                <SettingsPage />
              </Suspense>
            }
          />
        </Route>

        {/* Errores */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
