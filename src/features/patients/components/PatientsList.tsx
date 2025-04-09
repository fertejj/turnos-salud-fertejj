import { usePatients } from "../hooks/usePatients";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Card from "../../../shared/ui/card/Card";
import { useNavigate } from "react-router-dom";

interface PatientsListProps {
  professionalId: string;
}

export default function PatientsList({ professionalId }: PatientsListProps) {
  const { patients, loading, deletePatient } = usePatients(professionalId);
  const navigate = useNavigate();

  const handleDelete = (patientId: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
      deletePatient(patientId);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Cargando pacientes...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-lg font-semibold">Pacientes</h2>
        <button
          onClick={() => navigate("/dashboard/profesional/pacientes/nuevo")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          + Agregar paciente
        </button>
      </div>

      {patients.length === 0 ? (
        <p className="text-sm text-gray-500">No hay pacientes registrados.</p>
      ) : (
        <div className="grid gap-3">
          {patients.map((patient) => {
            if (!patient.id) return null;

            return (
              <Card
                key={patient.id}
                className="flex justify-between items-start sm:items-center flex-col sm:flex-row p-4 gap-3"
              >
                <div>
                  <p className="font-medium text-base">
                    {patient.name} {patient.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    DNI: {patient.dni}
                  </p>
                </div>

                <div className="flex gap-2 self-end sm:self-auto">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/profesional/pacientes/${patient.id}`)
                    }
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <FiEdit2 className="text-blue-600" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id!)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:underline"
                  >
                    <FiTrash2 className="text-red-600" />
                    Eliminar
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
