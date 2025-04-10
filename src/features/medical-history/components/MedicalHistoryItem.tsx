import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../../patients/ui/ConfirmationModal";
import { useMedicalHistory } from "../hooks/useMedicalHistory";
import { toast } from "react-hot-toast";

interface Props {
  entryId: string;
  patientId: string;
  title: string;
  date: string;
  note?: string;
}

export default function MedicalHistoryItem({
  entryId,
  patientId,
  title,
  date,
  note,
}: Props) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { deleteEntry } = useMedicalHistory(patientId);

  const handleDelete = async () => {
    try {
      await deleteEntry(entryId);
      toast.success("Entrada eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar entrada:", error);
      toast.error("No se pudo eliminar la entrada");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="rounded-xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-4 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[var(--color-text)]">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate(`/dashboard/profesional/pacientes/${patientId}/historia/${entryId}`)
            }
            className="p-1 text-[var(--color-text-soft)] hover:text-[var(--color-text)] transition"
            title="Ver entrada"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() =>
              navigate(`/dashboard/profesional/pacientes/${patientId}/historia/${entryId}/editar`)
            }
            className="p-1 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition"
            title="Editar entrada"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="p-1 text-[var(--color-error)] hover:text-red-600 transition"
            title="Eliminar entrada"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-soft)]">Fecha: {date}</p>
      {note && (
        <p className="text-sm text-[var(--color-text)] leading-relaxed">{note}</p>
      )}

      <ConfirmationModal
        open={showModal}
        title="Eliminar entrada"
        description="¿Estás seguro de que querés eliminar esta entrada de historia clínica? Esta acción no se puede deshacer."
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
