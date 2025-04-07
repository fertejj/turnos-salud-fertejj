import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import SidebarToggle from "./SidebarToggle";
import ResponsiveSidebar from "./ResponsiveSidebar";

export default function ProfessionalLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-text">
      {/* Botón toggle (visible en tamaños menores a lg) */}
      <SidebarToggle isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Sidebar para desktop (lg en adelante) */}
      <aside
        className={`
          hidden lg:block
          transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? "w-64" : "w-0"} 
          overflow-hidden 
          bg-surface 
          border-r border-border
        `}
      >
        <SideNavBar />
      </aside>

      {/* Sidebar responsivo en mobile/tablet */}
      <ResponsiveSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Contenido principal */}
      <main className="flex-1 p-6 transition-all duration-300 bg-background">
        <Outlet />
      </main>
    </div>
  );
}
