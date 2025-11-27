import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ModalSuporte from '../../components/modal/Modal'; 
import Usuario from '../../assets/img/Usuario.svg';
import { Link } from 'react-router-dom';
import "./Chat.css";

const Chat = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  return (
    <>
      <Header onSuporteClick={abrirModal} />
      {modalAberto && <ModalSuporte onClose={fecharModal} />}

      <div className="chat-container">

        {/* TOPO */}
        <div className="chat-topo-info">
          <Link to="/historicofeedback">
            <img src={Usuario} alt="Ícone de perfil" className="chat-avatar"/>
          </Link>
          <span className="nome-usuario">João</span>
        </div>

        {/* CONTEÚDO */}
        <div className="chat-content">

          {/* Mensagem da esquerda */}
          <div className="mensagem-bloco">
            <p>
              O aplicativo é bom, mas o processo de chatboarding poderia ser mais claro.
              Fiquei um pouco perdida no início mas depois consegui explicar meu problema.
            </p>
          </div>

          {/* Fundo ilustrativo */}
          <div className="chat-ilustracao"></div>
        </div>

        {/* INPUT */}
        <div className="chat-area-input"> 
          <input 
            type="text" 
            placeholder="Digite a sua mensagem" 
            className="input-mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />

          <button className="botao-enviar">
            ➤
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Chat;
