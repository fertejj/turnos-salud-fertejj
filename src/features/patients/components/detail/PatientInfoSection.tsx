import { Patient } from "../../types";
import InfoItem from "../../ui/InfoItem";
import { User, IdCard, Calendar, MapPin, Phone, AtSign, HeartPulse } from "lucide-react";

type Props = {
  patient: Patient;
};

export default function PatientInfoSection({ patient }: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Personal */}
      <section className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-black mb-5 flex items-center gap-2">
          <User size={18} className="text-primary-dark" />
          Información Personal
        </h2>
        <div className="space-y-4 text-sm">
          <InfoItem label="Nombre" value={patient.name} icon={<User size={16} />} />
          <InfoItem label="Apellido" value={patient.lastName} icon={<User size={16} />} />
          <InfoItem label="DNI" value={patient.dni} icon={<IdCard size={16} />} />
          <InfoItem label="Nacimiento" value={patient.birthDate} icon={<Calendar size={16} />} />
          <InfoItem label="Género" value={patient.gender} icon={<HeartPulse size={16} />} />
        </div>
      </section>
  
      {/* Contacto */}
      <section className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-5 flex items-center gap-2">
          <Phone size={18} className="text-primary-dark" />
          Información de Contacto
        </h2>
        <div className="space-y-4 text-sm">
          {patient.phone && (
            <InfoItem label="Teléfono" value={patient.phone} icon={<Phone size={16} />} />
          )}
          {patient.email && (
            <InfoItem label="Email" value={patient.email} icon={<AtSign size={16} />} />
          )}
          {patient.insurance && (
            <InfoItem label="Obra social" value={patient.insurance} icon={<HeartPulse size={16} />} />
          )}
          {patient.address && (
            <InfoItem label="Dirección" value={patient.address} icon={<MapPin size={16} />} />
          )}
        </div>
      </section>
    </div>
  )
  
}
