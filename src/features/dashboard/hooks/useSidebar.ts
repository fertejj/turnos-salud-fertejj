import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { navItems } from "../components/navItems";

export function useSidebar() {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const updatedExpanded: Record<string, boolean> = {};

    for (const section of navItems) {
      for (const item of section.items) {
        if ("children" in item && Array.isArray(item.children)) {
          const isActive = item.children.some((child) =>
            pathname.startsWith(child.path)
          );
          updatedExpanded[item.path] = isActive;
        }
      }
    }

    setExpanded((prev) => ({ ...prev, ...updatedExpanded }));
  }, [pathname]);

  const toggle = (path: string) =>
    setExpanded((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));

  return { expanded, toggle };
}
