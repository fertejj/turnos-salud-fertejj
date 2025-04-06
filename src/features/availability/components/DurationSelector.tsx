type Props = {
    value: number;
    onChange: (val: number) => void;
  };
  
  export default function DurationSelector({ value, onChange }: Props) {
    return (
      <label className="block mb-6">
        <span className="text-text mb-1 block">
          Duración de los turnos (minutos)
        </span>
        <select
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="bg-surface border border-border-base text-text p-2 rounded focus:outline-none"
        >
          {[15, 30, 45, 60].map((opt) => (
            <option key={opt} value={opt}>{opt} minutos</option>
          ))}
        </select>
      </label>
    );
  }
