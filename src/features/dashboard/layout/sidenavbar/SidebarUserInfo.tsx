import type { ProfessionalUser } from "../../types/user";

export function SidebarUserInfo({ user }: { user: ProfessionalUser }) {
  return (
    <div className="flex items-center gap-3 mb-6 ml-3 px-1">
      <img
        src={user.photoURL || "/default-profile.png"}
        alt="Foto de perfil"
        className="w-10 h-10 rounded-full object-cover border"
      />
      <div className="leading-tight">
        <p className="text-sm font-medium text-text">{user.fullName}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}