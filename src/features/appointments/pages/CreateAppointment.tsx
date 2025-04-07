import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../../auth/context/AuthContext";

import PatientSearch from "../components/PatientSearch";
import PatientInfo from "../components/PatientInfo";
import NewPatientForm from "../components/NewPatientForm";
import AppointmentForm from "../components/AppointmentForm";
import { getFirestoreInstance } from "../../../services/firebase/firestore";

export default function CreateAppointment() {
  const { user } = useAuth();

  const [dni, setDni] = useState("");
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    date: "",
    time: "",
    note: "",
  });

  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSearch = async () => {
    if (!dni || !user) return;

    setLoading(true);
    setPatient(null);

    try {
      const db = await getFirestoreInstance();
      const q = query(
        collection(db, "patients"),
        where("dni", "==", dni.trim()),
        where("professionalId", "==", user.uid)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setPatient({ id: doc.id, ...doc.data() });
      }
    } catch (error) {
      console.error("Error buscando paciente:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterPatient = async () => {
    if (!newPatient.name || !newPatient.email || !newPatient.phone || !dni || !user) {
      alert("Completá todos los datos del paciente.");
      return;
    }

    try {
      const db = await getFirestoreInstance();
      const docRef = await addDoc(collection(db, "patients"), {
        ...newPatient,
        dni: dni.trim(),
        professionalId: user.uid,
        createdAt: Timestamp.now(),
      });

      setPatient({ id: docRef.id, ...newPatient, dni });
      setNewPatient({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error("Error registrando paciente:", err);
    }
  };

  const handleCreateAppointment = async () => {
    if (!form.date || !form.time || !patient) {
      alert("Completá todos los campos");
      return;
    }

    const [year, month, day] = form.date.split("-");
    const [hour, minute] = form.time.split(":");
    const date = new Date(+year, +month - 1, +day, +hour, +minute);

    setSubmitting(true);

    try {
      const db = await getFirestoreInstance();
      await addDoc(collection(db, "appointments"), {
        patientId: patient.id,
        date: Timestamp.fromDate(date),
        note: form.note,
        createdAt: Timestamp.now(),
      });

      alert("Turno creado correctamente");
      setPatient(null);
      setDni("");
      setForm({ date: "", time: "", note: "" });
    } catch (err) {
      console.error("Error al crear turno:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleNewPatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-primary mb-4">Nuevo turno</h1>

      <PatientSearch
        dni={dni}
        onChange={(e) => setDni(e.target.value)}
        onSearch={handleSearch}
      />

      {loading && <p>Buscando paciente...</p>}

      {patient && <PatientInfo patient={patient} />}

      {!loading && !patient && dni && (
        <NewPatientForm
          newPatient={newPatient}
          onChange={handleNewPatientChange}
          onSubmit={handleRegisterPatient}
        />
      )}

      {patient && (
        <AppointmentForm
          form={form}
          onChange={handleFormChange}
          onSubmit={handleCreateAppointment}
          submitting={submitting}
        />
      )}
    </div>
  );
}
