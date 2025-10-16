import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD
import './index.css'   // se você tiver esse arquivo; se não, pode remover esta linha

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
=======
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CadastroEquipe from './pages/cadastroEquipe/CadastroEquipe.jsx'
import Chamado from './pages/chamado/Chamado.jsx'
import Chat from './pages/chat/Chat.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import HistoricoFeedback from './pages/historicoFeedback/HistoricoFeedback.jsx'
import ListagemChamado from './pages/listagemChamado/ListagemChamado.jsx'
import ListagemFeedback from './pages/listagemFeedback/listagemFeedback.jsx'
import Perfil from './pages/perfil/Perfil.jsx'
import Resumo from './pages/resumo/Resumo.jsx'
import TelaInicial from './pages/telaInicial/TelaInicial.jsx'
import Login from './pages/login/Login.jsx'
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
    path: "/login",
    element: < Login />,
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
>>>>>>> a6b2bb6d3066d1cde66e10ff93f2b4ea61e34cc0
