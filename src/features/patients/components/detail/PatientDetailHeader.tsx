import { Stethoscope } from "lucide-react";

type Props = {
  id: string;
};

export default function PatientDetailHeader({ id }: Props) {
  return (
    <div className="w-full bg-[var(--color-primary-light)] border border-[var(--color-border-base)] rounded-2xl p-6 shadow-sm flex items-start sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-4">
        <div className="bg-[var(--color-primary)] text-white p-2 rounded-full shadow">
          <Stethoscope size={24} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] leading-tight">
            Detalle del Paciente
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-soft)] mt-1">
            ID: {id}
          </p>
        </div>
      </div>
    </div>
  );
}
