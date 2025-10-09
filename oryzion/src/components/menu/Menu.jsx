import './Menu.css'
import Pen from '../../assets/img/IconPen.svg'
import List from '../../assets/img/IconList.svg'
import Home from '../../assets/img/IconHome.svg'
import Usuario from '../../assets/img/Usuario.svg'


const Menu = (props) => {
    return(
        <>

            <body>
                <nav>
                    <ul className='nav_list'>
                        <li><a href='/'>Tela inicial</a></li>
                        <li><a href='/'>Lista de Chamados</a></li>
                    </ul>
                </nav>
            </body>
























            {/* <menu className='menu_paginas'> 



                <button className={props.menu_botao}>
                    
                </button>

                <nav className='menu_lateral'>
                    <div className='usuario'>
                        <img className="usuarioIcon" src={Usuario} />
                        <p>Suporte</p>
                    </div>

                    <div className='icons_menu'>
                        <div className='icons'>
                            <ul>
                                <li className='icon'>
                                    <img src={Pen} />
                                </li>
                                <li className='icon'>
                                    <img src={Home} />
                                </li>
                                <li className='icon'>
                                    <img src={List} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className=''>

                </div>





            </menu>
 */}

        </>
    )
}

export default Menu