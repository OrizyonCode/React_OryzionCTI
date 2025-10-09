import React from 'react'
import './LoginCliente.css'
import Botao from '../../components/botao/Botao'

const LoginCliente = () => {
    return (
        <>
            <div className="todoOLoginCliente">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="borda_para_os_simbolos">


                            <form action="">
                                <div className="titulo">
                                    <h1>Login</h1>
                                </div>
                                <label htmlFor="" >Nome</label>
                                <input type="text" placeholder='Digite seu nome ...'/>
                                <label htmlFor="">Telefone</label>
                                <input type="tel" placeholder='(11) 91234-5678'/>
                                <div className="espacamento"></div>
                                <div className="botao">
                                    <Botao nomeBotao="Entrar" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginCliente