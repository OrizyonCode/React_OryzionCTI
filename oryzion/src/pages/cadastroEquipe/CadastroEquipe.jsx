import React from 'react'
import './CadastroEquipe.css'
import Botao from '../../components/botao/Botao'
import VoltarBranco from "../../components/voltarBranco/voltarBranco";

const CadastroEquipe = () => {

    return (
        <>
            <div className="todoOCadastroEquipe">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="borda_para_os_simbolos">
                            <form action="">
                                <div className="para_o_voltar">
                                    <VoltarBranco />
                                </div>
                                <div className="titulo_2">
                                    <h1>Cadastro</h1>
                                    <h5>Equipe</h5>
                                </div>
                                <label htmlFor="">Nome</label>
                                <input className='input_cadastro_equipe' type="text" placeholder='Digite seu nome completo' />
                                <label htmlFor="">Email</label>
                                <input className='input_cadastro_equipe' type="email" placeholder='Digite seu e-mail' />
                                <label htmlFor="">Senha</label>
                                <input className='input_cadastro_equipe' type="password" placeholder='Digite sua senha' />
                                <div className="espacamento_cadastro_equipe"></div>
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

export default CadastroEquipe