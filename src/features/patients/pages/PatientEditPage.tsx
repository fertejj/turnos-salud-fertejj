import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestoreInstance } from "../../../services/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../auth/context/AuthContext";
import { usePatients } from "../hooks/usePatients";
import { Patient, FormData } from "../types";
import { toast } from "react-hot-toast";
import PatientForm from "../components/PatientForm";

export default function PatientEditPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { updatePatient } = usePatients(user?.uid || "");
  const navigate = useNavigate();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const db = await getFirestoreInstance();
        const ref = doc(db, "patients", id);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setPatient({ id: snapshot.id, ...(data as Omit<Patient, "id">) });
        } else {
          toast.error("Paciente no encontrado");
          navigate("/dashboard/profesional");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar el paciente");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id, navigate]);

  const handleUpdate = async (data: FormData) => {
    if (!patient?.id) return;

    try {
      await updatePatient(patient.id, data);
      toast.success("Paciente actualizado");
      navigate("/dashboard/profesional/pacientes");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar paciente");
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <p className="text-muted-foreground text-sm">Cargando paciente...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <p className="text-muted-foreground text-sm">Paciente no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-primary mb-4">Editar paciente</h1>
      <PatientForm
        initialData={patient}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/dashboard/profesional/pacientes")}
      />
    </div>
  );
}
