type Props = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressBar({ currentStep, totalSteps }: Props) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div className="relative mb-8 px-2">
      {/* Línea base */}
      <div className="absolute top-4 left-0 right-0 h-1 bg-border-base z-0 rounded-full" />

      <div className="relative z-10 flex justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              {/* Conector izquierdo (excepto el primero) */}
              {index > 0 && (
                <div className={`w-full h-1 ${isCompleted ? "bg-primary" : "bg-border-base"} hidden sm:block`} />
              )}

              {/* Círculo */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300
                  ${isCompleted ? "bg-primary text-white" : isCurrent ? "bg-primary/90 text-white" : "bg-border-base text-soft"}
                `}
              >
                {step + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
