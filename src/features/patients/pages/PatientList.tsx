import { useAuth } from "../../../features/auth/context/AuthContext";
import ProCard from "../../../components/ui/ProCard";
import PatientFilters from "../components/PatientFilters";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { usePatients } from "../hooks/usePatients";

export default function PatientList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { patients, loading, deletePatient } = usePatients(user?.uid || "");

  const [nameQuery, setNameQuery] = useState("");
  const [dniQuery, setDniQuery] = useState("");

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("¿Estás seguro que querés eliminar este paciente?");
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-primary mb-4">Mis pacientes</h1>

      <PatientFilters
        nameQuery={nameQuery}
        dniQuery={dniQuery}
        onNameChange={(e) => setNameQuery(e.target.value)}
        onDniChange={(e) => setDniQuery(e.target.value)}
      />

      {loading ? (
        <p>Cargando pacientes...</p>
      ) : filteredPatients.length === 0 ? (
        <p>No se encontraron pacientes con los filtros aplicados.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <ProCard
              key={patient.id}
              title={`${patient.name} ${patient.lastName}`}
              subtitle={`DNI: ${patient.dni}`}
              actions={
                <div className="flex flex-col gap-1 text-sm">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/profesional/pacientes/${patient.id}`)
                    }
                    className="text-primary hover:underline text-left"
                  >
                    Ver paciente
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/profesional/pacientes/${patient.id}/editar`)
                    }
                    className="text-primary hover:underline text-left"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id!)}
                    className="text-destructive hover:underline text-left"
                  >
                    Eliminar
                  </button>
                </div>
              }
            >
              {patient.email && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-text">Email:</span> {patient.email}
                </p>
              )}
              {patient.phone && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-text">Teléfono:</span> {patient.phone}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-text">Fecha de nacimiento:</span>{" "}
                {patient.dateOfBirth}
              </p>
              {patient.createdAt && (
                <p className="text-xs text-muted-foreground mt-1">
                  Registrado el{" "}
                  {new Date(patient.createdAt).toLocaleDateString("es-AR", {
                    dateStyle: "medium",
                  })}
                </p>
              )}
            </ProCard>
          ))}
        </ul>
      )}
    </div>
  );
}
