import { useNavigate } from "react-router-dom"
import { UserPlus } from "lucide-react"

export default function AddPatientButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate("/dashboard/profesional/pacientes/nuevo")}
      className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition"
    >
      <UserPlus size={18} />
      Agregar paciente
    </button>
  )
}
