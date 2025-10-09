import './CardAvaliacao.css'
import Slider from 'react-slick'
import Usuario from '../../assets/img/Usuario.svg'
import botBanner from '../../assets/img/botBanner.svg'

const CardAvaliacao = () => {    
        return(
            <section className='banner_listagem'>
                    <div className="layout_grid banner_cards">

                        <div className="titulo">
                            <h2>Avaliações recentes</h2>
                        </div>

                        <div className='botBanner'>
                            <img src={botBanner} ></img>
                        </div>

                            <div className="card_avaliacao"> 
                                <article class="usuario">
                                    <img src={Usuario} alt=""/>
                                </article>
                                <h3>Usuário</h3>
                                <p>Gostei</p>
                                <p className='link_responder'>Responder</p>
                            </div>
                            <div className="card_avaliacao"> 
                                <article class="usuario">
                                    <img src={Usuario} alt=""/>
                                </article>
                                <h3>Usuário</h3>
                                <p>Não gostei</p>
                                <p className='link_responder'>Responder</p>
                            </div>
                            <div className="card_avaliacao"> 
                                <article class="usuario">
                                    <img src={Usuario} alt=""/>
                                </article>
                                <h3>Usuário</h3>
                                <p>Mais ou menos</p>
                                <p className='link_responder'>Responder</p>
                            </div>          
                    </div>
                </section>
    )
}

export default CardAvaliacao