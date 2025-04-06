import { FiTrash, FiEdit2, FiCheck } from "react-icons/fi";
import { useState, useEffect } from "react";
import type { TimeSlot } from "./types";

type Props = {
  from: string;
  to: string;
  onChangeFrom: (val: string) => void;
  onChangeTo: (val: string) => void;
  onRemove: () => void;
  index: number;
  allSlots: TimeSlot[]; // ← importante para validar superposición
};

export default function TimeSlotItem({
  from,
  to,
  onChangeFrom,
  onChangeTo,
  onRemove,
  index,
  allSlots,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (from: string, to: string): string | null => {
    if (!from || !to) return "Completá ambos horarios";
    if (from >= to) return "La hora de inicio debe ser menor que la final";

    const overlaps = allSlots.some((slot, i) => {
      if (i === index) return false;
      return (
        (from >= slot.from && from < slot.to) ||
        (to > slot.from && to <= slot.to) ||
        (from <= slot.from && to >= slot.to)
      );
    });

    if (overlaps) return "La franja se superpone con otra existente";

    return null;
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      const validation = validate(from, to);
      if (validation) {
        setError(validation);
        return;
      }
      setError(null);
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (!isEditing) setError(null);
  }, [isEditing]);

  return (
    <div className="flex flex-col gap-2 py-3 border-b border-border-base">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-6 w-full">
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground">Desde</label>
            <input
              type="time"
              step="60"
              value={from}
              onChange={(e) => onChangeFrom(e.target.value)}
              disabled={!isEditing}
              className="border border-border-base bg-surface rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground">Hasta</label>
            <input
              type="time"
              step="60"
              value={to}
              onChange={(e) => onChangeTo(e.target.value)}
              disabled={!isEditing}
              className="border border-border-base bg-surface rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="text-muted-foreground hover:text-primary transition p-1"
            onClick={handleToggleEdit}
            title={isEditing ? "Guardar cambios" : "Editar horario"}
          >
            {isEditing ? <FiCheck size={18} /> : <FiEdit2 size={18} />}
          </button>

          <button
            type="button"
            className="text-muted-foreground hover:text-red-500 transition p-1"
            onClick={onRemove}
            title="Eliminar franja horaria"
          >
            <FiTrash size={18} />
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
