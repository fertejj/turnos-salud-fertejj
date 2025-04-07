import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getAuthInstance } from "../../../services/firebase/auth";
import { getFirestoreInstance } from "../../../services/firebase/firestore";

export default function useProfessional() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ name?: string; email: string; avatar?: string } | null>(null);

  useEffect(() => {
    let unsubscribe: () => void;

    const init = async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      const auth = await getAuthInstance();
      const db = await getFirestoreInstance();

      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { user, profile };
}
