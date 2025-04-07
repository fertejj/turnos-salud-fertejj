import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendar,
  FaCalendarCheck,
  FaCalendarPlus,
  FaUserPlus,
  FaUsers,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { cn } from "../../../shared/utils/cn";
import { useState } from "react";

export default function SideNavBar() {
  const location = useLocation();

  // Expansión de secciones
  const [showTurnos, setShowTurnos] = useState(
    location.pathname.startsWith("/dashboard/profesional/turnos")
  );
  const [showPacientes, setShowPacientes] = useState(
    location.pathname.startsWith("/dashboard/profesional/pacientes")
  );

  return (
    <aside className="w-64 h-screen bg-surface border-r border-border shadow-sm flex flex-col justify-between">
      <div className="p-6">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-primary tracking-tight">MiConsulta</h1>
          <p className="text-xs text-muted-foreground mt-1">Panel profesional</p>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-2 text-sm">
          {/* Inicio */}
          <NavLink
            to="/dashboard/profesional"
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "hover:bg-accent hover:text-primary text-text"
              )
            }
          >
            <FaHome size={16} />
            Inicio
          </NavLink>

          {/* Turnos */}
          <button
            onClick={() => setShowTurnos(!showTurnos)}
            className={cn(
              "flex items-center justify-between w-full px-4 py-2 rounded-lg font-medium transition-all",
              location.pathname.startsWith("/dashboard/profesional/turnos")
                ? "bg-primary text-white shadow-sm"
                : "hover:bg-accent hover:text-primary text-text"
            )}
          >
            <span className="flex items-center gap-3">
              <FaCalendar size={16} />
              Turnos
            </span>
            {showTurnos ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </button>

          {showTurnos && (
            <div className="flex flex-col gap-1 pl-10">
              <NavLink
                to="/dashboard/profesional/turnos"
                end
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md transition-all text-sm",
                    isActive
                      ? "bg-primary text-white font-medium shadow-sm"
                      : "hover:bg-accent hover:text-primary text-text"
                  )
                }
              >
                <FaCalendarCheck size={14} />
                Ver turnos
              </NavLink>

              <NavLink
                to="/dashboard/profesional/turnos/nuevo"
                end
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md transition-all text-sm",
                    isActive
                      ? "bg-primary text-white font-medium shadow-sm"
                      : "hover:bg-accent hover:text-primary text-text"
                  )
                }
              >
                <FaCalendarPlus size={14} />
                Nuevo turno
              </NavLink>
            </div>
          )}

          {/* Pacientes */}
          <button
            onClick={() => setShowPacientes(!showPacientes)}
            className={cn(
              "flex items-center justify-between w-full px-4 py-2 rounded-lg font-medium transition-all",
              location.pathname.startsWith("/dashboard/profesional/pacientes")
                ? "bg-primary text-white shadow-sm"
                : "hover:bg-accent hover:text-primary text-text"
            )}
          >
            <span className="flex items-center gap-3">
              <FaUsers size={16} />
              Pacientes
            </span>
            {showPacientes ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </button>

          {showPacientes && (
            <div className="flex flex-col gap-1 pl-10">
              <NavLink
                to="/dashboard/profesional/pacientes"
                end
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md transition-all text-sm",
                    isActive
                      ? "bg-primary text-white font-medium shadow-sm"
                      : "hover:bg-accent hover:text-primary text-text"
                  )
                }
              >
                <FaUsers size={14} />
                Ver pacientes
              </NavLink>

              <NavLink
                to="/dashboard/profesional/pacientes/nuevo"
                end
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md transition-all text-sm",
                    isActive
                      ? "bg-primary text-white font-medium shadow-sm"
                      : "hover:bg-accent hover:text-primary text-text"
                  )
                }
              >
                <FaUserPlus size={14} />
                Nuevo paciente
              </NavLink>
            </div>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 text-xs text-muted-foreground border-t border-border">
        © 2025 MiConsulta
      </div>
    </aside>
  );
}
