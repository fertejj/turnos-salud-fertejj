import { forwardRef, useImperativeHandle } from "react";
import Input from "../../../../shared/components/Input";

type Props = {
  formData: {
    email?: string;
    password?: string;
  };
  setFormData: (data: any) => void;
};

export type Step1AccessDataRef = {
  validate: () => { valid: boolean; message?: string };
};

const Step1AccessData = forwardRef<Step1AccessDataRef, Props>(({ formData, setFormData }, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      const email = formData.email?.trim();
      const password = formData.password?.trim();
      if (!email || !email.includes("@")) return { valid: false, message: "Correo inválido." };
      if (!password || password.length < 6) return { valid: false, message: "Contraseña muy corta." };
      return { valid: true };
    },
  }));

  return (
    <div className="flex flex-col gap-4">
      <Input type="email" placeholder="Correo electrónico" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <Input type="password" placeholder="Contraseña" value={formData.password || ""} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
    </div>
  );
});

export default Step1AccessData;
