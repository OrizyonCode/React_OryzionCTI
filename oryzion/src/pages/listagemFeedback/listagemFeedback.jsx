import { useState, useEffect } from 'react';
import './ListagemFeedback.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import Card from '../../components/card/Card';
import CardAvaliacao from '../../components/cardAvaliacao/CardAvaliacao';
import api from '../../Services/services';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const ListagemFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const feedbacksPorPagina = 3;
  const navigate = useNavigate();

  const removerFeedback = (idFeedback) => {
  setFeedbacks((prevFeedbacks) => {
    const novosFeedbacks = prevFeedbacks.filter(
      (f) => f.idFeedback !== idFeedback && f.IdFeedback !== idFeedback
    );

    // 🔹 Se quiser que apareça outro logo em seguida:
    // (simula a chegada de um novo item da API)
    api.get('/feedback').then((res) => {
      const novos = res.data;
      const feedbackNovo = novos.find(
        (n) => !novosFeedbacks.some((existente) => existente.idFeedback === n.idFeedback)
      );
      if (feedbackNovo) {
        // adiciona um novo feedback ao final
        setFeedbacks((atual) => [...atual, feedbackNovo]);
      }
    });

    return novosFeedbacks;
  });
};


  async function classificarFeedbacks() {
    try {
      const respostaFeedback = await api.get('/feedback');
      const listaFeedbacks = respostaFeedback.data;

      if (!listaFeedbacks || listaFeedbacks.length === 0) {
        alert('Nenhum feedback encontrado para classificar.');
        return;
      }

      for (const fb of listaFeedbacks) {
        const comentario = fb.comentario || fb.texto || fb.Texto;
        if (!comentario?.trim()) continue;

        const respostaIa = await api.post('/AzureTextAnalyticsClient', { texto: comentario });
        const sentimento =
          respostaIa.data?.sentimento ||
          respostaIa.data?.Sentimento ||
          respostaIa.data?.resultado ||
          'neutro';

        const classificacaoObj = {
          idClassificacao: uuidv4(),
          nome: fb.nomeUsuario || 'Usuário Anônimo',
          comentario: comentario,
          sentimento: sentimento,
        };

        await api.post('/Classificacao', classificacaoObj);
      }
    } catch (error) {
      console.error('Erro ao classificar feedbacks:');
      if (error.response) {
        alert(`Erro da API: ${error.response.data}`);
      } else {
        alert('Erro ao classificar feedbacks.');
      }
    }
  }

  useEffect(() => {
    async function carregarFeedbacksEClassificar() {
      try {
        const resposta = await api.get('/feedback');
        setFeedbacks(resposta.data);

        await classificarFeedbacks();

        const atualizados = await api.get('/feedback');
        setFeedbacks(atualizados.data);
      } catch (erro) {
        console.error('Erro ao buscar ou classificar feedbacks:', erro);
        setErro('Erro ao carregar os feedbacks. Tente novamente mais tarde.');
      } finally {
        setCarregando(false);
      }
    }

    carregarFeedbacksEClassificar();
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

      <main className="main_feedbacks">
        <section className="layout_grid listagem_feedbacks">
          <div className="listagem_cards">
            <div className="qtd_feedback">
              <h2>({feedbacks.length}) Feedbacks</h2>
            </div>

            {carregando ? (
              <p>Carregando feedbacks...</p>
            ) : erro ? (
              <p className="erro">{erro}</p>
            ) : feedbacks.length === 0 ? (
              <p>Nenhum feedback encontrado.</p>
            ) : (
              feedbacksVisiveis.map((f) => {
                const texto = f.texto || f.Texto || f.comentario || f.Comentario || '';
                const classificacaoObj =
                  f.classificacao ||
                  f.Classificacao ||
                  f.sentimento ||
                  f.Sentimento ||
                  {};

                const sentimento =
                  typeof classificacaoObj === 'string'
                    ? classificacaoObj
                    : classificacaoObj.sentimento ||
                      classificacaoObj.Sentimento ||
                      classificacaoObj.comentario ||
                      classificacaoObj.Comentario ||
                      'neutro';

                return (
                  <div key={f.idFeedback || f.IdFeedback} className="feedback">
                    <Card
                      classificacao={String(sentimento).toLowerCase()}
                      texto={texto}
                      resumo={texto.slice(0, 100)}
                    />
                    <div className="acoes-feedback">
                      <button
                        className="botao-excluir"
                        onClick={() => removerFeedback(f.idFeedback || f.IdFeedback)}
                      >
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            <div className="paginacao">
              <button
                disabled={paginaAtual === 1}
                onClick={() => mudarPagina(paginaAtual - 1)}
              >
                ←
              </button>
              {[...Array(totalPaginas)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => mudarPagina(i + 1)}
                  className={paginaAtual === i + 1 ? 'active' : ''}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={paginaAtual === totalPaginas}
                onClick={() => mudarPagina(paginaAtual + 1)}
              >
                →
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ListagemFeedback;
