import React, { useState } from 'react'; // 👈 Importar useState
import './ListagemFeedback.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import Card from '../../components/card/Card';
import CardAvaliacao from '../../components/cardAvaliacao/CardAvaliacao';

// Crie uma lista mock de feedbacks para simular os dados reais.
// Usaremos 12 itens para garantir que a paginação funcione.
const mockFeedbacks = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Usuário ${i + 1}` }));

// Define quantos cards você quer por página
const CARDS_POR_PAGINA = 10;

const ListagemFeedback = () => {
  // 1. Estado para a página atual, começando na página 1
  const [paginaAtual, setPaginaAtual] = useState(1);
  
  // 2. Cálculo para Paginação
  const totalPaginas = Math.ceil(mockFeedbacks.length / CARDS_POR_PAGINA);
  const indiceInicial = (paginaAtual - 1) * CARDS_POR_PAGINA;
  const indiceFinal = indiceInicial + CARDS_POR_PAGINA;
  
  // 3. Filtrar apenas os cards da página atual
  const cardsParaExibir = mockFeedbacks.slice(indiceInicial, indiceFinal);
  
  // 4. Função para mudar a página (será passada para o componente de paginação)
  const mudarPagina = (numeroDaPagina) => {
    // Garante que a página não seja menor que 1 ou maior que o total
    if (numeroDaPagina >= 1 && numeroDaPagina <= totalPaginas) {
      setPaginaAtual(numeroDaPagina);
    }
  };

  // 5. Array com os números das páginas para renderização
  const numerosPaginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <>
      <Header/>
      <BarraPesquisa/>
      <CardAvaliacao/>

      <section className='listagem_feedbacks'>
        {/* Usamos o mockFeedbacks.length para o contador */}
        <h2 className='qtd_feedback'>
          Feedbacks ({mockFeedbacks.length})
        </h2>
        
        <div className='listagem_cards'>
          {/* Mapeia e renderiza APENAS os cards da página atual */}
          {cardsParaExibir.map(feedback => (
            <Card key={feedback.id} data={feedback} />
          ))}
        </div>

        {/* --- 6. Componente de Paginação --- */}
        <div className="paginacao_container">
          {/* Mapeia os números e cria os botões */}
          {numerosPaginas.map(numero => (
            <button
              key={numero}
              className={`botao_pagina ${paginaAtual === numero ? 'ativo' : ''}`}
              onClick={() => mudarPagina(numero)}
            >
              {numero}
            </button>
          ))}
        </div>
      </section>
      
      <Footer/>
    </>
  )
};

export default ListagemFeedback;