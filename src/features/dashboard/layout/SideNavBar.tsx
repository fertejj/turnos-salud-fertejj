import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../../shared/utils/cn";
import { navItems } from "../components/navItems";
import { NavLinkItem, NavSectionItem } from "../types/nav";
import type { ProfessionalUser } from "../types/user";

interface SideNavBarProps {
  hideHeader?: boolean;
  userData: ProfessionalUser | null;
}

export default function SideNavBar({
  hideHeader = false,
  userData,
}: SideNavBarProps) {

  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newExpanded: Record<string, boolean> = {};
    navItems.forEach((section) =>
      section.items.forEach((item) => {
        if ("children" in item && item.children) {
          const isMatch = item.children.some((child) =>
            location.pathname.startsWith(child.path)
          );
          newExpanded[item.path] = isMatch;
        }
      })
    );
    setExpanded((prev) => ({ ...prev, ...newExpanded }));
  }, [location.pathname]);

  const handleLogout = async () => {
    const { getAuthInstance } = await import("../../../services/firebase/auth");
    const auth = await getAuthInstance();
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const ChevronAnimated = ({ open }: { open: boolean }) => (
    <motion.div
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center justify-center"
    >
      <ChevronRight size={16} />
    </motion.div>
  );
  console.log("Imagen de perfil:", userData)
  return (
    <aside className="w-full h-full bg-surface flex flex-col justify-between shadow-sm">
      <div className="p-5">
        {!hideHeader && (
          <div className="mb-6">
            <h1 className="text-xl font-bold text-primary tracking-tight">
              MiConsulta
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Panel profesional
            </p>
          </div>
        )}

        {userData && (
          <div className="flex items-center gap-3 mb-6 px-1">
            <img
              src={userData.photoURL || "/default-profile.png"}
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="leading-tight">
              <p className="text-sm font-medium text-text">
                {userData.name}
              </p>
              <p className="text-xs text-muted-foreground">{userData.email}</p>
            </div>
          </div>
        )}

        <nav className="flex flex-col gap-6 text-sm">
          {navItems.map((section) => (
            <div key={section.label} className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold text-muted-foreground px-4 tracking-wider uppercase">
                {section.label}
              </span>

              {section.items.map((item: NavSectionItem) =>
                item.children ? (
                  <div key={item.label} className="flex flex-col">
                    <button
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [item.path]: !prev[item.path],
                        }))
                      }
                      className={cn(
                        "relative flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-medium transition-all group",
                        location.pathname.startsWith(item.path)
                          ? "bg-primary text-white shadow"
                          : "hover:bg-muted/60 hover:text-primary text-text"
                      )}
                      aria-expanded={expanded[item.path]}
                    >
                      {location.pathname.startsWith(item.path) && (
                        <motion.span
                          layoutId="active-indicator"
                          className="absolute top-1 bottom-1 left-0 w-[4px] bg-primary rounded-r-full z-10"
                        />
                      )}
                      <span className="flex items-center gap-3">
                        <item.icon size={18} />
                        {item.label}
                      </span>
                      <ChevronAnimated open={expanded[item.path]} />
                    </button>

                    <AnimatePresence initial={false}>
                      {expanded[item.path] && (
                        <motion.ul
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -10, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden flex flex-col gap-1 pl-8 mt-1"
                        >
                          {item.children.map((child: NavLinkItem) => (
                            <motion.li key={child.label} layout>
                              <NavLink
                                to={child.path}
                                end={child.exact}
                                className={({ isActive }) =>
                                  cn(
                                    "relative flex items-center gap-2 px-3 py-1.5 rounded-md transition text-sm group",
                                    isActive
                                      ? "bg-primary/90 text-white font-semibold shadow"
                                      : "hover:bg-muted/50 hover:text-primary text-muted-foreground"
                                  )
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    {isActive && (
                                      <motion.span
                                        layoutId="active-indicator"
                                        className="absolute top-1 bottom-1 left-0 w-[4px] bg-primary rounded-r-full z-10"
                                      />
                                    )}
                                    {child.label}
                                  </>
                                )}
                              </NavLink>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      cn(
                        "relative flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-colors group",
                        isActive
                          ? "bg-primary text-white shadow"
                          : "hover:bg-muted/60 hover:text-primary text-text"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="active-indicator"
                            className="absolute top-1 bottom-1 left-0 w-[4px] bg-primary rounded-r-full z-10"
                          />
                        )}
                        <item.icon size={18} />
                        {item.label}
                      </>
                    )}
                  </NavLink>
                )
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
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
    </aside>
  );
}
