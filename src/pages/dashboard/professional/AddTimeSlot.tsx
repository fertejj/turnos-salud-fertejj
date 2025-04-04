import { FiCheck } from "react-icons/fi";

type Props = {
  from: string;
  to: string;
  onChangeFrom: (val: string) => void;
  onChangeTo: (val: string) => void;
  onConfirm: () => void;
  isValid: boolean;
  validationError?: string;
};

export default function AddTimeSlot({
  from,
  to,
  onChangeFrom,
  onChangeTo,
  onConfirm,
  isValid,
  validationError,
}: Props) {
  return (
    <div className="bg-white border border-dashed border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-150 mt-4">
      <div className="flex items-center justify-between gap-4">
        {/* Inputs */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-500 mb-1">Desde</label>
            <input
              type="time"
              step="60"
              value={from}
              onChange={(e) => onChangeFrom(e.target.value)}
              className="border border-gray-300 bg-gray-50 text-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-500 mb-1">Hasta</label>
            <input
              type="time"
              step="60"
              value={to}
              onChange={(e) => onChangeTo(e.target.value)}
              className="border border-gray-300 bg-gray-50 text-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Confirmar */}
        <button
          type="button"
          onClick={onConfirm}
          disabled={!isValid}
          className={`p-2 rounded-full transition ${
            isValid
              ? "text-green-600 hover:text-green-700 hover:bg-green-100"
              : "opacity-40 cursor-not-allowed"
          }`}
          aria-label="Confirmar franja horaria"
          title="Agregar franja"
        >
          <FiCheck size={18} />
        </button>
      </div>

      {/* Error de validación */}
      {validationError && (
        <p className="text-xs text-red-500 mt-3">{validationError}</p>
      )}
    </div>
  );
}
