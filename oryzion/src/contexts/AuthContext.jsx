import React, { createContext, useState, useContext, useEffect } from 'react';
import secureLocalStorage from "react-secure-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    // Carrega o usuário do storage ao iniciar
    useEffect(() => {
        const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
        if (usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
        }
    }, []);

    // Função para deslogar
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

// Hook personalizado para usar o AuthContext
export const useAuth = () => useContext(AuthContext);
