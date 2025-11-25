import { useState, useEffect } from 'react';
import "./DashListagem.css";
import imgUsuario from "../../assets/img/Usuario.svg";
import dash from "../../assets/img/dash.png";
import help from "../../assets/img/help.png";
import api from '../../Services/services';

const feedbacks = [];

const DashListagem = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const feedbacksPorPagina = 6;

  useEffect(() => {
  async function listandoFeedback() {
    try {
      const response = await api.get("/feedback");

      console.log("Feedbacks recebidos:", response.data);

      const dadosTratados = response.data.map(fb => ({
    usuario: fb.usuario ?? "Anônimo",
    feedback: fb.texto,
    sentimento: fb.classificacao?.sentimento ?? "Não classificado",
    data: new Date(fb.data).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }),
  resposta: fb.classificacao?.resposta ?? "Sem resposta"
}));


      setFeedbacks(dadosTratados);

    } catch (error) {
      console.error("Erro ao buscar feedbacks:", error);
    } finally {
      setLoading(false);
    }
  }

  listandoFeedback();
}, []);



  const indiceInicial = (paginaAtual - 1) * feedbacksPorPagina;
  const indiceFinal = indiceInicial + feedbacksPorPagina;
  const feedbacksVisiveis = feedbacks.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(feedbacks.length / feedbacksPorPagina);

  const mudarPagina = (nova) => {
    if (nova >= 1 && nova <= totalPaginas) {
      setPaginaAtual(nova);
    }
  };

  return (
    <main className="dash_list_main">
      <div className="menu_lateral_list">
        
        <div className="usuario_info">
          <img src={imgUsuario} alt="" />
          <p>Kaue Antonio</p>
        </div>

        <div className="pages_link">
          <div className="links_lateral">
            <img src={dash} alt="" />
            <p>Dashboard</p>
          </div>
        </div>

        <div className="help_link">
          <button className="help_btn">
            <img src={help} alt="" />
            <p>Help Center</p>
          </button>
        </div>

      </div>

      <div className="filtro_forms">
        
        <div className="titulo_busca">
          <h1>Painel Feedbacks</h1>

          <div className="input_busca">
            <span className="icon">🔍</span>
            <input type="text" placeholder="Search feedback..." />
          </div>
        </div>

        <div className="filtro_todos">
          <button className="filtro">Todos</button>
          <button className="filtro">Positivo</button>
          <button className="filtro">Negativo</button>
          <button className="filtro">Neutro</button>
        </div>

        <div className="dash_list_feedback tabela_feedback">
          <div className="header_linha">
            <h3>Usuário</h3>
            <h3>Feedback</h3>
            <h3>Sentimento</h3>
            <h3>Data</h3>
            <h3>Resposta</h3>
          </div>

          {feedbacksVisiveis.length === 0 && (
            <p style={{ textAlign: "center", padding: "30px", color: "#888" }}>
              Nenhum feedback encontrado.
            </p>
          )}

          {feedbacksVisiveis.map((item, index) => (
            <div className="linha_feedback" key={index}>
              <p>{item.usuario}</p>
              <p>{item.feedback}</p>
              <p>{item.sentimento}</p>
              <p>{item.data}</p>
              <p className="resposta">{item.resposta}</p>
            </div>
          ))}

          {totalPaginas > 1 && (
            <div className="paginacao_numerica">
              <button
                className="nav_btn"
                onClick={() => mudarPagina(paginaAtual - 1)}
                disabled={paginaAtual === 1}
              >
                ‹
              </button>

              {[...Array(totalPaginas)].map((_, i) => {
                const pagina = i + 1;

                if (
                  pagina === 1 ||
                  pagina === totalPaginas ||
                  Math.abs(paginaAtual - pagina) <= 1
                ) {
                  return (
                    <button
                      key={pagina}
                      className={`page_btn ${paginaAtual === pagina ? "active" : ""}`}
                      onClick={() => mudarPagina(pagina)}
                    >
                      {pagina}
                    </button>
                  );
                }

                if (pagina === 2 && paginaAtual > 3)
                  return <span key="start_ellipsis">...</span>;

                if (pagina === totalPaginas - 1 && paginaAtual < totalPaginas - 2)
                  return <span key="end_ellipsis">...</span>;

                return null;
              })}

              <button
                className="nav_btn"
                onClick={() => mudarPagina(paginaAtual + 1)}
                disabled={paginaAtual === totalPaginas}
              >
                ›
              </button>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};

export default DashListagem;
