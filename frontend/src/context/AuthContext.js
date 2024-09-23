// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  });

  // Update localStorage whenever auth state changes
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("token", auth.token);
    } else {
      localStorage.removeItem("token");
    }

    if (auth.user) {
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [auth]);

  // Function to handle login
  const login = (token, user) => {
    setAuth({ token, user });
  };

  // Function to handle logout
  const logout = () => {
    setAuth({ token: null, user: null });
  };

  // Function to register a new user
  const register = async (username, password) => {
    try {
      const res = await api.post("/auth/register", { username, password });
      login(res.data.token, { username });
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // Function to authenticate a user (login)
  const authenticate = async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data.token, { username });
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, register, authenticate }}
    >
      {children}
    </AuthContext.Provider>
  );
};
