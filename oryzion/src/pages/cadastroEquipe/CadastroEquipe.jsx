import React from 'react'
import './CadastroEquipe.css'
import Botao from '../../components/botao/Botao'

const CadastroEquipe = () => {
  return (
    <>
<div className="todoOCadastroEquipe">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="borda_para_os_simbolos">
                            <form action="">
                                <div className="titulo_2">
                                    <h1>Cadastro</h1>
                                    <h5>Equipe</h5>
                                </div>
                                <label htmlFor="">Nome</label>
                                <input type="text" placeholder='Digite seu nome ...'/>
                                <label htmlFor="">Email</label>
                                <input type="email" placeholder='@gmail.com'/>
                                <label htmlFor="">Senha</label>
                                <input type="password" placeholder='*************'/>
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

export default CadastroEquipe