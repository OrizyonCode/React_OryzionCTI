import { jwtDecode } from "jwt-decode";

export const userDecodeToken = (token) => {
    const decodificado = jwtDecode(token);

    return {
        idUsuario: decodificado.jti,
        token: token,
<<<<<<< HEAD
        
=======
        tipoUsuario: decodificado["Tipo do usuário"]
>>>>>>> 82158f803b64dd730f42c8c1c495031542708b40
    }
}