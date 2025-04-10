import { useParams, useNavigate } from "react-router-dom"
import { useMedicalHistory } from "../hooks/useMedicalHistory"
import Spinner from "../../../shared/components/ui/Spinner"

export default function MedicalHistoryDetailPage() {
  const { patientId, entryId } = useParams()
  const navigate = useNavigate()
  const { entries, loading, error } = useMedicalHistory(patientId)

  const entry = entries.find((e) => e.id === entryId)

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner />
      </div>
    )

  if (error || !entry)
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-[var(--color-error)]">
          {error || "Entrada no encontrada."}
        </p>
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center border-b border-[var(--color-border-base)] pb-4">
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">
          Detalle de Historia Clínica
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-[var(--color-primary)] hover:underline"
        >
          Volver
        </button>
      </div>

      <div className="space-y-4 bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border-base)] shadow-sm">
        <DetailRow label="Fecha" value={entry.date} />
        <DetailRow label="Motivo" value={entry.reason} />
        <DetailRow label="Síntomas" value={entry.symptoms} />
        {entry.description && <DetailRow label="Descripción" value={entry.description} />}
        {entry.signs && <DetailRow label="Signos" value={entry.signs} />}
        {entry.note && <DetailRow label="Nota" value={entry.note} />}
        {entry.diagnosis && <DetailRow label="Diagnóstico" value={entry.diagnosis} />}
        {entry.treatment && <DetailRow label="Tratamiento" value={entry.treatment} />}
        <DetailRow
          label="Creado"
          value={new Date(entry.createdAt).toLocaleString("es-AR")}
        />
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm text-[var(--color-text)]">
      <span className="font-medium text-[var(--color-text-soft)]">{label}:</span> {value}
    </p>
  )
}
