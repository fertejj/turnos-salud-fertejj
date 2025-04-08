import {
  FiUserPlus,
  FiCalendar,
  FiFileText,
  FiDollarSign,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProCard from "../../../shared/components/ui/card/ProCard";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Nuevo turno",
      description: "Agendá una nueva consulta",
      icon: FiCalendar,
      path: "/dashboard/profesional/turnos/nuevo",
    },
    {
      title: "Nuevo paciente",
      description: "Registrá un nuevo paciente",
      icon: FiUserPlus,
      path: "/dashboard/profesional/pacientes/nuevo",
    },
    {
      title: "Registrar evolución",
      description: "Cargá una nueva evolución clínica",
      icon: FiFileText,
      path: "/dashboard/profesional/consultas/nueva",
    },
    {
      title: "Registrar pago",
      description: "Agregá un pago o consulta abonada",
      icon: FiDollarSign,
      path: "/dashboard/profesional/pagos/nuevo",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <ProCard
            key={index}
            title={action.title}
            subtitle={action.description}
            onClick={() => navigate(action.path)}
            className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition"
            headerRight={
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Icon size={24} />
              </div>
            }
          />
        );
      })}
    </div>
  );
};

export default QuickActions;
