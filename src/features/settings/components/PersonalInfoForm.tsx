import Input from "../../../shared/components/ui/Input"
import { ProfessionalUser } from "../../dashboard/types/user"

type PersonalField = 'fullName' | 'dni' | 'birthdate'

interface PersonalInfoFormProps {
    values: Pick<ProfessionalUser, PersonalField>
    onChange: (field: PersonalField, value: string) => void
  }

export const PersonalInfoForm = ({ values, onChange }: PersonalInfoFormProps) => {
  return (
    <div className="space-y-4">
      <Input
        label="Nombre completo"
        value={values.fullName}
        onChange={(e) => onChange('fullName', e.target.value)}
        placeholder="Ej: Dr. Juan Pérez"
      />

      <Input
        label="DNI"
        value={values.dni}
        onChange={(e) => onChange('dni', e.target.value)}
        placeholder="Ej: 30111222"
      />

      <Input
        label="Fecha de nacimiento"
        type="date"
        value={values.birthdate || ''}
        onChange={(e) => onChange('birthdate', e.target.value)}
      />
    </div>
  )
}
