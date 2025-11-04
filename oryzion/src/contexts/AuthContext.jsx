import React, { createContext, useState, useContext, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
    if (usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo));
      } catch {
        setUsuario(usuarioSalvo);
      }
    }
  }, []);

  const logout = () => {
    secureLocalStorage.removeItem("tokenLogin");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
