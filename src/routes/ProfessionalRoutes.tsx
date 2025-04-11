import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ProfessionalLayout from "../features/dashboard/layout/ProfessionalLayout";
import { LazyRoute } from "./LazyRoute";

export function ProfessionalRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute allowedRoles={["profesional"]}>
            <ProfessionalLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<LazyRoute path="dashboard/pages/ProfesionalDashboard" />} />

        {/* Pacientes */}
        <Route path="pacientes" element={<LazyRoute path="patients/pages/PatientList" />} />
        <Route path="pacientes/nuevo" element={<LazyRoute path="patients/pages/AddPatient" />} />
        <Route path="pacientes/:id" element={<LazyRoute path="patients/pages/PatientDetail" />} />
        <Route path="pacientes/:id/editar" element={<LazyRoute path="patients/pages/PatientEditPage" />} />

        {/* Historia clínica */}
        <Route path="pacientes/:patientId/historia-clinica/nueva" element={<LazyRoute path="medical-history/pages/MedicalHistoryFormPage" />} />
        <Route path="pacientes/:patientId/historia/:entryId" element={<LazyRoute path="medical-history/pages/MedicalHistoryDetailPage" />} />
        <Route path="pacientes/:patientId/historia/:entryId/editar" element={<LazyRoute path="medical-history/pages/EditMedicalHistoryPage" />} />

        {/* Turnos */}
        <Route path="turnos" element={<LazyRoute path="appointments/pages/AppointmentList" />} />
        <Route path="turnos/nuevo" element={<LazyRoute path="appointments/pages/CreateAppointment" />} />

        {/* Configuración */}
        <Route path="configuracion" element={<LazyRoute path="settings/pages/SettingsPage" />} />
      </Route>
    </Routes>
  );
}
