// src/features/appointments/schemas/appointmentSchema.ts
import { z } from "zod";

export const appointmentSchema = z.object({
  dni: z
    .string()
    .min(7, "El DNI debe tener al menos 7 dígitos")
    .regex(/^\d{7,9}$/, "Formato de DNI inválido"),
  name: z.string().min(2, "Nombre requerido"),
  phone: z
    .string()
    .min(8, "Teléfono requerido")
    .regex(/^\d{8,15}$/, "Formato de teléfono inválido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  date: z.string().min(1, "Fecha requerida"),
  time: z.string().min(1, "Hora requerida"),
  notes: z.string().optional(),
});

export type AppointmentData = z.infer<typeof appointmentSchema>;
