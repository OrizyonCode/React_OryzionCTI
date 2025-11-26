import React, { useState, useEffect, useRef } from "react";
import "./CardAvaliacao.css";

import botBanner from "../../assets/img/botBanner.svg";
import Esquerda from "../../assets/img/setaEsquerda.svg";
import Direita from "../../assets/img/setaDireita.svg";
import { Link } from "react-router-dom";

const avaliacoes = [
  { nome: "Ana Clara", resumo: "Ótima plataforma! Aprendi muito rápido.", sentimento: "positivo" },
  { nome: "Carlos Souza", resumo: "Suporte excelente, resolveram meu problema!", sentimento: "positivo" },
  { nome: "Mariana Lopes", resumo: "Gostei, mas poderia ter mais temas.", sentimento: "neutro" },
  { nome: "João Pedro", resumo: "Travou algumas vezes, mas é boa.", sentimento: "negativo" },
  { nome: "Rafael Dias", resumo: "Muito bom! Recomendo bastante.", sentimento: "positivo" },
];

const CardAvaliacao = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(window.innerWidth <= 768 ? 1 : 3);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % avaliacoes.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + avaliacoes.length) % avaliacoes.length);
    resetAutoPlay();
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < visibleCount; i++) {
      cards.push(avaliacoes[(currentIndex + i) % avaliacoes.length]);
    }
    return cards;
  };

  const startAutoPlay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % avaliacoes.length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetAutoPlay = () => {
    stopAutoPlay();
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => startAutoPlay(), 8000);
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth <= 768 ? 1 : 3);
    };

    window.addEventListener("resize", handleResize);
    startAutoPlay();

    return () => {
      window.removeEventListener("resize", handleResize);
      stopAutoPlay();
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className="banner_listagem">
      <div className="banner_cards">
        <h2 className="titulo">Avaliações recentes</h2>

        <div className="botBanner">
          <img src={botBanner} alt="" />
        </div>

        <div className="carousel_container">
          <button className="carousel_button prev" onClick={prevSlide}>
            <img src={Esquerda} alt="voltar" />
          </button>

          <div className="carousel_wrapper">
            <div className="carousel_inner">
              {getVisibleCards().map((item, index) => (
                <div key={index} className="card_feedback">
                  <span className={`badge_sentimento ${item.sentimento}`}>
                    {item.sentimento}
                  </span>

                  <h3 className="nome">{item.nome}</h3>

                  <p className="resumo">{item.resumo}</p>

                  <Link className="link_responder" to="/chat">Responder</Link>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel_button next" onClick={nextSlide}>
            <img src={Direita} alt="avançar" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardAvaliacao;