import { useState, useEffect } from 'react';
import "./DashListagem.css";
import imgUsuario from "../../assets/img/Usuario.svg";
import dash from "../../assets/img/dash.png";
import help from "../../assets/img/help.svg";
import api from '../../Services/services';
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import equipe from "../../assets/img/equipe.svg"

const DashListagem = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbacksFiltrados, setFeedbacksFiltrados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const feedbacksPorPagina = 5;
  const { usuario } = useAuth();

  // Estado único de filtros
  const [filtros, setFiltros] = useState({
    nome: "",
    data: "",
    sentimento: "Todos",
  });

  // Carregar feedbacks da API
  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get("/feedback");

        const dadosTratados = res.data.map(fb => {
          const sentimentoApi = fb.classificacao?.comentario?.toLowerCase() ?? "neutro";

          return {
            usuario: fb.usuario ?? "Clara",
            feedback: fb.texto,
            sentimento: sentimentoApi,
            data: new Date(fb.data).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            }),
            resposta: fb.classificacao?.resposta ?? "Sem resposta",
          };
        });

        setFeedbacks(dadosTratados);
        setFeedbacksFiltrados(dadosTratados);

      } catch (error) {
        console.error("Erro ao carregar feedbacks", error);
      }
    }

    carregar();
  }, []);

  // Função de filtragem única
  function aplicarFiltros({ nome, data, sentimento }) {
    let filtrados = feedbacks;

    // Filtro por nome
    if (nome) {
      filtrados = filtrados.filter(fb =>
        fb.usuario.toLowerCase().includes(nome.toLowerCase())
      );
    }

    // Filtro por data
    if (data) {
      filtrados = filtrados.filter(fb =>
        fb.data.includes(data)
      );
    }

    // Filtro por sentimento
    if (sentimento && sentimento !== "Todos") {
      filtrados = filtrados.filter(fb =>
        fb.sentimento.toLowerCase() === sentimento.toLowerCase()
      );
    }

    setFeedbacksFiltrados(filtrados);
    setPaginaAtual(1);
  }

  // Atualizar filtros
  function atualizarNome(nome) {
    setFiltros(prev => {
      const novosFiltros = { ...prev, nome };
      aplicarFiltros(novosFiltros);
      return novosFiltros;
    });
  }

  function atualizarData(data) {
    setFiltros(prev => {
      const novosFiltros = { ...prev, data };
      aplicarFiltros(novosFiltros);
      return novosFiltros;
    });
  }

  function atualizarSentimento(sentimento) {
    setFiltros(prev => {
      const novosFiltros = { ...prev, sentimento };
      aplicarFiltros(novosFiltros);
      return novosFiltros;
    });
  }

  // Paginação
  const indiceInicial = (paginaAtual - 1) * feedbacksPorPagina;
  const indiceFinal = indiceInicial + feedbacksPorPagina;
  const feedbacksVisiveis = feedbacksFiltrados.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(feedbacksFiltrados.length / feedbacksPorPagina);

  function mudarPagina(n) {
    if (n >= 1 && n <= totalPaginas) setPaginaAtual(n);
  }

  // Determina classe de cor do sentimento
  function corClasse(sentimento) {
    if (sentimento.includes("positivo")) return "sent-positivo";
    if (sentimento.includes("negativo")) return "sent-negativo";
    if (sentimento.includes("neutro")) return "sent-neutro";
    return "sent-neutro";
  }

  function helpCenter() {
    alert("Olá! Esta é a central de ajuda.");
  }

  return (
    <main className="dash_list_main">

      <div className="menu_lateral_list">
        <div className="usuario_info">
          <img src={imgUsuario} alt="" />
          {usuario?.nome ? usuario.nome : "Usuário"}
        </div>

        <div className="pages_link">
          <div className="links_lateral">
            <img src={dash} alt="" />
            <Link className='dash_link' to="/cadastroequipe">
            Cadastro Equipe
            </Link>
                  
          </div>
          <div className="links_lateral">
            <img src={equipe} alt="" />
            <Link className='dash_link' to="/Dashboard">
            Dashboard
            </Link>
                  
          </div>
        </div>

        <div className="help_link">
          <button className="help_btn" onClick={helpCenter}>
            <img src={help} alt="" />
            <p>Help Center</p>
          </button>
        </div>
      </div>

      <div className="filtro_forms">
        <div className="titulo_busca">
          <h1>Painel Feedbacks</h1>

          <div className="input_busca">
            <input
              type="text"
              placeholder="Buscar por usuário..."
              value={filtros.nome}
              onChange={(e) => atualizarNome(e.target.value)}
            />

            <input
             className="input_busca_data"
              type="text"
              placeholder="01/01/2000..."
              value={filtros.data}
              onChange={(e) => atualizarData(e.target.value)}
            />
          </div>

          
        </div>

        <div className="filtro_todos">
          <button className={`filtro ${filtros.sentimento === "Todos" ? "ativo" : ""}`} onClick={() => atualizarSentimento("Todos")}>Todos</button>
          <button className={`filtro ${filtros.sentimento === "Positivo" ? "ativo" : ""}`} onClick={() => atualizarSentimento("Positivo")}>Positivo</button>
          <button className={`filtro ${filtros.sentimento === "Negativo" ? "ativo" : ""}`} onClick={() => atualizarSentimento("Negativo")}>Negativo</button>
          <button className={`filtro ${filtros.sentimento === "Neutro" ? "ativo" : ""}`} onClick={() => atualizarSentimento("Neutro")}>Neutro</button>
        </div>

        <div className="tabela_feedback">
          <div className="header_linha">
            <h3>Usuário</h3>
            <h3>Feedback</h3>
            <h3>Classificação</h3>
            <h3>Data</h3>
            <h3>Resposta</h3>
          </div>

          {feedbacksVisiveis.map((item, i) => (
            <div className="linha_feedback" key={i}>
              <p>{item.usuario}</p>
              <p>{item.feedback}</p>
              <p className={`sent_tag ${corClasse(item.sentimento)}`}>
                {item.sentimento}
              </p>
              <p>{item.data}</p>
              <p className="resposta">{item.resposta}</p>
            </div>
          ))}

          <div className="paginacao_numerica">
            <button className="nav_btn" onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
              ‹
            </button>

            {[...Array(totalPaginas)].map((_, idx) => (
              <button
                key={idx}
                className={`page_btn ${paginaAtual === idx + 1 ? "active" : ""}`}
                onClick={() => mudarPagina(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            <button className="nav_btn" onClick={() => mudarPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
              ›
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashListagem;
