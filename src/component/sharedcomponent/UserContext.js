import { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // not true initially

  const fetchUser = async () => {
    try {
      setLoading(true);
      console.log("process.env.REACT_APP_URL",process.env.REACT_APP_URL)
      const res = await axios.get(`${process.env.REACT_APP_URL}/auth/verify`, {
        withCredentials: true,
      });
      console.log("rrrringgggggggggggggggggggg",res.data)
      setUser(res.data);
    } catch (err) {
        console.log("rrtt",err)
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
   useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
