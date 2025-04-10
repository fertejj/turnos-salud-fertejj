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
import { getFirestoreInstance } from "../../../services/firebase/firestore";

import WelcomeHeader from "../components/WelcomeHeader";
import NextAppointmentCard from "../components/NextAppointmentCard";
import QuickActions from "../components/QuickActions";
import InfoCards from "../components/InfoCards";

import type { ProfessionalUser } from "../types/user";

type Turno = {
  date: Date;
  time: string;
  patientName?: string;
};

export default function ProfesionalDashboard() {
  const { userData } = useOutletContext<{ userData: ProfessionalUser | null }>();
  const [nextAppointment, setNextAppointment] = useState<Turno | null>(null);

  // Simulados por ahora
  const totalPatients = 24;
  const weeklyAppointments = 5;

  useEffect(() => {
    const fetchNextAppointment = async () => {
      if (!userData?.id) return;

      const db = await getFirestoreInstance();

      const q = query(
        collection(db, "appointments"),
        where("professionalId", "==", userData.id),
        orderBy("date"),
        limit(1)
      );

      const snap = await getDocs(q);
      const data = snap.docs[0]?.data();

      if (data && data.date?.toDate) {
        const dateObj = data.date.toDate();
        const time = dateObj.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        setNextAppointment({
          date: dateObj,
          time,
          patientName: data.patientName || undefined,
        });
      }
    };

    fetchNextAppointment();
  }, [userData]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <WelcomeHeader user={userData} />
      <InfoCards
        nextAppointment={nextAppointment}
        totalPatients={totalPatients}
        weeklyAppointments={weeklyAppointments}
      />
      <NextAppointmentCard appointment={nextAppointment} />
      <hr className="border-border-base" />
      <QuickActions />
    </div>
  );
}
