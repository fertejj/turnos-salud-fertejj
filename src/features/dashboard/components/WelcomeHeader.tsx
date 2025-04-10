import type { ProfessionalUser } from "../types/user";

type Props = {
  user: ProfessionalUser | null;
};

export default function WelcomeSection({ user }: Props) {
  const displayName = user?.fullName || "Profesional";

  return (
    <section className="space-y-1">
      <h1 className="text-3xl font-bold text-[var(--color-text)]">
        ¡Hola {displayName}!
      </h1>
      <p className="text-sm text-[var(--color-text-soft)]">
        Bienvenido a tu panel de gestión. Desde aquí podés controlar turnos, pacientes y mucho más.
      </p>
    </section>
  );
}
