import React from 'react'
import './LoginFuncionario.css'
import Botao from '../../components/botao/Botao'
import { useState } from 'react';
import api from "../../Services/services"


const LoginFuncionario = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    

    async function autenticacao(e) {
    e.preventDefault();

    if (email.trim() === "" || senha.trim() === "") {
      alertar("error", "Preencha todos os campos!");
      return;
    }

    try {
      const usuario = { email, senha };

      const resposta = await api.post("Login", usuario);

      if (resposta.status === 200) {
        alertar("success", "Login realizado com sucesso!");
        
      } else {
        alertar("error", "Email ou senha inválidos!");
      }

    } catch (error) {
      console.error("Erro no login:", error);
      alertar("error", "Erro ao fazer login. Verifique suas credenciais!");
    }
  }

  function alertar(icon, msg) {
    Swal.fire({
      icon,
      text: msg,
      confirmButtonColor: "#3085d6",
    });
  }

    return (
        <>
            <div className="todoOLoginFuncionario">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="borda_para_os_simbolos">


                            <form action="" onSubmit={autenticacao}>
                                <div className="titulo">
                                    <h1>Login</h1>
                                </div>
                                <label htmlFor="">E-mail</label>
                                <input type="email" placeholder='Digite seu e-mail'
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <label htmlFor="">Senha</label>
                                <input type="password" placeholder='Digite sua senha'
                                value={senha} onChange={(e) => setSenha(e.target.value)}/>
                                <input className='input_login_funcionario' type="email" placeholder='Digite seu e-mail'/>
                                <label htmlFor="">Senha</label>
                                <input className='input_login_funcionario' type="password" placeholder='Digite sua senha'/>
                                <div className="link">
                                    <a href="">Esqueceu a senha?</a>
                                </div>
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

export default LoginFuncionario