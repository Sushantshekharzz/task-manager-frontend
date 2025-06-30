import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function ProtectedRoute({ role, element }) {
  const [authorized, setAuthorized] = useState(null); // null = loading

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/auth/verify`, {
          withCredentials: true, // ✅ Send cookies
        });

        // Check if the role matches
        if (response.data.role === role) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        setAuthorized(false); // Invalid or missing token
      }
    };

    verifyToken();
  }, [role]);

  if (authorized === null) {
    return <div>Loading...</div>; // Or show a spinner
  }

  return authorized ? element : <Navigate to="/unauthorized" />;
}
