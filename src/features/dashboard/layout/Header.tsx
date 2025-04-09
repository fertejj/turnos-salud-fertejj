// dashboard/layout/Header.tsx
import { FiMenu } from "react-icons/fi";
import LogoutButton from "../../../shared/components/ui/LogoutButton";
import { NavLink } from "react-router-dom";
import useProfessional from "../hooks/useProfessional";

type Props = {
  onToggleMenu: () => void;
};

export default function Header({ onToggleMenu }: Props) {
  const { profile } = useProfessional();

  const navLinks = [
    { to: "/dashboard/profesional", label: "Inicio" },
    { to: "/dashboard/profesional/agenda", label: "Agenda" },
    { to: "/dashboard/profesional/configuracion", label: "Configuración" },
  ];

  return (
    <header className="bg-surface shadow px-4 py-3 flex justify-between items-center md:px-8 border-b border-border-base">
      <h2 className="text-xl font-bold text-primary-dark">Panel del profesional</h2>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? "text-primary" : "text-text hover:text-primary-dark"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-light text-primary-dark flex items-center justify-center font-semibold text-sm">
            {profile?.fullName?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="text-sm text-text-soft">{profile?.fullName || profile?.email}</span>
          <LogoutButton />
        </div>
      </nav>

      {/* Mobile toggle */}
      <button className="md:hidden text-text" onClick={onToggleMenu}>
        <FiMenu size={24} />
      </button>
    </header>
  );
}
