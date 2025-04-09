import Input from "../../../shared/components/ui/Input";

type Props = {
  filterDate: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  patientQuery: string;
  onPatientQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dniQuery: string;
  onDniQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AppointmentsFilters({
  filterDate,
  onDateChange,
  patientQuery,
  onPatientQueryChange,
  dniQuery,
  onDniQueryChange,
}: Props) {
  return (
    <div className="flex flex-col  lg:flex-row gap-4 mb-6">
      <div className="flex flex-col  text-sm w-full lg:w-1/3">
        <label className="mb-1 font-medium text-text">Filtrar por fecha</label>
        <Input type="date" value={filterDate} onChange={onDateChange} />
      </div>

      <div className="flex flex-col  text-sm w-full lg:w-1/3">
        <label className="mb-1 font-medium text-text">Buscar por paciente</label>
        <Input
          type="text"
          placeholder="Nombre del paciente"
          value={patientQuery}
          onChange={onPatientQueryChange}
        />
      </div>

      <div className="flex flex-col text-sm w-full lg:w-1/3">
        <label className="mb-1 font-medium text-text">Buscar por DNI</label>
        <Input
          type="text"
          placeholder="DNI del paciente"
          value={dniQuery}
          onChange={onDniQueryChange}
        />
      </div>
    </div>
  );
}
