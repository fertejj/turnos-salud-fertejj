import { useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getFirestoreInstance } from "../../../services/firebase/firestore";

export function useAppointmentForm(userId: string | undefined, selectedPatient: any, resetPatientForm: () => void) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    date: new Date(),
    time: "",
    note: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "date") {
      setForm((prev) => ({ ...prev, date: new Date(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateAppointment = async () => {
    if (!form.date || !form.time || !selectedPatient) {
      alert("Completá todos los campos");
      return;
    }

    const [hour, minute] = form.time.split(":");
    const fullDate = new Date(form.date);
    fullDate.setHours(+hour, +minute);

    setSubmitting(true);
    try {
      const db = await getFirestoreInstance();
      await addDoc(collection(db, "appointments"), {
        professionalId: userId,
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        date: Timestamp.fromDate(fullDate),
        note: form.note,
        createdAt: Timestamp.now(),
      });

      alert("Turno creado correctamente");
      resetPatientForm(); // reset seleccionado
      setForm({ date: new Date(), time: "", note: "" });
    } catch (err) {
      console.error("Error al crear turno:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    submitting,
    handleFormChange,
    handleCreateAppointment,
  };
}
