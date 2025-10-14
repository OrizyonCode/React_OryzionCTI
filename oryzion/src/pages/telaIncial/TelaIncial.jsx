import React from 'react'
import Header from '../../components/header/Header'
import campo_um from '../../assets/img/campo_um.svg'
import campo_dois from '../../assets/img/campo_dois.svg'
import './TelaIncial.css'
import Footer from '../../components/footer/Footer'
import cursor from '../../assets/img/cursor.png'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const TelaInicial = () => {
    const navigate = useNavigate();


    return (
        <>
            < Header />
            <div className=" centralizacao">
                <div className="titulo">
                    <h1>Olá, (Nome)</h1>
                    <p>Acesse as páginas de Chamados e Feedbacks clicando em um dos campos abaixo.</p>
                </div>

                <div className='fundo'>
                    <div className="campos">
                    {/* Primeiro quadrante */}
                    <div
                        className="campo_um"
                        onClick={() => navigate("/listagemchamado")}
                        style={{ cursor: "pointer" }}
                    >
                        <img className="campo_um" src={campo_um} alt="Lista de Chamados" />
                        <div className="acesse-aqui-overlay">Lista de Chamados</div>
                    </div>

                    {/* Segundo quadrante */}
                    <div
                        className="campo_dois"
                        onClick={() => navigate("/listagemfeedback")}
                        style={{ cursor: "pointer" }}
                    >
                        <img className="campo_dois" src={campo_dois} alt="Listagem de Feedbacks" />
                        <div className="acesse-aqui-overlay">Listagem de Feedbacks</div>
                    </div>
                    </div>
                </div>
            </div>
            < Footer />
        </>
    )
}

export default TelaInicial