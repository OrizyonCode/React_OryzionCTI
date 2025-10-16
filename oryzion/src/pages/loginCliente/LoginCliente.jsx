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
                                <div className="titulo_4">
                                    <h1>Login</h1>
                                </div>
                                <label htmlFor="" >Nome completo</label>
                                <input className='input_login_cliente' type="text" placeholder='Digite seu nome completo'/>
                                <label htmlFor="">Email</label>
                                <input className='input_login_cliente' type="email" placeholder='Digite seu email'/>
                                <label htmlFor="">Senha</label>
                                <input className='input_login_cliente' type="password" placeholder='Digite sua senha'/>
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