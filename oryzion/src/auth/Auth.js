import { jwtDecode } from "jwt-decode";

export const userDecodeToken = (token) => {
    const decodificado = jwtDecode(token);

    return {
        idUsuario: decodificado.jti,
        token: token,
<<<<<<< HEAD
        tipoUsuario: decodificado,
        emailUsuario: decodificado.email
        
=======
>>>>>>> 33db693d76640c1511b9bd36e285d508333a9b92
    }
}