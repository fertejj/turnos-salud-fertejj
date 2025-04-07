import { auth, db } from "../../../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../shared/components/PrimaryButton";

type Props = {
  formData: any;
};

export default function Step6Confirmation({ formData }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFinish = async () => {
    setLoading(true);
    setError("");

    const email = formData.email?.trim();
    const password = formData.password?.trim();

    if (!email || !password) {
      setError("Faltan datos de acceso.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        role: "profesional",
        name: formData.name,
        dni: formData.dni,
        birthdate: formData.birthdate,
        gender: formData.gender,
        specialty: formData.specialty,
        license: formData.license,
        experience: formData.experience,
        university: formData.university,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        appointmentDuration: formData.appointmentDuration,
        availabilityNote: formData.availabilityNote || "",
        createdAt: new Date(),
      });

      navigate("/"); // Redireccionar al dashboard
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Este correo ya está en uso.");
          break;
        case "auth/invalid-email":
          setError("Correo electrónico inválido.");
          break;
        case "auth/weak-password":
          setError("La contraseña debe tener al menos 6 caracteres.");
          break;
        default:
          setError("Ocurrió un error al finalizar el registro.");
          console.error("Firebase error:", err.code, err.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Resumen</h2>
      <ul className="text-sm list-disc pl-5 space-y-1 text-text-soft">
        <li><strong>Email:</strong> {formData.email}</li>
        <li><strong>Nombre:</strong> {formData.name}</li>
        <li><strong>DNI:</strong> {formData.dni}</li>
        <li><strong>Especialidad:</strong> {formData.specialty}</li>
        <li><strong>Matrícula:</strong> {formData.license}</li>
        <li><strong>Duración de turnos:</strong> {formData.appointmentDuration} min</li>
      </ul>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <PrimaryButton onClick={handleFinish} disabled={loading}>
        {loading ? "Registrando..." : "Finalizar registro"}
      </PrimaryButton>
    </div>
  );
}
