// hooks/useProfessional.ts
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../../../services/firebase";

export default function useProfessional() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ name?: string; email: string; avatar?: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            name: data.name || "",
            email: firebaseUser.email || "",
            avatar: data.avatar || "",
          });
        } else {
          setProfile({
            email: firebaseUser.email || "",
          });
        }
      } else {
        setProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, profile };
}
