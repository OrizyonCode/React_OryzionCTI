import React, { Children } from 'react'
import secureLocalStorage from "react-secure-storage";
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(() => {
        const [usuario, setUsuario] = useState(() => {
         const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
  return usuarioSalvo || undefined;
});

        })

    return (

        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

//Esse hook personalizado facilita o acesso ao contexto dentro de qualquer componente 
export const useAuth = () => useContext(AuthContext);
