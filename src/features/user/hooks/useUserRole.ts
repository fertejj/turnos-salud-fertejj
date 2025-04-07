import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../auth/context/AuthContext';
import { getFirestoreInstance } from '../../../services/firebase/firestore';

export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchRole = async () => {
      const db = await getFirestoreInstance(); // ✅ lazy-load Firestore
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setRole(snap.data().role);
      }

      setLoading(false);
    };

    fetchRole();
  }, [user]);

  return { role, loading };
}
