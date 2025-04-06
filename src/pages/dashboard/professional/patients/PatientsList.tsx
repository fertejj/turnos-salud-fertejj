// src/dashboard/professional/patients/PatientsList.tsx
import { useState } from 'react'
import PatientForm from './PatientForm'
import { usePatients } from '../../../../hooks/usePatients'
import { Patient } from '../../../../types/patient'

interface PatientsListProps {
  professionalId: string
}

export default function PatientsList({ professionalId }: PatientsListProps) {
  const { patients, loading, addPatient, updatePatient, deletePatient } =
    usePatients(professionalId)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)

  const openForm = (patient?: Patient) => {
    if (patient) setEditingPatient(patient)
    else setEditingPatient(null)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingPatient(null)
  }

  const handleSubmit = (data: Omit<Patient, 'id' | 'createdAt'>) => {
    if (editingPatient) {
      updatePatient(editingPatient.id!, data)
    } else {
      addPatient({ ...data, professionalId })
    }
    closeForm()
  }

  if (loading) return <p className="text-sm text-gray-500">Cargando pacientes...</p>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Pacientes</h2>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Agregar paciente
        </button>
      </div>

      {patients.length === 0 ? (
        <p className="text-sm text-gray-500">No hay pacientes registrados.</p>
      ) : (
        <ul className="divide-y border rounded">
          {patients.map((patient) => (
            <li key={patient.id} className="flex justify-between items-center p-3">
              <div>
                <p className="font-medium">{patient.fullName}</p>
                <p className="text-sm text-gray-600">DNI: {patient.dni}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openForm(patient)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() =>
                    confirm('¿Eliminar este paciente?') && deletePatient(patient.id!)
                  }
                  className="text-sm text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md shadow-lg">
            <PatientForm
              initialData={editingPatient || undefined}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  )
}
