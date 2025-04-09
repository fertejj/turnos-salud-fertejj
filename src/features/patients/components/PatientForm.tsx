import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Patient } from "../types";
import Input from "../../../shared/components/ui/Input";

const schema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  lastName: z.string().min(2, "El apellido es requerido"),
  dni: z.string().min(7, "El DNI debe tener al menos 7 dígitos").max(10),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  gender: z.enum(["Masculino", "Femenino", "Otro"]),
  insurance: z.string().optional(),
});

type FormData = Omit<Patient, "id" | "createdAt" | "professionalId">;

export interface PatientFormProps {
  initialData?: Partial<Patient>;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

export default function PatientForm({
  initialData,
  onSubmit,
  onCancel,
}: PatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      lastName: initialData?.lastName || "",
      dni: initialData?.dni || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      birthDate: initialData?.birthDate || "",
      gender: initialData?.gender || "Otro",
      insurance: initialData?.insurance || "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-xl shadow-md p-6 space-y-6 max-w-3xl mx-auto"
    >
      <h2 className="text-xl font-semibold text-primary">
        Información del paciente
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1 block">
            Nombre
          </label>
          <Input
            {...register("name")}
            hasError={!!errors.name}
            errorMessage={errors.name?.message}
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1 block">
            Apellido
          </label>
          <Input
            {...register("lastName")}
            hasError={!!errors.lastName}
            errorMessage={errors.lastName?.message}
          />
        </div>

        {/* DNI */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1 block">
            DNI
          </label>
          <Input
            {...register("dni")}
            hasError={!!errors.dni}
            errorMessage={errors.dni?.message}
          />
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1 block">
            Fecha de nacimiento
          </label>
          <Input
            type="date"
            {...register("birthDate")}
            hasError={!!errors.birthDate}
            errorMessage={errors.birthDate?.message}
          />
        </div>

        {/* Género */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1 block">
            Género
          </label>
          <select
            {...register("gender")}
            className="w-full bg-[var(--color-surface)] border-[var(--color-border-base)] text-[var(--color-text)] placeholder-[var(--color-text-soft)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] text-sm"
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Cobertura médica */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1 block">
            Cobertura médica
          </label>
          <Input
            {...register("insurance")}
            hasError={!!errors.insurance}
            errorMessage={errors.insurance?.message}
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1 block">
            Teléfono
          </label>
          <Input
            {...register("phone")}
            hasError={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1 block">
            Email
          </label>
          <Input
            type="email"
            {...register("email")}
            hasError={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-[var(--color-hover-surface)] text-[var(--color-text)] px-4 py-2 rounded hover:bg-[var(--color-border-base)]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[var(--color-primary-dark)]"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
