import AppointmentCard from "./AppointmentCard";

type Turno = {
  patientName: string;
  time: string;
  notes?: string;
};

type Props = {
  date: string;
  appointments: Turno[];
};

export default function DayAgenda({ date, appointments }: Props) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-primary-dark mb-3">
        {date}
      </h3>
      <div className="space-y-3">
        {appointments.map((turno, i) => (
          <AppointmentCard
            key={i}
            patientName={turno.patientName}
            time={turno.time}
            notes={turno.notes}
          />
        ))}
      </div>
    </div>
  );
}
