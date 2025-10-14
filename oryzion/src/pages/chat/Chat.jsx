import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ModalSuporte from '../../components/modal/Modal'; 
import audioMp3 from '../../assets/audio/audio.teste.mp3';

import { useState } from 'react';
import usuario from '../../assets/img/Usuario.svg'

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
            <div className="perfil_icone">
              <img src={usuario} alt="" />
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
                <div className="audio-ondas"></div>
              </div>
            </div>
            <div className='audio_recebido'>
               
            <audio controls>
            <source src={audioMp3} type="audio/mpeg" />
            </audio>

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