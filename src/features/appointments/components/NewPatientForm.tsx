import Input from "../../../shared/components/ui/Input";

type Props = {
  newPatient: { name: string; email: string; phone: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export default function NewPatientForm({
  newPatient,
  onChange,
  onSubmit,
}: Props) {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl p-6 shadow-md transition-shadow space-y-4">
      <p className="text-sm text-[var(--color-error)] font-medium">
        Paciente no encontrado. ¿Registrar nuevo?
      </p>

      <Input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={newPatient.name}
        onChange={onChange}
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={newPatient.email}
        onChange={onChange}
      />
      <Input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={newPatient.phone}
        onChange={onChange}
      />

      <div className="pt-2">
        <button
          onClick={onSubmit}
          className="w-full bg-[var(--color-primary)] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition-all"
        >
          Registrar paciente
        </button>
      </div>
    </div>
  );
}
