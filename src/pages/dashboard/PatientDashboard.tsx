import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiPlusCircle, FiList } from "react-icons/fi";
import PatientLayout from "../../layout/PatientLayout";

export default function PacienteDashboard() {
  const { user } = useAuth();
  const [proxTurno, setProxTurno] = useState<{
    date: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    const fetchTurnosProximos = async () => {
      if (!user) return;

      const today = format(new Date(), "yyyy-MM-dd");
      const nextWeek = format(addDays(new Date(), 7), "yyyy-MM-dd");

      const q = query(
        collection(db, "turnos"),
        where("userId", "==", user.uid),
        where("date", ">=", today),
        where("date", "<=", nextWeek),
        orderBy("date"),
        orderBy("time")
      );

      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => doc.data())[0];
      if (data) setProxTurno(data as any);
    };

    fetchTurnosProximos();
  }, [user]);

  return (
    <PatientLayout>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-amber-600 mb-6">
          {`Bienvenido, ${
            user?.displayName
              ? user.displayName
              : user?.email
              ? user.email.split("@")[0]
              : ""
          }`}{" "}
          👋
        </h1>

        {proxTurno ? (
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl mb-6 text-center shadow-sm">
            <p className="text-gray-700 flex items-center justify-center gap-2 mb-1">
              <FiCalendar size={20} /> Tu próximo turno:
            </p>
            <p className="text-lg text-green-700 font-medium flex items-center justify-center gap-2">
              {format(new Date(proxTurno.date), "EEEE d 'de' MMMM 'de' yyyy", {
                locale: es,
              })}
              <FiClock size={18} /> {proxTurno.time} hs
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mb-6 text-center shadow-sm">
            <p className="text-yellow-700 font-medium">
              No tenés turnos próximos en los próximos 7 días.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
          <Link
            to="/dashboard/paciente/turnos/nuevo"
            className="bg-amber-500 text-white px-4 py-2 rounded text-center font-medium hover:bg-amber-600 transition flex items-center justify-center gap-2"
          >
            <FiPlusCircle size={18} />
            Agendar nuevo turno
          </Link>
          <Link
            to="/dashboard/paciente/mis-turnos"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded text-center font-medium border hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
            <FiList size={18} />
            Ver mis turnos
          </Link>
        </div>
      </div>
    </PatientLayout>
  );
}
