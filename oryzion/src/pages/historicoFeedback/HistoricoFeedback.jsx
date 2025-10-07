import React from 'react';
import "./HistoricoFeedback.css";
import Header from '../../components/header/Header';
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import imgUsuario from "../../assets/img/Usuario.svg";
import Botao from '../../components/botao/Botao';

const HistoricoFeedback = () => {
  return (
    <>
      <Header />
      <BarraPesquisa />

      <section className='layout_grid quadradao'>
        <div className="listagem_historico">
          
          <div className="coluna_esquerda">
            <div className="usuario_caracteristicas">
              <img src={imgUsuario} alt="Usuario" />
              <div className="icone_usuario">
                <p className="">Nome</p>
                <p className="">Simpático</p>
              </div>
            </div>
          </div>

          <div className="coluna_central">
            <div className="info_bloco">
              <p>Total de feedbacks: 16</p>
              <p>Resolvidos: 68%</p>
              <p>Pendentes: 32%</p>
            </div>

            <div className="info_bloco">
              <p>Feedbacks negativos: 8</p>
              <p>Feedbacks positivos: 5</p>
              <p>Feedbacks neutros: 3</p>
            </div>

          </div>
            <Botao nomeBotao="Responda aqui" className="botaoResponda" />

          <div className="comportamento">
            <h4>Ultimos comportamentos</h4>
            <p><b>Simpatico</b></p>
            <p><b>Calmo</b></p>
            <p><b>Atencioso</b></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HistoricoFeedback;
