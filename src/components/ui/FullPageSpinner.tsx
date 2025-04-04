type FullPageSpinnerProps = {
    text?: string;
  };
  
  export default function FullPageSpinner({ text = 'Cargando...' }: FullPageSpinnerProps) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-20 h-20 border-[6px] border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-gray-600 font-medium">{text}</span>
      </div>
    );
  }
  