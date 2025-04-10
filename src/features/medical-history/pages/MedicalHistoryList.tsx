import { useMedicalHistory } from "../hooks/useMedicalHistory";
import { useNavigate } from "react-router-dom";
import MedicalHistoryItem from "../components/MedicalHistoryItem";
import { Plus } from "lucide-react";

type Props = {
  patientId: string;
};

export default function MedicalHistoryList({ patientId }: Props) {
  const { entries } = useMedicalHistory(patientId);
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Botón agregar */}
      <div className="flex justify-end">
        <button
          onClick={() =>
            navigate(
              `/dashboard/profesional/pacientes/${patientId}/historia-clinica/nueva`
            )
          }
          className="inline-flex items-center gap-1 rounded px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition"
        >
          <Plus size={16} />
          Nueva entrada
        </button>
      </div>

      {/* Lista */}
      {entries.length === 0 ? (
        <p className="text-sm text-[var(--color-text-soft)]">
          Aún no hay entradas registradas.
        </p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <MedicalHistoryItem
              key={entry.id}
              entryId={entry.id!}
              patientId={patientId}
              title={entry.reason}
              date={new Date(entry.createdAt).toLocaleString("es-AR")}
              note={entry.note}
            />
          ))}
        </div>
      )}
    </div>
  );
}
