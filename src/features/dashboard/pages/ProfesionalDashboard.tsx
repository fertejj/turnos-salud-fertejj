import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import WelcomeSection from "../components/WelcomeSection";
import NextAppointmentCard from "../components/NextAppointmentCard";
import PatientManagement from "../components/PatientManagement";
import QuickActions from "../components/QuickActions";
import { getFirestoreInstance } from "../../../services/firebase/firestore";
import type { ProfessionalUser } from "../types/user";

type Turno = {
  date: string;
  time: string;
  patientName?: string;
};

export default function ProfesionalDashboard() {
  const { userData } = useOutletContext<{ userData: ProfessionalUser | null }>();
  const [proxTurno, setProxTurno] = useState<Turno | null>(null);

  useEffect(() => {
    const fetchProximoTurno = async () => {
      if (!userData?.id) return;

      const db = await getFirestoreInstance();
      const q = query(
        collection(db, "turnos"),
        where("professionalId", "==", userData.id),
        orderBy("date"),
        orderBy("time"),
        limit(1)
      );

      const snap = await getDocs(q);
      const data = snap.docs[0]?.data();
      if (data) setProxTurno(data as Turno);
    };

    fetchProximoTurno();
  }, [userData]);

  return (
    <div className="max-w-6xl mx-auto  space-y-10">
      <WelcomeSection user={userData} />
      <NextAppointmentCard appointment={proxTurno} />
      <hr className="border-border-base" />
      <QuickActions />
      <hr className="border-border-base" />
      {userData?.id && <PatientManagement professionalId={userData.id} />}
    </div>
  );
}
