import React, { useState } from "react";
import './Chamado.css';
import Botao from '../../components/botao/Botao';
import VoltarBranco from '../../components/voltarBranco/VoltarBranco';
import api from "../../Services/services";
import Swal from "sweetalert2";
import 'animate.css';

const Chamado = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
<<<<<<< HEAD

  const [idTipoUsuario, setIdTipoUsuario] = useState("3e3742e6-a13b-4c1e-b20d-c89938fdd57d");
=======
  const [idTipoUsuario] = useState("9437376C-23A7-4838-AE15-93AE57237680"); // Tipo padrão
>>>>>>> 5c0678fb17ffaf366eb2f1c3a55e44e2977b785d

  function alertar(icone, mensagem) {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: icone,
      title: mensagem,
    });
  }

async function cadastroCompleto(e) {
  e.preventDefault();

  const usuario = { nome, email, senha, idTipoUsuario };

  try {
    // 1️⃣ Criar Usuário
    const respostaUsuario = await api.post("Usuario", usuario);
    const idUsuario = respostaUsuario.data.idUsuario || respostaUsuario.data.id;

    // 2️⃣ Criar Cliente
    const cliente = { idUsuario };
    const respostaCliente = await api.post("Cliente", cliente);
    const idCliente = respostaCliente.data.idCliente || respostaCliente.data.id;

    // 3️⃣ Criar Classificação (chama IA no backend)
    const classificacao = { 
      nome, 
      comentario: "Comentário inicial" // ou algum texto que a IA precise
    };
    const respostaClassificacao = await api.post("Classificacao", classificacao);
    const idClassificacao = respostaClassificacao.data.idClassificacao || respostaClassificacao.data.id;

    // 4️⃣ Criar Chamado com ID da classificação gerada pela IA
    const chamado = {
      idCliente,
      idClassificacao,
      status: true,
      data: new Date().toISOString(),
      audio: "",
      idSuporte: null
    };

<<<<<<< HEAD
        setNome("");
        setEmail("");
        setSenha("");
        setIdTipoUsuario("3e3742e6-a13b-4c1e-b20d-c89938fdd57d");
=======
    const respostaChamado = await api.post("Chamado", chamado);
>>>>>>> 5c0678fb17ffaf366eb2f1c3a55e44e2977b785d

    if (respostaChamado.status === 201 || respostaChamado.status === 200) {
      Swal.fire({
        title: "Tudo criado com sucesso!",
        text: "Usuário, cliente e chamado foram registrados.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }

  } catch (error) {
    console.error("Erro no cadastro completo:", error);
    alertar("error", "Erro ao cadastrar usuário, cliente ou chamado.");
    console.log({ nome, email, senha, idTipoUsuario });
  }
}

  return (
    <div className="todoOChamado">
      <div className="paraCentralizar">
        <div className="borda">
          <div className="voltarBrancoContainer">
            <VoltarBranco />
          </div>

          <form onSubmit={cadastroCompleto}>
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
              <Botao nomeBotao="Cadastrar" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chamado;