import './Login.css';
import Botao from '../../components/botao/Botao';
import api from '../../Services/services';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { userDecodeToken } from "../../auth/Auth";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";

const Login = () => {

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
        Toast.fire({ icon: icone, title: mensagem });
    }

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const { setUsuario } = useAuth();

    async function realizarAutenticacao(e) {
        e.preventDefault();

        const usuarioLogin = { email, senha };

        if (senha.trim() && email.trim()) {
            try {
                const resposta = await api.post("Login", usuarioLogin);
                const token = resposta.data.token;

                if (token) {
                    const tokenDecodificado = userDecodeToken(token);

                    // ✅ Monta o objeto do usuário com fallback de nome
                    const usuarioCompleto = {
                        ...tokenDecodificado,
                        nomeUsuario: tokenDecodificado.nomeUsuario || "Usuário"
                    };

                    setUsuario(usuarioCompleto);
                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(usuarioCompleto));

                    // Redireciona conforme o tipo de usuário
                    if (usuarioCompleto?.emailUsuario?.endsWith("@email.com")) {
                        navigate("/chat");
                    } else {
                        navigate("/telainicial");
                    }

                } else {
                    alertar("error", "Email ou senha inválidos");
                }

            } catch (error) {
                console.log(error);
                alertar("error", "EMAIL ou senha inválidos, para dúvidas entre em contato com o suporte. 🤖");
            }

        } else {
            alertar("warning", "Preencha os campos vazios para realizar o login 🤖");
        }
    }

    return (
        <div className="todoOLoginCliente">
            <div className="paraCentralizar">
                <div className="borda">
                    <div className="borda_para_os_simbolos">
                        <form onSubmit={realizarAutenticacao}>
                            <div className="titulo_4">
                                <h1>Login</h1>
                            </div>

                            <label>Email</label>
                            <input
                                className='input_login_cliente'
                                type="email"
                                placeholder='Digite seu email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label>Senha</label>
                            <input
                                className='input_login_cliente'
                                type="password"
                                placeholder='Digite sua senha'
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
    );
};

export default Login;