import { Eye, Pencil, Trash2, Mail, Phone, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProCard from "../../../shared/ui/card/ProCard";
import ActionButton from "./ActionButton";
import ActionGroup from "./ActionGroup";

type Props = {
  patient: any;
  onDelete: (id: string) => void;
};

export default function PatientCard({ patient, onDelete }: Props) {
  const navigate = useNavigate();

  const formattedDate = new Date(patient.createdAt).toLocaleDateString("es-AR", {
    dateStyle: "medium",
  });

  return (
    <ProCard
      title={`${patient.name} ${patient.lastName}`}
      subtitle={`DNI: ${patient.dni}`}
      actions={
        <ActionGroup>
          <ActionButton
            icon={<Eye size={16} />}
            label="Ver"
            onClick={() => navigate(`/dashboard/profesional/pacientes/${patient.id}`)}
          />
          <ActionButton
            icon={<Pencil size={16} />}
            label="Editar"
            onClick={() => navigate(`/dashboard/profesional/pacientes/${patient.id}/editar`)}
          />
          <ActionButton
            icon={<Trash2 size={16} />}
            label="Eliminar"
            variant="destructive"
            onClick={() => onDelete(patient.id)}
          />
        </ActionGroup>
      }
    >
      <div className="space-y-3 text-sm text-[var(--color-text-soft)]">
        <div className="space-y-2">
          {patient.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[var(--color-text)]" />
              <span className="text-[var(--color-text)]">{patient.email}</span>
            </div>
          )}
          {patient.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-[var(--color-text)]" />
              <span className="text-[var(--color-text)]">{patient.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[var(--color-text)]" />
            <span className="text-[var(--color-text)]">{patient.birthDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs italic text-[var(--color-text-soft)] pt-2">
          <Clock size={14} />
          <span>Registrado el {formattedDate}</span>
        </div>
      </div>
    </ProCard>
  );
}
