type Props = {
    title: string;
    subtitle: string;
  };
  
  export default function SectionHeader({ title, subtitle }: Props) {
    return (
      <div className="border-b border-[var(--color-border-base)] pb-4">
        <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight">
          {title}
        </h1>
        <p className="text-sm text-[var(--color-text-soft)] mt-1">{subtitle}</p>
      </div>
    );
  }
  