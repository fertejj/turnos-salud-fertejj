import { useNavigate } from "react-router-dom"
import PatientForm from "../components/PatientForm"
import { usePatients } from "../hooks/usePatients"
import { Patient, FormData } from "../types"
import toast from "react-hot-toast"
import { useAuth } from "../../auth/context/AuthContext"

export default function AddPatient() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addPatient } = usePatients(user?.uid || "")

  const handleSubmit = async (formData: FormData) => {
    if (!user?.uid) {
      toast.error("No se pudo identificar al profesional.")
      return
    }

    try {
      const data: Omit<Patient, "id" | "createdAt"> = {
        ...formData,
        professionalId: user.uid,
      }

      await addPatient(data)

      toast.success("Paciente agregado correctamente")
      navigate("/dashboard/profesional/pacientes")
    } catch (err) {
      console.error(err)
      toast.error("Ocurrió un error al guardar el paciente")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Agregar nuevo paciente</h1>
      <PatientForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
    </div>
  )
}
