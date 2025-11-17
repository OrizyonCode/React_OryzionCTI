import React from 'react'
import "./DashListagem.css";
import api from '../../Services/services';
import imgUsuario from "../../assets/img/Usuario.svg"
import dash from "../../assets/img/dash.png"

const DashListagem = () => {
  return (
    <main className='dash_list_main'>
        <div className='menu_lateral_list'>
            <div className='usuario_info'>
                <img src={imgUsuario} alt="" />
                <p>Kaue antonio</p>
            </div>

            <div className='pages_link'>
              <div  className='links_lateral'>
                <img src={dash} alt="" />
                <p>Dashboard</p>
              </div>
              <div className='links_lateral'>
                <img src={dash} alt="" />
                <p>Dashboard</p>
              </div>
              <div className='links_lateral'>
                <img src={dash} alt="" />
                <p>Dashboard</p>
              </div>
              <div className='links_lateral'>
                <img src={dash} alt="" />
                <p>Dashboard</p>
              </div>
            </div>
        </div>

        <div className='filtro_forms'>
          <div className='titulo_busca'>
          <h1>Painel Feedbacks</h1>
          <div className='input_busca'>
          <span class="icon">🔍</span>
           <input type="text" placeholder="Search feedback..."></input>
           </div>
          </div>

          <div className='filtro_todos'></div>
           <button class="filtro">Todos</button>
           <button class="filtro">Positivo</button>
           <button class="filtro">Negativo</button>
           <button class="filtro">Neutro</button>

        </div>
    </main>
  )
}

export default DashListagem;