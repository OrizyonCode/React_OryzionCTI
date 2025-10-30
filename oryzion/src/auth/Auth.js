import { jwtDecode } from "jwt-decode";

export const userDecodeToken = (token) => {
  try {
    const decodificado = jwtDecode(token);
    console.log("Token decodificado:", decodificado); // 👀 para conferir o que vem

    if (!decodificado.jti) {
      throw new Error("Token inválido: falta o campo jti (ID do usuário)");
    }

    return {
      idUsuario: decodificado.jti,
      token: token,
      Setor: decodificado["Setor do usuario"] || decodificado.setor || "suporte",

      emailUsuario: decodificado.email || "",
      // 👇 aqui está o ajuste importante
      nomeUsuario: decodificado.Nome || decodificado.nome || "Usuário",
    };
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    throw new Error("Falha ao decodificar o token");
  }
};