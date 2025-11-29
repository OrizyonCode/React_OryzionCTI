import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ModalSuporte from "../../components/modal/Modal";
import Usuario from "../../assets/img/joao.png";
import { Link, useParams, useLocation } from "react-router-dom";
import "./Chat.css";
import respostaService from "../../Services/respostaService";

const Chat = () => {
  const { idFeedback } = useParams();
  const location = useLocation();

  // Dados vindos do ModalChamado
  const chamado = location.state?.chamado;

  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([]);

  const carregarMensagens = async () => {
    try {
      const response = await respostaService.listarPorFeedback(idFeedback);
      setChat(response.data);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  useEffect(() => {
    carregarMensagens();
  }, [idFeedback]);

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    const novaMensagem = {
      idFeedback,
      texto: mensagem,
      data: new Date().toISOString(),
    };

    try {
      await respostaService.enviarMensagem(novaMensagem);
      setChat((prev) => [...prev, novaMensagem]);
      setMensagem("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <>
      <Header onSuporteClick={() => setModalAberto(true)} />
      {modalAberto && <ModalSuporte onClose={() => setModalAberto(false)} />}

      <div className="chat-wrapper">
        {/* TOPO DO CHAT */}
        <div className="chat-header-bar">
          <div className="chat-left">
            <Link to="/historicofeedback" className="chat-back">
              ← Voltar
            </Link>

            {/* Avatar do cliente */}
            <img
              src={Usuario}
              className="chat-user-avatar"
              alt={chamado?.cliente?.usuario?.nome || "Usuário"}
            />

            {/* Nome dinâmico */}
            <span className="chat-user-name">
              {chamado?.cliente?.usuario?.nome || "Usuário"}
            </span>
          </div>
        </div>

        {/* CORPO DO CHAT */}
        <div className="chat-body">

          {/* Mensagem original do feedback */}
          {chamado && (
            <div className="chat-mensagem-original">
              <h4>Feedback recebido:</h4>
              <p>{chamado.transcricao || "Sem mensagem disponível."}</p>
            </div>
          )}

          {/* Lista de mensagens do chat */}
          <div className="chat-mensagens-list">
            {chat.map((item, idx) => (
              <div key={idx} className="chat-mensagem-card">
                {item.texto}
              </div>
            ))}
          </div>
        </div>

        {/* INPUT DO CHAT */}
        <div className="chat-input-bar">
          <input
            type="text"
            placeholder="Digite a sua mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          />

          <button onClick={enviarMensagem} className="chat-send-btn">
            ➤
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Chat;
