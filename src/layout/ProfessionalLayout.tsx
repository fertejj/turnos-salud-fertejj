import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import LogoutButton from "../components/ui/LogoutButton";

type Props = {
  children?: React.ReactNode;
};

export default function ProfessionalLayout({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="bg-surface shadow px-4 py-3 flex justify-between items-center md:px-8 border-b border-border-base">
        <h2 className="text-xl font-bold text-primary-dark">Panel del profesional</h2>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard/profesional" className="text-text hover:text-primary-dark">
            Inicio
          </Link>
          <Link to="/dashboard/profesional/agenda" className="text-text hover:text-primary-dark">
            Agenda
          </Link>
          <Link to="/dashboard/profesional/" className="text-text hover:text-primary-dark">
            
          </Link>
          <Link to="/dashboard/profesional/configuracion" className="text-text hover:text-primary-dark">
            Configuración
          </Link>
          <LogoutButton />
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-text"
          onClick={() => setOpen((prev) => !prev)}
        >
          <FiMenu size={24} />
        </button>
      </header>

      {/* Sidebar mobile */}
      {open && (
        <nav className="md:hidden bg-surface shadow px-4 py-4 space-y-3 border-b border-border-base">
          <Link to="/dashboard/profesional" className="block text-text">
            Inicio
          </Link>
          <Link to="/dashboard/profesional/agenda" className="block text-text">
            Agenda
          </Link>
          <Link to="/dashboard/profesional/" className="block text-text">
            
          </Link>
          <Link to="/dashboard/profesional/configuracion" className="block text-text">
            Configuración
          </Link>
          <LogoutButton />
        </nav>
      )}

      {/* Contenido principal */}
      <main className="p-6 flex-1 w-full max-w-5xl mx-auto">
        {children || <Outlet />}
      </main>
    </div>
  );
}
