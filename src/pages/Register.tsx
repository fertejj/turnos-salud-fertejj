import { useState } from "react";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import AuthLayout from "../layout/AuthLayout";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "profesional",
      });

      navigate("/");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "profesional",
      });

      navigate("/");
    } catch (error) {
      console.error("Error con Google:", error);
    }
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
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PrimaryButton type="submit">Registrarme</PrimaryButton>
        </form>

        <div className="my-4 text-center text-soft">— o —</div>

        <SecondaryButton onClick={handleGoogleSignIn}>
          Registrarme con Google
        </SecondaryButton>
      </div>
    </AuthLayout>
  );
}
