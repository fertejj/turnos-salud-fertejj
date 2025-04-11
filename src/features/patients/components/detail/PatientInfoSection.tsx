import { Patient } from "../../types";
import InfoItem from "../../ui/InfoItem";

type Props = {
  patient: Patient;
};

export default function PatientInfoSection({ patient }: Props) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {/* Personal */}
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

      {/* Contacto */}
      <section className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-6 shadow-md">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
          Información de Contacto
        </h2>
        <div className="space-y-3">
          {patient.phone && <InfoItem label="Teléfono" value={patient.phone} />}
          {patient.email && <InfoItem label="Email" value={patient.email} />}
          {patient.insurance && <InfoItem label="Obra social" value={patient.insurance} />}
          {patient.address && <InfoItem label="Dirección" value={patient.address} />}
        </div>
      </section>
    </div>
  );
}
