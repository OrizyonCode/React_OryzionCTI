import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ModalSuporte from '../../components/modal/Modal';
import Usuario from '../../assets/img/Usuario.svg';
import { Link } from 'react-router-dom';
import "./Chat.css";

const Chat = ({ idFeedback, respostaService }) => {
const [modalAberto, setModalAberto] = useState(false);
const [mensagem, setMensagem] = useState("");
const [chat, setChat] = useState([]);

const abrirModal = () => setModalAberto(true);
const fecharModal = () => setModalAberto(false);

const carregarMensagens = async () => {
if (!idFeedback) return;
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
  data: new Date().toISOString()  
};  

try {  
  await respostaService.enviarMensagem(novaMensagem);  
  setChat(prev => [...prev, novaMensagem]);  
  setMensagem("");  
} catch (error) {  
  console.error("Erro ao enviar mensagem:", error);  
}  

};

return (
<> <Header onSuporteClick={abrirModal} />
{modalAberto && <ModalSuporte onClose={fecharModal} />}

  <div className="chat-container">  
    <div className="chat-topo-info">  
      <Link to="/historicofeedback">  
        <img src={Usuario} alt="Ícone de perfil" className="chat-avatar"/>  
      </Link>  
      <span className="nome-usuario">João</span>  
    </div>  

    <div className="chat-content">  
      {chat.map((item, index) => (  
        <div key={index} className="mensagem-bloco">  
          <p>{item.texto}</p>  
        </div>  
      ))}  
      <div className="chat-ilustracao"></div>  
    </div>  

    <div className="chat-area-input">  
      <input  
        type="text"  
        placeholder="Digite a sua mensagem"  
        className="input-mensagem"  
        value={mensagem}  
        onChange={(e) => setMensagem(e.target.value)}  
        onKeyDown={(e) => { if(e.key === 'Enter') enviarMensagem(); }}  
      />  
      <button className="botao-enviar" onClick={enviarMensagem}>➤</button>  
    </div>  
  </div>  

  <Footer />  
</>  

);
};

export default Chat;
