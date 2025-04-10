import { CalendarClock, Users, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import InfoCardItem from "./InfoCardItem";

type Props = {
  nextAppointment: {
    date: Date;
    time: string;
    patientName?: string;
  } | null;
  totalPatients: number;
  weeklyAppointments: number;
};

export default function InfoCards({
  nextAppointment,
  totalPatients,
  weeklyAppointments,
}: Props) {
  const formattedDate = nextAppointment
    ? format(nextAppointment.date, "EEEE d 'de' MMMM", { locale: es })
    : null;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <InfoCardItem
        icon={<CalendarClock size={20} />}
        title="Próximo turno"
        value={
          nextAppointment
            ? `${formattedDate} a las ${nextAppointment.time}`
            : "Sin turnos agendados"
        }
      />

      <InfoCardItem
        icon={<Users size={20} />}
        title="Pacientes"
        value={`${totalPatients} registrados`}
      />

      <InfoCardItem
        icon={<CalendarDays size={20} />}
        title="Turnos esta semana"
        value={`${weeklyAppointments} agendados`}
      />
    </section>
  );
}
