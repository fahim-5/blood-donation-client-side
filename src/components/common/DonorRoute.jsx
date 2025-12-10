import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';
import { ROLE } from '../../utils/constants';

const DonorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if user is blocked
  if (user?.status === 'blocked') {
    return <Navigate to="/blocked" state={{ from: location }} replace />;
  }

  // Check if user is authenticated and has donor role
  if (user && user.role === ROLE.DONOR) {
    return children;
  }

  // If user is authenticated but not donor
  if (user) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // If not authenticated, redirect to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default DonorRoute;