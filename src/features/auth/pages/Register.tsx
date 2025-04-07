import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { auth, db } from "../../../services/firebase";
import AuthLayout from "../../../shared/layout/AuthLayout";
import Input from "../../../shared/components/Input";
import PrimaryButton from "../../../shared/components/PrimaryButton";
import SecondaryButton from "../../../shared/components/SecondaryButton";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !specialty) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "profesional",
        specialty: specialty,
      });

      navigate("/");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("El correo ya está en uso.");
          break;
        case "auth/invalid-email":
          setError("Correo electrónico inválido.");
          break;
        case "auth/weak-password":
          setError("La contraseña debe tener al menos 6 caracteres.");
          break;
        default:
          setError("Ocurrió un error al registrarse.");
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "profesional",
        specialty: "sin_especificar", // en caso de registro por Google
      });

      navigate("/");
    } catch (error) {
      setError("Error al registrarse con Google.");
      console.error("Google SignIn error:", error);
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full p-6 bg-surface text-text-main shadow-md rounded border border-border-base">
        <h1 className="text-2xl font-bold mb-6 text-primary-dark">Crear Cuenta Profesional</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Correo electrónico"
            hasError={!!error && error.toLowerCase().includes("correo")}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Contraseña"
            hasError={!!error && error.toLowerCase().includes("contraseña")}
          />
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            aria-label="Especialidad"
            className="p-2 border border-border-base rounded bg-surface text-text-main focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            <option value="">Seleccioná tu especialidad</option>
            <option value="odontologo">Odontólogo/a</option>
            <option value="psicologo">Psicólogo/a</option>
            <option value="nutricionista">Nutricionista</option>
            <option value="medico_clinico">Médico/a Clínico/a</option>
            <option value="kinesiologo">Kinesiólogo/a</option>
            <option value="fisioterapeuta">Fisioterapeuta</option>
          </select>

          {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarme"}
          </PrimaryButton>
        </form>

        <div className="my-4 text-center text-soft">— o —</div>

        <SecondaryButton
          onClick={handleGoogleSignIn}
          icon={<FaGoogle className="text-xl" />}
          type="button"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Registrarme con Google"}
        </SecondaryButton>
      </div>
    </AuthLayout>
  );
}
