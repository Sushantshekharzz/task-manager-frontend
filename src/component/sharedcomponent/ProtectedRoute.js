// src/component/sharedcomponent/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ role, element }) {
const roleLoc  = localStorage.getItem("role")
const user  =  localStorage.getItem("name")

  // if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />;
  if (role && roleLoc !== role) return <Navigate to="/unauthorized" />;

  return element;
}
