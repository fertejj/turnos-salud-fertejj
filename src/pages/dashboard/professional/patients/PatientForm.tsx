// src/dashboard/professional/patients/PatientForm.tsx
import { useState } from 'react'
import { Patient } from '../../../../types/patient'

interface PatientFormProps {
  initialData?: Patient
  onSubmit: (data: Omit<Patient, 'id' | 'createdAt'>) => void
  onCancel: () => void
}

export default function PatientForm({
  initialData,
  onSubmit,
  onCancel,
}: PatientFormProps) {
  const [fullName, setFullName] = useState(initialData?.fullName || '')
  const [dni, setDni] = useState(initialData?.dni || '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [phone, setPhone] = useState(initialData?.phone || '')
  const [notes, setNotes] = useState(initialData?.notes || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !dni) return // Validación básica

    onSubmit({
      fullName,
      dni,
      email,
      phone,
      notes,
      professionalId: initialData?.professionalId || '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre completo</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">DNI</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Teléfono</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Observaciones</label>
        <textarea
          className="w-full p-2 border rounded"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {initialData ? 'Guardar cambios' : 'Agregar paciente'}
        </button>
      </div>
    </form>
  )
}
