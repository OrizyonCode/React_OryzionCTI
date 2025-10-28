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

// Cria o contexto de autenticação, que vai permitir compartilhar dados entre componentes
const AuthContext = createContext();

// Esse componente vai envolver a aplicação (ou parte dela) e fornecer os dados de autenticação para os filhos
//Provider = prover/dar
export const AuthProvider = ({ children }) => {
    // Cria um estado que guarda os dados do usuário logado
    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : undefined
    });

    return (
        // O AuthContext.Provider permite que qualquer componente dentro dele acesse o `usuario` e `setUsuario`
        //Faz com que qualquer componente que esteja dentro de <AuthProvider> consiga acessar o valor { usuario, setUsuario } usando o hook useAuth().
       
       <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

// Esse hook personalizado facilita o acesso ao contexto dentro de qualquer componente
//USAR!!!
export const useAuth = () => useContext(AuthContext);