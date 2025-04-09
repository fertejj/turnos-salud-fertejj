import Input from "../../../shared/components/ui/Input";

interface PatientFiltersProps {
  nameQuery: string;
  dniQuery: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDniChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PatientFilters({
  nameQuery,
  dniQuery,
  onNameChange,
  onDniChange,
}: PatientFiltersProps) {
  return (
    <div className="flex justify-center w-[100%] flex-col sm:flex-row gap-4 mb-6">
      <Input
        type="text"
        placeholder="Buscar por nombre o apellido"
        value={nameQuery}
        onChange={onNameChange}
        className="flex-1"
      />
      <Input
        type="text"
        placeholder="Buscar por DNI"
        value={dniQuery}
        onChange={onDniChange}
      />
    </div>
  );
}
