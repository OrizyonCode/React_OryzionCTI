import React from 'react'
import './Card.css'
import audioDesktop from "../../assets/img/audio.svg"
import audioMobile from "../../assets/img/audioPlay.svg"  // imagem reduzida ou alternativa para mobile
import imgUsuario from "../../assets/img/Usuario.svg"
import Botao from '../botao/Botao'
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();

  return (
    <div className='divs_card'>
      {/* Usuário */}
      <div className='campo_usuario'>
        <img src={imgUsuario} alt="Foto do usuário" />
        <p>Rikelme</p>
      </div>

      {/* Comentário */}
      <div className='campo_feedback'>
        <div className='campo_comentario'>
          <p className='comentario'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div
            onClick={() => navigate("/chat")}
            style={{ cursor: "pointer", width: "100%" }}
          >
            <Botao nomeBotao="Responder" />
          </div>
        </div>
      </div>

      {/* Áudio */}
      <div className='campo_audio'>
        <picture>
          <source media="(max-width: 768px)" srcSet={audioMobile} />
          <img src={audioDesktop} alt="Botão de áudio" />
        </picture>
        <p className='duracao'>1:30</p>
      </div>
    </div>
  )
}

export default Card