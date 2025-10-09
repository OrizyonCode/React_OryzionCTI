import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ModalSuporte from '../../components/modal/Modal'; 
import { useState } from 'react';
import "./Chat.css"

const Chat = () => {
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  return (
    <>
      <Header onSuporteClick={abrirModal} />
      
        
        {modalAberto && <ModalSuporte onClose={fecharModal} />}

        <div className="chat-principal">
          
          <div className="chat-topo-info">
            <div className="perfil-icone">
              <span className="icone">O</span>
            </div>
            <span className="nome-usuario">Usuário</span>
          </div>

          <div className="chat-mensagens-area">
            
            <div className="chat-ilustracao">
              <div className="placeholder-ilustracao"></div>
            </div>

            <div className="mensagem recebida">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="audio-player">
                <span className="play-icone">▶</span>
                <div className="audio-ondas"></div>
              </div>
            </div>
          </div>

          <div className="chat-area-input">
            <input 
              type="text" 
              placeholder="Digite a sua mensagem" 
              className="input-mensagem" 
            />
            <button className="botao-enviar">
              <span className="icone-enviar">➤</span>
            </button>
          </div>
          
        </div>
      
      <Footer />
    </>
  );
};

export default Chat;