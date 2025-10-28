<<<<<<< HEAD
import { createContext, useState, useContext } from "react";
import secureLocalStorage from "react-secure-storage";
import React from "react";
=======
import secureLocalStorage from "react-secure-storage";
// import React, { createContext, useState, useContext } from "react";
// import secureLocalStorage from "react-secure-storage";

// // Cria o contexto
// const AuthContext = createContext();

// // Provider: envolve a aplicação e fornece os dados de autenticação
// export const AuthProvider = ({ children }) => {
//   // Estado que guarda o usuário logado
//   const [usuario, setUsuario] = useState(() => {
//     try {
//       const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
//       return usuarioSalvo ? JSON.parse(usuarioSalvo) : undefined;
//     } catch (error) {
//       return undefined;
//     }
//   });

//   return (
//     <AuthContext.Provider value={{ usuario, setUsuario }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook para usar o contexto

// Importa funções do React necessárias para criar e usar contexto
import { createContext, useState, useContext } from "react";
>>>>>>> 1a74642bd43e7c6f72245e3a98169d1e7f942d40

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