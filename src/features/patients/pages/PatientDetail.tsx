import { useParams, useNavigate } from "react-router-dom";
import { usePatientById } from "../hooks/usePatientById";
import { usePatients } from "../hooks/usePatients";
import { useAuth } from "../../auth/context/AuthContext";
import { useState } from "react";
import { toast } from "react-hot-toast";

import Spinner from "../../../shared/components/ui/Spinner";
import ConfirmationModal from "../../../shared/ui/modal/ConfirmationModal";
import PatientDetailHeader from "../components/detail/PatientDetailHeader";
import PatientActions from "../components/detail/PatientActions";
import PatientMedicalHistory from "../components/detail/PatientMedicalHistory";
import PatientInfoSection from "../components/detail/PatientInfoSection";

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { deletePatient } = usePatients(user?.uid || "");
  const { patient, loading, error } = usePatientById(id);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deletePatient(id);
      toast.success("Paciente eliminado correctamente");
      navigate("/dashboard/profesional/pacientes");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar el paciente");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[var(--color-background)]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-[var(--color-error)]">{error}</p>
      </div>
    );
  }

  if (!patient) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 bg-[var(--color-background)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border-base)] pb-6">
        <PatientDetailHeader id={id!} />
        <PatientActions patientId={id!} onDelete={() => setShowModal(true)} />
      </div>

      <PatientInfoSection patient={patient} />
      <PatientMedicalHistory patientId={id!} />

      <ConfirmationModal
        open={showModal}
        title="Eliminar paciente"
        description="¿Estás seguro de que querés eliminar este paciente? Esta acción no se puede deshacer."
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
