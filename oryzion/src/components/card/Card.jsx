import React from 'react'
import './Card.css'
import audio from "../../assets/audio.svg"
import avaliacao from "../../assets/estrelas.svg"
import imgUsuario from "../../assets/Usuario.svg"
import Botao from '../botao/Botao'

const Card = () => {
  return (
        <div className='divs_card'>
            <div className='campo_usuario'>
                <img src={imgUsuario} alt="" />
                <p>Rikelme</p>
                <img src={avaliacao} alt="" />
            </div>
                <div className='campo_feedback'>
                    <div className='campo_comentario'>
                        <p className='comentario'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <Botao nomeBotao = "Responder "/>
                    </div>
                        
                    <div className='campo_audio'>
                        <img src={audio} alt="" />
                        <p className='duracao'>1:30 </p>
                    </div>
                </div>
                </div>
       
  )
}

export default Card