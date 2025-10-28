// aqui temos os imports
import './Login.css'
import Botao from '../../components/botao/Botao'

const Login = () => {


    return (
        <>
            <div className="todoOLoginCliente">
                <div className="paraCentralizar">
                    <div className="borda">
                        <div className="borda_para_os_simbolos">


                            <form action="" onSubmit={realizarAutenticacao}>
                                <div className="titulo_4">
                                    <h1>Login</h1>
                                </div>
                                <label htmlFor="">Email</label>
                                <input
                                    className='input_login_cliente'
                                    type="email"
                                    placeholder='Digite seu email'
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="">Senha</label>
                                <input
                                    className='input_login_cliente'
                                    type="password"
                                    placeholder='Digite sua senha'
                                    name="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <div className="espacamento"></div>
                                <div className="botao">
                                    <Botao nomeBotao="Entrar" type="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;