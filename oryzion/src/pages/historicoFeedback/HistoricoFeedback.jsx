import React from 'react';
import "./HistoricoFeedback.css";
import Header from '../../components/header/Header'
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import CardHistorico from '../../components/cardHistorico/CardHistorico';
import voltar from '../../assets/img/BotaoVoltar.svg'
import Footer from '../../components/footer/Footer'


const HistoricoFeedback = () => {
  return (
    <>
      <Header />
      <BarraPesquisa 
      botaoVoltar ="none"
      />

      <section className='layout_grid '>
        <div className='voltaBotao'>

            <img src={voltar} alt="" />
        </div>
        
        <div className='listagens_historico'>
            <CardHistorico/>
            <CardHistorico/>

        </div>

      </section>
        <Footer/>
    </>
  );
};

export default HistoricoFeedback;
