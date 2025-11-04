import { useState, useEffect } from 'react';
import './ListagemFeedback.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import Card from '../../components/card/Card';
import CardAvaliacao from '../../components/cardAvaliacao/cardAvaliacao';
import api from '../../Services/services';

const ListagemFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const feedbacksPorPagina = 3;

  useEffect(() => {
    async function buscarFeedbacks() {
      try {
        const resposta = await api.get("/feedback");
        setFeedbacks(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar feedbacks:", erro);
      }
    }
    buscarFeedbacks();
  }, []);

  const indiceInicial = (paginaAtual - 1) * feedbacksPorPagina;
  const indiceFinal = indiceInicial + feedbacksPorPagina;
  const feedbacksVisiveis = feedbacks.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(feedbacks.length / feedbacksPorPagina);

  const mudarPagina = (nova) => {
    if (nova >= 1 && nova <= totalPaginas) setPaginaAtual(nova);
  };

  return (
    <>
      <Header visibilidade="none" />
      <BarraPesquisa botaoVoltar="none" />
      <CardAvaliacao />

      <main className='main_feedbacks'>
        <section className='layout_grid listagem_feedbacks'>
          <div className='listagem_cards'>
            <div className='qtd_feedback'><h2>({feedbacks.length}) Feedbacks</h2></div>

            {feedbacksVisiveis.map((fb) => (
              <div key={fb.idFeedback} className='feedback'>
                <Card
                  classificacao={fb.classificacao}
                  texto={fb.texto}
                  resumo={fb.resumo}
                />
              </div>
            ))}

            <div className="paginacao">
              <button disabled={paginaAtual === 1} onClick={() => mudarPagina(paginaAtual - 1)}>←</button>
              {[...Array(totalPaginas)].map((_, i) => (
                <button key={i} onClick={() => mudarPagina(i + 1)} className={paginaAtual === i + 1 ? 'active' : ''}>{i + 1}</button>
              ))}
              <button disabled={paginaAtual === totalPaginas} onClick={() => mudarPagina(paginaAtual + 1)}>→</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ListagemFeedback;
