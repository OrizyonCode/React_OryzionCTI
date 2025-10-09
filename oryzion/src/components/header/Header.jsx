import React from 'react'
import './Header.css'
import Logo from '../../assets/img/LogoOryzion.svg'
import Suporte from '../../assets/img/IconSuporte.svg'


const Header = () => {

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

            <ul>
              <li><a href=''>Tela Inicial</a></li>
              <li><a href=''>Lista de Chamados</a></li>
            </ul>

          <div className='header_pefil'>
              <img src={Suporte} alt="" />
              <h3>Suporte</h3>
          </div>       
      </nav>
    </header>
  );
};


export default Header;