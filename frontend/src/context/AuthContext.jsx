import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token") || null;
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (!token) { setUser(null); setLoading(false); return; }
      try {
        const data = await getCurrentUser(token);
        if (data && data.user) setUser(data.user);
      } catch (e) {
        console.error("fetchUser error", e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
