import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...props }: Props) {
  return (
    <input
      className="bg-surface text-text-main placeholder-text-soft border border-border-base p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-light"
      {...props}
    />
  );
}
