import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
};

export default function SecondaryButton({ children, icon, ...props }: Props) {
  return (
    <button
      className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 p-2 rounded w-full transition flex items-center justify-center gap-2"
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
