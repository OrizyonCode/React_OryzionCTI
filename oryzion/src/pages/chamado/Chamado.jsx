import React from 'react'
import './Chamado.css'
import Botao from '../../components/botao/Botao'

const Chamado = () => {
    return (
        <>
            <div className="todoOChamado">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="voltar">
                            <p>← Voltar</p>
                        </div>
                        <form action="">
                            <div className="titulo">
                                <h1>Chamado</h1>
                            </div>
                            <label htmlFor="">Nome</label>
                            <input type="text" />
                            <label htmlFor="">Telefone</label>
                            <input type="tel" />
                            <label htmlFor="">CPF</label>
                            <input type="number" />
                            <div className="link">
                                <a href="">Esqueceu a senha?</a>
                            </div>
                            <div className="botao">
                                <Botao nomeBotao="Cadastrar" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chamado