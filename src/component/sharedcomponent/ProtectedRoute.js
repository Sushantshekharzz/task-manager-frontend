// src/component/sharedcomponent/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function ProtectedRoute({ role, element }) {
  const { user, loading } = useContext(UserContext);


  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/signin" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;

  return element;
}
