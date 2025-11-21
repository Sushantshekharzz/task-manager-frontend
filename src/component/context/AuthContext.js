import { createContext, useState, useEffect } from "react";
import { refreshToken } from "../util/api";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // ✅ FIX


useEffect(() => {
  const protectedRoutes = ["/task", "/user", "/userassigntask"];
  const currentPath = window.location.pathname.toLowerCase();

  if (!protectedRoutes.includes(currentPath)) {
    setLoading(false);
    return;
  }

  const loadUser = async () => {
    try {
      const res = await refreshToken(); // should return accessToken + user
      window.accessToken = res.data.accessToken; // store in memory
      setUser(res.data.user);
    } catch (err) {
      window.accessToken = null;
      setUser(null);
      navigate("/"); 
      console.error("User not authenticated", err);
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, []);


  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
