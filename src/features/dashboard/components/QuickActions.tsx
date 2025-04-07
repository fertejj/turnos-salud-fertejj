import {
  FiUserPlus,
  FiCalendar,
  FiFileText,
  FiDollarSign,
} from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import CardContent from "../../../shared/components/ui/card/CardContent"
import Card from "../../../shared/components/ui/card/Card"

const QuickActions = () => {
  const navigate = useNavigate()

  const actions = [
    {
      title: "Nuevo turno",
      description: "Agendá una nueva consulta",
      icon: FiCalendar,
      path: "/dashboard/profesional/crear-turno",
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
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon
        return (
          <Card
            key={index}
            onClick={() => navigate(action.path)}
            className="cursor-pointer transition hover:shadow-lg hover:scale-[1.02]"
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Icon size={28} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{action.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
export default QuickActions