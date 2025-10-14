import React from 'react'
import './Chamado.css'
import Botao from '../../components/botao/Botao'
import VoltarBranco from "../../components/voltarBranco/voltarBranco";

const Chamado = () => {
    return (
        <>
            <div className="todoOChamado">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="borda_para_os_simbolos">
                            <VoltarBranco/>
                            <form action="">
                                <div className="titulo_2">
                                    <h1>Chamado</h1>
                                </div>
                                <label htmlFor="">Nome</label>
                                <input className='input_chamado' type="text" placeholder='Nome completo do cliente' />
                                <label htmlFor="">Telefone</label>
                                <input className='input_chamado' type="tel" placeholder='(99) 9 9999-9999' />
                                <label htmlFor="">CPF</label>
                                <input className='input_chamado' type="text" placeholder='000.000.000-00' />
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