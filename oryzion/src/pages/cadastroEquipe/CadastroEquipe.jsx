import React, { useState } from 'react';
import './CadastroEquipe.css';
import Botao from '../../components/botao/Botao';
import VoltarBranco from '../../components/voltarBranco/VoltarBranco'; // <-- Import adicionado
import api from "../../Services/services";
import Swal from "sweetalert2";

const CadastroEquipe = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [idTipoUsuario, setIdTipoUsuario] = useState("501f4974-0473-4d39-9b9f-1e5be73f50ed");

  async function cadastro(e) {
    e.preventDefault(); 
    const usuario = { nome, email, senha, idTipoUsuario };

    try {
      const resposta = await api.post("Usuario", usuario);

      if (resposta.status === 200) {
        alertar("success", "Cadastro realizado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
      } else {
        alertar("warning", "Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alertar("error", "Erro ao fazer o cadastro. Verifique suas credenciais!");
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
    <div className="todoOCadastroEquipe">
      <div className="paraCentralizar">
        <div className="borda">
          <div className="voltarBrancoContainer">
            <VoltarBranco />
          </div>

          <form onSubmit={cadastro}>
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
              <Botao nomeBotao="Cadastrar" tipo="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroEquipe;
