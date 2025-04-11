import { Menu } from "lucide-react";

interface SidebarToggleProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className=" fixed top-4 right-4 lg:left-4 lg:right-auto z-0 p-2 rounded-lg bg-surface shadow-md"
      aria-label="Abrir menú"
    >
      <Menu size={30} />
    </button>
  );
}
