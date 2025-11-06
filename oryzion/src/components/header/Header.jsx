import React, { useState } from 'react';
import './Header.css';
import Logo from '../../assets/img/LogoOryzion.svg';
import Suporte from '../../assets/img/IconSuporte.svg';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";

const Header = (props) => {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const navigate = useNavigate();


  const toggleMenu = () => setMenuAtivo(!menuAtivo);

  return (
    <header>
      <nav className='layout_grid header_header'>
        <div className='logo_header'>
          <img src={Logo} alt="Logo Oryzion" />
        </div>

        <div className={`mobile_menu ${menuAtivo ? 'active' : ''}`} onClick={toggleMenu}>
          <div className='line1'></div>
          <div className='line2'></div>
          <div className='line3'></div>
        </div>

        <ul className={`nav_list ${menuAtivo ? 'active' : ''}`} style={props.link_header}>
          <Link to="/perfil">
            <img src={Suporte} alt="Ícone de perfil" />
          </Link>
          <li><Link className='link_header' to="/cadastroequipe" >Cadastro da equipe</Link></li>
          <li><Link className='link_header' to="/listagemchamado">Lista de chamados</Link></li>
          <li><Link className='link_header' to="/Listagemfeedback">Lista de feedbacks</Link></li>
        </ul>

        <div className='header_pefil'>
          <h3 className='usuario'>Usuário</h3>
          <Link to="/perfil">
            <img src={Suporte} alt="Ícone de perfil" />
          </Link>
          {/* <button className="botao_sair" onClick={handleLogout}>
            Sair
          </button> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;