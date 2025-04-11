import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import ProCard from "../../../shared/ui/card/ProCard";
import { Calendar, IdCard, Cake, Stethoscope } from "lucide-react";

type Patient = {
  name: string;
  id?: string;
  dni?: string;
  birthDate?: string;
  insurance?: string;
};

type Props = {
  id: string;
  date: Timestamp;
  note?: string;
  patient?: Patient;
};

function getAgeFromBirthDate(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default function AppointmentCard({ id, date, note, patient }: Props) {
  const navigate = useNavigate();
  const birthDateDisplay = patient?.birthDate
    ? `${patient.birthDate} (${getAgeFromBirthDate(patient.birthDate)} años)`
    : "No informado";

  return (
    <ProCard
      key={id}
      title={patient?.name || "Paciente desconocido"}
      subtitle={date.toDate().toLocaleString("es-AR", {
        dateStyle: "medium",
        timeStyle: "short",
      })}
      actions={
        patient?.dni && (
          <button
            onClick={() => navigate(`/dashboard/profesional/pacientes/${patient?.id}`)}
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            Ver perfil del paciente
          </button>
        )
      }
    >
      <div className="space-y-2 text-sm text-[var(--color-text-soft)]">
        {note && (
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[var(--color-text)]" />
            <span>
              <span className="font-medium text-[var(--color-text)]">Nota:</span>{" "}
              {note}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <IdCard size={16} className="text-[var(--color-text)]" />
          <span>
            <span className="font-medium text-[var(--color-text)]">DNI:</span>{" "}
            {patient?.dni ?? "No informado"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Cake size={16} className="text-[var(--color-text)]" />
          <span>
            <span className="font-medium text-[var(--color-text)]">Nacimiento:</span>{" "}
            {birthDateDisplay}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Stethoscope size={16} className="text-[var(--color-text)]" />
          <span>
            <span className="font-medium text-[var(--color-text)]">Obra social:</span>{" "}
            {patient?.insurance ?? "No informado"}
          </span>
        </div>
      </div>
    </ProCard>
  );
}
