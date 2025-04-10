import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../features/auth/context/AuthContext";
import { usePatients } from "../hooks/usePatients";
import PatientFilters from "../components/PatientFilters";
import PatientListHeader from "../components/PatientListHeader";
import PatientCardList from "../components/PatientCardList";

export default function PatientList() {
  const { user } = useAuth();
  const { patients, loading, deletePatient } = usePatients(user?.uid || "");

  const [nameQuery, setNameQuery] = useState("");
  const [dniQuery, setDniQuery] = useState("");

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "¿Estás seguro que querés eliminar este paciente?"
    );
    if (!confirmDelete) return;

    try {
      await deletePatient(id);
      toast.success("Paciente eliminado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el paciente");
    }
  };

  const filteredPatients = patients.filter((p) => {
    const fullName = `${p.name} ${p.lastName}`.toLowerCase();
    const matchesName = fullName.includes(nameQuery.toLowerCase());
    const matchesDni = dniQuery ? p.dni.includes(dniQuery) : true;
    return matchesName && matchesDni;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <PatientListHeader />

      <PatientFilters
        nameQuery={nameQuery}
        dniQuery={dniQuery}
        onNameChange={(e) => setNameQuery(e.target.value)}
        onDniChange={(e) => setDniQuery(e.target.value)}
      />

      <PatientCardList
        patients={filteredPatients}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
}
