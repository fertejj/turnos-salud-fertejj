import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMedicalHistory } from "../hooks/useMedicalHistory";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const schema = z.object({
  date: z.date({ required_error: "La fecha es obligatoria" }),
  reason: z.string().min(1, "El motivo es obligatorio"),
  symptoms: z.string().min(1, "Los síntomas son obligatorios"),
  description: z.string().optional(),
  note: z.string().optional(),
  signs: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditMedicalHistoryPage() {
  const { patientId, entryId } = useParams();
  const navigate = useNavigate();

  const { getEntryById, updateEntry } = useMedicalHistory(patientId!);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const loadEntry = async () => {
      if (!entryId) return;
      const entry = await getEntryById(entryId);
      if (entry) {
        setValue("date", entry.date);
        setValue("reason", entry.reason);
        setValue("symptoms", entry.symptoms);
        setValue("description", entry.description || "");
        setValue("note", entry.note || "");
        setValue("signs", entry.signs || "");
        setValue("diagnosis", entry.diagnosis || "");
        setValue("treatment", entry.treatment || "");
      } else {
        toast.error("No se encontró la entrada");
        navigate(`/dashboard/profesional/pacientes/${patientId}`);
      }
    };
    loadEntry();
  }, [entryId, getEntryById, navigate, patientId, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateEntry(entryId!, data);
      toast.success("Entrada actualizada con éxito");
      navigate(`/dashboard/profesional/pacientes/${patientId}`);
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar entrada");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Editar entrada de historia clínica
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
        {["description", "note", "signs", "diagnosis", "treatment"].map(
          (name) => (
            <div key={name}>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
              <textarea
                rows={4}
                {...register(name as keyof FormData)}
                className="w-full border border-[var(--color-border-base)] rounded px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text)]"
              />
            </div>
          )
        )}

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
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}
