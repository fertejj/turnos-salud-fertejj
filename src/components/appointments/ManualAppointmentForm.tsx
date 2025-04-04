import { useState } from "react";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import PrimaryButton from "../ui/PrimaryButton";

export default function ManualAppointmentForm() {
  const { user } = useAuth();

  const [dni, setDni] = useState("");
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [nameLocked, setNameLocked] = useState(false); // Para bloquear edición

  const checkIfPatientExists = async () => {
    if (!dni) return;

    const pacientesRef = collection(db, "pacientes");
    const q = query(pacientesRef, where("dni", "==", dni));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const paciente = snapshot.docs[0].data();
      setPatientName(paciente.name);
      setNameLocked(true);
      toast.success("Paciente encontrado");
    } else {
      setPatientName("");
      setNameLocked(false);
      toast("Nuevo paciente. Ingresá nombre completo");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!dni || !patientName || !date || !time) {
      toast.error("Completá todos los campos obligatorios.");
      return;
    }

    const now = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);
    if (selectedDateTime < now) {
      toast.error("No se puede agendar un turno en el pasado.");
      return;
    }

    try {
      const turnosRef = collection(db, "turnos");
      const existingTurno = await getDocs(
        query(
          turnosRef,
          where("professionalId", "==", user.uid),
          where("date", "==", date),
          where("time", "==", time)
        )
      );
      if (!existingTurno.empty) {
        toast.error("Ya tenés un turno agendado en ese horario.");
        return;
      }

      // Buscar o crear paciente
      const pacientesRef = collection(db, "pacientes");
      const q = query(pacientesRef, where("dni", "==", dni));
      const pacientesSnapshot = await getDocs(q);

      let patientId: string;
      if (pacientesSnapshot.empty) {
        const newPatientRef = doc(pacientesRef);
        await setDoc(newPatientRef, {
          dni,
          name: patientName,
          createdAt: Timestamp.now(),
        });
        patientId = newPatientRef.id;
      } else {
        patientId = pacientesSnapshot.docs[0].id;
      }

      await addDoc(turnosRef, {
        professionalId: user.uid,
        patientId,
        patientName,
        dni,
        date,
        time,
        notes: notes || "",
        createdAt: Timestamp.now(),
      });

      toast.success("Turno agendado con éxito");
      setDni("");
      setPatientName("");
      setDate("");
      setTime("");
      setNotes("");
      setNameLocked(false);
    } catch (error) {
      console.error("Error al guardar turno:", error);
      toast.error("Hubo un error al guardar el turno.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white border p-6 rounded-lg shadow max-w-xl mx-auto"
    >
      <h2 className="text-xl font-bold text-primary-dark mb-4">
        Agendar turno manual
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">
          DNI del paciente *
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            onBlur={checkIfPatientExists}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Nombre del paciente *
        </label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          disabled={nameLocked}
          className={`w-full border border-gray-300 rounded px-3 py-2 text-sm ${
            nameLocked ? "bg-gray-100 text-gray-500" : ""
          }`}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hora *</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Notas (opcional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          rows={3}
        />
      </div>

      <PrimaryButton type="submit">Guardar turno</PrimaryButton>
    </form>
  );
}
