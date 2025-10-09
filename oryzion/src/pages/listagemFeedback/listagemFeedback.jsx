import './ListagemFeedback.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa'
import Usuario from '../../assets/img/Usuario.svg'
import botBanner from '../../assets/img/botBanner.svg'
import Card from '../../components/card/Card'
import Menu from '../../components/menu/Menu'

const ListagemFeedback = () => {
    return(
        <>
            <Header/>
            <BarraPesquisa
            botaoVoltar ="none"
            />
            <main>
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
                                <h3>Anônimo</h3>
                                <p>vou hackearkkk</p>
                                <p className='link_responder'>Responder</p>
                            </div>
                            <div className="card_avaliacao"> 
                                <article class="usuario">
                                    <img src={Usuario} alt=""/>
                                </article>
                                <h3>samanta</h3>
                                <p>pelo menos funciona (o mínimo)</p>
                                <p className='link_responder'>Responder</p>
                            </div>
                            <div className="card_avaliacao"> 
                                <article class="usuario">
                                    <img src={Usuario} alt=""/>
                                </article>
                                <h3>Marcos</h3>
                                <p>gostei, mas e a daily?</p>
                                <p className='link_responder'>Responder</p>
                            </div>          
                    </div>
                </section>

                <section className='listagem_feedbacks'>

                    <Menu/>

                    <div className='qtd_feedback'>
                         <h2>(4) Feedbacks</h2>
                         <hr></hr>
                    </div>

                    <div className='listagem_cards'>
                        <div className='card'>
                            <Card/>
                        </div>
                        <div className='card'>
                            <Card/>
                        </div>
                        <div className='card'>
                            <Card/>
                        </div>
                        <div className='card'>
                            <Card/>
                        </div>

            
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default ListagemFeedback