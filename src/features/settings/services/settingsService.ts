import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { ProfessionalUser } from '../../dashboard/types/user'
import { getFirestoreInstance } from '../../../services/firebase/firestore'

export async function updateProfessionalData(professional: ProfessionalUser) {
  const db = await getFirestoreInstance()
  const docRef = doc(db, 'users', professional.id)

  const dataToUpdate = {
    fullName: professional.fullName,
    dni: professional.dni,
    birthDate: professional.birthdate,
    phone: professional.phone,
    address: professional.address,
    specialty: professional.specialty,
    photoURL: professional.photoURL,
  }

  await updateDoc(docRef, dataToUpdate)
}

export async function uploadProfilePhoto(uid: string, file: File): Promise<string> {
  const storage = getStorage()
  const storageRef = ref(storage, `avatars/${uid}/${file.name}`)

  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)

  return downloadURL
}
