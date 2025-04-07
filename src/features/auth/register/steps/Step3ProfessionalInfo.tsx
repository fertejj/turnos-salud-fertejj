import { forwardRef, useImperativeHandle } from "react";
import Input from "../../../../shared/components/Input";

type Props = {
  formData: any;
  setFormData: (data: any) => void;
};

export type Step3ProfessionalInfoRef = {
  validate: () => { valid: boolean; message?: string };
};

const Step3ProfessionalInfo = forwardRef<Step3ProfessionalInfoRef, Props>(({ formData, setFormData }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if (!formData.specialty) return { valid: false, message: "Seleccioná una especialidad." };
      if (!formData.license) return { valid: false, message: "Ingresá tu matrícula." };
      if (!formData.experience || isNaN(formData.experience)) return { valid: false, message: "Años de experiencia inválidos." };
      if (!formData.university) return { valid: false, message: "Falta universidad o institución." };
      return { valid: true };
    },
  }));

  return (
    <div className="flex flex-col gap-4">
      <select value={formData.specialty || ""} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="p-2 border rounded bg-surface">
        <option value="">Seleccioná tu especialidad</option>
        <option value="odontologo">Odontólogo/a</option>
        <option value="psicologo">Psicólogo/a</option>
        <option value="nutricionista">Nutricionista</option>
        <option value="medico_clinico">Médico/a Clínico/a</option>
        <option value="kinesiologo">Kinesiólogo/a</option>
        <option value="fisioterapeuta">Fisioterapeuta</option>
      </select>
      <Input type="text" placeholder="Matrícula" value={formData.license || ""} onChange={(e) => setFormData({ ...formData, license: e.target.value })} />
      <Input type="number" placeholder="Años de experiencia" value={formData.experience || ""} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
      <Input type="text" placeholder="Universidad o institución" value={formData.university || ""} onChange={(e) => setFormData({ ...formData, university: e.target.value })} />
    </div>
  );
});

export default Step3ProfessionalInfo;
