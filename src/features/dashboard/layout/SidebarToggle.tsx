import { Menu, X } from "react-feather";

interface SidebarToggleProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-surface shadow-md z-0"
      aria-label="Toggle Sidebar"
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
}
