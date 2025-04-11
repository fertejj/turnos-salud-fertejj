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
};

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
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate(`/dashboard/profesional/pacientes/${patientId}/editar`)}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold bg-[var(--color-primary)] text-white shadow hover:bg-[var(--color-primary-dark)] transition"
        >
          <Pencil size={18} />
          Editar paciente
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold bg-[var(--color-error)] text-white shadow hover:bg-red-600 transition"
        >
          <Trash2 size={18} />
          Eliminar paciente
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
