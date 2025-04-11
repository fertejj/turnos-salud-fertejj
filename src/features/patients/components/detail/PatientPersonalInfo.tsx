import { Patient } from "../../types";
import InfoItem from "../../ui/InfoItem";


interface PatientPersonalInfoProps {
  patient: Patient;
}

export default function PatientPersonalInfo({ patient }: PatientPersonalInfoProps) {
  return (
    <section className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-6 shadow-md">
      <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
        Información Personal
      </h2>
      <div className="space-y-3">
        <InfoItem label="Nombre" value={patient.name} />
        <InfoItem label="Apellido" value={patient.lastName} />
        <InfoItem label="DNI" value={patient.dni} />
        <InfoItem label="Fecha de nacimiento" value={patient.birthDate} />
        <InfoItem label="Género" value={patient.gender} />
      </div>
    </section>
  );
}
