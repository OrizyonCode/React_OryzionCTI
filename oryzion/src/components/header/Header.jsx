import React from 'react'
import './Header.css'
import Logo from '../../assets/img/LogoOryzion.svg'
import Suporte from '../../assets/img/IconSuporte.svg'


const Header = () => {

  return (
    <header>
      <div className='layout_grid header_header'>
          <div className='logo_header'>
              <img src={Logo} alt="" />
          </div>

          <div className='header_pefil'>
              <img src={Suporte} alt="" />
              <h3>Suporte</h3>
          </div>       
      </div>
    </header>
  );
};


export default Header;