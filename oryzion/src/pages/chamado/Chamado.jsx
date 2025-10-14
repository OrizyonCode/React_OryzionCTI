import React from 'react'
import './Chamado.css'
import Botao from '../../components/botao/Botao'

const Chamado = () => {
    return (
        <>
            <div className="todoOChamado">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="borda_para_os_simbolos">
                            <form action="">
                                <div className="titulo_2">
                                    <h1>Chamado</h1>
                                </div>
                                <label htmlFor="">Nome</label>
                                <input type="text" placeholder='Nome completo do cliente'/>
                                <label htmlFor="">Telefone</label>
                                <input type="tel" placeholder='(99) 9 9999-9999'/>
                                <label htmlFor="">CPF</label>
                                <input type="text" placeholder='000.000.000-00'/>
                                <div className="espacamento"></div>
                                <div className="botao">
                                    <Botao nomeBotao="Cadastrar" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chamado