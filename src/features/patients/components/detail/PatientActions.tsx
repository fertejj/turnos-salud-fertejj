// src/features/patients/components/PatientActions.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../../../shared/ui/modal/ConfirmationModal";
import { useAuth } from "../../../auth/context/AuthContext";
import { usePatients } from "../../hooks/usePatients";

type Props = {
  patientId: string;
  onDelete: () => void;
}

export default function PatientActions({ patientId }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { deletePatient } = usePatients(user?.uid || "");
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePatient(patientId);
      toast.success("Paciente eliminado correctamente");
      navigate("/dashboard/profesional/pacientes");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar el paciente");
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => navigate(`/dashboard/profesional/pacientes/${patientId}/editar`)}
          className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-all"
        >
          <Pencil size={16} />
          Editar
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium bg-[var(--color-error)] text-white hover:bg-red-600 transition-all"
        >
          <Trash2 size={16} />
          Eliminar
        </button>
      </div>

      <ConfirmationModal
        open={showModal}
        title="Eliminar paciente"
        description="¿Estás seguro de que querés eliminar este paciente? Esta acción no se puede deshacer."
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
