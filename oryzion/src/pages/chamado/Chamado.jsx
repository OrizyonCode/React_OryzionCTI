
import './Chamado.css';
import Botao from '../../components/botao/Botao';
import VoltarBranco from '../../components/voltarBranco/VoltarBranco';
import { useState } from 'react';
import api from "../../Services/services";
import Swal from "sweetalert2";

const Chamado = () => {
    
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [idTipoUsuario, setIdTipoUsuario] = useState("8bd97890-2205-48a5-908d-968258f7b726");

  async function cadastro(e) {
    e.preventDefault(); 
    const cliente = { nome, email, senha, idTipoUsuario };

    try {
      const resposta = await api.post("Cliente", cliente);

      if (resposta.status === 201) {
        alertar("success", "Cadastro realizado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        setIdTipoUsuario("8bd97890-2205-48a5-908d-968258f7b726");
      } else {
        alertar("Desculpe", "Verifique os dados e tente novamente.");

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
