// aqui temos os imports
import './Login.css'
import Botao from '../../components/botao/Botao'
import api from '../../Services/services'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"
import { userDecodeToken } from "../../auth/Auth";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";


const Login = () => {

    //PARTE DO ALERTA
    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }
    //FIM DA PARTE DO ALERTA

    // aqui eu vou começar a fazer o funcionamento do login

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const { setUsuario } = useAuth();

    async function realizarAutenticacao(e) {

        console.log("Executando login...");

        e.preventDefault();

        const usuario = {
            email: email,
            senha: senha
        }

        if (senha.trim() !== "" && email.trim() !== "") {

            try {
                const resposta = await api.post("Login", usuario); // chama a API primeiro

                const token = resposta.data.token; // só aqui você usa 'resposta'

                if (token) {
                    const tokenDecodificado = userDecodeToken(token);
                    console.log("Token decodificado:", tokenDecodificado);

                    setUsuario(tokenDecodificado);
                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

                    if (tokenDecodificado.tipoUsuario != "6c7ae75f-84fd-4d24-b539-af705a7a3057") {
                        navigate("/chat");
                    } else {
                        navigate("/");
                    }
                }

            } catch (error) {
                console.log(error);
                alertar("error", "EMAIL ou senha inválidos, para dúvidas entre em contato com o suporte. 🤖");
            }


        } else {
            alertar("warning", "Preencha os campos vazios para realizar o login 🤖")

        }
    }

    return (
        <>
            <div className="todoOLoginCliente">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="borda_para_os_simbolos">


                            <form action="" onSubmit={realizarAutenticacao}>
                                <div className="titulo_4">
                                    <h1>Login</h1>
                                </div>
                                <label htmlFor="">Email</label>
                                <input
                                    className='input_login_cliente'
                                    type="email"
                                    placeholder='Digite seu email'
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="">Senha</label>
                                <input
                                    className='input_login_cliente'
                                    type="password"
                                    placeholder='Digite sua senha'
                                    name="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <div className="espacamento"></div>
                                <div className="botao">
                                    <Botao nomeBotao="Entrar" type="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;