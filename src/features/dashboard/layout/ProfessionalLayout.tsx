// dashboard/layout/ProfessionalLayout.tsx
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};

export default function ProfessionalLayout({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onToggleMenu={() => setOpen((prev) => !prev)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <main className="p-6 flex-1 w-full max-w-5xl mx-auto">
        {children || <Outlet />}
      </main>
    </div>
  );
}
