import { forwardRef, useImperativeHandle } from "react";

type Props = {
  formData: any;
  setFormData: (data: any) => void;
};

export type Step5TurnPreferencesRef = {
  validate: () => { valid: boolean; message?: string };
};

const Step5TurnPreferences = forwardRef<Step5TurnPreferencesRef, Props>(({ formData, setFormData }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if (!formData.appointmentDuration) return { valid: false, message: "Seleccioná duración del turno." };
      return { valid: true };
    },
  }));

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium">Duración estándar por turno</label>
      <select value={formData.appointmentDuration || ""} onChange={(e) => setFormData({ ...formData, appointmentDuration: Number(e.target.value) })} className="p-2 border rounded bg-surface">
        <option value="">Seleccioná una duración</option>
        <option value="15">15 minutos</option>
        <option value="30">30 minutos</option>
        <option value="60">60 minutos</option>
      </select>
      <textarea placeholder="Disponibilidad inicial (opcional)" value={formData.availabilityNote || ""} onChange={(e) => setFormData({ ...formData, availabilityNote: e.target.value })} className="p-2 border rounded bg-surface" rows={4} />
    </div>
  );
});

export default Step5TurnPreferences;
