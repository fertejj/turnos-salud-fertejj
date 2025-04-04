import LogoutButton from '../../components/ui/LogoutButton';

export default function ProfesionalDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-amber-600 mb-4">Panel del Profesional</h1>
      <p className="mb-6 text-gray-700">Aquí podés gestionar tu agenda y los turnos de tus pacientes.</p>
      <LogoutButton />
    </div>
  );
}
