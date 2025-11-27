import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ModalSuporte from '../../components/modal/Modal'; 
import audioMp3 from '../../assets/audio/audio.teste.mp3';
import Usuario from '../../assets/img/Usuario.svg';
import { Link } from 'react-router-dom';
import "./Chat.css";

const Chat = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [chat, setChat] = useState([]);
  const [mensagem, setMensagem] = useState("");


  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const carregarMensagens = async () =>  {
      try {
        const response = await respostaService.listarporFeedback(idFeedback);
        setChat(response.data);
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
      }

    };


  const enviarMensagem = async () => {
      if(!mensagem.trim()) return;

      const nova = {
        idFeedback: idFeedback,
        texto: mensagem,
        data: new Data().toISOString()
      }
 
  }



  }

  return (
    <>
      <Header onSuporteClick={abrirModal} />
      {modalAberto && <ModalSuporte onClose={fecharModal} />}

      <div className="chat-principal ">
        <div className="chat-topo-info">
          <div className="perfil-icone">
            <Link to="/historicofeedback">
              <img src={Usuario} alt="Ícone de perfil" />
            </Link>
          </div>
          <span className="nome-usuario">Usuário</span>
        </div>

        <div className="chat-mensagens-area ">
          <div className="mensagem recebida ">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div>
            <audio controls>
              <source src={audioMp3} type="audio/mpeg" />
            </audio>
          </div>
        </div>

        <div className="chat-area-input"> 
          <input 
            type="text" 
            placeholder="Digite sua mensagem..." 
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
