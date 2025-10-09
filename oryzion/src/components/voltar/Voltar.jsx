import React from 'react'
import voltar from '../../assets/img/voltar.svg'

const Voltar = ({acaoDeVoltar}) => {
    return (
        <button onClick={acaoDeVoltar}>
            <img src={voltar} alt="" />
        </button>
    )
}

export default Voltar