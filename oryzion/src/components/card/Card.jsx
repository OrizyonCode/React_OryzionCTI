import React from 'react'
import './Card.css'
import audio from "../../assets/audio.png"
import avaliacao from "../../assets/estrelas.png"
import imgUsuario from "../../assets/Usuario.png"

const Card = () => {
  return (
    <section>
        <div className='divs_card'>
            <div className='info_usuario'>
                <img src={imgUsuario} alt="" />
                <p>Rikelme</p>
                <img src={avaliacao} alt="" />
            </div>
                <div className='transcr_audio'>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                        <button>Responder </button>
                    </div>

                    <div className='audio_duracao'>
                        <img src={audio} alt="" />
                        <img src="" alt="" />
                    </div>

                    <div>
                        <p>1:30 </p>
                    </div>
                </div>
        </div>
    </section>
  )
}

export default Card