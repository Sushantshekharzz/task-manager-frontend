import { createContext, useState, useEffect } from "react";
import { refreshToken } from "../util/api";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // ✅ FIX


useEffect(() => {
    // List of protected routes
    const protectedRoutes = ["/task", "/user", "/userassigntask", ""];
    const currentPath = window.location.pathname.toLowerCase();

    if (!protectedRoutes.includes(currentPath)) {
      // Public route → skip refreshToken
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const res = await refreshToken();
        console.log("rrr",res)
        setUser(res.data.user);
        console.log("rrrr",res)
      } catch (err) {
        setUser(null);
        navigate("/"); // immediately redirect if not authenticated

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
