import { Routes, Route } from 'react-router-dom';
import CadastroEquipe from '../pages/cadastroEquipe/CadastroEquipe.jsx';
import Chamado from '../pages/chamado/Chamado.jsx'
import Chat from '../pages/chat/Chat.jsx'
import DashBoard from '../pages/dashboard/Dashboard.jsx'
import HistoricoFeedback from '../pages/historicoFeedback/HistoricoFeedback.jsx'
import ListagemChamado from '../pages/listagemChamado/ListagemChamado.jsx'
import ListagemFeedback from '../pages/listagemFeedback/listagemFeedback.jsx';
import Perfil from '../pages/perfil/Perfil.jsx'
import Resumo from '../pages/resumo/Resumo.jsx'
import TelaInicial from '../pages/telaInicial/TelaInicial.jsx'
import Login from '../pages/login/Login.jsx'



const Rotas = () => {

    return (
            <Routes>

                <Route path='/chat' element={<Chat/>} />
                <Route path='/dashboard' element={<DashBoard/>} />
                <Route path='/listagemfeedback' element={<ListagemFeedback/>} />
                <Route path='/listagemchamado' element={<ListagemChamado/>} />
                <Route path='/historicofeedback' element={<HistoricoFeedback/>} />
                <Route path='/chamado' element={<Chamado/>} />
                <Route path='/cadastroequipe' element={<CadastroEquipe/>} />
                <Route path='/' element={<Login/>} />
                <Route path='/resumo' element={<Resumo/>} />
                <Route path='/perfil' element={<Perfil/>} />
                <Route path='/a' element={<TelaInicial/>} />
                <Route path='*' element={<Error/>} />

            </Routes>
    )
}

export default Rotas;