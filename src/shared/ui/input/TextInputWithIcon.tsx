import React from "react";
import {
  Search,
  Loader2,
  CheckCircle2,
  AlertCircle,
  LucideIcon,
} from "lucide-react";
import clsx from "clsx";

type Status = "loading" | "success" | "error" | null;

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  icon?: LucideIcon;
  status?: Status;
};

export default function TextInputWithIcon({
  value,
  onChange,
  placeholder,
  className,
  icon: Icon = Search,
  status = null,
}: Props) {
  const StatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="animate-spin text-gray-400" size={18} />;
      case "success":
        return <CheckCircle2 className="text-green-500" size={18} />;
      case "error":
        return <AlertCircle className="text-red-500" size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className={clsx("relative", className)}>
      {/* Ícono a la izquierda */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={18} />
      </span>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
      />

      {/* Estado a la derecha */}
      {status && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          <StatusIcon />
        </span>
      )}
    </div>
  );
}

