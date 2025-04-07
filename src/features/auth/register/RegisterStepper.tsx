import { useState } from "react";
import Step1AccessData from "./steps/Step1AccessData";
// importa los demás pasos...

type FormData = {
  email: string;
  password: string;
  name: string;
  dni: string;
  birthdate: string;
  gender: string;
  specialty: string;
  license: string;
  experience: string;
  university: string;
  phone: string;
  address: string;
  city: string;
  appointmentDuration: number;
  availability?: any;
};

export default function RegisterStepper() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const steps = [
    <Step1AccessData formData={formData} setFormData={setFormData} />,
    // agrega los otros componentes con props similares
  ];

  return (
    <div className="max-w-xl mx-auto p-6 bg-surface rounded shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">Registro Profesional</h1>
        <p className="text-soft">Paso {step + 1} de {steps.length}</p>
      </div>

      {steps[step]}

      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="text-primary underline">
            Volver
          </button>
        )}
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)} className="ml-auto btn-primary">
            Siguiente
          </button>
        ) : (
          <button
            className="ml-auto btn-primary"
            onClick={() => console.log("Enviar a Firebase:", formData)}
          >
            Finalizar Registro
          </button>
        )}
      </div>
    </div>
  );
}
