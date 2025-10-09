import React from "react";
import ReactApexChart from "react-apexcharts";
import "./dashboard.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  const toolbar = {
    show: true,
    tools: {
      download: true,
      selection: false,
      zoom: false,
      zoomin: false,
      zoomout: false,
      pan: false,
      reset: false,
    },
  };

  // Chart de Linha
  const chart1 = {
    series: [
      { name: "Positivos", data: [28, 29, 33, 36, 32, 32, 33] },
      { name: "Negativos", data: [12, 11, 14, 18, 17, 13, 13] },
    ],
    options: {
      chart: { type: "line", toolbar },
      colors: ["#00E396", "#FF4560"],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "2x",
          colors: ["#395590ff"],
        },
      },
      stroke: { curve: "smooth", width: 3 },
      xaxis: { categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"] },
      legend: { position: "top" },
      grid: { borderColor: "#e7e7e7" },
    },
  };

  // Chart de Barras Horizontal
  const chart2 = {
    series: [
      { name: "Atendimento", data: [44, 55, 41, 64, 22, 43, 21] },
      { name: "Suporte", data: [53, 32, 33, 52, 13, 44, 32] },
      { name: "Comercial", data: [60, 40, 35, 50, 25, 55, 38] },
    ],
    options: {
      chart: { type: "bar", toolbar },
      plotOptions: { bar: { horizontal: true, borderRadius: 4,  barHeight: "5px",} },
      dataLabels: {
        enabled: true,
        style: { fontSize: "9px", colors: ["#000"] },
      },
      xaxis: { categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      colors: ["#008FFB", "#00E396", "#FEB019"],
      legend: { position: "bottom" },
      
    },
  };

  // Chart Radial - Feedback Negativo
  const chart3 = {
    series: [25],
    options: {
      chart: { type: "radialBar", toolbar },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: { background: "#e7e7e7" },
          dataLabels: {
            name: { show: false, fontSize: "14px" },
            value: { fontSize: "14px", color: "#000" },
          },
        },
      },
      colors: ["#b80a0aff"],
    },
  };

  // Chart Radial - Feedback Positivo
  const chart4 = {
    series: [75],
    options: {
      chart: { type: "radialBar", toolbar },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: { background: "#e7e7e7" },
          dataLabels: {
            name: { show: false, fontSize: "14px" },
            value: { fontSize: "14px", color: "#000" },
          },
        },
      },
      colors: ["#27993aff"],
    },
  };

  // Chart de Barras Vertical
  const chart6 = {
    series: [
      { name: "Satisfação Geral", data: [44, 55, 57, 56, 61, 58, 63] },
      { name: "Engajamento", data: [76, 85, 101, 98, 87, 105, 91] },
      { name: "Retenção", data: [35, 41, 36, 26, 45, 48, 52] },
    ],
    options: {
      chart: { type: "bar", toolbar },
      plotOptions: { bar: { borderRadius: 5, barHeight: "5px"} },
      dataLabels: {
        enabled: true,
        style: { fontSize: "10px", colors: ["#000"] },
      },
      xaxis: { categories: ["Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"] },
      colors: ["#00E396", "#008FFB", "#FEB019"],
      legend: { position: "bottom" },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="dashboard-main" style={{ flex: 1 }}>
        <div className="dashboard-grid">
          <div className="dash-card">
            <h3>Média de Feedbacks</h3>
            <ReactApexChart
              options={chart1.options}
              series={chart1.series}
              type="line"
              height={200}
            />
          </div>

          <div className="dash-card">
            <h3>Indicadores Gerais</h3>
            <ReactApexChart
              options={chart6.options}
              series={chart6.series}
              type="bar"
              height={200}
            />
          </div>

          <div className="dash-card">
            <h3>Comparativo de Departamentos</h3>
            <ReactApexChart
              options={chart2.options}
              series={chart2.series}
              type="bar"
              height={200}
            />
          </div>

          <div className="dash-card">
            <h3>Feedbacks Positivos</h3>
            <ReactApexChart
              options={chart4.options}
              series={chart4.series}
              type="radialBar"
              height={100}
            />
          </div>

          <div className="dash-card">
            <h3>Feedbacks Negativos</h3>
            <ReactApexChart
              options={chart3.options}
              series={chart3.series}
              type="radialBar"
              height={100}
            />
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
    </div>
  );
};

export default Dashboard;
