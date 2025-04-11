import Input from "../../../shared/components/ui/Input";

type Props = {
  form: { date: Date; time: string; note: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
  submitting: boolean;
};

export default function AppointmentForm({
  form,
  onChange,
  onSubmit,
  submitting,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Fecha</label>
        <Input
          type="date"
          name="date"
          value={form.date.toISOString().slice(0, 10)} // ✅ Corregido aquí
          onChange={onChange}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Hora</label>
        <Input type="time" name="time" value={form.time} onChange={onChange} />
      </div>

      <div>
        <label className="text-sm font-medium">Observaciones</label>
        <Input
          name="note"
          value={form.note}
          onChange={onChange}
          placeholder="Ej: control de rutina..."
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={submitting}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
      >
        {submitting ? "Guardando..." : "Crear turno"}
      </button>
    </div>
  );
}
