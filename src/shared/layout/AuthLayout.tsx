import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const { pathname } = useLocation();

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 border-b border-border-base flex justify-between items-center bg-surface shadow-sm">
        <div className="flex items-center gap-2">
          <FaHeartbeat className="text-xl text-primary" />
          <span className="text-primary-dark font-semibold">Turnos Médicos</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          {pathname !== "/login" && (
            <Link to="/login" className="text-text-soft hover:text-primary">
              Iniciar sesión
            </Link>
          )}
          {pathname !== "/register" && (
            <Link to="/register" className="text-text-soft hover:text-primary">
              Crear cuenta
            </Link>
          )}
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6 animate-fade-in">
            <FaHeartbeat className="text-4xl text-primary mb-2" />
            <h1 className="text-xl font-semibold text-primary-dark">
              Sistema de Turnos Médicos
            </h1>
          </div>

          <section aria-label="Formulario de autenticación">{children}</section>

          <footer className="mt-6 text-center text-sm text-text-soft">
            © {new Date().getFullYear()} Turnos salud. Todos los derechos reservados.
          </footer>
        </div>
      </div>
    </main>
  );
}
