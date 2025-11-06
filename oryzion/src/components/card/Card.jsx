import React, { useState } from 'react';
import './Card.css';
import audioMp3 from '../../assets/audio/audio.teste.mp3';
import audioMobile from "../../assets/img/audioPlay.svg";
import imgUsuario from "../../assets/img/Usuario.svg";
import Botao from '../botao/Botao';
import { Link } from "react-router-dom";

const Card = ({ classificacao = "neutro", positivo, negativo }) => {
  const [expandir, setExpandir] = useState(false);

  return (
    <div className={`divs_card ${classificacao}`}>
      <div className='card_header'>
        <div className='campo_usuario'>
          <img src={imgUsuario} alt="Foto do usuário" />
          <p>Usuário</p>
        </div>

        <span className={`badge_sentimento ${classificacao}`}>
          {classificacao === "positivo" && "Positivo"}
          {classificacao === "negativo" && "Negativo"}
          {classificacao === "neutro" && "Neutro"}
        </span>
      </div>

      <div className='campo_feedback'>
        <div className={`campo_comentario ${classificacao} ${expandir ? 'expandido' : ''}`}>
          <p className={expandir ? 'mostrar' : 'ocultar'}>{resumo || texto}</p>
          <button 
            className="botao_leia_mais"
            onClick={() => setExpandir(!expandir)}
          >
            {expandir ? 'Mostrar menos' : 'Mostrar mais'}
          </button>
        </div>
      </div>

      <div className='campo_audio'>
        <picture>
          <source media="(max-width: 768px)" srcSet={audioMobile} />
          <audio controls>
            <source src={audioMp3} type="audio/mpeg" />
          </audio>
        </picture>

        <div className='botao_responde_card'>
          <Link to="/chat">
            <Botao nomeBotao="Responder" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
