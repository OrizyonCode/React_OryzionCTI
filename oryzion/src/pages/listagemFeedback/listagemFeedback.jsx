import './ListagemFeedback.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import Card from '../../components/card/Card';
import CardAvaliacao from '../../components/cardAvaliacao/CardAvaliacao';

const ListagemFeedback = () => {
  return (
    <>
      <Header/>
      <BarraPesquisa/>
      <CardAvaliacao/>

      <section className='layout_grid listagem_feedbacks'>
        {/* <h2 className='qtd_feedbacks'>
          Feedbacks (3)
        </h2> */}
        <div className='listagem_cards'>
          <Card/>
        </div>
      </section>
      
      <Footer/>
    </>
  )
};

export default ListagemFeedback;