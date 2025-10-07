import React from 'react';
import FundoBarraPesquisa from "../../assets/BarraPesquisa.png";
import './BarraPesquisa.css'; 
import Lupa from "../../assets/Search.svg"

const BarraPesquisa = () => {
  return (
    <section>
      <div 
        className="fundo_barra" 
        style={{ backgroundImage: `url(${FundoBarraPesquisa})` }}
      >
        <div className='pesquisas_link'>
          <div className="input_pesquisa">
            <img src={Lupa} alt="Buscar" className="search-icon" />
            <input type="text" className="inpu_arrumando" placeholder="Pesquise aqui" />
          </div>

          <div className='links_barrapesquisa'>
            <a href="#">Negativos</a>
            <a href="#">Positivos</a>
            <a href="#">Neutros</a>
            <a href="#">Resolvidos</a>
            <a href="#">Pendentes</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BarraPesquisa;