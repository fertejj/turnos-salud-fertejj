import AddPatientButton from "../../ui/AddPatientButton";

export default function PatientListHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight">
          Mis pacientes
        </h1>
        <p className="text-sm text-[var(--color-text-soft)]">
          Lista de todos los pacientes registrados.
        </p>
      </div>
      <AddPatientButton />
    </div>
  );
}
