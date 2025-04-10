import Input from "../../../shared/components/ui/Input";

type Props = {
  filterDate: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  patientQuery: string;
  onPatientQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dniQuery: string;
  onDniQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFilters: () => void; // ✅ nueva prop
};

export default function AppointmentsFilters({
  filterDate,
  onDateChange,
  patientQuery,
  onPatientQueryChange,
  dniQuery,
  onDniQueryChange,
  onClearFilters,
}: Props) {
  const filtersAreActive = filterDate || patientQuery || dniQuery;

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col text-sm w-full lg:w-1/3">
          <label className="mb-1 font-medium text-[var(--color-text)]">Filtrar por fecha</label>
          <Input type="date" value={filterDate} onChange={onDateChange} />
        </div>

        <div className="flex flex-col text-sm w-full lg:w-1/3">
          <label className="mb-1 font-medium text-[var(--color-text)]">Buscar por paciente</label>
          <Input
            type="text"
            placeholder="Nombre del paciente"
            value={patientQuery}
            onChange={onPatientQueryChange}
          />
        </div>

        <div className="flex flex-col text-sm w-full lg:w-1/3">
          <label className="mb-1 font-medium text-[var(--color-text)]">Buscar por DNI</label>
          <Input
            type="text"
            placeholder="DNI del paciente"
            value={dniQuery}
            onChange={onDniQueryChange}
          />
        </div>
      </div>

      {filtersAreActive && (
        <div className="flex justify-end">
          <button
            onClick={onClearFilters}
            className="text-sm px-4 py-2 rounded-md border border-[var(--color-border-base)] text-[var(--color-text-soft)] hover:bg-[var(--color-border-base)] transition"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
