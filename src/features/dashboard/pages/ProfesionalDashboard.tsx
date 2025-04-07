import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { useAuth } from "../../auth/context/AuthContext";
import { db } from "../../../services/firebase";
import WelcomeSection from "../components/WelcomeSection";
import NextAppointmentCard from "../components/NextAppointmentCard";
import PatientManagement from "../components/PatientManagement";
import QuickActions from "../components/QuickActions";

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
      <WelcomeSection user={user} />
      <NextAppointmentCard appointment={proxTurno} />
      <hr className="border-border-base" />
      <QuickActions />
      <hr className="border-border-base" />
      {user && <PatientManagement professionalId={user.uid} />}
    </div>
  );
}
