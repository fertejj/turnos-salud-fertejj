import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../../auth/context/AuthContext";
import AppointmentsFilters from "../components/AppointmentFilters";
import { getFirestoreInstance } from "../../../services/firebase/firestore";

type Appointment = {
  id: string;
  patientId: string;
  date: Timestamp;
  note?: string;
  patient?: {
    name: string;
    email: string;
  };
};

export default function AppointmentsList() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [patientQuery, setPatientQuery] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const db = await getFirestoreInstance();

        const patientsSnap = await getDocs(
          query(collection(db, "patients"), where("professionalId", "==", user.uid))
        );

        const patients = patientsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any[];

        const patientIds = patients.map((p) => p.id);
        const patientMap = Object.fromEntries(patients.map((p) => [p.id, p]));

        if (patientIds.length === 0) {
          setAppointments([]);
          setLoading(false);
          return;
        }

        const appointmentsSnap = await getDocs(collection(db, "appointments"));
        const allAppointments = appointmentsSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((appt: any) => patientIds.includes(appt.patientId))
          .map((appt: any) => ({
            ...appt,
            patient: patientMap[appt.patientId],
          }));

        setAppointments(allAppointments);
      } catch (err) {
        console.error("Error cargando turnos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const filteredAppointments = appointments.filter((appt) => {
    const matchesDate = filterDate
      ? appt.date.toDate().toISOString().slice(0, 10) === filterDate
      : true;

    const matchesPatient = patientQuery
      ? appt.patient?.name.toLowerCase().includes(patientQuery.toLowerCase())
      : true;

    return matchesDate && matchesPatient;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-primary mb-4">Mis turnos</h1>

      <AppointmentsFilters
        filterDate={filterDate}
        onDateChange={(e: any) => setFilterDate(e.target.value)}
        patientQuery={patientQuery}
        onPatientQueryChange={(e: any) => setPatientQuery(e.target.value)}
      />

      {loading ? (
        <p>Cargando...</p>
      ) : filteredAppointments.length === 0 ? (
        <p>No se encontraron turnos con los filtros aplicados.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map((appt) => (
            <li
              key={appt.id}
              className="bg-surface border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-base font-semibold text-primary mb-2">
                {appt.patient?.name || "Paciente desconocido"}
              </h3>

              <div className="text-sm space-y-1 text-text">
                <p>
                  <span className="font-medium">Fecha:</span>{" "}
                  {appt.date.toDate().toLocaleString("es-AR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>

                {appt.note && (
                  <p>
                    <span className="font-medium">Nota:</span> {appt.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
