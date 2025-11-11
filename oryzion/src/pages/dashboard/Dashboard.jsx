import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [modalAberto, setModalAberto] = useState(false);
  const [cardSelecionado, setCardSelecionado] = useState(null);

  const abrirModal = (tipo) => {
    setCardSelecionado(tipo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCardSelecionado(null);
  };

  // === Dados ===
  const feedbackMensal = [
    { mes: "Jan", bom: 40, ruim: 15 },
    { mes: "Feb", bom: 60, ruim: 25 },
    { mes: "Mar", bom: 85, ruim: 35 },
    { mes: "Apr", bom: 70, ruim: 30 },
    { mes: "May", bom: 100, ruim: 45 },
    { mes: "Jun", bom: 95, ruim: 50 },
  ];

  const avaliacaoFeedbackAnual = [
    { ano: "2022", positivos: 10738, neutros: 9738, negativos: 10738 },
    { ano: "2023", positivos: 10738, neutros: 10738, negativos: 9738 },
    { ano: "2024", positivos: 10738, neutros: 10738, negativos: 10738 },
  ];

  const avaliacaoMensal = [
    { mes: "Jan", positivos: 80, neutros: 50, negativos: 35 },
    { mes: "Feb", positivos: 90, neutros: 45, negativos: 40 },
    { mes: "Mar", positivos: 85, neutros: 50, negativos: 35 },
    { mes: "Apr", positivos: 95, neutros: 55, negativos: 30 },
    { mes: "May", positivos: 100, neutros: 60, negativos: 40 },
  ];

  const feedbackRespondido = [
    { name: "Respondidos", value: 70 },
    { name: "Não Respondidos", value: 30 },
  ];

  const comentarios = [
    "O atendimento demorou demais e ninguém resolveu meu problema.",
    "O suporte foi muito atencioso e resolveu rápido.",
    "Achei o sistema fácil de usar!",
  ];

  const COLORS = ["#1e293b", "#7f1d1d"];

  // === Conteúdo Dinâmico do Modal ===
  const renderConteudoModal = () => {
    switch (cardSelecionado) {
      case "feedbackMensal":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={feedbackMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bom" stroke="#1e293b" strokeWidth={3} />
              <Line type="monotone" dataKey="ruim" stroke="#64748b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );

      case "avaliacaoFeedback":
        return (
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
        );

      case "feedbackRespondido":
        return (
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
        );

      case "avaliacaoMensal":
        return (
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
        );

      default:
        return <p>Nenhum dado disponível</p>;
    }
  };

  return (<>
  
    <div className="dashboard-container">
      <Header />
      <main className="dashboard-graphs ">

       {/* === AVALIAÇÃO MENSAL === */}
        <div className="dash-card " onClick={() => abrirModal("avaliacaoMensal")}>
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

        {/* === FEEDBACK MENSAL === */}
        <div className="dash-card" onClick={() => abrirModal("feedbackMensal")}>
          <h3>FEEDBACKS MENSAL</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={feedbackMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bom" stroke="#1e293b" strokeWidth={3} />
              <Line type="monotone" dataKey="ruim" stroke="#64748b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>



        {/* === FEEDBACK RESPONDIDO === */}
        <div className="dash-card" onClick={() => abrirModal("feedbackRespondido")}>
          <h3>FEEDBACK RESPONDIDO</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={feedbackRespondido}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
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

                {/* === AVALIAÇÃO FEEDBACK (ANUAL) === */}
        <div className="dash-card" onClick={() => abrirModal("avaliacaoFeedback")}>
          <h3>AVALIAÇÃO FEEDBACK</h3>
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

      {/* === MODAL === */}
      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="fechar-modal" onClick={fecharModal}>
              ✕
            </button>
            {renderConteudoModal()}
          </div>
        </div>
      )}

    </div>
      <Footer />
    
      </>
  );
}
