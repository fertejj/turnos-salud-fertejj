import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type Props = {
  date: Date;
  time: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmationModal({ date, time, onClose, onConfirm }: Props) {
  const formatted = format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm text-center border border-gray-300">
        <h2 className="text-xl font-semibold text-amber-600 mb-4">¡Turno reservado!</h2>
        <p className="text-gray-700 mb-2">Tu turno fue registrado con éxito:</p>
        <p className="text-lg font-medium text-gray-800">
          📅 {formatted.charAt(0).toUpperCase() + formatted.slice(1)} a las ⏰ {time} hs
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="bg-amber-500 text-white font-medium px-4 py-2 rounded hover:bg-amber-600 transition"
          >
            Ir al panel
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
