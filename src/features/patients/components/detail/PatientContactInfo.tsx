import InfoItem from "../../ui/InfoItem";

interface Props {
  phone?: string;
  email?: string;
  insurance?: string;
  address?: string;
}

export default function PatientContactInfo({ phone, email, insurance, address }: Props) {
  return (
    <section className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-6 shadow-md">
      <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
        Información de Contacto
      </h2>
      <div className="space-y-3">
        {phone && <InfoItem label="Teléfono" value={phone} />}
        {email && <InfoItem label="Email" value={email} />}
        {insurance && <InfoItem label="Obra social" value={insurance} />}
        {address && <InfoItem label="Dirección" value={address} />}
      </div>
    </section>
  );
}
