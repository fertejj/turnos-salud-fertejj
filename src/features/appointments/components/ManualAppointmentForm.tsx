// ManualAppointmentForm.tsx (versión estable sin react-input-mask)
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

import { useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { db } from "../../../services/firebase";
import PrimaryButton from "../../../shared/components/PrimaryButton";

const appointmentSchema = z.object({
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

type AppointmentData = z.infer<typeof appointmentSchema>;

export default function ManualAppointmentForm() {
  const { user } = useAuth();
  const [lockedFields, setLockedFields] = useState({ name: false, phone: false });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<AppointmentData>({
    resolver: zodResolver(appointmentSchema),
  });

  const dni = watch("dni");

  const checkIfPatientExists = async () => {
    if (!dni) return;
    const pacientesRef = collection(db, "pacientes");
    const q = query(pacientesRef, where("dni", "==", dni));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const paciente = snapshot.docs[0].data();
      setValue("name", paciente.name);
      setValue("phone", paciente.phone || "");
      setValue("email", paciente.email || "");
      setLockedFields({ name: true, phone: true });
      toast.success("Paciente encontrado");
    } else {
      setValue("name", "");
      setValue("phone", "");
      setValue("email", "");
      setLockedFields({ name: false, phone: false });
      toast("Nuevo paciente. Completá los datos requeridos");
    }
  };

  const onSubmit = async (data: AppointmentData) => {
    if (!user) return;
    const selectedDateTime = new Date(`${data.date}T${data.time}`);
    const now = new Date();
    if (selectedDateTime < now) {
      toast.error("No se puede agendar un turno en el pasado.");
      return;
    }

    try {
      const turnosRef = collection(db, "turnos");
      const qTurno = query(
        turnosRef,
        where("professionalId", "==", user.uid),
        where("date", "==", data.date),
        where("time", "==", data.time)
      );

      const existing = await getDocs(qTurno);
      if (!existing.empty) {
        toast.error("Ya tenés un turno agendado en ese horario.");
        return;
      }

      const pacientesRef = collection(db, "pacientes");
      const qPaciente = query(pacientesRef, where("dni", "==", data.dni));
      const pacientesSnapshot = await getDocs(qPaciente);

      let patientId: string;
      if (pacientesSnapshot.empty) {
        const newPatientRef = doc(pacientesRef);
        await setDoc(newPatientRef, {
          dni: data.dni,
          name: data.name,
          phone: data.phone,
          email: data.email || "",
          createdAt: Timestamp.now(),
        });
        patientId = newPatientRef.id;
      } else {
        patientId = pacientesSnapshot.docs[0].id;
      }

      await addDoc(turnosRef, {
        professionalId: user.uid,
        patientId,
        patientName: data.name,
        dni: data.dni,
        phone: data.phone,
        email: data.email || "",
        date: data.date,
        time: data.time,
        notes: data.notes || "",
        createdAt: Timestamp.now(),
      });

      toast.success("Turno agendado con éxito");
      reset();
      setLockedFields({ name: false, phone: false });
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar el turno");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white border p-6 rounded-lg shadow max-w-xl mx-auto"
    >
      <h2 className="text-xl font-bold text-primary-dark mb-4">
        Agendar turno manual
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">DNI *</label>
        <input
          {...register("dni")}
          onBlur={checkIfPatientExists}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nombre *</label>
        <input
          {...register("name")}
          disabled={lockedFields.name}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Teléfono *</label>
        <input
          {...register("phone")}
          disabled={lockedFields.phone}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email (opcional)</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha *</label>
          <input
            type="date"
            {...register("date")}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hora *</label>
          <input
            type="time"
            {...register("time")}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notas (opcional)</label>
        <textarea
          {...register("notes")}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          rows={3}
        />
      </div>

      <PrimaryButton type="submit">Guardar turno</PrimaryButton>
    </form>
  );
}