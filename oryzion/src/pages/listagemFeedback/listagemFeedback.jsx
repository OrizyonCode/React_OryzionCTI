import { useState } from 'react';
import './ListagemFeedback.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa'
import Card from '../../components/card/Card'
import CardAvaliacao from '../../components/cardAvaliacao/cardAvaliacao'
import { useEffect } from 'react'

const ListagemFeedback = () => {
<<<<<<< HEAD
    const [listagemFeedback, setListagemFeedback] = useEffect([]);

    useEffect(() => {
        listagemFeedback();
    }, []);

    return (
        <>
            <Header />
            <BarraPesquisa
                botaoVoltar="none"
            />
            <CardAvaliacao />
            <main className='main_feedbacks'>

=======
  // Simulação de dados (poderia vir de uma API)
  const feedbacks = [
    { id: 1, classificacao: "positivo" },
    { id: 2, classificacao: "negativo" },
    { id: 3, classificacao: "neutro" },
    { id: 4, classificacao: "positivo" },
    { id: 5, classificacao: "negativo" },
    { id: 6, classificacao: "neutro" },
  ];
>>>>>>> 19a6fecfb3e77632df611a20d7ac4e040be4f5f8

  const [paginaAtual, setPaginaAtual] = useState(1);
  const feedbacksPorPagina = 3; // quantos cards aparecem por página

  // Calcular feedbacks visíveis
  const indiceInicial = (paginaAtual - 1) * feedbacksPorPagina;
  const indiceFinal = indiceInicial + feedbacksPorPagina;
  const feedbacksVisiveis = feedbacks.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(feedbacks.length / feedbacksPorPagina);

<<<<<<< HEAD
                        <div className='feedback'>
                            <Card />
                        </div>
                        <div className='feedback'>
                            <Card />
                        </div>
                        <div className='feedback'>
                            <Card />
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
=======
  const mudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  };

  return (
    <>
      <Header 
        visibilidade="none"
      />
      <BarraPesquisa botaoVoltar="none" />
      <CardAvaliacao />

      <main className='main_feedbacks'>
        <section className='layout_grid listagem_feedbacks'>
          <div className='listagem_cards'>
            <div className='qtd_feedback'>
              <h2>({feedbacks.length}) Feedbacks</h2>
            </div>

            {/* Lista dinâmica */}
            {feedbacksVisiveis.map((fb) => (
              <div key={fb.id} className='feedback'>
                <Card classificacao={fb.classificacao} />
              </div>
            ))}

            {/* Paginação */}
            <div className="paginacao" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              marginTop: '20px'
            }}>
              <button onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
                ←
              </button>

              {[...Array(totalPaginas)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => mudarPagina(index + 1)}
                  style={{
                    fontWeight: paginaAtual === index + 1 ? 'bold' : 'normal',
                    backgroundColor: paginaAtual === index + 1 ? '#313D65' : '#DADDE9',
                    color: paginaAtual === index + 1 ? '#fff' : '#000',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {index + 1}
                </button>
              ))}

              <button onClick={() => mudarPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
                →
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
>>>>>>> 19a6fecfb3e77632df611a20d7ac4e040be4f5f8
}

export default ListagemFeedback;