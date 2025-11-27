import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [modalAberto, setModalAberto] = useState(false);
  const [cardSelecionado, setCardSelecionado] = useState(null);
  const [resumoFeedback, setResumoFeedback] = useState([]);
  const [totalChamados, setTotalChamados] = useState([]);
  const [classificacaoResumo, setClassificacaoResumo] = useState([]);
  const [loading, setLoading] = useState(true);

  const abrirModal = (tipo) => {
    setCardSelecionado(tipo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCardSelecionado(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // -------------------------------
        // 1º GRÁFICO — FEEDBACK
        // -------------------------------
        const feedbackRes = await fetch("https://localhost:7162/api/Feedback/dashboard");
        const feedbackData = await feedbackRes.json();

        const feedbackArray =
          feedbackData && ("respondidos" in feedbackData || "naoRespondidos" in feedbackData)
            ? [
              { name: "Respondidos", value: feedbackData.respondidos || 0 },
              { name: "Não Respondidos", value: feedbackData.naoRespondidos || 0 },
            ]
            : [];

        setResumoFeedback(feedbackArray);

        // -------------------------------
        // 2º GRÁFICO — TOTAL DE CHAMADOS
        // -------------------------------
        const chamadoRes = await fetch("https://localhost:7162/api/Chamado");
        const chamadoData = await chamadoRes.json();

        setTotalChamados([
          { name: "Chamados", quantidade: chamadoData.length || 0 }
        ]);

        // -------------------------------
        // 3º GRÁFICO — CLASSIFICAÇÃO
        // -------------------------------
        const classificacaoRes = await fetch("https://localhost:7162/api/Classificacao");
        const classificacaoData = await classificacaoRes.json();

        let positivos = 0;
        let neutros = 0;
        let negativos = 0;

        classificacaoData.forEach((c) => {
          const comentario = c?.comentario?.toLowerCase() || "";

          if (comentario.includes("positivo")) positivos++;
          else if (comentario.includes("neutro")) neutros++;
          else if (comentario.includes("negativo")) negativos++;
        });

        setClassificacaoResumo([
          { name: "Positivos", value: positivos },
          { name: "Neutros", value: neutros },
          { name: "Negativos", value: negativos },
        ]);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#4ade80", "#f87171", "#60a5fa"];

const renderPieChart = (data, radius = 70) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={radius}
        label
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

  const renderBarChart = (data, dataKey, fillColor) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantidade" fill={fillColor} />
      </BarChart>
    </ResponsiveContainer>
  );

  if (loading) {
    return (
      <>
        <Header />
        <div className="dashboard-container">
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            Carregando dados...
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="dashboard-container">
        <Header />

        <main className="dashboard-graphs">
          {/* PRIMEIRO CARD – FEEDBACK */}
          <div className="dash-card" onClick={() => abrirModal("feedback")}>
            <h3>FEEDBACK RESPONDIDO</h3>
            <div className="grafico-placeholder">
              {resumoFeedback.length > 0 ? (
                renderPieChart(resumoFeedback, 90)
              ) : (
                <p>Nenhum dado disponível</p>
              )}
            </div>
          </div>

          {/* SEGUNDO CARD – TOTAL DE CHAMADOS */}
          <div className="dash-card" onClick={() => abrirModal("total")}>
            <h3>TOTAL DE CHAMADOS</h3>
            <div className="grafico-placeholder">
              {totalChamados.length > 0 ? (
                renderBarChart(totalChamados, "name", "#60a5fa")
              ) : (
                <p>Nenhum dado disponível</p>
              )}
            </div>
          </div>

          {/* TERCEIRO CARD – CLASSIFICAÇÃO */}
          <div className="dash-card" onClick={() => abrirModal("classificacao")}>
            <h3>CLASSIFICAÇÃO DOS CHAMADOS</h3>
            <div className="grafico-placeholder">
              {classificacaoResumo.length > 0 ? (
                renderPieChart(classificacaoResumo, 90)
              ) : (
                <p>Nenhum dado disponível</p>
              )}
            </div>
          </div>
        </main>

        {modalAberto && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="fechar-modal" onClick={fecharModal}>
                ✕
              </button>

              <div className="grafico-placeholder expanded">
                {cardSelecionado === "feedback" &&
                  resumoFeedback.length > 0 &&
                  renderPieChart(resumoFeedback, 120)}

                {cardSelecionado === "total" &&
                  totalChamados.length > 0 &&
                  renderBarChart(totalChamados, "name", "#60a5fa")}

                {cardSelecionado === "classificacao" &&
                  classificacaoResumo.length > 0 &&
                  renderPieChart(classificacaoResumo, 120)}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}