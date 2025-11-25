import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [modalAberto, setModalAberto] = useState(false);
  const [cardSelecionado, setCardSelecionado] = useState(null);
  const [feedbackRespondido, setFeedbackRespondido] = useState([]);
  const [carregando, setCarregando] = useState(true);
<<<<<<< HEAD
=======
  const [avaliacaoMensal, setAvaliacaoMensal] = useState([]);
  const [avaliacaoFeedbackAnual, setAvaliacaoFeedbackAnual] = useState([]); // 🆕 novo estado
>>>>>>> 54d9b770de190c03ae863816d9aadf5ed6063676

  const abrirModal = (tipo) => {
    setCardSelecionado(tipo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCardSelecionado(null);
  };

  const COLORS = ["#1e293b", "#7f1d1d"];

<<<<<<< HEAD
  // === Buscar dados da API ===
  useEffect(() => {
    async function carregarFeedbacks() {
      try {
        const resposta = await fetch("http://localhost:5128/api/Feedback"); // ⬅️ ajusta a porta se for diferente
        const dados = await resposta.json();

        // Conta quantos foram respondidos e não respondidos
        const respondidos = dados.filter(f => f.status === true).length;
        const naoRespondidos = dados.filter(f => f.status === false).length;
=======
  // === Buscar dados da API de feedback ===
  useEffect(() => {
    async function carregarFeedbacks() {
      try {
        const resposta = await fetch("http://localhost:5128/api/Feedback");
        const dados = await resposta.json();

        const respondidos = dados.filter((f) => f.status === true).length;
        const naoRespondidos = dados.filter((f) => f.status === false).length;
>>>>>>> 54d9b770de190c03ae863816d9aadf5ed6063676

        setFeedbackRespondido([
          { name: "Respondidos", value: respondidos },
          { name: "Não Respondidos", value: naoRespondidos },
        ]);
<<<<<<< HEAD

=======
>>>>>>> 54d9b770de190c03ae863816d9aadf5ed6063676
      } catch (erro) {
        console.error("Erro ao carregar feedbacks:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarFeedbacks();
  }, []);

<<<<<<< HEAD
  return (
    <>
      <div className="dashboard-container">
        <Header />
        <main className="dashboard-graphs">
          {/* === FEEDBACK RESPONDIDO === */}
          <div
            className="dash-card"
            onClick={() => abrirModal("feedbackRespondido")}
          >
            <h3>FEEDBACK RESPONDIDO</h3>

=======
  // === Buscar dados da API de classificações (mensal) ===
  useEffect(() => {
    async function carregarAvaliacoesMensais() {
      try {
        const resposta = await fetch("http://localhost:5128/api/Classificacao");
        const dados = await resposta.json();

        const traduzido = dados.map((c) => {
          const s = c.sentimento?.toLowerCase();
          if (s === "positive") c.sentimento = "positivo";
          if (s === "negative") c.sentimento = "negativo";
          if (s === "neutral") c.sentimento = "neutro";
          return c;
        });

        const positivos = traduzido.filter((c) => c.sentimento === "positivo").length;
        const negativos = traduzido.filter((c) => c.sentimento === "negativo").length;
        const neutros = traduzido.filter((c) => c.sentimento === "neutro").length;

        setAvaliacaoMensal([{ mes: "Total", positivos, negativos, neutros }]);
      } catch (erro) {
        console.error("Erro ao carregar avaliações mensais:", erro);
      }
    }

    carregarAvaliacoesMensais();
  }, []);

  // === Buscar dados da API de classificações (anual) ===
  useEffect(() => {
    async function carregarAvaliacoesAnuais() {
      try {
        const resposta = await fetch("http://localhost:5128/api/Classificacao");
        const dados = await resposta.json();

        const traduzido = dados.map((c) => {
          const s = c.sentimento?.toLowerCase();
          if (s === "positive") c.sentimento = "positivo";
          if (s === "negative") c.sentimento = "negativo";
          if (s === "neutral") c.sentimento = "neutro";
          return c;
        });

        // Agrupar os feedbacks por ano
        const porAno = {};
        traduzido.forEach((c) => {
          const ano = new Date(c.data || c.createdAt || Date.now()).getFullYear(); // 👈 ajusta se teu campo for diferente
          if (!porAno[ano]) porAno[ano] = { positivos: 0, negativos: 0, neutros: 0 };

          if (c.sentimento === "positivo") porAno[ano].positivos++;
          if (c.sentimento === "negativo") porAno[ano].negativos++;
          if (c.sentimento === "neutro") porAno[ano].neutros++;
        });

        // Converter pra formato que o gráfico entende
        const dadosFormatados = Object.keys(porAno).map((ano) => ({
          ano,
          ...porAno[ano],
        }));

        setAvaliacaoFeedbackAnual(dadosFormatados);
      } catch (erro) {
        console.error("Erro ao carregar avaliações anuais:", erro);
      }
    }

    carregarAvaliacoesAnuais();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <Header />

        <main className="dashboard-graphs">
          {/* === FEEDBACK RESPONDIDO === */}
          <div
            className="dash-card"
            onClick={() => abrirModal("feedbackRespondido")}
          >
            <h3>FEEDBACK RESPONDIDO</h3>

>>>>>>> 54d9b770de190c03ae863816d9aadf5ed6063676
            {carregando ? (
              <p>Carregando gráfico...</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={feedbackRespondido}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {feedbackRespondido.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
<<<<<<< HEAD
        </main>

=======

          {/* === AVALIAÇÃO MENSAL === */}
          <div
            className="dash-card"
            onClick={() => abrirModal("avaliacaoMensal")}
          >
            <h3>AVALIAÇÃO MENSAL</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={avaliacaoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="neutros" fill="#94a3b8" />
                <Bar dataKey="positivos" fill="#1e293b" />
                <Bar dataKey="negativos" fill="#7f1d1d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* === AVALIAÇÃO FEEDBACK (ANUAL) === */}
          <div
            className="dash-card"
            onClick={() => abrirModal("avaliacaoFeedback")}
          >
            <h3>AVALIAÇÃO FEEDBACK (ANUAL)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={avaliacaoFeedbackAnual} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="ano" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="negativos" fill="#7f1d1d" />
                <Bar dataKey="positivos" fill="#1e293b" />
                <Bar dataKey="neutros" fill="#94a3b8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>

>>>>>>> 54d9b770de190c03ae863816d9aadf5ed6063676
        {/* === MODAL === */}
        {modalAberto && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="fechar-modal" onClick={fecharModal}>
                ✕
              </button>

<<<<<<< HEAD
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={feedbackRespondido}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={150}
                    label
                  >
                    {feedbackRespondido.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>
=======
              {cardSelecionado === "feedbackRespondido" && (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={feedbackRespondido}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={150}
                      label
                    >
                      {feedbackRespondido.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}

              {cardSelecionado === "avaliacaoMensal" && (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={avaliacaoMensal}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="neutros" fill="#94a3b8" />
                    <Bar dataKey="positivos" fill="#1e293b" />
                    <Bar dataKey="negativos" fill="#7f1d1d" />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {cardSelecionado === "avaliacaoFeedback" && (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={avaliacaoFeedbackAnual} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="ano" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="negativos" fill="#7f1d1d" />
                    <Bar dataKey="positivos" fill="#1e293b" />
                    <Bar dataKey="neutros" fill="#94a3b8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        )}
      </div>

>>>>>>> 54d9b770de190c03ae863816d9aadf5ed6063676
      <Footer />
    </>
  );
}

