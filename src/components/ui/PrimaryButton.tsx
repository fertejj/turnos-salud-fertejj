import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({ children, ...props }: Props) {
  return (
    <button
      className="bg-primary hover:bg-primary-dark text-white font-semibold p-2 rounded transition"
      {...props}
    >
      {children}
    </button>
  );
}
