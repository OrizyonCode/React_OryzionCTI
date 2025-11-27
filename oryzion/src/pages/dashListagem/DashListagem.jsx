import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./DashListagem.css";
import imgUsuario from "../../assets/img/Usuario.svg";
import dash from "../../assets/img/dash.png";
import help from "../../assets/img/help.svg";
import equipe from "../../assets/img/equipe.svg";
import api from '../../Services/services';
import { useAuth } from "../../contexts/AuthContext";

const DashListagem = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbacksFiltrados, setFeedbacksFiltrados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const feedbacksPorPagina = 5;
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [filtros, setFiltros] = useState({ nome: "", data: "", sentimento: "Todos" });

  const { usuario } = useAuth();
  const location = useLocation();

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get("/feedback");
        const dadosTratados = res.data.map(fb => ({
          usuario: fb.usuario ?? "Anônimo",
          feedback: fb.texto,
          sentimento: fb.classificacao?.comentario?.toLowerCase() ?? "neutro",
          dataOriginal: fb.data,
          data: new Date(fb.data).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }),
          resposta: fb.classificacao?.resposta ?? "Sem resposta",
        }));

        // filtro inicial vindo da outra tela  
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
    let filtrados = lista;

    if (tipo !== "Todos") {
      const t = tipo.toLowerCase();
      filtrados = filtrados.filter(fb => fb.sentimento.includes(t));
    }

    if (filtros.nome) {
      filtrados = filtrados.filter(fb => fb.usuario.toLowerCase().includes(filtros.nome.toLowerCase()));
    }

    if (filtros.data) {
      filtrados = filtrados.filter(fb => fb.data.includes(filtros.data));
    }

    setFeedbacksFiltrados(filtrados);
    setPaginaAtual(1);

  }

  function atualizarNome(nome) {
    setFiltros(prev => {
      const novosFiltros = { ...prev, nome };
      aplicarFiltro(filtroAtivo, feedbacks);
      return novosFiltros;
    });
  }

  function atualizarData(data) {
    setFiltros(prev => {
      const novosFiltros = { ...prev, data };
      aplicarFiltro(filtroAtivo, feedbacks);
      return novosFiltros;
    });
  }

  function atualizarSentimento(sentimento) {
    setFiltros(prev => {
      const novosFiltros = { ...prev, sentimento };
      aplicarFiltro(sentimento, feedbacks);
      return novosFiltros;
    });
  }

  const indiceInicial = (paginaAtual - 1) * feedbacksPorPagina;
  const feedbacksVisiveis = feedbacksFiltrados.slice(indiceInicial, indiceInicial + feedbacksPorPagina);
  const totalPaginas = Math.ceil(feedbacksFiltrados.length / feedbacksPorPagina);
  const mudarPagina = n => { if (n >= 1 && n <= totalPaginas) setPaginaAtual(n); };

  const corClasse = sentimento => {
    if (sentimento.includes("positivo")) return "sent-positivo";
    if (sentimento.includes("negativo")) return "sent-negativo";
    return "sent-neutro";
  };

  const helpCenter = () => alert("Olá! Esta é a central de ajuda.");

  return (<main className="dash_list_main"> <div className="menu_lateral_list"> <div className="usuario_info"> <img src={imgUsuario} alt="" />
    {usuario?.nome || "Usuário"} </div>

    <div className="pages_link">
      <div className="links_lateral">
        <img src={dash} alt="" />
        <Link to="/DashListagem"><p>Dashboard</p></Link>
      </div>
      <div className="links_lateral">
        <img src={equipe} alt="" />
        <Link to="/CadastroEquipe"><p>Cadastro Equipe</p></Link>
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
          <input type="text" placeholder="Buscar por usuário..." value={filtros.nome} onChange={e => atualizarNome(e.target.value)} />
          <input type="text" className="input_busca_data" placeholder="01/01/2000..." value={filtros.data} onChange={e => atualizarData(e.target.value)} />
        </div>
      </div>

      <div className="filtro_todos">
        {["Todos", "Positivo", "Negativo", "Neutro"].map(tipo => (
          <button key={tipo} className={`filtro ${filtroAtivo === tipo ? "ativo" : ""}`} onClick={() => aplicarFiltro(tipo)}>
            {tipo}
          </button>
        ))}
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
            <p className={`sent_tag ${corClasse(item.sentimento)}`}>{item.sentimento}</p>
            <p>{item.data}</p>
            <p className="resposta">{item.resposta}</p>
          </div>
        ))}

        <div className="paginacao_numerica">
          <button className="nav_btn" onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>‹</button>
          {[...Array(totalPaginas)].map((_, idx) => (
            <button key={idx} className={`page_btn ${paginaAtual === idx + 1 ? "active" : ""}`} onClick={() => mudarPagina(idx + 1)}>{idx + 1}</button>
          ))}
          <button className="nav_btn" onClick={() => mudarPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>›</button>
        </div>
      </div>
    </div>
  </main>

  );
};

export default DashListagem;
