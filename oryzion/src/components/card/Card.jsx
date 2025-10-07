import React from 'react'
import './Card.css'
import audio from "../../assets/img/audio.svg"
import avaliacao from "../../assets/img/estrelas.svg"
import imgUsuario from "../../assets/img/Usuario.svg"
import Botao from '../botao/Botao'

const Card = () => {
  return (
        <div className='divs_card'>
            <div className='campo_usuario'>
                <img src={imgUsuario} alt="" />
                <p>Rikelme</p>
              
            </div>
                <div className='campo_feedback'>
                    <div className='campo_comentario'>
                        <p className='comentario'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <Botao nomeBotao = "Responder "/>
                    </div>
                        
                </div>
                <div className='campo_audio'>
                        <img src={audio} alt="" />
                        <p className='duracao'>1:30 </p>
                    </div>
                </div>
       
  )
}

export default Card