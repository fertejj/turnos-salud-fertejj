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
import ProCard from "../../../shared/components/ui/card/ProCard";

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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-primary mb-4">Mis turnos</h1>

      <AppointmentsFilters
        filterDate={filterDate}
        onDateChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterDate(e.target.value)}
        patientQuery={patientQuery}
        onPatientQueryChange={(e: React.ChangeEvent<HTMLInputElement>) => setPatientQuery(e.target.value)}
        dniQuery={dniQuery}
        onDniQueryChange={(e: React.ChangeEvent<HTMLInputElement>) => setDniQuery(e.target.value)}
      />

      {loading ? (
        <p>Cargando...</p>
      ) : filteredAppointments.length === 0 ? (
        <p>No se encontraron turnos con los filtros aplicados.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map((appt) => (
            <ProCard
              key={appt.id}
              title={appt.patient?.name || "Paciente desconocido"}
              subtitle={appt.date.toDate().toLocaleString("es-AR", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
              actions={
                <button className="text-sm text-primary hover:underline">
                  Ver detalle
                </button>
              }
            >
              {appt.note && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-text">Nota:</span> {appt.note}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-text">DNI:</span>{" "}
                {appt.patient?.dni ?? "No informado"}
              </p>
            </ProCard>
          ))}
        </ul>
      )}
    </div>
  );
}
