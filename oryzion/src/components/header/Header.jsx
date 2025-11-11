import React, { useState } from 'react';
import './Header.css';
import Logo from '../../assets/img/LogoOryzion.svg';
import Suporte from '../../assets/img/IconSuporte.svg';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";

const Header = (props) => {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const toggleMenu = () => setMenuAtivo(!menuAtivo);

  const estaNoDashboard = location.pathname === "/dashboard";

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

        {/* Links do header */}
        <ul className={`nav_list ${menuAtivo ? 'active' : ''}`} style={props.link_header}>
          {estaNoDashboard ? (
            // Só aparece no dashboard
            <li>
              <Link className='link_header' to="/cadastroequipe">
                Cadastro da equipe
              </Link>
            </li>
          ) : (
            // Aparece em todas as outras telas
            <>
              <li>
                <Link className='link_header' to="/listagemchamado">
                  Lista de chamados
                </Link>
              </li>
              <li>
                <Link className='link_header' to="/Listagemfeedback">
                  Lista de feedbacks
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Perfil do usuário */}
        <div className='header_pefil'>
          <h3 className='usuario'>
            {usuario?.nome ? usuario.nome : "Usuário"}
          </h3>
          <Link to="/perfil">
            <img src={Suporte} alt="Ícone de perfil" />
          </Link>
        </div>
        
      </nav>
    </header>
  );
};

export default Header;