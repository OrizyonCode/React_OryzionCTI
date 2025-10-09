import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import "./dashboard.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChart, setModalChart] = useState(null);

  // ======================
  // Charts simples
  // ======================
  const chart1 = {
  series: [
    {
      name: "High - 2013",
      data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
      name: "Low - 2013",
      data: [12, 11, 14, 18, 17, 13, 13]
    }
  ],
  options: {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.5
      },
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    colors: [ "#313D65", "#5F2024"],
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth' },
    title: { text: 'Feedbacks: Positivo & Negativo', align: 'left' },
    grid: {
      borderColor: '#e7e7e7',
      row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }
    },
    markers: { size: 1 },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: { text: 'Month' }
    },
    yaxis: {
      title: { text: 'Temperature' },
      min: 5,
      max: 40
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  }
};


const chart2 = {
  series: [
    { name: "Atendimento", data: [44, 55, 41, 64, 22, 43, 21] },
    { name: "Suporte", data: [53, 32, 33, 52, 13, 44, 32] },
    { name: "Comercial", data: [60, 40, 35, 50, 25, 55, 38] } // terceira série adicionada
  ],
  options: {
    chart: { type: "bar", toolbar: { show: true } },
    plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: "100%" } },
    dataLabels: { enabled: true },
    xaxis: { categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007] },
    colors: ["#7C7C7C", "#313D65", "#5F2024"],
    legend: { position: "bottom" },
    tooltip: { shared: true, intersect: false },
    stroke: { show: true, width: 1, colors: ['#fff'] }
  }
};


  const chart6 = {
    series: [
      { name: "Satisfação Geral", data: [44, 55, 57, 56, 61, 58, 63] },
      { name: "Engajamento", data: [76, 85, 101, 98, 87, 105, 91] },
      { name: "Retenção", data: [35, 41, 36, 26, 45, 48, 52] },
    ],
    options: {
      chart: { type: "bar", toolbar: { show: true } },
      plotOptions: { bar: { borderRadius: 5, barHeight: "20%" } },
      dataLabels: { enabled: true },
      xaxis: { categories: ["Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"] },
      colors: ["#7C7C7C", "#313D65", "#5F2024"],
      legend: { position: "bottom" },
    },
  };

  const feedbackChart = {
    series: [75, 25],
    options: {
      chart: { type: "radialBar", toolbar: { show: true } },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: { background: "#e7e7e7" },
          dataLabels: {
            name: { show: true },
            value: { fontSize: "14px" },
          },
        },
      },
        colors: [ "#313D65", "#5F2024"],
      labels: ["Positivos", "Negativos"],
      legend: { show: true, position: "bottom" },
    },
  };

  // ======================
  // Modal abrir gráfico
  // ======================
  const abrirModal = (chart) => {
    setModalChart(chart);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setModalChart(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="dashboard-main" style={{ flex: 1 }}>
        <div className="dashboard-grid">
          <div className="dash-card" onClick={() => abrirModal(chart1)}>
            <h3>Média de Feedbacks</h3>
             <ReactApexChart options={chart1.options} series={chart1.series} type="line" height={200} />
          </div>

          <div className="dash-card" onClick={() => abrirModal(chart6)}>
            <h3>Indicadores Gerais</h3>
            <ReactApexChart options={chart6.options} series={chart6.series} type="bar" height={200} />
          </div>

          <div className="dash-card" onClick={() => abrirModal(chart2)}>
            <h3>Comparativo de Departamentos</h3>
             <ReactApexChart options={chart2.options} series={chart2.series} type="bar" height={200} />
          </div>

          <div className="dash-card" onClick={() => abrirModal(feedbackChart)}>
            <h3>Feedbacks</h3>
            <ReactApexChart options={feedbackChart.options} series={feedbackChart.series} type="radialBar" height={150} />
          </div>

          <div className="dash-card comentarios">
            <h3>🗣️ Comentários Recentes</h3>
            <div className="comentarios-content">
              <p>“O atendimento foi incrível!”</p>
              <p>“Poderia ter sido mais rápido.”</p>
              <p>“Suporte técnico excelente.”</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* === MODAL === */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="fechar-modal" onClick={fecharModal}>✖</button>
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
