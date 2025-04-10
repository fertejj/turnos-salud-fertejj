import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { Patient } from "../types"
import { getFirestoreInstance } from "../../../services/firebase/firestore"

export function usePatientById(id?: string) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchPatient = async () => {
      try {
        const db = await getFirestoreInstance()
        const ref = doc(db, "patients", id)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          setPatient({
            id: snap.id,
            ...(snap.data() as Omit<Patient, "id">),
          })
        } else {
          setError("El paciente no existe.")
        }
      } catch (err) {
        console.error("Error al obtener el paciente:", err)
        setError("Hubo un error al cargar los datos del paciente.")
      } finally {
        setLoading(false)
      }
    }

    fetchPatient()
  }, [id])

  return { patient, loading, error }
}
