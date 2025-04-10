import { useAuth } from "../../auth/context/AuthContext";
import SectionHeader from "../components/SectionHeader";
import PatientSearch from "../components/PatientSearch";
import PatientInfo from "../components/PatientInfo";
import NewPatientForm from "../components/NewPatientForm";
import AppointmentForm from "../components/AppointmentForm";
import PatientResultList from "../components/PatientResultList";
import { usePatientSearch } from "../hooks/usePatientSearch";
import { useAppointmentForm } from "../hooks/useAppointmentForm";

export default function CreateAppointment() {
  const { user } = useAuth();

  const {
    currentName,
    setCurrentName,
    selectedPatient,
    setSelectedPatient,
    patients,
    loading,
    showNewPatientForm,
    newPatient,
    setNewPatient,
    handleRegisterPatient,
  } = usePatientSearch(user?.uid || "");

  const {
    form,
    submitting,
    handleFormChange,
    handleCreateAppointment,
  } = useAppointmentForm(user?.uid, selectedPatient, () => {
    setSelectedPatient(null);
    setCurrentName("");
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <SectionHeader
        title="Nuevo turno"
        subtitle="Buscá al paciente y completá los datos para registrar un nuevo turno."
      />

      <PatientSearch
        name={currentName}
        onChange={(e) => {
          setCurrentName(e.target.value);
          setSelectedPatient(null);
        }}
      />

      {loading && (
        <p className="text-sm text-[var(--color-text-soft)]">
          Buscando paciente...
        </p>
      )}

      {patients.length > 0 && !selectedPatient && (
        <PatientResultList patients={patients} onSelect={setSelectedPatient} />
      )}

      {selectedPatient && (
        <div className="bg-surface border border-[var(--color-border-base)] rounded-2xl p-6 shadow-md">
          <PatientInfo patient={selectedPatient} />
        </div>
      )}

      {showNewPatientForm && (
        <NewPatientForm
          newPatient={newPatient}
          onChange={(e) =>
            setNewPatient({ ...newPatient, [e.target.name]: e.target.value })
          }
          onSubmit={handleRegisterPatient}
        />
      )}

      {selectedPatient && (
        <div className="bg-surface border border-[var(--color-border-base)] rounded-2xl p-6 shadow-md">
          <AppointmentForm
            form={form}
            onChange={handleFormChange}
            onSubmit={handleCreateAppointment}
            submitting={submitting}
          />
        </div>
      )}
    </div>
  );
}
