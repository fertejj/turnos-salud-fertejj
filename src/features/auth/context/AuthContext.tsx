import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { firebaseConfig } from "../../../services/firebase/config"; // ✅ ruta corregida

type UserData = {
  role: string;
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  userData: UserData | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userData: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void;

    const initAuth = async () => {
      try {
        const { initializeApp } = await import("firebase/app");
        const { getAuth, onAuthStateChanged } = await import("firebase/auth");
        const { getFirestore, doc, getDoc } = await import("firebase/firestore/lite");

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db: Firestore = getFirestore(app);

        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          setUser(firebaseUser);
          setLoadingAuth(false);

          if (firebaseUser) {
            setLoadingUserData(true);
            try {
              const ref = doc(db, "users", firebaseUser.uid);
              const snap = await getDoc(ref);

              if (snap.exists()) {
                setUserData(snap.data() as UserData);
              } else {
                setUserData(null);
              }
            } catch (err) {
              console.error("Error al obtener datos del usuario:", err);
              setUserData(null);
            } finally {
              setLoadingUserData(false);
            }
          } else {
            setUserData(null);
            setLoadingUserData(false);
          }
        });
      } catch (error) {
        console.error("Error al inicializar autenticación:", error);
        setLoadingAuth(false);
        setLoadingUserData(false);
      }
    };

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const loading = loadingAuth || loadingUserData;

  return (
    <AuthContext.Provider value={{ user, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
