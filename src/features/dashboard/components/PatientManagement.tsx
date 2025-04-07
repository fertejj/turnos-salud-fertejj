// dashboard/components/PatientManagement.tsx
import PatientsList from "../../patients/components/PatientsList";

type Props = {
  professionalId: string;
};

export default function PatientManagement({ professionalId }: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-primary-dark mb-4">
        Gestión de pacientes
      </h2>
      <PatientsList professionalId={professionalId} />
    </section>
  );
}
