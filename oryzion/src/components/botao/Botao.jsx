import './Botao.css'

const Botao = (props) => {
  return (
    <>
    <button className='botaoGeral' type='submit'>{props.nomeBotao}</button>
    </>
  )
}

export default Botao