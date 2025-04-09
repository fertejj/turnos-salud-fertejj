import React from "react";
import clsx from "clsx";

type Option = {
  label: string;
  value: string;
};

type Props = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
};

export default function Select({
  id,
  value,
  onChange,
  options,
  className,
}: Props) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={clsx(
        "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
    >
      <option value="" disabled>
        Seleccioná una opción
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
