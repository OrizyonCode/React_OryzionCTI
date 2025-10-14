import React from 'react'
import './Header.css'
import Logo from '../../assets/img/LogoOryzion.svg'
import Suporte from '../../assets/img/IconSuporte.svg'
import { Link } from "react-router-dom";


const Header = (props) => {

  return (
    <header>
      <nav className='layout_grid header_header'>
          <div className='logo_header'>
              <img src={Logo} alt="" />
          </div>

          <div className='mobile_menu'>
              <div className='line1'></div>
              <div className='line2'></div>
              <div className='line3'></div>
              <div></div>
          </div>

            <ul style={props.link_header}>
              <li><Link className='link_header' to="/telainicial">Tela Inicial</Link></li>
              <li><Link className='link_header' to="/cadastroequipe">Cadastro Suporte</Link></li>
              <li><Link className='link_header' to="/listagemchamado">Lista de Chamados</Link></li>
            </ul>

          <div className='header_pefil'>
              <img src={Suporte} alt="" />
              <h3><Link className='usuario' to="/perfil">Suporte</Link></h3>
          </div>       
      </nav>
    </header>
  );
};


export default Header;