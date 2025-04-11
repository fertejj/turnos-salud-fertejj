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
    <section className="max-w-6xl mx-auto px-6 py-10 space-y-12 bg-[var(--color-background)]">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[var(--color-border-base)]">
        <PatientDetailHeader id={id!} />
        <PatientActions patientId={id!} onDelete={() => setShowModal(true)} />
      </header>

      {/* Info + Contacto */}
      <div className="grid gap-6">
        <PatientInfoSection patient={patient} />
      </div>

      {/* Historia Clínica */}
      <div >

        <PatientMedicalHistory patientId={id!} />
      </div>

      {/* Modal de Confirmación */}
      <ConfirmationModal
        open={showModal}
        title="Eliminar paciente"
        description="¿Estás seguro de que querés eliminar este paciente? Esta acción no se puede deshacer."
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
