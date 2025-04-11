import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAuthInstance } from "../../../../services/firebase/auth"; // ✅ IMPORT ESTÁTICO

export function SidebarFooter() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = await getAuthInstance();
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="p-4 border-t border-border-base">
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition p-2 rounded-md w-full"
      >
        <LogOut size={16} />
        Cerrar sesión
      </button>
      <p className="text-[11px] text-muted-foreground mt-3 text-center">
        © 2025 MiConsulta
      </p>
    </div>
  );
}
