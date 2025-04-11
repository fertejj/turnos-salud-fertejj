import { Pencil, Trash2, Eye, CalendarDays } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useMedicalHistory } from "../hooks/useMedicalHistory"
import { toast } from "react-hot-toast"
import ConfirmationModal from "../../../shared/ui/modal/ConfirmationModal"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Props {
  entryId: string
  patientId: string
  title: string
  date: Date
  note?: string
}

export default function MedicalHistoryItem(props: Props) {
  const { entryId, patientId, title, date, note } = props
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const { deleteEntry } = useMedicalHistory(patientId)

  const formattedDate = format(date, "EEEE dd 'de' MMMM yyyy", { locale: es })

  const handleView = () =>
    navigate(`/dashboard/profesional/pacientes/${patientId}/historia/${entryId}`)

  const handleEdit = () =>
    navigate(`/dashboard/profesional/pacientes/${patientId}/historia/${entryId}/editar`)

  const handleDelete = async () => {
    try {
      await deleteEntry(entryId)
      toast.success("Entrada eliminada con éxito")
    } catch (error) {
      console.error("Error al eliminar entrada:", error)
      toast.error("No se pudo eliminar la entrada")
    } finally {
      setShowModal(false)
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-5 shadow-sm hover:shadow-md transition space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        {/* Título y Fecha */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-soft)]">
            <CalendarDays size={16} />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <IconButton onClick={handleView} title="Ver entrada">
            <Eye size={18} className="text-muted-foreground" />
          </IconButton>

          <IconButton onClick={handleEdit} title="Editar entrada">
            <Pencil size={18} className="text-[var(--color-primary)]" />
          </IconButton>

          <IconButton onClick={() => setShowModal(true)} title="Eliminar entrada">
            <Trash2 size={18} className="text-[var(--color-error)]" />
          </IconButton>
        </div>
      </div>

      {/* Nota */}
      {note && <p className="text-sm text-[var(--color-text)] leading-relaxed">{note}</p>}

      {/* Modal */}
      <ConfirmationModal
        open={showModal}
        title="Eliminar entrada"
        description="¿Estás seguro de que querés eliminar esta entrada de historia clínica? Esta acción no se puede deshacer."
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

function IconButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md hover:bg-muted/50 transition"
      title={title}
    >
      {children}
    </button>
  )
}
