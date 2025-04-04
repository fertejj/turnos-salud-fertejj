import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type TimeSlot = {
  from: string;
  to: string;
};

export function useAvailability() {
  const [user] = useAuthState(auth);
  const [availability, setAvailability] = useState<Record<string, TimeSlot[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAvailability = async () => {
      if (!user) return;
      try {
        const ref = doc(db, "professionals", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setAvailability(data.availability || {});
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar la disponibilidad");
      } finally {
        setLoading(false);
      }
    };

    loadAvailability();
  }, [user]);

  const updateAvailability = async (updated: Record<string, TimeSlot[]>) => {
    if (!user) return;
    setSaving(true);
    try {
      const ref = doc(db, "professionals", user.uid);
      await setDoc(ref, { availability: updated }, { merge: true });
      setAvailability(updated);
    } catch (err) {
      console.error(err);
      setError("Error al guardar la disponibilidad");
    } finally {
      setSaving(false);
    }
  };

  return {
    availability,
    loading,
    saving,
    error,
    updateAvailability,
  };
}
