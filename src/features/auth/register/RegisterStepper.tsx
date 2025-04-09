import { useRef, useState } from "react";
import Step1AccessData, { Step1AccessDataRef } from "./steps/Step1AccessData";
import Step2PersonalInfo, { Step2PersonalInfoRef } from "./steps/Step2PersonalInfo";
import Step3ProfessionalInfo, { Step3ProfessionalInfoRef } from "./steps/Step3ProfessionalInfo";
import Step4ContactInfo, { Step4ContactInfoRef } from "./steps/Step4ContactInfo";
import Step5TurnPreferences, { Step5TurnPreferencesRef } from "./steps/Step5TurnPreferences";
import Step6Confirmation from "./steps/Step6Confirmation";
import ProgressBar from "../../../shared/components/ui/ProgressBar";

type FormData = {
  email?: string;
  password?: string;
  fullName?: string;
  dni?: string;
  birthdate?: string;
  gender?: string;
  specialty?: string;
  license?: string;
  experience?: string;
  university?: string;
  phone?: string;
  address?: string;
  city?: string;
  appointmentDuration?: number;
  availabilityNote?: string;
};

export default function RegisterStepper() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState("");

  const step1Ref = useRef<Step1AccessDataRef>(null);
  const step2Ref = useRef<Step2PersonalInfoRef>(null);
  const step3Ref = useRef<Step3ProfessionalInfoRef>(null);
  const step4Ref = useRef<Step4ContactInfoRef>(null);
  const step5Ref = useRef<Step5TurnPreferencesRef>(null);

  const steps = [
    <Step1AccessData key="step1" formData={formData} setFormData={setFormData} ref={step1Ref} />,
    <Step2PersonalInfo key="step2" formData={formData} setFormData={setFormData} ref={step2Ref} />,
    <Step3ProfessionalInfo key="step3" formData={formData} setFormData={setFormData} ref={step3Ref} />,
    <Step4ContactInfo key="step4" formData={formData} setFormData={setFormData} ref={step4Ref} />,
    <Step5TurnPreferences key="step5" formData={formData} setFormData={setFormData} ref={step5Ref} />,
    <Step6Confirmation key="step6" formData={formData} />,
  ];

  const validateCurrentStep = (): boolean => {
    setError("");

    const refs = [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref];
    const currentRef = refs[step];
    if (currentRef?.current?.validate) {
      const result = currentRef.current.validate();
      if (!result.valid) {
        setError(result.message || "Hay errores en este paso.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (step < steps.length - 1 && !validateCurrentStep()) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-xl mx-auto p-2 bg-surface rounded">
      <h1 className="text-2xl font-bold mb-4 text-primary-dark">Registro Profesional</h1>

      <ProgressBar currentStep={step} totalSteps={steps.length} />

      {steps[step]}

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button onClick={handleBack} className="text-primary underline">
            Volver
          </button>
        )}
        {step < steps.length - 1 && (
          <button onClick={handleNext} className="ml-auto btn-primary">
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
