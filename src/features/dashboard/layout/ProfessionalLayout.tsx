import { Outlet } from "react-router-dom";
import SideNavBar from "./SideNavBar";

export default function ProfessionalLayout() {
  return (
    <div className="flex min-h-screen bg-background text-text">
      <SideNavBar />
      <main className="flex-1 p-6 bg-background">
        <Outlet />
      </main>
    </div>
  );
}
