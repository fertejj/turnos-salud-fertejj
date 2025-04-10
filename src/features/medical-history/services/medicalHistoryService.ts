import {
    collection,
    addDoc,
    getDocs,
    query,
    doc,
    deleteDoc,
    updateDoc,
  } from "firebase/firestore"
  import { getFirestoreInstance } from "../../../services/firebase/firestore"
import { MedicalHistoryEntry } from "../types/MedicalHistoryEntry"
  
  export const getMedicalHistory = async (patientId: string) => {
    const db = await getFirestoreInstance()
    const q = query(collection(db, "patients", patientId, "medicalHistory"))
    const snapshot = await getDocs(q)
  
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<MedicalHistoryEntry, "id">),
    }))
  }
  
  export const addMedicalHistoryEntry = async (
    patientId: string,
    entry: Omit<MedicalHistoryEntry, "id" | "createdAt">
  ) => {
    const db = await getFirestoreInstance()
    const ref = collection(db, "patients", patientId, "medicalHistory")
    const newEntry = {
      ...entry,
      createdAt: new Date().toISOString(),
    }
    const docRef = await addDoc(ref, newEntry)
    return docRef.id
  }
  
  export const updateMedicalHistoryEntry = async (
    patientId: string,
    entryId: string,
    entry: Partial<MedicalHistoryEntry>
  ) => {
    const db = await getFirestoreInstance()
    const ref = doc(db, "patients", patientId, "medicalHistory", entryId)
    await updateDoc(ref, entry)
  }
  
  export const deleteMedicalHistoryEntry = async (
    patientId: string,
    entryId: string
  ) => {
    const db = await getFirestoreInstance()
    const ref = doc(db, "patients", patientId, "medicalHistory", entryId)
    await deleteDoc(ref)
  }
  