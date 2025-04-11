import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ActionGroup({ children, className = "" }: Props) {
  return (
    <div className={`flex flex-wrap gap-2 mt-3 ${className}`}>
      {children}
    </div>
  );
}
