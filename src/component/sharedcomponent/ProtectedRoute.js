import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ role, element }) {
  const { user, loading } = useContext(AuthContext);
  console.log("eee",user)
  console.log('role',role)

  // Still loading the refreshToken → Prevent errors
  if (loading) return <div>Loading...</div>;

  // Not logged in
  if (!user) return <Navigate to="/" />;

  // Role mismatch
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;

  return element;
}
