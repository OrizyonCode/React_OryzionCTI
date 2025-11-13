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
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [modalAberto, setModalAberto] = useState(false);
  const [cardSelecionado, setCardSelecionado] = useState(null);
  const [feedbackRespondido, setFeedbackRespondido] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const abrirModal = (tipo) => {
    setCardSelecionado(tipo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCardSelecionado(null);
  };

  const COLORS = ["#1e293b", "#7f1d1d"];

  // === Buscar dados da API ===
  useEffect(() => {
    async function carregarFeedbacks() {
      try {
        const resposta = await fetch("http://localhost:5128/api/Feedback"); // ⬅️ ajusta a porta se for diferente
        const dados = await resposta.json();

        // Conta quantos foram respondidos e não respondidos
        const respondidos = dados.filter(f => f.status === true).length;
        const naoRespondidos = dados.filter(f => f.status === false).length;

        setFeedbackRespondido([
          { name: "Respondidos", value: respondidos },
          { name: "Não Respondidos", value: naoRespondidos },
        ]);

      } catch (erro) {
        console.error("Erro ao carregar feedbacks:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarFeedbacks();
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
        </main>

        {/* === MODAL === */}
        {modalAberto && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="fechar-modal" onClick={fecharModal}>
                ✕
              </button>

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
      <Footer />
    </>
  );
}

