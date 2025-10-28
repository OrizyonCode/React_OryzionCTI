import React from 'react'
import './Login.css'
import Botao from '../../components/botao/Botao'
import api from "../../Services/services";
import { useState } from "react";
import Swal from 'sweetalert2';
import { userDecodeToken } from "../../auth/Auth"
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

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
                senha: senha
            }

            if (senha.trim() != "" || email.trim() != "") {


                const resposta = await api.post("Login", usuario)

                const token = resposta.data.token;

                if (token) {
                    const tokenDecodificado = userDecodeToken(token)
                    setUsuario(tokenDecodificado);
                    
                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

                    if (tokenDecodificado.tipoUsuario === "cliente") {
                        //redirecionar a tela aluno(branco)
                        naviGate("/chat")
                    } else {
                        naviGate("/telainicial")
                    }
                } else {
                    alertar("error", "Preencha os campos !")
                }
            }

        } catch (error) {
            console.log(error);
            alertar("error", "Email ou senha invalidos !")
        }
    }

    return (
        <>
            <div className="todoOLoginCliente">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="borda_para_os_simbolos">


                            <form action="">
                                <div className="titulo_4">
                                    <h1>Login</h1>
                                </div>
                                <label htmlFor="">Email</label>
                                <input className='input_login_cliente' type="email" placeholder='Digite seu email' />
                                <label htmlFor="">Senha</label>
                                <input className='input_login_cliente' type="password" placeholder='Digite sua senha' />
                                <div className="espacamento"></div>
                                <div className="botao">
                                    <Botao nomeBotao="Entrar" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login