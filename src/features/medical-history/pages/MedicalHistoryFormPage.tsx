import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMedicalHistory } from "../hooks/useMedicalHistory"
import { toast } from "react-hot-toast"
import { format } from "date-fns"
import { useAuth } from "../../auth/context/AuthContext"
import type { MedicalHistoryEntry } from "../types/MedicalHistoryEntry"

const schema = z.object({
  date: z.string().min(1, "La fecha es obligatoria"), // yyyy-MM-dd
  reason: z.string().min(1, "El motivo es obligatorio"),
  symptoms: z.string().min(1, "Los síntomas son obligatorios"),
  description: z.string().optional(),
  note: z.string().optional(),
  signs: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function MedicalHistoryFormPage() {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addEntry } = useMedicalHistory(patientId)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      reason: "",
      symptoms: "",
      description: "",
      note: "",
      signs: "",
      diagnosis: "",
      treatment: "",
    },
  })

  if (!patientId) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-[var(--color-error)]">
          Paciente no encontrado.
        </p>
      </div>
    )
  }

  const onSubmit = async (data: FormData) => {
    try {
      const parsedData: Omit<MedicalHistoryEntry, "id" | "createdAt"> = {
        ...data,
        date: new Date(data.date), // ← convierte string "yyyy-MM-dd" a Date
        createdBy: user?.uid ?? "desconocido",
      }

      await addEntry(parsedData)
      toast.success("Entrada agregada con éxito")
      navigate(`/dashboard/profesional/pacientes/${patientId}`)
    } catch (error) {
      console.error(error)
      toast.error("Error al agregar entrada")
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Nueva entrada de historia clínica
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Fecha de consulta
          </label>
          <input
            type="date"
            {...register("date")}
            className="w-full border border-[var(--color-border-base)] rounded px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text)]"
          />
          {errors.date && (
            <p className="text-sm text-[var(--color-error)] mt-1">
              {errors.date.message}
            </p>
          )}
        </div>

        {/* Campos obligatorios */}
        {[
          { name: "reason", label: "Motivo de la consulta" },
          { name: "symptoms", label: "Síntomas" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              {label}
            </label>
            <input
              type="text"
              {...register(name as keyof FormData)}
              className="w-full border border-[var(--color-border-base)] rounded px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text)]"
            />
            {errors[name as keyof FormData] && (
              <p className="text-sm text-[var(--color-error)] mt-1">
                {errors[name as keyof FormData]?.message}
              </p>
            )}
          </div>
        ))}

        {/* Campos opcionales */}
        {[
          { name: "description", label: "Descripción de la consulta" },
          { name: "note", label: "Nota" },
          { name: "signs", label: "Signos" },
          { name: "diagnosis", label: "Diagnóstico" },
          { name: "treatment", label: "Tratamiento" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              {label}
            </label>
            <textarea
              rows={4}
              {...register(name as keyof FormData)}
              className="w-full border border-[var(--color-border-base)] rounded px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text)]"
            />
          </div>
        ))}

        {/* Botones */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm rounded border border-[var(--color-border-base)] text-[var(--color-text)] hover:bg-[var(--color-hover-surface)]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
