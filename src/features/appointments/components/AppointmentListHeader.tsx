export default function AppointmentListHeader() {
    return (
      <div className="border-b border-[var(--color-border-base)] pb-4">
        <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight">
          Mis turnos
        </h1>
        <p className="text-sm text-[var(--color-text-soft)] mt-1">
          Filtrá y visualizá tus próximos turnos.
        </p>
      </div>
    );
  }
  