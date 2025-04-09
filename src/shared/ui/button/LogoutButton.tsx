import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { getAuthInstance } from "../../../services/firebase/auth";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = await getAuthInstance(); // ✅ auth dinámico
    await signOut(auth);
    navigate("/login");
  };

  return <PrimaryButton onClick={handleLogout}>Cerrar sesión</PrimaryButton>;
}
