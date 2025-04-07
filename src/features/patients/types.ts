export type Patient = {
  id?: string
  name: string
  lastName: string
  dni: string
  phone?: string
  email?: string
  dateOfBirth: string
  gender: "Masculino" | "Femenino" | "Otro"
  insurance?: string
  createdAt?: string
  professionalId: string
}

export type FormData = Omit<Patient, "id" | "createdAt" | "professionalId">
