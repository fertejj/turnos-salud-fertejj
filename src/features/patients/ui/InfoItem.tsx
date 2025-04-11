type Props = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export default function InfoItem({ label, value, icon }: Props) {
  return (
    <div className="flex items-start gap-3 text-black">
      {icon && <div className="mt-0.5 text-primary-dark">{icon}</div>}
      <div>
        <p className="text-xs font-semibold text-primary-dark uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}
