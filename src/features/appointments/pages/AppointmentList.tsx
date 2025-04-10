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
import ProCard from "../../../shared/ui/card/ProCard";
import Spinner from "../../../shared/components/ui/Spinner";

type Appointment = {
  id: string;
  patientId: string;
  date: Timestamp;
  note?: string;
  patient?: {
    name: string;
    dni?: string;
    email: string;
  };
};

export default function AppointmentsList() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [patientQuery, setPatientQuery] = useState("");
  const [dniQuery, setDniQuery] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const db = await getFirestoreInstance();

        const patientsSnap = await getDocs(
          query(
            collection(db, "patients"),
            where("professionalId", "==", user.uid)
          )
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

    const matchesDni = dniQuery
      ? appt.patient?.dni?.includes(dniQuery)
      : true;

    return matchesDate && matchesPatient && matchesDni;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="border-b border-[var(--color-border-base)] pb-4">
        <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight">
          Mis turnos
        </h1>
        <p className="text-sm text-[var(--color-text-soft)] mt-1">
          Filtrá y visualizá tus próximos turnos.
        </p>
      </div>

      <AppointmentsFilters
        filterDate={filterDate}
        onDateChange={(e) => setFilterDate(e.target.value)}
        patientQuery={patientQuery}
        onPatientQueryChange={(e) => setPatientQuery(e.target.value)}
        dniQuery={dniQuery}
        onDniQueryChange={(e) => setDniQuery(e.target.value)}
        onClearFilters={() => {
          setFilterDate("");
          setPatientQuery("");
          setDniQuery("");
        }}
      />

      {loading ? (
        <div className="min-h-[30vh] flex justify-center items-center">
          <Spinner />
        </div>
      ) : filteredAppointments.length === 0 ? (
        <p className="text-[var(--color-text-soft)]">
          No se encontraron turnos con los filtros aplicados.
        </p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((appt) => (
            <ProCard
              key={appt.id}
              title={appt.patient?.name || "Paciente desconocido"}
              subtitle={appt.date.toDate().toLocaleString("es-AR", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
              actions={
                <button className="text-sm text-[var(--color-primary)] hover:underline">
                  Ver detalle
                </button>
              }
            >
              <div className="space-y-1 text-sm text-[var(--color-text-soft)]">
                {appt.note && (
                  <p>
                    <span className="font-medium text-[var(--color-text)]">Nota:</span> {appt.note}
                  </p>
                )}
                <p>
                  <span className="font-medium text-[var(--color-text)]">DNI:</span>{" "}
                  {appt.patient?.dni ?? "No informado"}
                </p>
              </div>
            </ProCard>
          ))}
        </ul>
      )}
    </div>
  );
}
