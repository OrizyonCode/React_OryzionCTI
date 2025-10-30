import { createContext, useState, useContext } from "react";
import secureLocalStorage from "react-secure-storage";
import React from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : undefined;
    });

    return (
        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
