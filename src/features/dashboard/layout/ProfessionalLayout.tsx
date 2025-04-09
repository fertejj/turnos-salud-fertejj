import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarToggle from "./SidebarToggle";
import ResponsiveSidebar from "./ResponsiveSidebar";
import { getAuthInstance } from "../../../services/firebase/auth";
import { getUserByUID } from "../services/userService";
import type { ProfessionalUser } from "../types/user";
import FullPageSpinner from "../../../shared/components/ui/FullPageSpinner";

export default function ProfessionalLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<ProfessionalUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  

  useEffect(() => {
    const initUser = async () => {
      const auth = await getAuthInstance();
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const data = await getUserByUID(user.uid);
            setUserData(data);
          } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
          } finally {
            setLoadingUser(false);
          }
        } else {
          setLoadingUser(false);
        }
      });

      return () => unsubscribe();
    };

    initUser();
  }, []);

  if (loadingUser) return <FullPageSpinner />;

  return (
    <div className="flex min-h-screen bg-background text-text">
      {/* Botón toggle para mobile */}
      <SidebarToggle isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Sidebar fijo en desktop */}

      {/* Sidebar responsivo animado en mobile */}
      <ResponsiveSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} userData={userData} />

      {/* Contenido principal */}
      <main className="flex-1 p-6 transition-all duration-300 bg-background">
        <Outlet context={{ userData }} />
      </main>
    </div>
  );
}
