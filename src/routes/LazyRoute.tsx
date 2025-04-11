import { JSX, lazy, Suspense } from "react";
import Spinner from "../shared/components/ui/Spinner";

const SpinnerFallback = (
  <div className="h-screen flex justify-center items-center">
    <Spinner />
  </div>
);

// Mapa estático de rutas válidas
const pages: Record<string, React.LazyExoticComponent<() => JSX.Element | null>> = {
  // Dashboard
  "dashboard/pages/ProfesionalDashboard": lazy(() => import("../features/dashboard/pages/ProfesionalDashboard")),

  // Pacientes
  "patients/pages/PatientList": lazy(() => import("../features/patients/pages/PatientList")),
  "patients/pages/AddPatient": lazy(() => import("../features/patients/pages/AddPatient")),
  "patients/pages/PatientDetail": lazy(() => import("../features/patients/pages/PatientDetail")),
  "patients/pages/PatientEditPage": lazy(() => import("../features/patients/pages/PatientEditPage")),

  // Historia clínica
  "medical-history/pages/MedicalHistoryFormPage": lazy(() => import("../features/medical-history/pages/MedicalHistoryFormPage")),
  "medical-history/pages/MedicalHistoryDetailPage": lazy(() => import("../features/medical-history/pages/MedicalHistoryDetailPage")),
  "medical-history/pages/EditMedicalHistoryPage": lazy(() => import("../features/medical-history/pages/EditMedicalHistoryPage")),

  // Turnos
  "appointments/pages/AppointmentList": lazy(() => import("../features/appointments/pages/AppointmentList")),
  "appointments/pages/CreateAppointment": lazy(() => import("../features/appointments/pages/CreateAppointment")),

  // Configuración
  "settings/pages/SettingsPage": lazy(() => import("../features/settings/pages/SettingsPage")),
};

type LazyRouteProps = {
  path: keyof typeof pages;
};

export function LazyRoute({ path }: LazyRouteProps) {
  const Component = pages[path];
  return (
    <Suspense fallback={SpinnerFallback}>
      <Component />
    </Suspense>
  );
}
