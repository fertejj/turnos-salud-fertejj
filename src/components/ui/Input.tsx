import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...props }: Props) {
  return (
    <input
      className="bg-white text-gray-900 placeholder-gray-400 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
      {...props}
    />
  );
}
