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
} from 'firebase/firestore'
import { db } from '../services/firebase'
import { Patient } from '../types/patient'

export function usePatients(professionalId: string) {
    const [patients, setPatients] = useState<Patient[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const q = query(
            collection(db, 'patients'),
            where('professionalId', '==', professionalId)
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const results: Patient[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Patient, 'id'>),
            }))
            setPatients(results)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [professionalId])

    const addPatient = async (patient: Omit<Patient, 'id' | 'createdAt'>) => {
        const newPatient = {
            ...patient,
            createdAt: new Date().toISOString(),
        }
        await addDoc(collection(db, 'patients'), newPatient)
    }

    const updatePatient = async (id: string, patient: Partial<Patient>) => {
        const ref = doc(db, 'patients', id)
        await updateDoc(ref, patient)
    }

    const deletePatient = async (id: string) => {
        const ref = doc(db, 'patients', id)
        await deleteDoc(ref)
    }

    return {
        patients,
        loading,
        addPatient,
        updatePatient,
        deletePatient,
    }
}
