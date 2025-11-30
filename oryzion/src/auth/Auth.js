import React, { createContext, useState, useEffect, useContext } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodificado = jwtDecode(token);
        setUsuario({
          idUsuario: decodificado.jti,
          token: token,
          imagem: decodificado.imagem,
          tipoUsuario: decodificado["Tipo do usuário"] || decodificado.tipoUsuario,
          nome: decodificado.nome,
          email: decodificado.email || decodificado.Email
        });
      } catch (err) {
        console.error("Token inválido:", err);
        setUsuario(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodificado = jwtDecode(token);
    setUsuario({
      idUsuario: decodificado.jti,
      token: token,
      imagem: decodificado.imagem,
      tipoUsuario: decodificado["Tipo do usuário"] || decodificado.tipoUsuario,
      nome: decodificado.nome,
      email: decodificado.email || decodificado.Email
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto facilmente
export const useAuth = () => useContext(AuthContext);
