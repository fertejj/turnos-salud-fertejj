import { useParams, useNavigate } from "react-router-dom";
import { usePatientById } from "../hooks/usePatientById";
import { usePatients } from "../hooks/usePatients";
import { useAuth } from "../../auth/context/AuthContext";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import InfoItem from "../ui/InfoItem";
import Spinner from "../../../shared/components/ui/Spinner";
import MedicalHistoryList from "../../medical-history/pages/MedicalHistoryList";
import ConfirmationModal from "../../../shared/ui/modal/ConfirmationModal";

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

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[var(--color-background)]">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-[var(--color-error)]">{error}</p>
      </div>
    );

  if (!patient) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 bg-[var(--color-background)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border-base)] pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight">
            Detalle del Paciente
          </h1>
          <p className="text-sm text-[var(--color-text-soft)] mt-1">ID: {id}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate(`/dashboard/profesional/pacientes/${id}/editar`)}
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
      </div>

      {/* Información */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Personal */}
        <section className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-6 shadow-md">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
            Información Personal
          </h2>
          <div className="space-y-3">
            <InfoItem label="Nombre" value={patient.name} />
            <InfoItem label="Apellido" value={patient.lastName} />
            <InfoItem label="DNI" value={patient.dni} />
            <InfoItem label="Fecha de nacimiento" value={patient.birthDate} />
            <InfoItem label="Género" value={patient.gender} />
          </div>
        </section>

        {/* Contacto */}
        <section className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-6 shadow-md">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
            Información de Contacto
          </h2>
          <div className="space-y-3">
            {patient.phone && <InfoItem label="Teléfono" value={patient.phone} />}
            {patient.email && <InfoItem label="Email" value={patient.email} />}
            {patient.insurance && <InfoItem label="Obra social" value={patient.insurance} />}
            {patient.address && <InfoItem label="Dirección" value={patient.address} />}
          </div>
        </section>
      </div>

      {/* Historia Clínica */}
      <section className="rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-surface)] p-6 shadow-md">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Historia Clínica</h2>
        <MedicalHistoryList patientId={id!} />
      </section>

      {/* Modal */}
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
