import './Chamado.css';
import Botao from '../../components/botao/Botao';
import VoltarBranco from '../../components/voltarBranco/VoltarBranco';
import React, { useState } from 'react';
import api from "../../Services/services";
import Swal from "sweetalert2";

const Chamado = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [idTipoUsuario, setIdTipoUsuario] = useState("3e3742e6-a13b-4c1e-b20d-c89938fdd57d");

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

  async function cadastro(e) {
    e.preventDefault();

    const usuario = { nome, email, senha, idTipoUsuario };

    try {
      const respostaUsuario = await api.post("Usuario", usuario);

      if (respostaUsuario.status === 201) {
        const usuarioCriado = respostaUsuario.data;
        const idUsuario = usuarioCriado.idUsuario || usuarioCriado.id;

        const cliente = { idUsuario };
        const respostaCliente = await api.post("Cliente", cliente);

        if (respostaCliente.status === 201 || respostaCliente.status === 200) {
          alertar("success", "Cliente cadastrado com sucesso!");
        } else {
          alertar("warning", "Usuário criado, mas houve problema ao registrar o cliente.");
        }

        setNome("");
        setEmail("");
        setSenha("");
        setIdTipoUsuario("3e3742e6-a13b-4c1e-b20d-c89938fdd57d");

      } else {
        alertar("warning", "Verifique os dados e tente novamente.");
      }

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alertar("error", "Erro ao fazer o cadastro. Verifique suas credenciais!");
    }
  }

  return (
    <div className="todoOChamado">
      <div className="paraCentralizar">
        <div className="borda">
          <div className="voltarBrancoContainer">
            <VoltarBranco />
          </div>

          <form onSubmit={cadastro}>
            <div className="titulo_2">
              <h1>Chamado</h1>
            </div>

            <label>Nome</label>
            <input
              className='input_chamado'
              type="text"
              id='nome'
              placeholder='Nome completo do cliente'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label>E-mail</label>
            <input
              className='input_chamado'
              type="email"
              placeholder='Digite seu e-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Senha</label>
            <input
              className='input_chamado'
              type="password"
              placeholder='Digite sua senha'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <div className="espacamento_chamado"></div>

            <div className="botao">
              <Botao nomeBotao="Cadastrar" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chamado;