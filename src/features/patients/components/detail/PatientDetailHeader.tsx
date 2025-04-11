type Props = {
    id: string;
  };
  
  export default function PatientDetailHeader({ id }: Props) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border-base)] pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight">
            Detalle del Paciente
          </h1>
          <p className="text-sm text-[var(--color-text-soft)] mt-1">ID: {id}</p>
        </div>
      </div>
    );
  }
  