import React from 'react'
import './LoginFuncionario.css'
import Botao from '../../components/botao/Botao'

const LoginFuncionario = () => {
    return (
        <>
            <div className="todoOLoginFuncionario">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="borda_para_os_simbolos">


                            <form action="">
                                <div className="titulo">
                                    <h1>Login</h1>
                                </div>
                                <label htmlFor="">E-mail</label>
                                <input className='input_login_funcionario' type="email" placeholder='Digite seu e-mail'/>
                                <label htmlFor="">Senha</label>
                                <input className='input_login_funcionario' type="password" placeholder='Digite sua senha'/>
                                <div className="link">
                                    <a href="">Esqueceu a senha?</a>
                                </div>
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

export default LoginFuncionario