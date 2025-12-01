import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./ListagemFeedback.css";

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
// ❌ REMOVENDO: import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import Card from '../../components/card/Card';
import ModalChamado from "../../components/modalChamado/ModalChamado";

// 🖼️ Imagens
import Lupa from "../../assets/img/lupa2.png";
import Filtro from "../../assets/img/Slider.svg";


const CARDS_POR_PAGINA = 10;

const ListagemFeedback = () => {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [paginaAtual, setPaginaAtual] = useState(1);

    // 🎯 ESTADOS DE FILTRO
    const [filtroAtivo, setFiltroAtivo] = useState("todos");
    const [searchTerm, setSearchTerm] = useState("");

    // 🎯 ESTADOS DA UI DE PESQUISA
    const [mostrarMenu, setMostrarMenu] = useState(false); // Para o menu mobile de filtros
    const [isMobile, setIsMobile] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
    const [removendoId, setRemovendoId] = useState(null);
    const [toast, setToast] = useState(false);

    const clickTimers = useRef({});

    // ➡️ Lógica do Menu Mobile e Responsividade (Copiado da BarraPesquisa)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener("resize", check);

        return () => window.removeEventListener("resize", check);
    }, []);

    const toggleMenu = () => {
        setMostrarMenu((prev) => !prev);
    };


    // 🟣 Normalizador único de sentimento (Usado para pegar o valor do backend: Sentimento ou Classificacao)
    function normalizarSentimento(s) {
        if (!s) return "neutro";
        const val = s.toString().toLowerCase();
        // Inclui "ativo" e "exibe" como positivo apenas para ter uma cobertura maior de dados vindos da tabela SQL
        if (["positivo", "active", "exibe", "bom", "boa"].includes(val)) return "positivo"; 
        if (["negativo", "inactive", "ruim", "péssimo"].includes(val)) return "negativo";
        return "neutro";
    }

    const handleTripleClick = (id, chamado) => {
        if (!clickTimers.current[id]) {
            clickTimers.current[id] = { count: 0, timeout: null };
        }
        const obj = clickTimers.current[id];
        obj.count++;
        if (obj.timeout) clearTimeout(obj.timeout);
        obj.timeout = setTimeout(() => {
            obj.count = 0;
        }, 350);

        if (obj.count === 2) {
            obj.count = 0;
            abrirModalChamado({
                ...chamado,
                sentimentoNormalizado: normalizarSentimento(
                    chamado.sentimento || chamado.classificacao
                )
            });
        }
    };

    // 🎯 FUNÇÃO PARA MUDAR O FILTRO DE ABAS
    const handleFiltroChange = (novoFiltro) => {
        setFiltroAtivo(novoFiltro);
        setPaginaAtual(1); // Volta para a primeira página ao mudar o filtro
        setMostrarMenu(false); // Fecha o menu mobile ao selecionar
    };


    useEffect(() => {
        async function buscarFeedbacks() {
            try {
                setLoading(true);
                const resposta = await fetch("http://localhost:5128/api/Chamado");
                if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
                const dados = await resposta.json();

                // Mantendo a filtragem inicial apenas para os chamados com status=true (ativos/pendentes)
                const filtrados = Array.isArray(dados)
                    ? dados.filter((ch) => ch.status === true)
                    : [];

                const normalizados = filtrados.map((ch, index) => ({
                    ...ch,
                    sentimentoNormalizado: normalizarSentimento(
                        ch.sentimento || ch.classificacao
                    ),
                    numeroProtocolo: ch.idProtocolo || ch.idChamado
                }));

                setFeedbacks(normalizados);
                setPaginaAtual(1);
            } catch (err) {
                console.error("Erro ao buscar feedbacks:", err);
            } finally {
                setLoading(false);
            }
        }
        buscarFeedbacks();
    }, []);

    const abrirModalChamado = (chamado) => {
        setChamadoSelecionado(chamado);
        setModalOpen(true);
    };

    const abrirChat = (idChamado, chamado) => {
        console.log("Navegando para o chat com ID:", idChamado);
        navigate(`/chat/${idChamado}`, { state: { chamado: chamado } });
    };

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
            const resposta = await fetch(
                `http://localhost:5128/api/Chamado/${idChamado}/status`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(false),
                }
            );
            if (!resposta.ok) throw new Error("Erro ao atualizar status");

            setTimeout(() => {
                setFeedbacks((prev) => prev.filter((ch) => ch.idChamado !== idChamado));
                setRemovendoId(null);
                setToast(true);
                setTimeout(() => setToast(false), 2700);
            }, 400);
        } catch (err) {
            console.error("Erro ao arquivar:", err);
            setRemovendoId(null);
        }
    };

    // 🎯 LÓGICA DE FILTRAGEM UNIFICADA (BUSCA + ABAS) - CORRIGIDA
    const feedbacksFiltrados = feedbacks.filter((fb) => {
        const termo = searchTerm.toLowerCase();

        // 1. CRITÉRIO DE BUSCA (Protocolo e Nome do Cliente)
        const protocolo = (fb.numeroProtocolo ?? fb.idChamado ?? "").toString().toLowerCase();
        const nomeCliente = (fb.cliente?.usuario?.nome ?? "").toLowerCase();
        const matchBusca = protocolo.includes(termo) || nomeCliente.includes(termo);
        if (!matchBusca) return false; 

        // 2. CRITÉRIO DE FILTRO POR ABAS (Sentimento/Status)
        let matchFiltroAba = false;

        const sentimento = fb.sentimentoNormalizado;
        // Mapeia o booleano 'status' do backend: true=1 (Pendente/Ativo), false=0 (Resolvido/Arquivado)
        const statusNumerico = fb.status === false ? 0 : 1; 

        switch (filtroAtivo) {
            case "todos":
                matchFiltroAba = true;
                break;
            case "negativos":
                matchFiltroAba = sentimento === "negativo";
                break;
            case "positivos":
                matchFiltroAba = sentimento === "positivo";
                break;
            case "neutros":
                matchFiltroAba = sentimento === "neutro";
                break;
            case "resolvidos":
                // CORREÇÃO: Usando 'statusNumerico'
                matchFiltroAba = statusNumerico === 0;
                break;
            case "pendentes":
                // CORREÇÃO: Usando 'statusNumerico'
                matchFiltroAba = statusNumerico === 1;
                break;
            default:
                matchFiltroAba = true;
                break;
        }

        return matchFiltroAba;
    });

    const totalPaginas = Math.max(
        1,
        Math.ceil(feedbacksFiltrados.length / CARDS_POR_PAGINA)
    );
    const indiceInicial = (paginaAtual - 1) * CARDS_POR_PAGINA;
    const indiceFinal = indiceInicial + CARDS_POR_PAGINA;
    const cardsParaExibir = feedbacksFiltrados.slice(indiceInicial, indiceFinal);

    const mudarPagina = (novaPagina) => {
        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
            setPaginaAtual(novaPagina);
        }
    };


    return (
        <>
            <Header />

            <div className="barra_pesquisa_container">

                {isMobile && (
                    <div className="filtro_container">
                        <img
                            src={Filtro}
                            alt="Filtro"    
                            className="filtro_icon"
                            onClick={toggleMenu}
                        />

                        {mostrarMenu && (
                            <div className="filtro_menu">
                                {["todos", "negativos", "positivos", "neutros", "resolvidos", "pendentes"].map(tipo => (
                                    <div
                                        key={tipo}
                                        className={`filtro_item ${filtroAtivo === tipo ? "ativo" : ""}`}
                                        onClick={() => handleFiltroChange(tipo)}
                                    >
                                        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="search_box">
                    <img src={Lupa} alt="Pesquisar" className="lupa_icon" />
                    <input
                        type="text"
                        placeholder="Pesquise por protocolo ou cliente..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filtro Desktop */}
                {!isMobile && (
                    <ul className="links">
                        {["todos", "negativos", "positivos", "neutros", "resolvidos", "pendentes"].map(tipo => (
                            <li
                                key={tipo}
                                className={filtroAtivo === tipo ? "ativo" : ""}
                                onClick={() => handleFiltroChange(tipo)}
                            >
                                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>


            <section className="listagem_feedbacks">

                <h2 className="qtd_feedback">
                    Feedbacks ({feedbacksFiltrados.length})
                </h2>

                <div className="listagem_cards">
                    {loading ? (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Carregando feedbacks...</p>
                    ) : cardsParaExibir.length > 0 ? (
                        cardsParaExibir.map((fb) => (
                            <div
                                key={fb.idChamado}
                                className={`card-wrapper ${removendoId === fb.idChamado ? "removendo" : ""}`}
                                onClick={() => handleTripleClick(fb.idChamado, fb)}
                            >
                                <Card
                                    idChamado={fb.numeroProtocolo ?? fb.idChamado}
                                    nome={fb.cliente?.usuario?.nome ?? "Usuário"}
                                    texto={fb.transcricao}
                                    audio={fb.audio}
                                    data={fb.data}
                                    // 🎯 CORREÇÃO CRÍTICA: Passando o sentimento normalizado da API
                                    sentimento={fb.sentimentoNormalizado}
                                    onArquivar={() => confirmarArquivarChamado(fb.idChamado)}
                                    onOpenModal={(obj) => abrirModalChamado(obj)}
                                    onOpenChat={() => abrirChat(fb.idChamado, fb)}
                                />
                            </div>
                        ))
                    ) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Nenhum feedback encontrado com os filtros atuais.</p>
                    )}
                </div>

                {/* Implementação da Paginação */}
                {totalPaginas > 1 && (
                    <div className="paginacao_container">
                        <button
                            onClick={() => mudarPagina(paginaAtual - 1)}
                            disabled={paginaAtual === 1}
                        >
                            Anterior
                        </button>
                        <span>Página {paginaAtual} de {totalPaginas}</span>
                        <button
                            onClick={() => mudarPagina(paginaAtual + 1)}
                            disabled={paginaAtual === totalPaginas}
                        >
                            Próxima
                        </button>
                    </div>
                )}
            </section>

            {modalOpen && (
                <ModalChamado
                    chamado={chamadoSelecionado}
                    idChamado={chamadoSelecionado?.idChamado}
                    sentimentoCalculado={chamadoSelecionado?.sentimentoNormalizado}
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