import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { NavLinkItem, NavSectionItem } from "../../types/nav";
import { cn } from "../../../../shared/utils/cn";

type Props = {
  item: NavSectionItem;
  expanded: Record<string, boolean>;
  toggle: (path: string) => void;
  pathname: string;
  onNavigate?: () => void; // ✅ Prop opcional
};

export function SidebarItem({ item, expanded, toggle, pathname, onNavigate }: Props) {
  const ChevronAnimated = ({ open }: { open: boolean }) => (
    <motion.div
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center justify-center"
    >
      <ChevronRight size={16} />
    </motion.div>
  );

  if (item.children) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => toggle(item.path)}
          className={cn(
            "relative flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-medium transition-all group",
            pathname.startsWith(item.path)
              ? "bg-primary text-white shadow"
              : "hover:bg-muted/60 hover:text-primary text-text"
          )}
          aria-expanded={expanded[item.path]}
        >
          {pathname.startsWith(item.path) && (
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
                    onClick={onNavigate} // ✅ Cierra sidebar
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
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.exact}
      onClick={onNavigate} // ✅ Cierra sidebar
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
  );
}
