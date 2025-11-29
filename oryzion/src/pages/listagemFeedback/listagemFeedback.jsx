import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "./ListagemFeedback.css";

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import Card from '../../components/card/Card';
import ModalChamado from "../../components/modalChamado/ModalChamado";

/**
 * ListagemFeedback.jsx
 * - Carrossel simples no topo (autoplay + setas)
 * - Paginação (CARDS_POR_PAGINA)
 * - Modal ao clicar no Card
 * - Arquivar com SweetAlert
 */

const CARDS_POR_PAGINA = 10;
const CAROUSEL_VISIBLE = 3; // quantos slides visíveis no carrossel
const CAROUSEL_AUTOPLAY_MS = 4000;

const ListagemFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [paginaAtual, setPaginaAtual] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  const [removendoId, setRemovendoId] = useState(null);
  const [toast, setToast] = useState(false);

  // CARROSSEL
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselTimerRef = useRef(null);

  useEffect(() => {
    async function buscarFeedbacks() {
      try {
        setLoading(true);
        const resposta = await fetch("http://localhost:5128/api/Chamado");
        if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
        const dados = await resposta.json();
        // filtra status true (conforme regra sua)
        const filtrados = Array.isArray(dados) ? dados.filter((ch) => ch.status === true) : [];
        setFeedbacks(filtrados);
        // reset pagina
        setPaginaAtual(1);
      } catch (err) {
        console.error("Erro ao buscar feedbacks:", err);
      } finally {
        setLoading(false);
      }
    }
    buscarFeedbacks();
  }, []);

  // PAGINAÇÃO calculos
  const totalPaginas = Math.max(1, Math.ceil(feedbacks.length / CARDS_POR_PAGINA));
  const indiceInicial = (paginaAtual - 1) * CARDS_POR_PAGINA;
  const indiceFinal = indiceInicial + CARDS_POR_PAGINA;
  const cardsParaExibir = feedbacks.slice(indiceInicial, indiceFinal);
  const numerosPaginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  const mudarPagina = (numero) => {
    if (numero < 1 || numero > totalPaginas) return;
    setPaginaAtual(numero);
    // opcional: rolar pro topo da listagem
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  // CARROSSEL: controles
  const carouselItems = feedbacks.slice(0, Math.max(CAROUSEL_VISIBLE, 6)); // pega primeiros itens para o carrossel
  const nextSlide = () => setCarouselIndex((i) => (i + 1) % Math.max(carouselItems.length, 1));
  const prevSlide = () =>
    setCarouselIndex((i) => (i - 1 + Math.max(carouselItems.length, 1)) % Math.max(carouselItems.length, 1));

  // autoplay
  useEffect(() => {
    if (carouselItems.length <= 1) return;
    carouselTimerRef.current?.() && clearInterval(carouselTimerRef.current);
    const timer = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % carouselItems.length);
    }, CAROUSEL_AUTOPLAY_MS);
    carouselTimerRef.current = () => clearInterval(timer);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselItems.length]);

  // abrir modal
  const abrirModalChamado = (chamado) => {
    setChamadoSelecionado(chamado);
    setModalOpen(true);
  };

  // arquivar com SweetAlert
  const confirmarArquivarChamado = async (idChamado) => {
    const result = await Swal.fire({
      title: "Arquivar chamado?",
      text: "Você tem certeza que deseja arquivar este feedback?",
      icon: "warning",
      background: "#111828",
      color: "#FFFFFF",
      showCancelButton: true,
      confirmButtonColor: "#5D50E8",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Sim, arquivar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await arquivarChamado(idChamado);
      Swal.fire({
        title: "Arquivado!",
        text: "O feedback foi movido para os arquivados.",
        icon: "success",
        background: "#111828",
        color: "#FFFFFF",
        confirmButtonColor: "#5D50E8",
      });
    }
  };

  const arquivarChamado = async (idChamado) => {
    try {
      setRemovendoId(idChamado);
      const resposta = await fetch(`http://localhost:5128/api/Chamado/${idChamado}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: false }),
      });
      if (!resposta.ok) throw new Error("Erro ao atualizar status");
      // animação + remoção
      setTimeout(() => {
        setFeedbacks((prev) => prev.filter((ch) => ch.idChamado !== idChamado));
        setRemovendoId(null);
        setToast(true);
        setTimeout(() => setToast(false), 2700);
      }, 400);
    } catch (err) {
      console.log("ID recebido:", idChamado);
      console.error("Erro ao arquivar:", err);
      setRemovendoId(null);
    }
  };

  // enquanto carrega
  if (loading) {
    return (
      <>
        <Header />
        <BarraPesquisa />
        <main style={{ padding: 40, textAlign: "center" }}>Carregando feedbacks...</main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <BarraPesquisa />

      <section className="listagem_feedbacks">
        {/* --- CARROSSEL SIMPLES --- */}
        <div className="carrossel_container" style={{ width: "100%", maxWidth: 1200, margin: "20px auto 0 auto" }}>
          <div className="carrossel_inner" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="carrossel_nav" onClick={prevSlide} aria-label="Anterior">
              ‹
            </button>

            <div className="carrossel_track" style={{ display: "flex", gap: 12, overflow: "hidden", flex: 1 }}>
              {carouselItems.length === 0 ? (
                <div style={{ padding: 20 }}>Sem destaques</div>
              ) : (
                carouselItems.map((item, idx) => {
                  // calcular offset visual
                  const offset = ((idx - carouselIndex + carouselItems.length) % carouselItems.length);
                  const hidden = offset >= CAROUSEL_VISIBLE;
                  return (
                    <div
                      key={item.idChamado ?? item.id ?? idx}
                      className={`carrossel_card ${hidden ? "hidden" : ""}`}
                      style={{
                        minWidth: `${100 / CAROUSEL_VISIBLE}%`,
                        transform: hidden ? "scale(0.95)" : "scale(1)",
                        opacity: hidden ? 0.3 : 1,
                        transition: "all .35s",
                        cursor: "pointer",
                        padding: 12,
                        boxSizing: "border-box",
                      }}
                      onClick={() => abrirModalChamado(item)}
                    >
                      <div style={{ background: "#fff", borderRadius: 12, padding: 14, boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <div style={{ width: 48, height: 48, borderRadius: 24, background: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>👤</div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{item.cliente?.usuario?.nome ?? "Usuário"}</div>
                            <div style={{ fontSize: 12, color: "#666" }}>{new Date(item.data).toLocaleString("pt-BR")}</div>
                          </div>
                        </div>

                        <div style={{ marginTop: 10, color: "#333", fontSize: 14 }}>
                          {item.transcricao ?? "Nenhuma transcrição disponível."}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <button className="carrossel_nav" onClick={nextSlide} aria-label="Próximo">
              ›
            </button>
          </div>
        </div>

        {/* --- TÍTULO --- */}
        <h2 className="qtd_feedback" style={{ marginTop: 28, marginBottom: 8 }}>
          Feedbacks ({feedbacks.length})
        </h2>

        {/* --- LISTA DE CARDS (PAGINADA) --- */}
        <div className="listagem_cards">
          {cardsParaExibir.length === 0 ? (
            <div style={{ padding: 30, textAlign: "center" }}>Nenhum feedback encontrado.</div>
          ) : (
            cardsParaExibir.map((fb) => (
              <div
                key={fb.idChamado}
                className={`card-wrapper ${removendoId === fb.idChamado ? "removendo" : ""}`}
              >
                <Card
                  idChamado={fb.idChamado}
                  nome={fb.cliente?.usuario?.nome ?? "Usuário"}
                  texto={fb.transcricao}
                  audio={fb.audio}
                  data={fb.data}
                  sentimento={fb.sentimento}
                  onArquivar={() => confirmarArquivarChamado(fb.idChamado)}
                  onOpenModal={() => abrirModalChamado(fb)}
                />
              </div>
            ))
          )}
        </div>

        {/* --- PAGINAÇÃO --- */}
        <div className="paginacao_container" style={{ marginTop: 12 }}>
          <button className="botao_pagina" onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
            «
          </button>

          {numerosPaginas.map((numero) => (
            <button key={numero} className={`botao_pagina ${paginaAtual === numero ? "ativo" : ""}`} onClick={() => mudarPagina(numero)}>
              {numero}
            </button>
          ))}

          <button className="botao_pagina" onClick={() => mudarPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
            »
          </button>
        </div>
      </section>

      {/* --- MODAL --- */}
      {modalOpen && (
        <ModalChamado
          chamado={chamadoSelecionado}
          idChamado={chamadoSelecionado?.idChamado}
          onClose={() => setModalOpen(false)}
          onArquivar={(id) => confirmarArquivarChamado(id)}
        />
      )}

      <Footer />

      {toast && <div className="toast show">Chamado arquivado!</div>}
    </>
  );
};

export default ListagemFeedback;
