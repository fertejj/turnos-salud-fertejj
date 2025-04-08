import type { ProfessionalUser } from "../types/user";

type Props = {
  user: ProfessionalUser | null;
};

export default function WelcomeSection({ user }: Props) {
  const displayName = user?.name || "Profesional";

  return (
    <section className="bg-primary-light border border-primary/20 rounded-xl p-6 flex items-center gap-4 shadow-sm">
      {/* Avatar o inicial */}
      <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-2xl">
        {displayName.charAt(0).toUpperCase()}
      </div>

      {/* Texto de bienvenida */}
      <div>
        <h1 className="text-2xl font-semibold text-primary-dark leading-snug">
          ¡Bienvenido/a, {displayName}! 👋
        </h1>
        <p className="text-sm text-text-soft mt-1 max-w-md">
          Este es tu panel profesional. Desde aquí podés gestionar tu agenda, pacientes y configuración.
        </p>
      </div>
    </section>
  );
}
