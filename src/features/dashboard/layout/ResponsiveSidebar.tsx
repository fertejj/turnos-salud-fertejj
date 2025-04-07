import SideNavBar from "./SideNavBar";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResponsiveSidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ResponsiveSidebar({ isOpen, setIsOpen }: ResponsiveSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.aside
            key="sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 left-0 w-64 h-full bg-surface z-50 shadow-lg flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header + botón cerrar */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-primary">MiConsulta</h2>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 rounded-md hover:bg-accent transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido del menú */}
            <div className="flex-1 overflow-y-auto">
              <SideNavBar hideHeader />
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
