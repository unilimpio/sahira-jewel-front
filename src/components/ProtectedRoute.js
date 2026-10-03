import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // Si no hay usuario en el contexto, redirige inmediatamente al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, renderiza los componentes hijos
  return <Outlet />;
};

export default ProtectedRoute;
