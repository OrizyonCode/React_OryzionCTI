import React, { useState } from "react";
import "./LoginFuncionario.css";
import Botao from "../../components/botao/Botao";
import api from "../../Services/services";
import Swal from "sweetalert2";

const LoginFuncionario = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const alertar = (icon, msg) => {
    Swal.fire({
      icon,
      text: msg,
      confirmButtonColor: "#3085d6",
    });
  };

  const autenticacao = async (e) => {
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
  };

  return (
    <div className="todoOLoginFuncionario">
      <div className="paraCentralizar">
        <div className="borda">
          <div className="borda_para_os_simbolos">
            <form onSubmit={autenticacao}>
              <div className="titulo">
                <h1>Login</h1>
              </div>

              <label>E-mail</label>
              <input
                className="input_login_funcionario"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Senha</label>
              <input
                className="input_login_funcionario"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <div className="link">
                <a href="#">Esqueceu a senha?</a>
              </div>

              <div className="botao">
                <Botao nomeBotao="Entrar" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFuncionario;
