
import FundoBarraPesquisa from "../../assets/img/BarraPesquisa.png";
import './BarraPesquisa.css';
import Lupa from "../../assets/img/Search.svg"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Filtro from '../../assets/img/Slider.svg'

const BarraPesquisa = (props) => {

  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu);
  };

  return (
    <div className="barra_pesquisa_container">
      {/* 📱 MOBILE: Ícone de filtro + menu dropdown */}
      {isMobile && (
        <div className="filtro_container">
          <img
            src={Filtro}
            alt="Filtro"
            className="filtro_icon"
            onClick={toggleMenu}
          />
          {mostrarMenu && (
            <div className="filtro_menu">
              <div className="filtro_item">Positivos</div>
              <div className="filtro_item">Negativos</div>
              <div className="filtro_item">Neutros</div>
              <div className="filtro_item">Resolvidos</div>
              <div className="filtro_item">Pendentes</div>
            </div>
          )}
        </div>
      )}

      {/* Barra de pesquisa */}
      <div className="search_box">
        <img src={Lupa} alt="Pesquisar" className="lupa_icon" />
        <input type="text" placeholder="Pesquise aqui" />
      </div>

      {/* 🖥️ DESKTOP: Links horizontais */}
      {!isMobile && (
        <ul className="links">
          <li>Positivos</li>
          <li>Negativos</li>
          <li>Neutros</li>
          <li>Resolvidos</li>
          <li>Pendentes</li>
        </ul>
      )}
    </div>
  );
}

export default BarraPesquisa;