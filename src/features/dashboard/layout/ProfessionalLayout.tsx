import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import SidebarToggle from "./SidebarToggle";
import ResponsiveSidebar from "./ResponsiveSidebar";

export default function ProfessionalLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-text">
      {/* Botón toggle para mobile */}
      <SidebarToggle isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Sidebar fijo en desktop */}
      <aside className="hidden lg:flex w-64 bg-surface border-r border-border flex-col">
        <SideNavBar />
      </aside>

      {/* Sidebar responsivo animado en mobile */}
      <ResponsiveSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Contenido principal */}
      <main className="flex-1 p-6 transition-all duration-300 bg-background">
        <Outlet />
      </main>
    </div>
  );
}
