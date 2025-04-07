import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6 py-12">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-primary drop-shadow mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-text mb-2">
          Página no encontrada
        </h2>
        <p className="text-base text-text/70 mb-6">
          Lo sentimos, la página que estás buscando no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline transition"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
