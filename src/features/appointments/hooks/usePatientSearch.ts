import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { getFirestoreInstance } from "../../../services/firebase/firestore";

export function usePatientSearch(professionalId: string) {
  const [currentName, setCurrentName] = useState("");
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);

  useEffect(() => {
    if (!loading && patients.length === 0 && currentName && !selectedPatient) {
      const timeout = setTimeout(() => {
        setShowNewPatientForm(true);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setShowNewPatientForm(false);
    }
  }, [loading, patients.length, currentName, selectedPatient]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchPatients = async () => {
        if (!currentName.trim() || !professionalId) {
          setPatients([]);
          return;
        }

        setLoading(true);
        try {
          const db = await getFirestoreInstance();
          const q = query(
            collection(db, "patients"),
            where("professionalId", "==", professionalId)
          );
          const snapshot = await getDocs(q);
          const filtered = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((p: any) =>
              p.name.toLowerCase().includes(currentName.toLowerCase().trim())
            );

          setPatients(filtered);
        } catch (err) {
          console.error("Error buscando pacientes:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchPatients();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [currentName, professionalId]);

  const handleRegisterPatient = async () => {
    if (!newPatient.name || !newPatient.email || !newPatient.phone || !currentName || !professionalId) {
      alert("Completá todos los datos del paciente.");
      return;
    }

    try {
      const db = await getFirestoreInstance();
      const docRef = await addDoc(collection(db, "patients"), {
        ...newPatient,
        dni: currentName.trim(),
        professionalId,
        createdAt: Timestamp.now(),
      });

      setSelectedPatient({ id: docRef.id, ...newPatient, dni: currentName.trim() });
      setNewPatient({ name: "", email: "", phone: "" });
      setPatients([]);
    } catch (err) {
      console.error("Error registrando paciente:", err);
    }
  };

  return {
    currentName,
    setCurrentName,
    patients,
    loading,
    selectedPatient,
    setSelectedPatient,
    newPatient,
    setNewPatient,
    showNewPatientForm,
    handleRegisterPatient,
  };
}
