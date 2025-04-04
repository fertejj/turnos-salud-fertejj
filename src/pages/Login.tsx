import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import Input from "../components/ui/Input";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import AuthLayout from "../components/layout/AuthLayout";
import { FaGoogle } from "react-icons/fa";

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
      <div className="max-w-md w-full p-6 bg-white text-gray-800 shadow-md rounded border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-amber-600">Iniciar Sesión</h1>
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

        <div className="my-4 text-center text-gray-400">— o —</div>

        <SecondaryButton onClick={handleGoogleSignIn} icon={<FaGoogle className="text-lg" />}>
          Ingresar con Google
        </SecondaryButton>
      </div>
    </AuthLayout>
  );
}
