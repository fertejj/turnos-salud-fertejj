// src/dashboard/professional/patients/pages/PatientDetail.tsx

import { useParams } from "react-router-dom"

export default function PatientDetail() {
  const { id } = useParams()

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Detalle del Paciente</h1>
      <p className="text-sm text-muted">ID: {id}</p>
    </div>
  )
}
