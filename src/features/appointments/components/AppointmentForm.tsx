type Props = {
    form: { date: string; time: string; note: string };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
  };
  
  export default function AppointmentForm({ form, onChange, onSubmit, submitting }: Props) {
    return (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Fecha</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            className="w-full border border-border bg-surface rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Hora</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={onChange}
            className="w-full border border-border bg-surface rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Observaciones</label>
          <textarea
            name="note"
            value={form.note}
            onChange={onChange}
            className="w-full border border-border bg-surface rounded px-3 py-2"
            rows={3}
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
  