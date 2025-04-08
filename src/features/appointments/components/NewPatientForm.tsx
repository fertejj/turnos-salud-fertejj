import Input from "../../../shared/components/Input";

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
    <div className="bg-surface flex flex-col gap-4 rounded-2xl p-4 mb-4 text-sm shadow-md hover:shadow-lg transition-shadow">
      <p className="text-red-500 mb-2">
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

      <button
        onClick={onSubmit}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
      >
        Registrar paciente
      </button>
    </div>
  );
}
