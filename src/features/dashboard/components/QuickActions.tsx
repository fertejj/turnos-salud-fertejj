// dashboard/components/QuickActions.tsx
import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-primary-dark mb-4">
        Acciones rápidas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link
          to="/dashboard/profesional/agendar"
          className="bg-surface border border-border-base rounded-lg p-4 hover:bg-gray-100 transition"
        >
          <p className="text-lg font-semibold text-primary-dark">
            Agendar turno
          </p>
          <p className="text-sm text-gray-600">
            Completa la información del paciente
          </p>
        </Link>

        <Link
          to="/dashboard/profesional/disponibilidad"
          className="bg-surface border border-border-base rounded-lg p-4 hover:bg-gray-100 transition"
        >
          <p className="text-lg font-semibold text-primary-dark">
            Disponibilidad semanal
          </p>
          <p className="text-sm text-gray-600">
            Visualizá tu disponibilidad actual
          </p>
        </Link>

        <Link
          to="/dashboard/profesional/configuracion"
          className="bg-surface border border-border-base rounded-lg p-4 hover:bg-gray-100 transition"
        >
          <p className="text-lg font-semibold text-primary-dark">
            Configuración
          </p>
          <p className="text-sm text-gray-600">Actualizá tu perfil y datos</p>
        </Link>
      </div>
    </section>
  );
}
