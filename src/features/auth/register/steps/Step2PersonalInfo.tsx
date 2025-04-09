import { forwardRef, useImperativeHandle } from "react";
import Input from "../../../../shared/components/ui/Input";

type Props = {
  formData: any;
  setFormData: (data: any) => void;
};

export type Step2PersonalInfoRef = {
  validate: () => { valid: boolean; message?: string };
};

const Step2PersonalInfo = forwardRef<Step2PersonalInfoRef, Props>(({ formData, setFormData }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if (!formData.name || formData.name.length < 3) return { valid: false, message: "Nombre inválido." };
      if (!formData.dni || formData.dni.length < 6) return { valid: false, message: "DNI inválido." };
      if (!formData.birthdate) return { valid: false, message: "Faltó la fecha de nacimiento." };
      if (!formData.gender) return { valid: false, message: "Seleccioná un género." };
      return { valid: true };
    },
  }));

  return (
    <div className="flex flex-col gap-4">
      <Input type="text" placeholder="Nombre completo" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <Input type="text" placeholder="DNI" value={formData.dni || ""} onChange={(e) => setFormData({ ...formData, dni: e.target.value })} />
      <Input type="date" placeholder="Fecha de nacimiento" value={formData.birthdate || ""} onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })} />
      <select value={formData.gender || ""} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="p-2 border rounded bg-surface">
        <option value="">Seleccioná tu género</option>
        <option value="femenino">Femenino</option>
        <option value="masculino">Masculino</option>
        <option value="otro">Otro</option>
        <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
      </select>
    </div>
  );
});

export default Step2PersonalInfo;
