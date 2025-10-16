import React from 'react'
import './Login.css'
import Botao from '../../components/botao/Botao'

<<<<<<< HEAD:oryzion/src/pages/loginCliente/LoginCliente.jsx
const LoginCliente = () => {


=======
const Login = () => {
>>>>>>> a6b2bb6d3066d1cde66e10ff93f2b4ea61e34cc0:oryzion/src/pages/login/Login.jsx
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
                                <label htmlFor="">Email</label>
                                <input className='input_login_cliente' type="email" placeholder='Digite seu email' />
                                <label htmlFor="">Senha</label>
                                <input className='input_login_cliente' type="password" placeholder='Digite sua senha' />
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

export default Login