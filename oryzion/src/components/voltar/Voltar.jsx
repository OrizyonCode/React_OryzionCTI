import React from 'react'
import voltar_preto from '../../assets/img/voltar_preto.svg'
import './Voltar.css'

const Voltar = ({acaoDeVoltar}) => {
    return (
        <button className='botaoVoltar' onClick={acaoDeVoltar}>
            <img src={voltar_preto} alt="" />
        </button>
    )
}

export default Voltar