import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "react-feather";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6 py-12">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-primary drop-shadow mb-4">
          403
        </h1>
        <h2 className="text-2xl font-semibold text-text mb-2">
          Acceso denegado
        </h2>
        <p className="text-base text-text/70 mb-6">
          No tenés permisos para acceder a esta sección. Si creés que esto es un
          error, contactá al administrador.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline transition"
        >
          <ArrowLeftCircle size={18} />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
