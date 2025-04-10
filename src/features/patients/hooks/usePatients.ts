// src/dashboard/professional/patients/usePatients.ts
import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDoc,
} from 'firebase/firestore'
import { Patient } from '../types'
import { getFirestoreInstance } from '../../../services/firebase/firestore'

export function usePatients(professionalId: string) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe: () => void

    const setupListener = async () => {
      const db = await getFirestoreInstance()
      const q = query(
        collection(db, 'patients'),
        where('professionalId', '==', professionalId)
      )

      unsubscribe = onSnapshot(q, (snapshot) => {
        const results: Patient[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Patient, 'id'>),
        }))
        setPatients(results)
        setLoading(false)
      })
    }

    setupListener()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [professionalId])

  const addPatient = async (patient: Omit<Patient, 'id' | 'createdAt'>) => {
    const db = await getFirestoreInstance()
    const newPatient = {
      ...patient,
      createdAt: new Date().toISOString(),
    }
    await addDoc(collection(db, 'patients'), newPatient)
  }

  const updatePatient = async (id: string, patient: Partial<Patient>) => {
    const db = await getFirestoreInstance()
    const ref = doc(db, 'patients', id)
    await updateDoc(ref, patient)
  }

  const deletePatient = async (id: string) => {
    const db = await getFirestoreInstance()
    const ref = doc(db, 'patients', id)
    await deleteDoc(ref)
  }

  const getPatientById = async (id: string): Promise<Patient | null> => {
    const db = await getFirestoreInstance()
    const ref = doc(db, 'patients', id)
    const snap = await getDoc(ref)
  
    if (snap.exists()) {
      return {
        id: snap.id,
        ...(snap.data() as Omit<Patient, 'id'>),
      }
    } else {
      return null
    }
  }
  

  return {
    patients,
    loading,
    addPatient,
    updatePatient,
    deletePatient,
    getPatientById,
  }
}
