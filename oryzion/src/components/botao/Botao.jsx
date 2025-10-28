import './Botao.css'

const Botao = (props) => {
  return (
    <button 
      className='botaoGeral' 
      type={props.type || "button"} // usa o type passado
      onClick={props.onClick} // permite usar onClick se precisar
    >
      {props.nomeBotao}
    </button>
  )
}

export default Botao
