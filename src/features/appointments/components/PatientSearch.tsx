import React from "react";
import Input from "../../../shared/components/ui/Input";

type Props = {
  dni: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default function PatientSearch({ dni, onChange, onSearch }: Props) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      <Input
        type="text"
        value={dni}
        onChange={onChange}
        placeholder="DNI del paciente"
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
