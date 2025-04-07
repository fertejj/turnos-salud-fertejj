type Props = {
    newPatient: { name: string; email: string; phone: string };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
  };
  
  export default function NewPatientForm({ newPatient, onChange, onSubmit }: Props) {
    return (
      <div className="bg-surface border border-border rounded p-4 mb-4 text-sm">
        <p className="text-red-500 mb-2">Paciente no encontrado. ¿Registrar nuevo?</p>
  
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={newPatient.name}
          onChange={onChange}
          className="mb-2 w-full border border-border rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newPatient.email}
          onChange={onChange}
          className="mb-2 w-full border border-border rounded px-3 py-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={newPatient.phone}
          onChange={onChange}
          className="mb-2 w-full border border-border rounded px-3 py-2"
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
  