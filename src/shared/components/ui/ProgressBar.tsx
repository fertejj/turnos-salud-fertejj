type Props = {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
};

export default function ProgressBar({ currentStep, totalSteps, onStepChange }: Props) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div className="relative mb-8 px-2 w-full">
      {/* Línea base completa detrás */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-border-base rounded-full z-0 transform -translate-y-1/2" />

      {/* Línea de progreso */}
      <div
        className="absolute top-1/2 left-0 h-1 bg-primary rounded-full z-10 transform -translate-y-1/2 transition-all duration-500"
        style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
      />

      {/* Pasos */}
      <div className="relative z-20 flex justify-between items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={index} className="relative flex flex-1 items-center justify-center group">
              {/* Círculo */}
              <button
                onClick={() => onStepChange(step)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ease-in-out
                  ${isCompleted ? "bg-primary text-white" : isCurrent ? "bg-primary/90 text-white scale-110 shadow-md" : "bg-border-base text-soft"}
                  hover:scale-105 hover:shadow-lg focus:outline-none active:scale-95
                `}
                aria-label={`Paso ${step + 1}`}
              >
                {step + 1}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
