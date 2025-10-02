import React from 'react'
import './Login.css'
import Botao from '../../components/botao/Botao'

const Login = () => {
    return (
        <>
            <div className="paraCentralizar">
                <div className="borda">
                    <div className="borda_para_os_simbolos">


                        <form action="">
                            <div className="titulo">
                                <h1>Login</h1>
                            </div>
                            <label htmlFor="">Email</label>
                            <input type="email" />
                            <label htmlFor="">Senha</label>
                            <input type="password" />
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
        </>

    )
}

export default Login