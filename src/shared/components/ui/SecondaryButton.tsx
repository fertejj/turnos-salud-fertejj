import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
};

export default function SecondaryButton({ children, icon, ...props }: Props) {
  return (
    <button
      className="bg-hover-surface hover:bg-border-base text-text border border-border-base p-2 rounded w-full transition flex items-center justify-center gap-2"
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
