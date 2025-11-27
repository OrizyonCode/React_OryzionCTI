import './CardAvaliacao.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Esquerda from '../../assets/img/setaEsquerda.svg'
import Direita from '../../assets/img/setaDireita.svg'
import api from '../../Services/services';

// Mapeamento das cores dos badges com base na classificação (sentimento)
const BADGE_COLORS = {
    positivo: '#CCF2D5',
    negativo: '#FFD6D6',
    neutro: '#DDE6FF'
};

const CardAvaliacao = () => {

    const [feedbacksData, setFeedbacksData] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    
    const [index, setIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(window.innerWidth <= 768 ? 1 : 3);


    useEffect(() => {
        
        const fetchFeedbacks = async () => {
            try {
                // 1. Apenas uma chamada: /api/Feedback (inclui a classificação)
                const response = await api.get('/Feedback'); 
                
                const rawFeedbacks = response.data;

                // 2. Filtrar, Mapear e Enriquecer os Feedbacks
                const filteredData = rawFeedbacks
                    .filter(fb => {
                        // 2a. Regra de Negócio: Filtro de MENOS de 10 palavras
                        const wordCount = fb.texto.trim().split(/\s+/).length;
                        return wordCount < 10;
                    })
                    .map(fb => {
                        // 🛑 CORREÇÃO AQUI: Acessando "classificacao" e "comentario" (camelCase)
                        const classificacaoNome = fb.classificacao?.comentario?.toLowerCase() || 'neutro'; 
                        const cor = BADGE_COLORS[classificacaoNome] || BADGE_COLORS.neutro;

                        return {
                            id: fb.idFeedback, 
                            // O nome do usuário permanece como placeholder (Usuário Anônimo)
                            nome: "Usuário Anônimo", 
                            classificacao: classificacaoNome,
                            texto: fb.texto,
                            cor: cor
                        };
                    });

                setFeedbacksData(filteredData);
                setIndex(0);
                

            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchFeedbacks();

        // Lógica de resize handler
        const h = () => setVisibleCount(window.innerWidth <= 768 ? 1 : 3);
        window.addEventListener("resize", h);
        return () => window.removeEventListener("resize", h);
        
    }, []); 

    // --- Lógica do Carrossel (invariável) ---
    const totalItems = feedbacksData.length;
    const next = () => setIndex(prev => (prev + 1) % totalItems);
    const prev = () => setIndex(prev => (prev - 1 + totalItems) % totalItems);

    const getVisibleCards = () => {
        if (totalItems === 0) return [];

        const arr = [];
        for (let i = 0; i < visibleCount; i++) {
            arr.push(feedbacksData[(index + i) % totalItems]);
        }
        return arr;
    };
    
    // --- Renderização de Estado ---
    if (isLoading) {
        return (
            <section className='banner_listagem'>
                <div style={{color: 'white', fontSize: '24px', textAlign: 'center'}}>Carregando feedbacks curtos...</div>
            </section>
        );
    }
    
    if (totalItems === 0) {
         return (
            <section className='banner_listagem'>
                <div style={{color: 'white', fontSize: '24px', textAlign: 'center'}}>Nenhum feedback curto encontrado para o carrossel.</div>
            </section>
        );
    }

    // --- Renderização Principal ---
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

                {/* Indicador de bolinhas (dots) */}
                <div className="carousel_dots">
                    {feedbacksData.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === index % totalItems ? "active" : ""}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CardAvaliacao;