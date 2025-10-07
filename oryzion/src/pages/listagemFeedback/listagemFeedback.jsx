import './ListagemFeedback.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa'

const ListagemFeedback = () => {
    return(
        <>
            <Header/>
            <BarraPesquisa/>
            <main className='listagem_feedback'>

                <div className='listagem_menu'>

                    <div className='menu_lateral'>

                    </div>
                        
                    <div className='listagem_feed'>

                    </div>

                </div>

            </main>
            <Footer/>
        </>
    )
}

export default ListagemFeedback