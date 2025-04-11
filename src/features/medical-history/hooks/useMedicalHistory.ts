import { useEffect, useState } from "react"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore"
import { getFirestoreInstance } from "../../../services/firebase/firestore"
import { MedicalHistoryEntry } from "../types/MedicalHistoryEntry"
import { safeToDate } from "../../../shared/utils/safeToDate"

export function useMedicalHistory(patientId: string | undefined) {
  const [entries, setEntries] = useState<MedicalHistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!patientId) return

    let unsubscribe: () => void

    const fetch = async () => {
      try {
        const db = await getFirestoreInstance()
        const q = query(
          collection(db, "patients", patientId, "medicalHistory"),
          orderBy("date", "desc")
        )

        unsubscribe = onSnapshot(q, (snapshot) => {
          const result: MedicalHistoryEntry[] = snapshot.docs.map((doc) => {
            const data = doc.data()

            return {
              id: doc.id,
              reason: data.reason,
              symptoms: data.symptoms,
              diagnosis: data.diagnosis,
              note: data.note,
              signs: data.signs,
              treatment: data.treatment,
              createdBy: data.createdBy,
              date: safeToDate(data.date),
              createdAt: safeToDate(data.createdAt),
            }
          })

          setEntries(result)
          setLoading(false)
        })
      } catch (err) {
        console.error(err)
        setError("No se pudo cargar la historia clínica.")
        setLoading(false)
      }
    }

    fetch()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [patientId])

  const addEntry = async (entry: Omit<MedicalHistoryEntry, "id" | "createdAt">) => {
    if (!patientId) return
    const db = await getFirestoreInstance()
    const ref = collection(db, "patients", patientId, "medicalHistory")
    const newEntry = {
      ...entry,
      createdAt: new Date(),
    }
    await addDoc(ref, newEntry)
  }

  const updateEntry = async (entryId: string, entry: Partial<MedicalHistoryEntry>) => {
    if (!patientId) return
    const db = await getFirestoreInstance()
    const ref = doc(db, "patients", patientId, "medicalHistory", entryId)
    await updateDoc(ref, entry)
  }

  const deleteEntry = async (entryId: string) => {
    if (!patientId) return
    const db = await getFirestoreInstance()
    const ref = doc(db, "patients", patientId, "medicalHistory", entryId)
    await deleteDoc(ref)
  }

  const getEntryById = async (entryId: string): Promise<MedicalHistoryEntry | null> => {
    if (!patientId) return null
    const db = await getFirestoreInstance()
    const ref = doc(db, "patients", patientId, "medicalHistory", entryId)
    const snap = await getDoc(ref)
    if (snap.exists()) {
      const data = snap.data()
      return {
        id: snap.id,
        reason: data.reason,
        symptoms: data.symptoms,
        diagnosis: data.diagnosis,
        note: data.note,
        signs: data.signs,
        treatment: data.treatment,
        createdBy: data.createdBy,
        date: safeToDate(data.date),
        createdAt: safeToDate(data.createdAt),
      }
    }
    return null
  }

  return {
    entries,
    loading,
    error,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntryById,
  }
}
