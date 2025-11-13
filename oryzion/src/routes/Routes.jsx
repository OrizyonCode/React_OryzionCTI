import { Routes, Route } from 'react-router-dom';
import CadastroEquipe from '../pages/cadastroEquipe/CadastroEquipe.jsx';
import Chamado from '../pages/chamado/Chamado.jsx';
import Chat from '../pages/chat/Chat.jsx'
import DashBoard from '../pages/dashboard/Dashboard.jsx'
import HistoricoFeedback from '../pages/historicoFeedback/HistoricoFeedback.jsx'
import ListagemChamado from '../pages/listagemChamado/ListagemChamado.jsx'
import ListagemFeedback from '../pages/listagemFeedback/listagemFeedback.jsx';
import Resumo from '../pages/resumo/Resumo.jsx'
import TelaInicial from '../pages/telaInicial/TelaInicial.jsx'
import Login from '../pages/login/Login.jsx'
import Error from '../pages/error/ErrorPage.jsx'



const Rotas = () => {
    return(
        <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/telainicial' element={<TelaInicial/>} />
                <Route path='/listagemfeedback' element={<ListagemFeedback/>} />
                <Route path='/listagemchamado' element={<ListagemChamado/>} />
                <Route path='/chat' element={<Chat/>} />
                <Route path='/dashboard' element={<DashBoard/>} />
                <Route path='/cadastroequipe' element={<CadastroEquipe/>} />
                <Route path='/historicofeedback' element={<HistoricoFeedback/>} />
                <Route path='/chamado' element={<Chamado/>} />
                <Route path='/resumo' element={<Resumo/>} />
                <Route path='*' element={<Error/>} />
        </Routes>
    )
}

export default Rotas;








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


// const Rotas = () => {

//     return (
//             <Routes>

//                 <Route path='/' element={<Login/>} />
//                 <Route path='/telainicial' element={<Privado item={TelaInicial} tipoPermitido="funcionario"/>} />
//                 <Route path='/listagemfeedback' element={<Privado item={ListagemFeedback} tipoPermitido="funcionario"/>} />
//                 <Route path='/listagemchamado' element={<Privado item={ListagemChamado} tipoPermitido="funcionario"/>} />
//                 <Route path='/chat' element={<Chat/>} />
//                 <Route path='/dashboard' element={<Privado item={DashBoard} tipoPermitido="superior" />} />
//                 <Route path='/cadastroequipe' element={<CadastroEquipe/>} />
//                 <Route path='/historicofeedback' element={<Privado item={HistoricoFeedback} tipoPermitido="funcionario"/>} />
//                 <Route path='/chamado' element={<Privado item={Chamado} tipoPermitido="funcionario"/>} />
//                 <Route path='/resumo' element={<Privado item={Resumo} tipoPermitido="funcionario"/>} />
//                 <Route path='/perfil' element={<Privado item={Perfil} tipoPermitido="funcionario"/>} />
//                 <Route path='*' element={<Error/>} />

//             </Routes>
//     )
// }

// export default Rotas;