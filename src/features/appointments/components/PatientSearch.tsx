import React from "react";
import { Search, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Input from "../../../shared/components/ui/Input";

type Props = {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  hasResults?: boolean | null; // true, false o null si no se ha buscado todavía
};

export default function PatientSearch({
  name,
  onChange,
  isLoading = false,
  hasResults = null,
}: Props) {
  return (
    <div className="relative w-full mx-auto mb-4">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </span>
        <Input
          type="text"
          value={name}
          onChange={onChange}
          placeholder="Buscar paciente por Nombre"
          className="pl-10"
        />
        {isLoading ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin">
            <Loader2 size={18} />
          </span>
        ) : hasResults === true ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <CheckCircle2 size={18} />
          </span>
        ) : hasResults === false ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle size={18} />
          </span>
        ) : null}
      </div>
    </div>
  );
}
