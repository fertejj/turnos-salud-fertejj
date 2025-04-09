import React from "react";
import clsx from "clsx";

type Props = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

export default function Label({ htmlFor, children, className }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("block text-sm font-medium text-gray-700 mb-1", className)}
    >
      {children}
    </label>
  );
}
