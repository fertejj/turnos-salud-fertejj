import Input from "../../../shared/components/ui/Input"

interface ContactInfoFormProps {
  values: {
    phone: string
    address: string
    specialty: string
  }
  email: string
  onChange: (field: 'phone' | 'address' | 'specialty', value: string) => void
}

export const ContactInfoForm = ({ values, email, onChange }: ContactInfoFormProps) => {
  return (
    <div className="space-y-4">
      <Input
        label="Email"
        value={email}
        disabled
      />

      <Input
        label="Teléfono"
        value={values.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        placeholder="Ej: +54 9 11 1234-5678"
      />

      <Input
        label="Dirección"
        value={values.address}
        onChange={(e) => onChange('address', e.target.value)}
        placeholder="Ej: Av. Siempre Viva 742"
      />

      <Input
        label="Especialidad"
        value={values.specialty}
        onChange={(e) => onChange('specialty', e.target.value)}
        placeholder="Ej: Nutrición, Odontología..."
      />
    </div>
  )
}
