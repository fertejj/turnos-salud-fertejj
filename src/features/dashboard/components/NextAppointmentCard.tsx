import { format } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  appointment: {
    date: Date;
    time: string;
    patientName?: string;
  } | null;
};

export default function NextAppointmentCard({ appointment }: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
        Próximo turno
      </h2>

      {appointment ? (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-base)] p-5 rounded-xl shadow-sm">
          <p className="text-sm text-[var(--color-text-soft)] mb-1">
            Turno agendado para:
          </p>

          <p className="text-lg font-semibold text-[var(--color-primary)]">
            {format(appointment.date, "EEEE d 'de' MMMM", { locale: es })} a las {appointment.time} hs
          </p>

          {appointment.patientName && (
            <p className="text-sm text-[var(--color-text)] mt-2">
              Paciente: <span className="font-medium">{appointment.patientName}</span>
            </p>
          )}
        </div>
      ) : (
        <p className="text-[var(--color-text-soft)]">No tenés turnos agendados aún.</p>
      )}
    </section>
  );
}
