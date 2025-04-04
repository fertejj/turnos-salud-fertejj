import { useState } from "react";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import PrimaryButton from "../ui/PrimaryButton";

export default function ManualAppointmentForm() {
  const { user } = useAuth();

  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!patientName || !date || !time) {
      toast.error("Completá todos los campos obligatorios.");
      return;
    }

    // Validar que no sea una fecha pasada
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);

    if (selectedDateTime < now) {
      toast.error("No se puede agendar un turno en el pasado.");
      return;
    }

    try {
      // Verificar que no exista un turno en el mismo día y hora
      const turnosRef = collection(db, "turnos");
      const q = query(
        turnosRef,
        where("professionalId", "==", user.uid),
        where("date", "==", date),
        where("time", "==", time)
      );
      const existing = await getDocs(q);

      if (!existing.empty) {
        toast.error("Ya tenés un turno agendado en ese horario.");
        return;
      }

      // Guardar el turno
      await addDoc(turnosRef, {
        professionalId: user.uid,
        patientName,
        date,
        time,
        notes: notes || "",
        createdAt: Timestamp.now(),
      });

      toast.success("Turno agendado con éxito");
      setPatientName("");
      setDate("");
      setTime("");
      setNotes("");
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
          Nombre del paciente *
        </label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
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
