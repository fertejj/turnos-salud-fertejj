import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase';
import PrimaryButton from './PrimaryButton';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <PrimaryButton onClick={handleLogout}>
      Cerrar sesión
    </PrimaryButton>
  );
}
