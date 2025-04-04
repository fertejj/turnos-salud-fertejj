import LogoutButton from '../../components/ui/LogoutButton';

export default function PacienteDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-amber-600 mb-4">Panel del Paciente</h1>
      <p className="mb-6 text-gray-700">Bienvenido al sistema de turnos para pacientes.</p>
      <LogoutButton />
    </div>
  );
}
