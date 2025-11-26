import { useState, useEffect } from 'react';
import "./DashListagem.css";
import imgUsuario from "../../assets/img/Usuario.svg";
import dash from "../../assets/img/dash.png";
import help from "../../assets/img/help.png";
import api from '../../Services/services';
import { useAuth } from "../../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

const DashListagem = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbacksFiltrados, setFeedbacksFiltrados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const feedbacksPorPagina = 5;
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");

  const { usuario } = useAuth();
  const location = useLocation();

  // pega filtro vindo da outra tela
  const filtroInicial = location.state?.valor || "Todos";

  useEffect(() => {
  async function carregar() {
    try {
      const res = await api.get("/feedback");

      const dadosTratados = res.data.map(fb => ({
        usuario: fb.usuario ?? "Anônimo",
        feedback: fb.texto,
        sentimento: fb.classificacao?.comentario?.toLowerCase() ?? "neutro",
        dataOriginal: fb.data, // ⬅ tempo real para filtrar por mês
        data: new Date(fb.data).toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        resposta: fb.classificacao?.resposta ?? "Sem resposta",
      }));

      const filtro = location.state?.valor;

      if (filtro === "mesAtual") {
        const agora = new Date();
        const mesAtual = agora.getMonth();
        const anoAtual = agora.getFullYear();

        const filtrados = dadosTratados.filter(fb => {
          const d = new Date(fb.dataOriginal);
          return d.getMonth() === mesAtual && d.getFullYear() === anoAtual;
        });

        setFeedbacks(filtrados);
        setFeedbacksFiltrados(filtrados);
        return;
      }

      // ✔ padrão (todos)
      setFeedbacks(dadosTratados);
      setFeedbacksFiltrados(dadosTratados);

    } catch (error) {
      console.error("Erro ao carregar feedbacks", error);
    }
  }

  carregar();
}, [location.state]);



  function aplicarFiltro(tipo, lista = feedbacks) {
    setFiltroAtivo(tipo);

    if (tipo === "Todos") {
      setFeedbacksFiltrados(lista);
    } else {
      const t = tipo.toLowerCase();
      setFeedbacksFiltrados(
        lista.filter(fb => fb.sentimento.includes(t))
      );
    }

    setPaginaAtual(1);
  }

  const indiceInicial = (paginaAtual - 1) * feedbacksPorPagina;
  const feedbacksVisiveis = feedbacksFiltrados.slice(
    indiceInicial,
    indiceInicial + feedbacksPorPagina
  );

  const totalPaginas = Math.ceil(feedbacksFiltrados.length / feedbacksPorPagina);

  function mudarPagina(n) {
    if (n >= 1 && n <= totalPaginas) setPaginaAtual(n);
  }

  function corClasse(sentimento) {
    if (sentimento.includes("positivo")) return "sent-positivo";
    if (sentimento.includes("negativo")) return "sent-negativo";
    if (sentimento.includes("neutro")) return "sent-neutro";
    return "sent-neutro";
  }

  return (
    <main className="dash_list_main">

      {/* MENU LATERAL */}
      <div className="menu_lateral_list">
        <div className="usuario_info">
          <img src={imgUsuario} alt="" />
          {usuario?.nome ? usuario.nome : "Usuário"}
        </div>

        <div className="pages_link">
          <div className="links_lateral">
            <img src={dash} alt="" />
            <Link to="/DashListagem">
              <p>Dashboard</p>
            </Link>
          </div>
        </div>

        <div className="help_link">
          <button className="help_btn">
            <img src={help} alt="" />
            <p>Help Center</p>
          </button>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="filtro_forms">

        <div className="titulo_busca">
          <h1>Painel Feedbacks</h1>

          <div className="input_busca">
            <input type="text" placeholder="Buscar feedback..." />
          </div>
        </div>

        {/* BOTÕES DE FILTRO */}
        <div className="filtro_todos">
          <button className={`filtro ${filtroAtivo === "Todos" ? "ativo" : ""}`}
            onClick={() => aplicarFiltro("Todos")}
          >
            Todos
          </button>

          <button className={`filtro ${filtroAtivo === "Positivo" ? "ativo" : ""}`}
            onClick={() => aplicarFiltro("Positivo")}
          >
            Positivo
          </button>

          <button className={`filtro ${filtroAtivo === "Negativo" ? "ativo" : ""}`}
            onClick={() => aplicarFiltro("Negativo")}
          >
            Negativo
          </button>

          <button className={`filtro ${filtroAtivo === "Neutro" ? "ativo" : ""}`}
            onClick={() => aplicarFiltro("Neutro")}
          >
            Neutro
          </button>
        </div>

        {/* TABELA */}
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

          {/* PAGINAÇÃO — SEU CSS NÃO FOI ALTERADO */}
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
