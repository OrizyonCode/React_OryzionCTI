import React from 'react';
import './Chamado.css';
import Botao from '../../components/botao/Botao';
import VoltarBranco from '../../components/voltarBranco/VoltarBranco';

const Chamado = () => {
  return (
    <div className="todoOChamado">
      <div className="paraCentralizar">
        <div className="borda">
          <div className="voltarBrancoContainer">
            <VoltarBranco />
          </div>

          <form>
            <div className="titulo_2">
              <h1>Chamado</h1>
            </div>

            <label>Nome</label>
            <input
              className='input_chamado'
              type="text"
              placeholder='Nome completo do cliente'
              required
            />

            <label>Telefone</label>
            <input
              className='input_chamado'
              type="tel"
              placeholder='(99) 9 9999-9999'
              required
            />

            <label>CPF</label>
            <input
              className='input_chamado'
              type="text"
              placeholder='000.000.000-00'
              required
            />

            <div className="espacamento_chamado"></div>

            <div className="botao">
              <Botao nomeBotao="Cadastrar" tipo="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chamado;
