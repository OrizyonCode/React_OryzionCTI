import './Login.css';
import Botao from '../../components/botao/Botao';
import api from '../../Services/services';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { userDecodeToken } from "../../auth/Auth";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import { Link } from 'react-router-dom';
import logo from "../../assets/img/LogoOryzion.svg"

const Login = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const naviGate = useNavigate();

    const { setUsuario } = useAuth();

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

    async function realizarAutenticacao(e) {
        e.preventDefault();
        try {
            const usuario = {
                email: email,
                senha: senha,
            }

            if (senha.trim() !== "" && email.trim() !== "") {

                const resposta = await api.post("Login", usuario)
                const token = resposta.data.token;

                if (token) {
                    const tokenDecodificado = userDecodeToken(token);
                    console.log("TOKEN DECODIFICADO ===>", tokenDecodificado);
                    setUsuario(tokenDecodificado);

                    localStorage.setItem("token", token); 
                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

                    if (tokenDecodificado.tipoUsuario === "cliente") {
                        let timerInterval;
        Swal.fire({
          title: "Usuário Encontrado!",
          html: "Redirecionando para o Chat... <b></b> ms",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            naviGate("/chat");
          }
        });
                    } else if (tokenDecodificado.tipoUsuario === "suporte") {
                        let timerInterval;
        Swal.fire({
          title: "Suporte Encontrado!",
          html: "Redirecionando para a Listagem... <b></b> ms",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            naviGate("/TelaInicial");
          }
        });
                    } else {
                        let timerInterval;
        Swal.fire({
          title: "Superior Encontrado!",
          html: "Redirecionando para o Dashboard... <b></b> ms",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            naviGate("/dashboard");
          }
        });
                    }
                } else {
                    alertar("error", "Preencha os campos!");
                }

            }
        } catch (error) {
            console.log(error);
            alertar("error", "Email ou senha invalidos !");
        }
    }

    return (
        <div className="todoOLoginCliente">
            <div className="paraCentralizar">
                <div className="borda">
                    <div className="borda_para_os_simbolos">
                        <form onSubmit={realizarAutenticacao}>
                            <div className="titulo_4">
                                <img src={logo} alt="" />
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