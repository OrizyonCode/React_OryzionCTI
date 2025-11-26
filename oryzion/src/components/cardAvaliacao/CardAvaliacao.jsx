import './CardAvaliacao.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Esquerda from '../../assets/img/setaEsquerda.svg'
import Direita from '../../assets/img/setaDireita.svg'
// O import de 'botBanner' foi removido, pois a imagem não o exibe.
// import botBanner from '../../assets/img/botBanner.svg' 

const feedbacks = [
    {
        id: 1,
        nome: "Ana Clara",
        classificacao: "neutro",
        texto: "Ótimo suporte, mas a interface poderia ser mais intuitiva.",
        cor: "#DDE6FF"
    },
    {
        id: 2,
        nome: "Carlos Souza",
        classificacao: "negativo",
        texto: "Péssimo suporte, demoraram muito para resolver um simples problema.",
        cor: "#FFD6D6"
    },
    {
        id: 3,
        nome: "Carlos Souza",
        classificacao: "positivo",
        texto: "Ótimo suporte, resolveram meu problema rapidamente.",
        cor: "#CCF2D5"
    }
];

const CardAvaliacao = () => {

    const [index, setIndex] = useState(0);
    // Define 3 cards visíveis em telas grandes, 1 em telas pequenas.
    const [visibleCount, setVisibleCount] = useState(window.innerWidth <= 768 ? 1 : 3);

    useEffect(() => {
        const h = () => setVisibleCount(window.innerWidth <= 768 ? 1 : 3);
        window.addEventListener("resize", h);
        return () => window.removeEventListener("resize", h);
    }, []);

    const next = () => setIndex(prev => (prev + 1) % feedbacks.length);
    const prev = () => setIndex(prev => (prev - 1 + feedbacks.length) % feedbacks.length);

    const getVisibleCards = () => {
        const arr = [];
        for (let i = 0; i < visibleCount; i++) {
            // Usa o operador módulo (%) para criar um loop de cards.
            arr.push(feedbacks[(index + i) % feedbacks.length]);
        }
        return arr;
    };

    return (
        <section className='banner_listagem'>
            <div className="layout_grid banner_cards">

                <div className="carousel_container">

                    <button className="carousel_button prev" onClick={prev}>
                        <img src={Esquerda} alt="voltar" />
                    </button>

                    <div className="carousel_wrapper">
                        <div className="carousel_inner_feedback">
                            {getVisibleCards().map((fb) => (
                                <div key={fb.id} className="feedback_card">

                                  

                                    <h3>{fb.nome}</h3>

                                    <span
                                        className="badge_feedback"
                                        style={{ backgroundColor: fb.cor }}
                                    >
                                        {fb.classificacao === "positivo" && "Positivo"}
                                        {fb.classificacao === "negativo" && "Negativo"}
                                        {fb.classificacao === "neutro" && "Neutro"}
                                    </span>

                                    <p className="comentario_feedback">“{fb.texto}”</p>

                                    <Link className='link_responder' to="/chat">
                                        Responder
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="carousel_button next" onClick={next}>
                        <img src={Direita} alt="avançar" />
                    </button>
                </div>

                {/* Adicionado o indicador de bolinhas (dots) */}
                <div className="carousel_dots">
                    {feedbacks.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === index % feedbacks.length ? "active" : ""}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CardAvaliacao;