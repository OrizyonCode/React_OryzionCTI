import React from 'react';
import './Card.css';
import audioMp3 from '../../assets/audio/audio.teste.mp3';
import audioMobile from "../../assets/img/audioPlay.svg";
import imgUsuario from "../../assets/img/Usuario.svg";
import Botao from '../botao/Botao';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Card = ({ classificacao = "neutro" }) => {
  const navigate = useNavigate();

  

  return (
    <div className={`divs_card ${classificacao}`}>
      {/* Cabeçalho do card */}
      <div className='card_header'>
        <div className='campo_usuario'>
          <img src={imgUsuario} alt="Foto do usuário" />
          <p>Rikelme</p>
        </div>

        <span className={`badge_sentimento ${classificacao}`}>
          {classificacao === "positivo" && "Positivo"}
          {classificacao === "negativo" && "Negativo"}
          {classificacao === "neutro" && "Neutro"}
        </span>
      </div>

      
      <div className='campo_feedback'>
        <div className={`campo_comentario ${classificacao}`}>
          <div className='rolagem'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          </div>
          <div
            onClick={() => navigate("/chat")}
            style={{ cursor: "pointer", width: "100%" }}
          ></div>
          
          <div className='botao_responde_card'>
            <Link to="/chat">
            <Botao nomeBotao="Responder" />
            </Link>
          </div>
        </div>
      </div>

      <div className='campo_audio'>
        <picture>
          <source media="(max-width: 768px)" srcSet={audioMobile} />
          <audio controls>
            <source src={audioMp3} type="audio/mpeg" />
          </audio>
        </picture>
        <p className='duracao'>1:30</p>
      </div>
    </div>
  );
};

export default Card;
