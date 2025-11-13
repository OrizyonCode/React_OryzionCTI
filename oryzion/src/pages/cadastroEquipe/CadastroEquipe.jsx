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
  const [idTipoUsuario, setIdTipoUsuario] = useState("f470fdb4-a4d0-4c9a-8837-084ac6f4b7c8");

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

  async function cadastroEquipe(e) {
    e.preventDefault();

    const usuario = { nome, email, senha, idTipoUsuario };

    try {
      const respostaUsuario = await api.post("Usuario", usuario);

      if (respostaUsuario.status === 201) {

        const usuarioCriado = respostaUsuario.data;
        const idUsuario = usuarioCriado.idUsuario || usuarioCriado.id;

        const suporte = { idUsuario };
        const respostaSuporte = await api.post("Suporte", suporte);

        if (respostaSuporte.status === 201 || respostaSuporte.status === 200) {
          alertar("success", "Suporte cadastrado com sucesso!");
        } else {
          alertar("warning", "Usuário criado, mas houve um problema ao registrar o suporte.");
        }

        setNome("");
        setEmail("");
        setSenha("");
        setIdTipoUsuario("f470fdb4-a4d0-4c9a-8837-084ac6f4b7c8");

      } else {
        alertar("warning", "Verifique os dados e tente novamente.");
      }

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alertar("error", "Erro ao fazer o cadastro. Verifique as credenciais ou o servidor!");
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
              className='input_cadastro_equipe'
              type="text"
              placeholder='Digite seu nome completo'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              className='input_cadastro_equipe'
              type="email"
              placeholder='Digite seu e-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Senha</label>
            <input
              className='input_cadastro_equipe'
              type="password"
              placeholder='Digite sua senha'
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