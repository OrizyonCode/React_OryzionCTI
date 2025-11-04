import './CardAvaliacao.css'
import Usuario from '../../assets/img/Usuario.svg'
import botBanner from '../../assets/img/botBanner.svg'
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Esquerda from '../../assets/img/setaEsquerda.svg'
import Direita from '../../assets/img/setaDireita.svg'

const avaliacoes = [
    { id: 1, texto: 'Gostei' },
    { id: 2, texto: 'Não gostei' },
    { id: 3, texto: 'Mais ou menos' },
    { id: 4, texto: 'Excelente' },
    { id: 5, texto: 'Poderia melhorar' },
    { id: 6, texto: 'Muito bom!' },
    { id: 7, texto: 'Regular' },
    { id: 8, texto: 'Top demais!' },
];

const CardAvaliacao = ({ classificacao = "neutro" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(window.innerWidth <= 768 ? 1 : 3);

    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(window.innerWidth <= 768 ? 1 : 3);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const nextSlide = () => { setCurrentIndex(prev => (prev + 1) % avaliacoes.length); resetAutoPlay(); };
    const prevSlide = () => { setCurrentIndex(prev => (prev - 1 + avaliacoes.length) % avaliacoes.length); resetAutoPlay(); };

    const getVisibleCards = () => {
        const cards = [];
        for (let i = 0; i < visibleCount; i++) {
            cards.push(avaliacoes[(currentIndex + i) % avaliacoes.length]);
        }
        return cards;
    };

    const startAutoPlay = () => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => setCurrentIndex(prev => (prev + 1) % avaliacoes.length), 4000);
    };

    const stopAutoPlay = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    const resetAutoPlay = () => {
        stopAutoPlay();
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => startAutoPlay(), 10000);
    };

    useEffect(() => { startAutoPlay(); return () => { stopAutoPlay(); clearTimeout(timeoutRef.current); }; }, []);

    const visibleCards = getVisibleCards();

    return (
        <section className='banner_listagem'>
            <div className="layout_grid banner_cards">
                <div className="titulo"><h2>Avaliações recentes</h2></div>
                <div className='botBanner'><img src={botBanner} alt="" /></div>
                <div className="carousel_container">
                    <button className="carousel_button prev" onClick={prevSlide}><img src={Esquerda} alt="" /></button>
                    <div className={`carousel_wrapper ${classificacao}`}>
                        <div className="carousel_inner">
                            {visibleCards.map((item) => (
                                <div key={item.id} className="card_avaliacao">
                                    <article className="usuario"><img src={Usuario} alt="Usuário" /></article>
                                    <h3>Usuário</h3>
                                    <span className={`badge_sentimento ${classificacao}`}>
                                        {classificacao === "positivo" && "Positivo"}
                                        {classificacao === "negativo" && "Negativo"}
                                        {classificacao === "neutro" && "Neutro"}
                                    </span>
                                    <p>{item.texto}</p>
                                    <Link className='link_responder' to="/chat">Responder</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="carousel_button next" onClick={nextSlide}><img src={Direita} alt="" /></button>
                </div>
            </div>
        </section>
    );
};

export default CardAvaliacao;
