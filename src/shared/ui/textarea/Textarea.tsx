import React from "react";
import clsx from "clsx";

type Props = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
};

export default function Textarea({
  id,
  value,
  onChange,
  placeholder,
  className,
  rows = 4,
}: Props) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={clsx(
        "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none",
        className
      )}
    />
  );
}
