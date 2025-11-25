import React, { useState, useEffect } from "react";
import Lupa from "../../assets/img/lupa2.png";
import Filtro from "../../assets/img/Slider.svg";
import "./BarraPesquisa.css";


const BarraPesquisa = ({ visibilidade }) => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const toggleMenu = () => setMostrarMenu(!mostrarMenu);


  return (
    <div className="barra_pesquisa_container">
      {/* Filtro Mobile */}
      {isMobile && visibilidade !== "none" && (
        <div className="filtro_container">
          <img src={Filtro} alt="Filtro" className="filtro_icon" onClick={toggleMenu} />


          {mostrarMenu && (
            <div className="filtro_menu">
              <div className="filtro_item">Negativos</div>
              <div className="filtro_item">Positivos</div>
              <div className="filtro_item">Neutros</div>
              <div className="filtro_item">Resolvidos</div>
              <div className="filtro_item">Pendentes</div>
            </div>
          )}
        </div>
      )}


      {/* Barra de Pesquisa */}
      <div className="search_box">
        <img src={Lupa} alt="Pesquisar" className="lupa_icon" />
        <input type="text" placeholder="Pesquise por feedback..." />
      </div>


      {/* Filtro Desktop */}
      {!isMobile && visibilidade !== "none" && (
        <ul className="links">
          <li>Negativos</li>
          <li>Positivos</li>
          <li className="ativo">Neutros</li>
          <li>Resolvidos</li>
          <li>Pendentes</li>
        </ul>
      )}
    </div>
  );
};


export default BarraPesquisa;