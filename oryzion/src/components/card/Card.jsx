import React from "react";
// Assumindo que você ainda precisa importar Usuario e Botao
import Usuario from '../../assets/img/Profile2.png' 
import Botao from "../botao/Botao";
import "./Card.css";

export default function Card() {
  return (
    <div className="card">
      
      {/* 1. Header (Contém Foto/Nome, Texto e Botão) */}
      <div className="card_top_content">
        
        {/* Lado Esquerdo: Foto e Nome */}
        <div className="card_user_info">
          <img className="avatar_user" src={Usuario} alt="Usuário" />
          <h3 className="card_name">João</h3>
        </div>

        {/* Centro: Texto do Feedback */}
        <p className="card_text">
          O aplicativo é bom, mas o processo de chatboarding poderia ser mais
          claro. Fiquei um pouco perdido no início mas depois consegui explicar
          meu problema.
        </p>
        
        {/* Lado Direito: Botão Responder */}
        <div className="responder_botao">
          <Botao nomeBotao="Responder" type="submit" />
        </div>
      </div>
      
      {/* 2. Footer (Contém Badge, Áudio e Tempo) */}
      <div className="card_footer">
        {/* Badge "Neutro" */}
        <span className="card_tag">Neutro</span>
        
        {/* Player de Áudio */}
        <div className="card_audio">
          <button className="card_play">▶</button>
          <div className="card_bar">
            <div className="card_bar_progress" style={{ width: "40%" }}></div>
          </div>
          <span className="card_time">00:43/01:53</span>
        </div>
      </div>
    </div>
  );
}