import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ModalSuporte from "../../components/modal/Modal";
import UsuarioImg from "../../assets/img/joao.png";
import { Link, useParams, useLocation } from "react-router-dom";
import "./Chat.css";
import respostaService from "../../Services/respostaService";
import { useAuth } from "../../contexts/AuthContext";

const Chat = () => {
  const { usuario } = useAuth(); // pega usuário logado do contexto
  const { idFeedback } = useParams();
  const location = useLocation();
  const chamado = location.state?.chamado;

  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    console.log("Usuario logado:", usuario);
  }, [usuario]);

  useEffect(() => {
    if (idFeedback) carregarMensagens();
  }, [idFeedback]);

  const carregarMensagens = async () => {
    try {
      if (!idFeedback) return;
      const response = await respostaService.listarPorFeedback(idFeedback);
      const mensagens = response.data.map(r => ({
        Texto: r.texto,
        Audio: r.audio,
        Data: r.data,
        Usuario: { Nome: r.usuario?.nome || "Usuário" }
      }));
      setChat(mensagens);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    if (!usuario || !usuario.idUsuario) {
      alert("Usuário não logado ou inválido.");
      return;
    }

    if (!idFeedback) {
      alert("Este chamado ainda não possui feedback. Mensagem não pode ser enviada.");
      return;
    }

    const novaMensagem = {
      IdFeedback: idFeedback,
      IdUsuario: usuario.idUsuario,
      Texto: mensagem,
      Data: new Date().toISOString()
    };

    try {
      await respostaService.enviarMensagem(novaMensagem);
      setChat(prev => [
        ...prev,
        { Texto: mensagem, Data: novaMensagem.Data, Usuario: { Nome: "Você" } }
      ]);
      setMensagem("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem. Verifique se o usuário e o feedback existem.");
    }
  };

  const formatarData = (d) => new Date(d).toLocaleString("pt-BR");

  const getAudioMime = (src) =>
    src?.endsWith(".wav") ? "audio/wav" :
      src?.endsWith(".ogg") ? "audio/ogg" :
        "audio/mpeg";

  return (
    <>
      <Header onSuporteClick={() => setModalAberto(true)} />
      {modalAberto && <ModalSuporte onClose={() => setModalAberto(false)} />}

      <div className="chat-wrapper">
        <div className="chat-header-bar">
          <div className="chat-left">
            <Link to="/historicofeedback" className="chat-back">← Voltar</Link>
            <img src={UsuarioImg} className="chat-user-avatar" />
            <span className="chat-user-name">{chamado?.nome || "Usuário"}</span>
          </div>
        </div>

        <div className="chat-body">
          {chamado && (
            <div className="chat-mensagem-card" style={{ maxWidth: "70%" }}>
              <h4>Feedback recebido:</h4>
              <p>{chamado.texto || "Nenhuma transcrição disponível."}</p>
              {chamado.audio && (
                <audio controls style={{ marginTop: 10, width: "100%" }}>
                  <source src={chamado.audio} type={getAudioMime(chamado.audio)} />
                </audio>
              )}
              <small style={{ color: "#94a3b8" }}>Enviado em: {formatarData(chamado.data)}</small>
            </div>
          )}

          <div className="chat-mensagens-list">
            {chat.map((msg, idx) => (
              <div key={idx} className="chat-mensagem-card">
                <strong style={{ color: "#fff" }}>{msg.Usuario?.Nome || "Usuário"}</strong>
                {msg.Texto && <p>{msg.Texto}</p>}
                {msg.Audio && (
                  <audio controls style={{ marginTop: 10, width: "100%" }}>
                    <source src={msg.Audio} type={getAudioMime(msg.Audio)} />
                  </audio>
                )}
                <small style={{ color: "#94a3b8" }}>{formatarData(msg.Data)}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-input-bar">
          <input
  type="text"
  placeholder={idFeedback ? "Digite a sua mensagem" : "Feedback não disponível"}
  value={mensagem}
  onChange={(e) => setMensagem(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
  disabled={!idFeedback}
/>
<button
  onClick={enviarMensagem}
  disabled={!idFeedback}
>
  ➤
</button>

        </div>

        <Footer />
      </div>
    </>
  );
};

export default Chat;
