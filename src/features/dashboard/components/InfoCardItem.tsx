import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  value: string;
};

export default function InfoCardItem({ icon, title, value }: Props) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-xl p-5 shadow-sm flex items-start gap-4">
      <div className="p-2 bg-[var(--color-border-base)] rounded-md text-[var(--color-text)]">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text)]">{title}</h3>
        <p className="text-sm text-[var(--color-text-soft)] mt-0.5">{value}</p>
      </div>
    </div>
  );
}
