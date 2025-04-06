import LogoutButton from "../../../shared/components/LogoutButton";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-amber-600 mb-4">Panel del Administrador</h1>
      <p className="mb-6 text-gray-700">Accedé al control completo del sistema.</p>
      <LogoutButton />
    </div>
  );
}
