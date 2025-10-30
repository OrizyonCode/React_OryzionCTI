import { jwtDecode } from "jwt-decode";

export const userDecodeToken = (token) => {
    try {
        const decodificado = jwtDecode(token);
        
        // Verificação básica da estrutura do token
        if (!decodificado.jti) {
            throw new Error("Token inválido: falta o campo jti (ID do usuário)");
        }

        return {
            idUsuario: decodificado.jti,
            token: token,
            Setor: decodificado["Setor do usuario"] || decodificado.setor || "suporte", // Fallback para 'aluno' se não encontrar
            emailUsuario: decodificado.email || decodificado.sub // Adicionado fallback para sub que é padrão JWT para email
        };
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        throw new Error("Falha ao decodificar o token");
    }
};