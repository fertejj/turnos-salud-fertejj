
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { db } from "../../../services/firebase";
import PatientsList from "../../patients/components/PatientsList";

type Turno = {
  date: string;
  time: string;
  patientName?: string;
};

export default function ProfesionalDashboard() {
  const { user } = useAuth();
  const [proxTurno, setProxTurno] = useState<Turno | null>(null);

  useEffect(() => {
    const fetchProximoTurno = async () => {
      if (!user) return;

      const q = query(
        collection(db, "turnos"),
        where("professionalId", "==", user.uid),
        orderBy("date"),
        orderBy("time"),
        limit(1)
      );

      const snap = await getDocs(q);
      const data = snap.docs[0]?.data();
      if (data) setProxTurno(data as Turno);
    };

    fetchProximoTurno();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Bienvenida */}
      <section>
        <h1 className="text-3xl font-bold text-primary-dark mb-2">
          Bienvenido{user?.displayName ? `, ${user.displayName}` : ""} 👋
        </h1>
        <p className="text-gray-600 text-sm">
          Este es tu panel profesional. Desde aquí podés gestionar tu agenda,
          pacientes y configuración.
        </p>
      </section>

      {/* Próximo turno */}
      <section>
        <h2 className="text-xl font-semibold text-primary-dark mb-4">
          Próximo turno
        </h2>
        {proxTurno ? (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-gray-700 text-sm mb-1">
              Próximo turno agendado:
            </p>
            <p className="text-lg text-blue-700 font-semibold">
              {format(new Date(proxTurno.date), "EEEE d 'de' MMMM", {
                locale: es,
              })}{" "}
              a las {proxTurno.time} hs
            </p>
            {proxTurno.patientName && (
              <p className="text-sm text-gray-600 mt-1">
                Paciente: {proxTurno.patientName}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No tenés turnos agendados aún.</p>
        )}
      </section>

      <hr className="border-border-base" />

      {/* Acciones rápidas */}
      <section>
        <h2 className="text-xl font-semibold text-primary-dark mb-4">
          Acciones rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/profesional/agendar"
            className="bg-surface border border-border-base rounded-lg p-4 hover:bg-gray-100 transition"
          >
            <p className="text-lg font-semibold text-primary-dark">
              Agendar turno
            </p>
            <p className="text-sm text-gray-600">
              Completa la información del paciente
            </p>
          </Link>

          <Link
            to="/dashboard/profesional/disponibilidad"
            className="bg-surface border border-border-base rounded-lg p-4 hover:bg-gray-100 transition"
          >
            <p className="text-lg font-semibold text-primary-dark">
              Disponibilidad semanal
            </p>
            <p className="text-sm text-gray-600">
              Visualizá tu disponibilidad actual
            </p>
          </Link>

          <Link
            to="/dashboard/profesional/configuracion"
            className="bg-surface border border-border-base rounded-lg p-4 hover:bg-gray-100 transition"
          >
            <p className="text-lg font-semibold text-primary-dark">
              Configuración
            </p>
            <p className="text-sm text-gray-600">Actualizá tu perfil y datos</p>
          </Link>
        </div>
      </section>

      <hr className="border-border-base" />

      {/* Gestión de pacientes */}
      <section>
        <h2 className="text-xl font-semibold text-primary-dark mb-4">
          Gestión de pacientes
        </h2>
        {user && <PatientsList professionalId={user.uid} />}
      </section>
    </div>
  );
}
