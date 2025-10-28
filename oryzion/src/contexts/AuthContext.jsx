import React, { createContext, useState, useContext, Children } from "react";
import secureLocalStorage from "react-secure-storage";

// Cria o contexto
const AuthContext = createContext();

// Provider: envolve a aplicação e fornece os dados de autenticação
export const AuthProvider = ({ children }) => {
  // Estado que guarda o usuário logado
  const [usuario, setUsuario] = useState(() => {
    try {
      const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
      return usuarioSalvo ? JSON.parse(usuarioSalvo) : undefined;
    } catch (error) {
      console.error("Erro ao recuperar token:", error);
      return undefined;
    }
  });

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);
