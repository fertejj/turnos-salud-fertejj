export type Patient = {
  id?: string
  name: string
  lastName: string
  dni: string
  phone?: string
  email?: string
  birthDate: string
  address?: string
  gender: "Masculino" | "Femenino" | "Otro"
  insurance?: string
  createdAt?: string
  professionalId: string
}

export type FormData = Omit<Patient, "id" | "createdAt" | "professionalId">
