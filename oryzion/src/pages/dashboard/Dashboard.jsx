import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

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
  const [chamadosMensal, setChamadosMensal] = useState([]);
  const [chamadosAnual, setChamadosAnual] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

        const chamadoRes = await fetch("https://localhost:7162/api/Chamado");
        const chamadoData = await chamadoRes.json();

        if (chamadoData && chamadoData.length > 0) {
          const porMes = {};
          const porAno = {};

          chamadoData.forEach((c) => {
            if (!c.data) return;
            const d = new Date(c.data);
            if (isNaN(d)) return;

            const mesAno = `${d.getMonth() + 1}/${d.getFullYear()}`;
            const ano = d.getFullYear();

            porMes[mesAno] = (porMes[mesAno] || 0) + 1;
            porAno[ano] = (porAno[ano] || 0) + 1;
          });

          setChamadosMensal(
            Object.keys(porMes)
              .sort((a, b) => {
                const [mesA, anoA] = a.split("/").map(Number);
                const [mesB, anoB] = b.split("/").map(Number);
                return new Date(anoA, mesA - 1) - new Date(anoB, mesB - 1);
              })
              .map((k) => ({ mes: k, quantidade: porMes[k] }))
          );

          setChamadosAnual(
            Object.keys(porAno)
              .sort((a, b) => a - b)
              .map((k) => ({ ano: k, quantidade: porAno[k] }))
          );
        } else {
          setChamadosMensal([]);
          setChamadosAnual([]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#4ade80", "#f87171"];

  // -------------------------------
  // 🔥 ENVIO CORRIGIDO PARA DashListagem
  // -------------------------------
  const enviarFiltroListagem = (valor) => {
    navigate("/DashListagem", {
      state: {
        tipo: "resposta",
        valor: valor
      }
    });
  };

  const renderPieChart = (data, outerRadius = 70) => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          label
          onClick={(entry) => {
            enviarFiltroListagem(entry.name === "Respondidos" ? "respondidos" : "naorespondidos");
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          <p style={{ textAlign: "center", marginTop: "2rem" }}>Carregando dados...</p>
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

          <div className="dash-card" onClick={() => abrirModal("feedback")}>
            <h3>FEEDBACK RESPONDIDO</h3>
            <div className="grafico-placeholder">
              {resumoFeedback.length > 0
                ? renderPieChart(resumoFeedback, 90)
                : <p>Nenhum dado disponível</p>}
            </div>
          </div>

          <div className="dash-card" onClick={() => abrirModal("mensal")}>
            <h3>CHAMADOS POR MÊS</h3>
            <div className="grafico-placeholder">
              {chamadosMensal.length > 0
                ? renderBarChart(chamadosMensal, "mes", "#60a5fa")
                : <p>Nenhum dado disponível</p>}
            </div>
          </div>

          <div className="dash-card" onClick={() => abrirModal("anual")}>
            <h3>CHAMADOS POR ANO</h3>
            <div className="grafico-placeholder">
              {chamadosAnual.length > 0
                ? renderBarChart(chamadosAnual, "ano", "#f97316")
                : <p>Nenhum dado disponível</p>}
            </div>
          </div>

        </main>

        {modalAberto && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="fechar-modal" onClick={fecharModal}>✕</button>

              <div className="grafico-placeholder expanded">
                {cardSelecionado === "feedback" &&
                  resumoFeedback.length > 0 &&
                  renderPieChart(resumoFeedback, 120)}

                {cardSelecionado === "mensal" &&
                  chamadosMensal.length > 0 &&
                  renderBarChart(chamadosMensal, "mes", "#60a5fa")}

                {cardSelecionado === "anual" &&
                  chamadosAnual.length > 0 &&
                  renderBarChart(chamadosAnual, "ano", "#facc15")}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
} 