import { createContext, useContext, useEffect, useState } from "react"
import { User, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../../services/firebase"

// Datos adicionales del usuario (extendible)
type UserData = {
  role: string
  [key: string]: any
}

// Tipo del contexto
type AuthContextType = {
  user: User | null
  loading: boolean
  userData: UserData | null
}

// Crear el contexto
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userData: null,
})

// Provider del contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(true)

      if (firebaseUser) {
        try {
          const ref = doc(db, "users", firebaseUser.uid)
          const snap = await getDoc(ref)
          if (snap.exists()) {
            setUserData(snap.data() as UserData)
          } else {
            setUserData(null)
          }
        } catch (err) {
          console.error("Error al obtener datos del usuario:", err)
          setUserData(null)
        }
      } else {
        setUserData(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, userData }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext)
