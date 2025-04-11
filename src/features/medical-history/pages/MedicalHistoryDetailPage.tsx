import { useParams, useNavigate } from "react-router-dom";
import { useMedicalHistory } from "../hooks/useMedicalHistory";
import Spinner from "../../../shared/components/ui/Spinner";
import { Pencil } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function MedicalHistoryDetailPage() {
  const { patientId = "", entryId = "" } = useParams();
  const navigate = useNavigate();
  const { entries, loading, error } = useMedicalHistory(patientId);
  const entry = entries.find((e) => e.id === entryId);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error || !entry)
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-[var(--color-error)]">
          {error || "Entrada no encontrada."}
        </p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between border-b border-[var(--color-border-base)] pb-4">
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">
          Detalle de Historia Clínica
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() =>
              navigate(
                `/dashboard/profesional/pacientes/${patientId}/historia/${entryId}/editar`
              )
            }
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition"
          >
            <Pencil size={16} />
            Editar
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 text-sm rounded border border-[var(--color-border-base)] text-[var(--color-text)] hover:bg-[var(--color-hover-surface)] transition"
          >
            Volver
          </button>
        </div>
      </div>

      {/* Detalles */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-xl shadow-md p-6 space-y-4 text-sm text-[var(--color-text)]">
        {entry.date && (
          <p>
            <span className="font-medium">Fecha:</span>{" "}
            {format(new Date(entry.date), "EEEE d 'de' MMMM yyyy", {
              locale: es,
            })}
          </p>
        )}
        <p>
          <span className="font-medium">Motivo:</span> {entry.reason}
        </p>
        <p>
          <span className="font-medium">Síntomas:</span> {entry.symptoms}
        </p>
        {entry.description && (
          <p>
            <span className="font-medium">Descripción:</span>{" "}
            {entry.description}
          </p>
        )}
        {entry.signs && (
          <p>
            <span className="font-medium">Signos:</span> {entry.signs}
          </p>
        )}
        {entry.note && (
          <p>
            <span className="font-medium">Nota:</span> {entry.note}
          </p>
        )}
        {entry.diagnosis && (
          <p>
            <span className="font-medium">Diagnóstico:</span> {entry.diagnosis}
          </p>
        )}
        {entry.treatment && (
          <p>
            <span className="font-medium">Tratamiento:</span> {entry.treatment}
          </p>
        )}
        {entry.createdAt && (
          <p>
            <span className="font-medium">Creado:</span>{" "}
            {format(new Date(entry.createdAt), "dd/MM/yyyy HH:mm", {
              locale: es,
            })}
          </p>
        )}
      </div>
    </div>
  );
}
