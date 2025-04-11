import { NotebookPen } from "lucide-react";
import MedicalHistoryList from "../../../medical-history/pages/MedicalHistoryList";

interface Props {
  patientId: string;
}

export default function PatientMedicalHistory({ patientId }: Props) {
  return (
    <section className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-6 shadow-md space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <NotebookPen size={20} className="text-[var(--color-primary)]" />
        <h2 className="text-xl font-semibold text-[var(--color-text)]">
          Historia Clínica
        </h2>
      </div>

      <MedicalHistoryList patientId={patientId} />
    </section>
  );
}
