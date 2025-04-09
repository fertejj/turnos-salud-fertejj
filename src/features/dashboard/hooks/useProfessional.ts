import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { ProfessionalUser } from '../types/user'
import { getAuthInstance } from '../../../services/firebase/auth'
import { getFirestoreInstance } from '../../../services/firebase/firestore'


export default function useProfessional() {
  const [user, setUser] = useState<User | null>(null)
  const [professional, setProfessional] = useState<ProfessionalUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe: () => void

    const init = async () => {
      const { onAuthStateChanged } = await import('firebase/auth')
      const auth = await getAuthInstance()
      const db = await getFirestoreInstance()

      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser)

        if (firebaseUser) {
          const docRef = doc(db, 'users', firebaseUser.uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            setProfessional({
              id: firebaseUser.uid,
              name: data.fullName || '',
              email: firebaseUser.email || '',
              phone: data.phone || '',
              address: data.address || '',
              city: data.city || "",
              birthdate: data.birthdate || '',
              dni: data.dni || '',
              license: data.license || '',
              experience: data.experience || '',
              gender: data.gender || '',
              role: data.role || '',
              specialty: data.specialty || '',
              university: data.university || '',
              photoURL: data.photoURL || '',
            })
          } else {
            setProfessional(null)
          }
        } else {
          setProfessional(null)
        }

        setLoading(false)
      })
    }

    init()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return { professional, loading }
}
