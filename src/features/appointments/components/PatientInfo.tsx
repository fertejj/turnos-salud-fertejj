import { useNavigate } from "react-router-dom";

type Props = {
  patient: {
    id: string;
    name: string;
    email: string;
    phone: string;
    dni: string;
  };
};

export default function PatientInfo({ patient }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl  text-sm text-[var(--color-text)] space-y-2">
      <div className="space-y-1">
        <p>
          <span className="font-medium text-[var(--color-text)]">Nombre:</span> {patient.name}
        </p>
        <p>
          <span className="font-medium text-[var(--color-text)]">Email:</span> {patient.email}
        </p>
        <p>
          <span className="font-medium text-[var(--color-text)]">Teléfono:</span> {patient.phone}
        </p>
        <p>
          <span className="font-medium text-[var(--color-text)]">DNI:</span> {patient.dni}
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={() => navigate(`/dashboard/profesional/pacientes/${patient.id}`)}
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-all"
        >
          Ver detalles del paciente
        </button>
      </div>
    </div>
  );
}
