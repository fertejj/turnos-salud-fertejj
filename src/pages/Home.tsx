import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../hooks/useUserRole';
import FullPageSpinner from '../components/ui/FullPageSpinner';

export default function Home() {
  const { role, loading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    switch (role) {
      case 'paciente':
        navigate('/dashboard/paciente');
        break;
      case 'profesional':
        navigate('/dashboard/profesional');
        break;
      case 'admin':
        navigate('/dashboard/admin');
        break;
      default:
        navigate('/login');
    }
  }, [role, loading, navigate]);

  return <FullPageSpinner text="Redirigiendo al panel..." />;
}
