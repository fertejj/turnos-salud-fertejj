import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({ children, ...props }: Props) {
  return (
    <button
      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold p-2 rounded transition"
      {...props}
    >
      {children}
    </button>
  );
}
