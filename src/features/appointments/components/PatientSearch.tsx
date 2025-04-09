import React from "react";
import Input from "../../../shared/components/ui/Input";

type Props = {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PatientSearch({ name, onChange }: Props) {
  return (
    <div className="flex justify-center mb-4">
      <Input
        type="text"
        value={name}
        onChange={onChange}
        placeholder="Buscar paciente por DNI"
        className="w-full max-w-md"
      />
    </div>
  );
}
