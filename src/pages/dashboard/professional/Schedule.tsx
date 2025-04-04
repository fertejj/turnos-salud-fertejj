import { useEffect, useState } from "react";

import { auth, db } from "../../../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import AddTimeSlot from "./AddTimeSlot";

type TimeSlot = {
  from: string;
  to: string;
};

const DAYS = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

export default function Schedule() {
  const [user] = useAuthState(auth);
  const [selectedDay, setSelectedDay] = useState("lunes");
  const [availability, setAvailability] = useState<Record<string, TimeSlot[]>>({});
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const isValidTimeSlot = from && to && from < to;

  // Cargar disponibilidad del profesional desde Firestore
  useEffect(() => {
    const loadAvailability = async () => {
      if (!user) return;
      const ref = doc(db, "professionals", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setAvailability(data.availability || {});
      }
    };
    loadAvailability();
  }, [user]);

  const saveAvailability = async (updated: Record<string, TimeSlot[]>) => {
    if (!user) return;
    const ref = doc(db, "professionals", user.uid);
    await setDoc(ref, { availability: updated }, { merge: true });
  };

  const handleAdd = () => {
    const updated = {
      ...availability,
      [selectedDay]: [...(availability[selectedDay] || []), { from, to }],
    };
    setAvailability(updated);
    saveAvailability(updated);
    setFrom("");
    setTo("");
    toast.success("Franja agregada");
  };

  const handleDelete = (index: number) => {
    const updatedDay = [...(availability[selectedDay] || [])];
    updatedDay.splice(index, 1);
    const updated = { ...availability, [selectedDay]: updatedDay };
    setAvailability(updated);
    saveAvailability(updated);
    toast.success("Franja eliminada");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gestión de Agenda</h2>

      {/* Tabs de días */}
      <div className="flex flex-wrap gap-2 mb-6">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              selectedDay === day
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista de franjas */}
      <div className="space-y-3 mb-6">
        {(availability[selectedDay] || []).map((slot, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
          >
            <span className="text-sm text-gray-700">
              {slot.from} - {slot.to}
            </span>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-700"
              title="Eliminar franja"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}

        {availability[selectedDay]?.length === 0 && (
          <p className="text-sm text-gray-500">No hay franjas para este día.</p>
        )}
      </div>

      {/* Agregar nueva franja */}
      <AddTimeSlot
        from={from}
        to={to}
        onChangeFrom={setFrom}
        onChangeTo={setTo}
        onConfirm={handleAdd}
        isValid={isValidTimeSlot}
        validationError={!isValidTimeSlot && (from || to) ? "Horario inválido" : undefined}
      />
    </div>
  );
}
