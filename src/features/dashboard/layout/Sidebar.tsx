// dashboard/layout/Sidebar.tsx
import { NavLink } from "react-router-dom";
import LogoutButton from "../../../shared/components/LogoutButton";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  if (!open) return null;

  const navLinks = [
    { to: "/dashboard/profesional", label: "Inicio" },
    { to: "/dashboard/profesional/agenda", label: "Agenda" },
    { to: "/dashboard/profesional/configuracion", label: "Configuración" },
  ];

  return (
    <nav className="md:hidden bg-surface shadow px-4 py-4 space-y-3 border-b border-border-base">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `block text-sm font-medium ${
              isActive ? "text-primary" : "text-text"
            }`
          }
          onClick={onClose}
        >
          {link.label}
        </NavLink>
      ))}
      <LogoutButton />
    </nav>
  );
}
