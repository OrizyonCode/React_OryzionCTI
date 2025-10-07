import './App.css'
import ListagemFeedback from './pages/listagemFeedback/listagemFeedback';
import Login from './pages/login/Login';
import ClientePerfil from "./pages/perfil_cliente/perfilCliente";
import './App.css';
// import Login from './pages/login/Login';
// import Teste from "./pages/teste/Teste";


function App() {
  return (
    <>
      <ListagemFeedback/>
      {/* <Teste/> */}
      <ClientePerfil/>
      {/* <Login/> */}
    </>
  );
}

export default App;
