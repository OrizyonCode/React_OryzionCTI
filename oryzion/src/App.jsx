import './App.css'
import Rotas from './routes/Routes'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </>
  );
}

export default App;