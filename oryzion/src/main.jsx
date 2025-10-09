import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CadastroEquipe from './pages/cadastroEquipe/CadastroEquipe.jsx'
import Chamado from './pages/chamado/Chamado.jsx'
import Chat from './pages/chat/Chat.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import HistoricoFeedback from './pages/historicoFeedback/HistoricoFeedback.jsx'
import ListagemChamado from './pages/listagemChamado/ListagemChamado.jsx'
import ListagemFeedback from './pages/listagemFeedback/ListagemFeedback.jsx'
import Perfil from './pages/perfil/Perfil.jsx'
import Resumo from './pages/resumo/Resumo.jsx'
import TelaInicial from './pages/telaIncial/TelaIncial.jsx'
import LoginFuncionario from './pages/loginFuncionario/LoginFuncionario.jsx'
import LoginCliente from './pages/loginCliente/LoginCliente.jsx'
import ErrorPage from './pages/error/ErrorPage.jsx';

const router = createBrowserRouter([

  // o path vai ser a url
  // o element vai ser a página

  {
    path: "/cadastroequipe",
    element: < CadastroEquipe />,
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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < RouterProvider router={router} />
  </StrictMode>,
)
