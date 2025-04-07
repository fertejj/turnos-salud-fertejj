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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("Usuario no encontrado.");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta.");
          break;
        default:
          setError("Ocurrió un error al iniciar sesión.");
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      setError("Error al iniciar sesión con Google.");
      console.error("Google SignIn error:", error);
    }
    setLoading(false);
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
            aria-label="Correo electrónico"
            hasError={!!error && (!email || error.toLowerCase().includes("usuario"))}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Contraseña"
            hasError={!!error && (!password || error.toLowerCase().includes("contraseña"))}
          />
          {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}
          <div className="text-right text-sm">
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/recuperar")}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </PrimaryButton>
        </form>

        {/* <div className="my-4 text-center text-soft">— o —</div> */}

        {/* <SecondaryButton
          onClick={handleGoogleSignIn}
          icon={<FaGoogle className="text-xl" />}
          type="button"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Ingresar con Google"}
        </SecondaryButton> */}
      </div>
    </AuthLayout>
  );
}
