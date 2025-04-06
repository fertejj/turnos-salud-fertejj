import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../../services/firebase";
import AuthLayout from "../../../shared/layout/AuthLayout";
import Input from "../../../shared/components/Input";
import PrimaryButton from "../../../shared/components/PrimaryButton";
import SecondaryButton from "../../../shared/components/SecondaryButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Error con Google:", error);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full p-6 bg-surface text-text-main shadow-md rounded border border-border-base">
        <h1 className="text-2xl font-bold mb-6 text-primary-dark">Iniciar Sesión</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          <PrimaryButton type="submit">Ingresar</PrimaryButton>
        </form>

        <div className="my-4 text-center text-soft">— o —</div>

        <SecondaryButton onClick={handleGoogleSignIn} icon={<FaGoogle className="text-xl" />}>
          Ingresar con Google
        </SecondaryButton>
      </div>
    </AuthLayout>
  );
}
