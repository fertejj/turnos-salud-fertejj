import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Link } from "react-router-dom"

type Props = {
  appointment: {
    date: Date
    time: string
    patientName?: string
    patientId?: string
  } | null
}

export default function NextAppointmentCard({ appointment }: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
        Próximo turno
      </h2>

      {appointment ? (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-base)] p-5 rounded-xl shadow-sm space-y-3">
          <div>
            <p className="text-sm text-[var(--color-text-soft)] mb-1">
              Turno agendado para:
            </p>
            <p className="text-lg font-semibold text-[var(--color-primary)]">
              {format(appointment.date, "EEEE d 'de' MMMM", { locale: es })} a las {appointment.time} hs
            </p>
          </div>

          {appointment.patientName && appointment.patientId && (
            <div className="text-sm text-[var(--color-text)]">
              <span className="block mb-1">
                Paciente:{" "}
                <span className="font-medium">{appointment.patientName}</span>
              </span>

              <Link
                to={`/dashboard/profesional/pacientes/${appointment.patientId}`}
                className="inline-block px-3 py-1.5 rounded-md text-sm font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition"
              >
                Ver perfil del paciente
              </Link>
            </div>
          )}
        </div>
      ) : (
        <p className="text-[var(--color-text-soft)]">No tenés turnos agendados aún.</p>
      )}
    </section>
  )
}
