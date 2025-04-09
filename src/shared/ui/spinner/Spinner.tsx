type SpinnerProps = {
    text?: string;
  };
  
  export default function Spinner({ text = 'Cargando...' }: SpinnerProps) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-[6px] border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-soft font-medium">{text}</span>
      </div>
    );
  }
  