import { LucideIcon } from "lucide-react";

export interface NavLinkItem {
    label: string;
    icon: LucideIcon;
    path: string;
    exact?: boolean;
  }
  
  export interface NavSectionItem extends NavLinkItem {
    children?: NavLinkItem[];
  }
  
  export interface NavSection {
    label: string;
    items: NavSectionItem[];
  }
