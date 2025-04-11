import Spinner from "../../../../shared/components/ui/Spinner";
import PatientCard from "./PatientCard";

type Props = {
  patients: any[];
  loading: boolean;
  onDelete: (id: string) => void;
};

export default function PatientCardList({ patients, loading, onDelete }: Props) {
  if (loading) {
    return (
      <div className="min-h-[30vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <p className="text-[var(--color-text-soft)]">
        No se encontraron pacientes con los filtros aplicados.
      </p>
    );
  }

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} onDelete={onDelete} />
      ))}
    </ul>
  );
}
