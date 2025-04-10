import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "ghost";
};

export default function ActionButton({
  icon,
  label,
  onClick,
  variant = "default",
}: Props) {
  const baseClasses =
    "inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200";

  const variantClasses = {
    default:
      "bg-[var(--color-surface)] border border-[var(--color-border-base)] text-[var(--color-text)] hover:bg-[var(--color-border-base)]",
    destructive:
      "bg-transparent border border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error)]/10",
    ghost:
      "bg-transparent text-[var(--color-text-soft)] hover:text-[var(--color-text)] hover:bg-[var(--color-border-base)]",
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
