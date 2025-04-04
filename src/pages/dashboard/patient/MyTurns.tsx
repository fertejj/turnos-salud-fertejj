import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../services/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import toast from "react-hot-toast";
import { FiTrash2, FiCalendar, FiClock } from "react-icons/fi";
import PatientLayout from "../../../components/layout/PatientLayout";

type Appointment = {
  id: string;
  date: string;
  time: string;
};

export default function MyTurns() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    if (!user) return;
    const q = query(collection(db, "turnos"), where("userId", "==", user.uid));
    const snap = await getDocs(q);
    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Appointment, "id">),
    }));
    const sorted = data.sort((a, b) => {
      const aDate = new Date(`${a.date}T${a.time}`);
      const bDate = new Date(`${b.date}T${b.time}`);
      const now = new Date();
      const aIsPast = aDate < now;
      const bIsPast = bDate < now;

      if (aIsPast && !bIsPast) return 1;
      if (!aIsPast && bIsPast) return -1;
      return aDate.getTime() - bDate.getTime();
    });
    setAppointments(sorted);
    setLoading(false);
  };

  const handleCancel = async (id: string) => {
    const confirmCancel = window.confirm(
      "¿Estás seguro de cancelar este turno?"
    );
    if (!confirmCancel) return;

    try {
      await deleteDoc(doc(db, "turnos", id));
      toast.success("Turno cancelado");
      await fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Error al cancelar el turno");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  return (
    <PatientLayout>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-amber-600 mb-8 text-center">
          Mis turnos
        </h1>

        {loading ? (
          <p className="text-gray-600 text-center">Cargando...</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-500 text-center">
            No tenés turnos agendados.
          </p>
        ) : (
          <ul className="space-y-6 max-w-xl mx-auto">
            {appointments.map((appointment) => {
              const parsedDate = new Date(
                `${appointment.date}T${appointment.time}`
              );
              const formatted = format(
                parsedDate,
                "EEEE d 'de' MMMM 'de' yyyy",
                { locale: es }
              );
              const isPast = parsedDate < new Date();

              return (
                <li
                  key={appointment.id}
                  className={`border border-gray-200 rounded-xl p-6 shadow-md flex justify-between items-center ${
                    isPast
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <FiCalendar className="text-amber-600" size={24} />
                      {formatted.charAt(0).toUpperCase() + formatted.slice(1)}
                    </p>
                    <p className="text-base flex items-center gap-2">
                      <FiClock size={20} /> {appointment.time} hs
                    </p>
                    {isPast && (
                      <span className="text-xs text-red-500 font-medium">
                        Turno pasado
                      </span>
                    )}
                  </div>
                  {!isPast && (
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      title="Cancelar turno"
                      className="text-red-600 hover:text-red-700 transition p-2 rounded-full hover:bg-red-100"
                    >
                      <FiTrash2 size={24} />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </PatientLayout>
  );
}
