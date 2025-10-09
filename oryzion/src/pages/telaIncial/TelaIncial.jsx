import React from 'react'
import Header from '../../components/header/Header'
import campo_um from '../../assets/img/campo_um.svg'
import campo_dois from '../../assets/img/campo_dois.svg'
import './TelaIncial.css'
import Footer from '../../components/footer/Footer'
import cursor from '../../assets/img/cursor.png'

const TelaInicial = () => {
    return (
        <>
            < Header />
            <div className="layout_grid centralizacao">
                <div className="titulo"><h1>Olá, (Nome)</h1><p>Acesse as páginas de Chamados e Feedbacks clicando em um dos campos abaixo.</p></div>
                <div className="campos">
                    <div className="campo_um">
                        <img className='campo_um' src={campo_um} alt="" />
                        <div className="acesse-aqui-overlay">
                            Acesse aqui 
                        </div>
                    </div>
                    <div className="campo_dois">
                        <img className='campo_dois' src={campo_dois} alt="" />
                        <div className="acesse-aqui-overlay">
                            Acesse aqui
                        </div>
                    </div>
                </div>
            </div>
            < Footer />
        </>
    )
}

export default TelaInicial