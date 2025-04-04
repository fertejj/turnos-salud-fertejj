import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/ui/Spinner';

type Props = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner/>;

  return user ? children : <Navigate to="/login" replace />;
}
