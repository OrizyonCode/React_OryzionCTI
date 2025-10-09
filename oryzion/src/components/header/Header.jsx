import React from 'react'
import './Header.css'
import Logo from '../../assets/img/LogoOryzion.svg'
import Suporte from '../../assets/img/IconSuporte.svg'


const Header = () => {

  return (
    <header>
      <nav className='layout_grid header'>
          <img src={Logo} className='logo'></img>

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

         
      </nav>
    </header>
  );
};


export default Header;