import { forwardRef, useImperativeHandle } from "react";
import Input from "../../../../shared/components/Input";

type Props = {
  formData: any;
  setFormData: (data: any) => void;
};

export type Step4ContactInfoRef = {
    validate: () => { valid: boolean; message?: string };
  };
  

const Step4ContactInfo = forwardRef<Step4ContactInfoRef, Props>(({ formData, setFormData }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      if (!formData.phone) return { valid: false, message: "Teléfono requerido." };
      if (!formData.address) return { valid: false, message: "Dirección requerida." };
      if (!formData.city) return { valid: false, message: "Localidad requerida." };
      return { valid: true };
    },
  }));

  return (
    <div className="flex flex-col gap-4">
      <Input type="tel" placeholder="Teléfono" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      <Input type="text" placeholder="Dirección del consultorio" value={formData.address || ""} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
      <Input type="text" placeholder="Localidad" value={formData.city || ""} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
    </div>
  );
});

export default Step4ContactInfo;

