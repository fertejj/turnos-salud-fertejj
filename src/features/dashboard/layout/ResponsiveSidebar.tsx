import SideNavBar from "./SideNavBar";
import { X } from "react-feather";

interface ResponsiveSidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ResponsiveSidebar({ isOpen, setIsOpen }: ResponsiveSidebarProps) {
  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-40 bg-black/50"
      onClick={() => setIsOpen(false)}
    >
      <aside
        className="fixed top-0 left-0 w-64 h-full bg-surface z-50 shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado con botón cerrar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <h1 className="text-xl font-bold text-primary tracking-tight">MiConsulta</h1>
            <p className="text-xs text-muted-foreground">Panel profesional</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido del menú */}
        <div className="flex-1 overflow-y-auto px-2 mt-2">
          <SideNavBar hideHeader />
        </div>
      </aside>
    </div>
  );
}
