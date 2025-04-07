type Props = {
    filterDate: string;
    onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    patientQuery: string;
    onPatientQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  export default function AppointmentsFilters({
    filterDate,
    onDateChange,
    patientQuery,
    onPatientQueryChange,
  }: Props) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-col text-sm w-full sm:w-1/2">
          <label className="mb-1 font-medium text-text">Filtrar por fecha</label>
          <input
            type="date"
            value={filterDate}
            onChange={onDateChange}
            className="border border-border bg-surface px-3 py-2 rounded-md"
          />
        </div>
  
        <div className="flex flex-col text-sm w-full sm:w-1/2">
          <label className="mb-1 font-medium text-text">Buscar por paciente</label>
          <input
            type="text"
            placeholder="Nombre del paciente"
            value={patientQuery}
            onChange={onPatientQueryChange}
            className="border border-border bg-surface px-3 py-2 rounded-md"
          />
        </div>
      </div>
    );
  }
  