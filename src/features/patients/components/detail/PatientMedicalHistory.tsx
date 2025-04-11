import MedicalHistoryList from "../../../medical-history/pages/MedicalHistoryList";

interface Props {
  patientId: string;
}

export default function PatientMedicalHistory({ patientId }: Props) {
  return (
    <section className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-6 shadow-md">
      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Historia Clínica</h2>
      <MedicalHistoryList patientId={patientId} />
    </section>
  );
}