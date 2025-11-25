import React, { useState } from 'react';
import './Card.css';
import audioMp3 from '../../assets/audio/audio.teste.mp3';
import audioMobile from "../../assets/img/audioPlay.svg";
import imgUsuario from "../../assets/img/Usuario.svg";
import Botao from '../botao/Botao';
import { Link } from "react-router-dom";
import Like from "../../assets/img/like.svg";
import Dislike from "../../assets/img/dislike.svg";

<<<<<<< HEAD
const Card = ({ classificacao = "neutro", resumo, texto }) => {
=======
const Card = ({ classificacao = "neutro", resumo, texto, onAtivar, onDesativar }) => {
>>>>>>> 54d9b770de190c03ae863816d9aadf5ed6063676
  const [expandir, setExpandir] = useState(false);
  const [ativo, setAtivo] = useState(true); 

  const textoSentimento = {
    positivo: "Positivo",
    negativo: "Negativo",
    neutro: "Neutro",
  }[classificacao] || "Neutro";

  async function checkFeedback() {
    try {
      setAtivo(true);
      if (onAtivar) onAtivar(); 
    } catch (error) {
      alert("Erro ao ativar feedback");
    }
  }

  async function desativarFeedback() {
    try {
      setAtivo(false);
      if (onDesativar) onDesativar(); 
    } catch (error) {
      alert("Erro ao desativar feedback");
    }
  }

  if (!ativo) return null;

  // Texto do sentimento
  const textoSentimento = {
    positivo: "Positivo",
    negativo: "Negativo",
    neutro: "Neutro",
  }[classificacao] || "Neutro";

  return (
    <div className={`divs_card ${classificacao}`}>
      <div className="card_header">
        <div className="campo_usuario">
          <img src={imgUsuario} alt="Foto do usuário" />
          <p>Usuário</p>
        </div>

        <span className={`badge_sentimento ${classificacao}`}>
<<<<<<< HEAD
       {textoSentimento}
    </span>

      </div>

      {/* Texto do feedback */}
=======
          {textoSentimento}
        </span>
      </div>

>>>>>>> 54d9b770de190c03ae863816d9aadf5ed6063676
      <div className="campo_feedback">
        <div className={`campo_comentario ${expandir ? 'expandido' : ''}`}>
          <p className={expandir ? 'mostrar' : 'ocultar'}>{resumo || texto}</p>

          <button
            className="botao_leia_mais"
            onClick={() => setExpandir(!expandir)}
          >
            {expandir ? 'Mostrar menos' : 'Mostrar mais'}
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* Áudio + botão */}
=======
>>>>>>> 54d9b770de190c03ae863816d9aadf5ed6063676
      <div className="campo_audio">
        <picture>
          <source media="(max-width: 768px)" srcSet={audioMobile} />
          <audio controls>
            <source src={audioMp3} type="audio/mpeg" />
          </audio>
        </picture>

<<<<<<< HEAD
=======
        <div className='like_dislike'>
          <button onClick={checkFeedback}>
            <img src={Like} alt="Like" />
          </button>
          <button onClick={desativarFeedback}>
            <img src={Dislike} alt="Dislike" />
          </button>
        </div>

>>>>>>> 54d9b770de190c03ae863816d9aadf5ed6063676
        <div className="botao_responde_card">
          <Link to="/chat">
            <Botao nomeBotao="Responder" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
