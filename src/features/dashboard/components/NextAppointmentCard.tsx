// dashboard/components/NextAppointmentCard.tsx
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  appointment: {
    date: string;
    time: string;
    patientName?: string;
  } | null;
};

export default function NextAppointmentCard({ appointment }: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-primary-dark mb-4">
        Próximo turno
      </h2>
      {appointment ? (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-gray-700 text-sm mb-1">
            Próximo turno agendado:
          </p>
          <p className="text-lg text-blue-700 font-semibold">
            {format(new Date(appointment.date), "EEEE d 'de' MMMM", {
              locale: es,
            })}{" "}
            a las {appointment.time} hs
          </p>
          {appointment.patientName && (
            <p className="text-sm text-gray-600 mt-1">
              Paciente: {appointment.patientName}
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No tenés turnos agendados aún.</p>
      )}
    </section>
  );
}
