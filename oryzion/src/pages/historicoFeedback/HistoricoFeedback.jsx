import React from 'react';
import "./HistoricoFeedback.css";
import Header from '../../components/header/Header'
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import CardHistorico from '../../components/cardHistorico/CardHistorico';
import voltar from '../../assets/img/BotaoVoltar.svg'
import Footer from '../../components/footer/Footer'
import Voltar from '../../components/voltar/Voltar'



const HistoricoFeedback = () => {
  return (
    <>
      <Header />
      <BarraPesquisa
        botaoVoltar="none"
      />

      <section className='layout_grid HistoricoFeedback'>
        <div className='listagens_historico'>
          <CardHistorico />
        </div>

      </section>
      <Footer />
    </>
  );
};

export default HistoricoFeedback;
