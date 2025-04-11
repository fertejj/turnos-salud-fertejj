import { navItems } from "../../components/navItems";
import { SidebarItem } from "./SidebarItem";
import { SidebarUserInfo } from "./SidebarUserInfo";
import { SidebarFooter } from "./SidebarFooter";
import { useLocation } from "react-router-dom";
import { useSidebar } from "../../hooks/useSidebar";
import type { ProfessionalUser } from "../../types/user";
import type { NavSection } from "../../types/nav";

interface SideNavBarProps {
  userData: ProfessionalUser | null;
  onNavigate?: () => void; // ✅ nueva prop opcional
}

export default function SideNavBar({ userData, onNavigate }: SideNavBarProps) {
  const { expanded, toggle } = useSidebar();
  const { pathname } = useLocation();

  return (
    <aside className="w-full h-full bg-background flex flex-col justify-between shadow-lg">
      <div className="pt-6 px-2">
        {userData && <SidebarUserInfo user={userData} />}

        <nav className="flex flex-col gap-6 text-sm mt-4">
          {navItems.map((section: NavSection) => (
            <div key={section.label} className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold text-muted-foreground px-4 tracking-wider uppercase">
                {section.label}
              </span>

              {section.items.map((item) => (
                <SidebarItem
                  key={item.label}
                  item={item}
                  expanded={expanded}
                  toggle={toggle}
                  pathname={pathname}
                  onNavigate={onNavigate} // ✅ se pasa acá
                />
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-border-base">
        <SidebarFooter />
      </div>
    </aside>
  );
}
