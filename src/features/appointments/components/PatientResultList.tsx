type Props = {
    patients: any[];
    onSelect: (patient: any) => void;
  };
  
  export default function PatientResultList({ patients, onSelect }: Props) {
    return (
      <div className="bg-surface border border-[var(--color-border-base)] rounded-2xl p-6 shadow-md space-y-2">
        <p className="text-sm font-medium text-[var(--color-text-soft)]">
          Pacientes encontrados:
        </p>
        <ul className="space-y-1">
          {patients.map((p) => (
            <li
              key={p.id}
              className="cursor-pointer hover:bg-[var(--color-border-base)] px-3 py-1 rounded transition"
              onClick={() => onSelect(p)}
            >
              <span className="text-[var(--color-text)]">{p.name}</span>{" "}
              <span className="text-sm text-[var(--color-text-soft)]">
                ({p.dni})
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  