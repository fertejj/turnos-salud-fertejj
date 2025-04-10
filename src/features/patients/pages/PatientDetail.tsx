import { useParams, useNavigate } from "react-router-dom"
import { usePatientById } from "../hooks/usePatientById"
import { usePatients } from "../hooks/usePatients"
import { useAuth } from "../../auth/context/AuthContext"
import { Trash2, Pencil } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import InfoItem from "../ui/InfoItem"
import ConfirmationModal from "../ui/ConfirmationModal"
import Spinner from "../../../shared/components/ui/Spinner"

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { deletePatient } = usePatients(user?.uid || "")
  const { patient, loading, error } = usePatientById(id)
  const [showModal, setShowModal] = useState(false)

  const handleDelete = async () => {
    if (!id) return
    try {
      await deletePatient(id)
      toast.success("Paciente eliminado correctamente")
      navigate("/dashboard/profesional/pacientes")
    } catch (error) {
      console.error(error)
      toast.error("Ocurrió un error al eliminar el paciente")
    }
  }

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner />
      </div>
    )

  if (error)
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-[var(--color-error)]">{error}</p>
      </div>
    )

  if (!patient) return null

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Título */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text">Detalle del Paciente</h1>
          <span className="text-sm text-[var(--color-text-soft)]">ID: {id}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/dashboard/profesional/pacientes/${id}/editar`)}
            className="inline-flex items-center gap-1 rounded px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition"
          >
            <Pencil size={16} />
            Editar
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 rounded px-4 py-2 text-sm font-medium bg-[var(--color-error)] text-white hover:bg-red-600 transition"
          >
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      </div>

      {/* Secciones de datos */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Personal */}
        <div className="border border-[var(--color-border-base)] rounded-xl bg-[var(--color-surface)] p-4 space-y-3 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            Información Personal
          </h2>
          <InfoItem label="Nombre" value={patient.name} />
          <InfoItem label="Apellido" value={patient.lastName} />
          <InfoItem label="DNI" value={patient.dni} />
          <InfoItem label="Fecha de nacimiento" value={patient.birthDate} />
          <InfoItem label="Género" value={patient.gender} />
        </div>

        {/* Contacto */}
        <div className="border border-[var(--color-border-base)] rounded-xl bg-[var(--color-surface)] p-4 space-y-3 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            Información de Contacto
          </h2>
          {patient.phone && <InfoItem label="Teléfono" value={patient.phone} />}
          {patient.email && <InfoItem label="Email" value={patient.email} />}
          {patient.insurance && <InfoItem label="Obra social" value={patient.insurance} />}
          {patient.address && <InfoItem label="Dirección" value={patient.address} />}
        </div>
      </div>

      <ConfirmationModal
        open={showModal}
        title="Eliminar paciente"
        description="¿Estás seguro de que querés eliminar este paciente? Esta acción no se puede deshacer."
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
