import { Menu } from "lucide-react";

interface SidebarToggleProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden fixed top-4 left-4 z-0 p-2 rounded-lg bg-surface shadow-md"
      aria-label="Abrir menú"
    >
      <Menu size={20} />
    </button>
  );
}
