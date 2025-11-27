import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ModalSuporte from "../../components/modal/Modal";
import Usuario from "../../assets/img/joao.png";
import { Link, useParams } from "react-router-dom";
import "./Chat.css";


const Chat = ({ respostaService }) => {
  const { idFeedback } = useParams();
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([]);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const carregarMensagens = async () => {
    try {
      const response = await respostaService.listarporFeedback(idFeedback);
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
      <Header onSuporteClick={abrirModal} />
      {modalAberto && <ModalSuporte onClose={fecharModal} />}

      <div className="chat-wrapper">
        {/* TOPO ESCURO IGUAL A IMAGEM */}
        <div className="chat-header-bar">
          <div className="chat-left">
            <Link to="/historicofeedback" className="chat-back">
              ← Voltar
            </Link>

            <img src={Usuario} className="chat-user-avatar" alt="Usuário" />
            <span className="chat-user-name">João</span>
          </div>

          <div className="chat-right">
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="chat-body">
          <div className="chat-mensagens-list">
            {chat.map((item, idx) => (
              <div key={idx} className="chat-mensagem-card">
                {item.texto}
              </div>
            ))}
          </div>

          {/* ILUSTRAÇÃO */}
          <div className="chat-ilustracao">
            <div className="chat-illus-line"></div>
            <div className="chat-illus-line"></div>
            <div className="chat-illus-line small"></div>
          </div>
        </div>

        {/* INPUT IGUAL AO MODELO */}
        <div className="chat-input-bar">
          <input
            type="text"
            placeholder="Digite a sua mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          />

          <button onClick={enviarMensagem} className="chat-send-btn">➤</button>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Chat;
