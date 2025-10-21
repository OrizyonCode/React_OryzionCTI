import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CadastroEquipe from '../pages/cadastroEquipe/CadastroEquipe.jsx';
import Chamado from '../pages/chamado/Chamado.jsx'
import Chat from '../pages/chat/Chat.jsx'
import DashBoard from '../pages/dashboard/Dashboard.jsx'
import HistoricoFeedback from '../pages/historicoFeedback/HistoricoFeedback.jsx'
import ListagemChamado from '../pages/listagemChamado/ListagemChamado.jsx'
import ListagemFeedback from '../pages/listagemFeedback/listagemFeedback.jsx';
import Perfil from '../pages/perfil/Perfil.jsx'
import Resumo from '../pages/resumo/Resumo.jsx'
import Error from '../pages/error/ErrorPage.jsx'
import TelaInicial from '../pages/telaInicial/TelaInicial.jsx'
import Login from '../pages/login/Login.jsx'



const Rotas = () => {
    
    return(
        <BrowserRouter>
            <Routes>

                <Route path='/chat' element={<Chat/>} />
                <Route path='/dashboard' element={<DashBoard/>} />
                <Route path='/listagemfeedback' element={<ListagemFeedback/>} />
                <Route path='/listagemchamado' element={<ListagemChamado/>} />
                <Route path='/historicofeedback' element={<HistoricoFeedback/>} />
                <Route path='/chamado' element={<Chamado/>} />
                <Route path='/cadastroequipe' element={<CadastroEquipe/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/resumo' element={<Resumo/>} />
                <Route path='/perfil' element={<Perfil/>} />
                <Route path='/telainicial' element={<TelaInicial/>} />
                <Route path='*' element={<Error/>} />

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;


{/* <Route path='/chat' element={ <Privado item={Chat} tipoPermitido='suporte, cliente' />} />
<Route path='/dashboards' element={ <Privado item={DashBoard} tipoPermitido='superior' />} />
<Route path='/listagemfeedback' element={ <Privado item={ListagemFeedback} tipoPermitido='suporte' />} />
<Route path='/listagemchamado' element={ <Privado item={ListagemChamado} tipoPermitido='suporte' />} />
<Route path='/chamado' element={ <Privado item={Chamado} tipoPermitido='suporte' />} />
<Route path='/cadastroequipe' element={ <Privado item={CadastroEquipe} tipoPermitido='superior' />} />
<Route path='/logincliente' element={ <Privado item={LoginCliente} tipoPermitido='cliente' />} />
<Route path='/loginfuncionario' element={ <Privado item={LoginFuncionario} tipoPermitido='suporte' />} />
<Route path='/resumo' element={ <Privado item={Resumo} tipoPermitido='suporte' />} />
<Route path='/perfil' element={ <Perfil/>} /> */}
/*
// const Privado = (props) => {
    //     const { usuario } = useAuth();
    //     //token, idUsuario, tipoUsuario
    
    //     //Se nao estiver autenticado, manda pro login
//     if (!usuario) {
//         return <Navigate to="/" />
//     }
//     //Se o tipo usuario nao for permitido, bloqueia
//     if (usuario.tipoUsuario !== props.tipoPermitido) {
//         //ir para a tela de nao encontrado
//         return <Navigate to="/" />;
//     }

//     // Senao, renderizar o componente passado
//     return <props.item />;
// };
{
    path: "/cadastroequipe",
    element={ <Privado item} />,
    },
    {
        path: "/chamado",
        element: < Chamado />,
        },
        {
            path: "/chat",
            element: < Chat />,
            },
            {
                path: "/dashboard",
                element: < Dashboard />,
                },
                {
                    path: "/historicofeedback",
                    element: < HistoricoFeedback />,
                    },
                    {
                        path: "/listagemchamado",
                        element: < ListagemChamado />,
                        },
                        {
                            path: "/listagemfeedback",
                            element: < ListagemFeedback />,
                            },
                            {
                                path: "/logincliente",
                                element: < LoginCliente />,
                                },
                                {
                                    path: "/loginfuncionario",
                                    element: < LoginFuncionario />,
                                    },
                                    {
                                        path: "/perfil",
                                        element: < Perfil />,
                                        },
                                        {
                                            path: "/resumo",
                                            element: < Resumo />,
                                            },
                                            {
                                                path: "/telainicial",
                                                element: < TelaInicial />,
                                                },
                                                {
                                                    path: "*", 
                                                    element: < ErrorPage />,
                                                    },
                                                    
                                                    
                                                    
*/