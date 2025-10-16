import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./Dashboard.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const DesempenhoTrimestral = () => {
  const [state] = React.useState({
    series: [
      { name: "Satisfação", data: [75, 80] },
      { name: "Engajamento", data: [65, 70] },
    ],
    options: {
      chart: { type: "line", zoom: { enabled: false }, toolbar: { show: false } },
      colors: ["#3B82F6", "#10B981"],
      stroke: { curve: "smooth", width: 3 },
      dataLabels: { enabled: false },
      xaxis: { categories: ["Q1", "Q2"], title: { text: "Trimestre" } },
      yaxis: { min: 0, max: 100, title: { text: "Valores" } },
      legend: { position: "bottom" },
      grid: { borderColor: "#e0e0e0" },
    },
  });

  return <ReactApexChart options={state.options} series={state.series} type="line" height={250} />;
};

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChart, setModalChart] = useState(null);

  const abrirModal = (chart) => {
    setModalChart(chart);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setModalChart(null);
  };

  const feedbackLinha = {
    series: [
      { name: "Positivos", data: [28, 35, 33, 40, 38, 42, 45] },
      { name: "Negativos", data: [12, 10, 14, 8, 15, 11, 9] },
    ],
    options: {
      chart: { type: "line", zoom: { enabled: false }, toolbar: { show: false } },
      colors: ["#3B82F6", "#EF4444"],
      stroke: { curve: "smooth", width: 3 },
      markers: { size: 4 },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], title: { text: "Meses" } },
      yaxis: { min: 0 },
      legend: { position: "top" },
      grid: { borderColor: "#e0e0e0" },
    },
  };

  const comparativoDepartamentos = {
    series: [
      { name: "Atendimento", data: [64, 22, 43, 21] },
      { name: "Suporte", data: [52, 13, 44, 32] },
    ],
    options: {
      chart: { type: "bar", toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: "65%" } },
      colors: ["#10B981", "#3B82F6"],
      dataLabels: { enabled: true, style: { colors: ["#000"], fontWeight: "bold" } },
      xaxis: { categories: ["Vendas", "TI", "RH", "Financeiro"] },
      legend: { position: "bottom" },
    },
  };

  const indicadoresGerais = {
    series: [
      { name: "Satisfação", data: [57, 56, 61, 58] },
      { name: "Engajamento", data: [101, 98, 87, 105] },
      { name: "Retenção", data: [36, 26, 45, 48] },
    ],
    options: {
      chart: { type: "bar", toolbar: { show: false } },
      plotOptions: { bar: { borderRadius: 5, columnWidth: "55%" } },
      colors: ["#F59E0B", "#3B82F6", "#EF4444"],
      dataLabels: { enabled: true },
      xaxis: { categories: ["Abr", "Mai", "Jun", "Jul"] },
      legend: { position: "bottom" },
    },
  };

  const radialFeedback = {
    series: [75, 25],
    options: {
      chart: { type: "radialBar", toolbar: { show: false } },
      plotOptions: {
        radialBar: {
          hollow: { size: "35%" },
          dataLabels: { name: { fontSize: "14px" }, value: { fontSize: "16px", formatter: (val) => val + "%" } },
        },
      },
      colors: ["#3B82F6", "#EF4444"],
      labels: ["Positivos", "Negativos"],
      legend: { show: true, position: "bottom" },
    },
  };

  const desempenhoTrimestral = {
    series: [
      { name: "Satisfação", data: [75, 80] },
      { name: "Engajamento", data: [65, 70] },
    ],
    options: {
      chart: { type: "line", zoom: { enabled: false }, toolbar: { show: false } },
      colors: ["#3B82F6", "#10B981"],
      stroke: { curve: "smooth", width: 3 },
      dataLabels: { enabled: false },
      xaxis: { categories: ["Q1", "Q2"], title: { text: "Trimestre" } },
      yaxis: { min: 0, max: 100, title: { text: "Valores" } },
      legend: { position: "bottom" },
      grid: { borderColor: "#e0e0e0" },
    },
  };

  return (
    <div className="dashboard-container ">
      <Header />
      <main className="dashboard-main">
        <div className="dashboard-grid ">
          <div className="dash-card" onClick={() => abrirModal(feedbackLinha)}>
            <span className="badge badge-blue">Linha</span>
            <h3>Média de Feedbacks</h3>
            <ReactApexChart options={feedbackLinha.options} series={feedbackLinha.series} type="line" height={250} />
          </div>

          <div className="dash-card" onClick={() => abrirModal(indicadoresGerais)}>
            <span className="badge badge-yellow">Barra</span>
            <h3>Indicadores Gerais</h3>
            <ReactApexChart options={indicadoresGerais.options} series={indicadoresGerais.series} type="bar" height={250} />
          </div>

          <div className="dash-card" onClick={() => abrirModal(comparativoDepartamentos)}>
            <span className="badge badge-green">Barra</span>
            <h3>Comparativo de Departamentos</h3>
            <ReactApexChart options={comparativoDepartamentos.options} series={comparativoDepartamentos.series} type="bar" height={200} />
          </div>

          <div className="dash-card" onClick={() => abrirModal(radialFeedback)}>
            <span className="badge badge-red">Radial</span>
            <h3>Feedbacks Positivos x Negativos</h3>
            <ReactApexChart options={radialFeedback.options} series={radialFeedback.series} type="radialBar" height={200} />
          </div>

          <div className="dash-card" onClick={() => abrirModal(desempenhoTrimestral)}>
            <span className="badge badge-blue">Linha</span>
            <h3>Desempenho Trimestral</h3>
            <ReactApexChart
              options={desempenhoTrimestral.options}
              series={desempenhoTrimestral.series}
              type="line"
              height={250}
            />
          </div>
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="fechar-modal" onClick={fecharModal}>x</button>
            <h2>Gráfico Detalhado</h2>
            {modalChart && (
              <ReactApexChart
                options={modalChart.options}
                series={modalChart.series}
                type={modalChart.options.chart.type}
                height={400}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
