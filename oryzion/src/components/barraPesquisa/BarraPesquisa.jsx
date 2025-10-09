import React from 'react';
import FundoBarraPesquisa from "../../assets/img/BarraPesquisa.png";
import './BarraPesquisa.css'; 
import Lupa from "../../assets/img/Search.svg"

const BarraPesquisa = (props) => {
  return (
    <section style={{ backgroundImage: `url(${FundoBarraPesquisa})` }}>
       
      
        <div className='pesquisas_link'>
          <div className="input_pesquisa">
            <img src={Lupa} alt="Buscar" className="search-icon" />
            <input type="text" className="inpu_arrumando" placeholder="Pesquise aqui" />
          </div>

          <div className='links_barrapesquisa'>
            

            <a href="#" style = {{display:props.visiNega}}>Negativos</a>
            <a href="#" style = {{display:props.visiPosi}}>Positivos</a>
            <a href="#" style = {{display:props.visiNeut}}>Neutros</a>
            <a href="#" style = {{display:props.visiReso}}>Resolvidos</a>
            <a href="#" style = {{display:props.visiPend}}>Pendentes</a>
          </div>
        </div>
      
    </section>
  );
};

export default BarraPesquisa;