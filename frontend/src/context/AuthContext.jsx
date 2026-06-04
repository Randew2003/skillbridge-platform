import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../features/auth/api/authApi";
import {
  clearAuthStorage,
  getToken,
  getUser,
  saveToken,
  saveUser,
} from "../utils/tokenUtils";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getToken()));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Boolean(token));
  }, [token]);

  const register = async (formData) => {
    setLoading(true);

    try {
      const data = await registerUser(formData);

      saveToken(data.token);

      const loggedUser = {
        id: data.userId,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      };

      saveUser(loggedUser);

      setToken(data.token);
      setUser(loggedUser);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    setLoading(true);

    try {
      const data = await loginUser(formData);

      saveToken(data.token);

      const loggedUser = {
        id: data.userId,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      };

      saveUser(loggedUser);

      setToken(data.token);
      setUser(loggedUser);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthStorage();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    token,
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};