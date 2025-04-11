import { useMedicalHistory } from "../hooks/useMedicalHistory"
import { useNavigate } from "react-router-dom"
import MedicalHistoryItem from "../components/MedicalHistoryItem"
import { Plus } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

type Props = {
  patientId: string
}

export default function MedicalHistoryList({ patientId }: Props) {
  const { entries } = useMedicalHistory(patientId)
  const navigate = useNavigate()

  // Agrupar por fecha de consulta
  const groupedEntries = entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    const dateKey = format(entry.date, "yyyy-MM-dd")
    acc[dateKey] = acc[dateKey] || []
    acc[dateKey].push(entry)
    return acc
  }, {})

  // Ordenar fechas de grupo: más recientes primero
  const sortedDates = Object.keys(groupedEntries).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )

  return (
    <div className="relative pl-6 border-l-2 border-muted">
      <div className="absolute top-0 left-2 h-full w-0.5 bg-muted-foreground opacity-50" />

      <div className="flex justify-end mb-6">
        <button
          onClick={() =>
            navigate(`/dashboard/profesional/pacientes/${patientId}/historia-clinica/nueva`)
          }
          className="inline-flex items-center gap-1 rounded px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition"
        >
          <Plus size={16} />
          Nueva entrada
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-[var(--color-text-soft)]">
          Aún no hay entradas registradas.
        </p>
      ) : (
        sortedDates.map((dateStr) => {
          const formattedDate = format(new Date(dateStr), "dd 'de' MMMM yyyy", { locale: es })

          const sortedGroup = groupedEntries[dateStr].sort(
            (a, b) => b.date.getTime() - a.date.getTime()
          )
          console.log(sortedGroup)
          return (
            <div key={dateStr} className="relative mb-10">
              <div className="absolute -left-8 top-0.5 w-4 h-4 bg-primary-dark border-4 border-white rounded-full shadow-md" />

              <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wide mb-3">
                {formattedDate}
              </h3>

              <div className="space-y-4">
                {sortedGroup.map((entry) => (
                  <MedicalHistoryItem
                    key={entry.id}
                    entryId={entry.id!}
                    patientId={patientId}
                    title={entry.reason}
                    date={entry.date}
                    note={entry.note}
                  />
                ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
