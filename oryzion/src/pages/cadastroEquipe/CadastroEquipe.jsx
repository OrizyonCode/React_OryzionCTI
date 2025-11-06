import React, { useState } from 'react';
import './CadastroEquipe.css';
import Botao from '../../components/botao/Botao';
import VoltarBranco from '../../components/voltarBranco/VoltarBranco';
import api from "../../Services/services";
import Swal from "sweetalert2";

const CadastroEquipe = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [idTipoUsuario, setIdTipoUsuario] = useState("69C9E15F-D3FD-4531-B50E-2505C964A607");

  // Função para mostrar alertas
  function alertar(icon, msg) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({ icon, title: msg });
  }

  async function cadastroEquipe(e) {
    e.preventDefault();

    const suporte = { nome, email, senha, idTipoUsuario };

    try {
      const resposta = await api.post("Usuario", suporte);

      if (resposta.status === 201) {
        alertar("success", "Cadastro realizado com sucesso!");

        // Limpa os campos
        setNome("");
        setEmail("");
        setSenha("");
        setIdTipoUsuario("69C9E15F-D3FD-4531-B50E-2505C964A607");

        console.log("Usuário cadastrado:", suporte);
      } else {
        alertar("warning", "Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alertar("error", "Erro ao fazer o cadastro. Verifique suas credenciais!");
    }
  }

  return (
    <div className="todoOCadastroEquipe">
      <div className="paraCentralizar">
        <div className="borda">
          <div className="voltarBrancoContainer">
            <VoltarBranco />
          </div>

          <form onSubmit={cadastroEquipe}>
            <div className="titulo_2">
              <h1>Cadastro</h1>
              <h5>Equipe</h5>
            </div>

            <label>Nome</label>
            <input
              className="input_cadastro_equipe"
              type="text"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              className="input_cadastro_equipe"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Senha</label>
            <input
              className="input_cadastro_equipe"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <div className="espacamento"></div>

            <div className="botao">
              <Botao nomeBotao="Cadastrar" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroEquipe;
