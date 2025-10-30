import './ListagemFeedback.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa'
import Card from '../../components/card/Card'
import CardAvaliacao from '../../components/cardAvaliacao/cardAvaliacao'
import { useEffect } from 'react'

const ListagemFeedback = () => {
    const [listagemFeedback, setListagemFeedback] = useEffect([]);

    useEffect(() => {
        listagemFeedback();
    }, []);

    return (
        <>
            <Header />
            <BarraPesquisa
                botaoVoltar="none"
            />
            <CardAvaliacao />
            <main className='main_feedbacks'>


                <section className='layout_grid listagem_feedbacks'>

                    <div className='listagem_cards'>

                        <div className='qtd_feedback'>
                            <h2>(3) Feedbacks</h2>
                        </div>

                        <div className='feedback'>
                            <Card />
                        </div>
                        <div className='feedback'>
                            <Card />
                        </div>
                        <div className='feedback'>
                            <Card />
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ListagemFeedback