
import './Chamado.css';
import Botao from '../../components/botao/Botao';
import VoltarBranco from "../../components/voltarBranco/VoltarBranco";
<<<<<<< HEAD
=======
import React, { useState } from 'react';
import api from "../../Services/services";
import Swal from "sweetalert2";
>>>>>>> e12b6232bf0dc64deca3ed6277c5f2ca2fd9082e

const Chamado = () => {
    
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function cadastro(e) {
    e.preventDefault(); 
    const usuario = { nome, email, senha };

    try {
      const resposta = await api.post("Usuario", usuario);

      if (resposta.status === 200) {
        alertar("Desculpe", "Verifique os dados e tente novamente.");
        setNome("");
        setEmail("");
        setSenha("");
      } else {
        alertar("success", "Cadastro realizado com sucesso!");

      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alertar("error", "Erro ao fazer o cadastro. Verifique suas credenciais!");
      console.log(usuario.nome);
      console.log(usuario.email);
      console.log(usuario.senha);
      console.log(usuario.idTipoUsuario);
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
              <Botao nomeBotao="Cadastrar" tipo="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chamado;
