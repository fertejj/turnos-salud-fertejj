import React from "react";

type Props = {
  dni: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default function PatientSearch({ dni, onChange, onSearch }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={dni}
        onChange={onChange}
        placeholder="DNI del paciente"
        className="w-full border border-border rounded px-3 py-2 bg-surface"
      />
      <button
        onClick={onSearch}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
      >
        Buscar
      </button>
    </div>
  );
}
