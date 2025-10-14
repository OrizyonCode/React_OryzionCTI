  import React, { useState } from "react";
  import ReactApexChart from "react-apexcharts";
  import ApexCharts from "apexcharts";
  import "./dashboard.css";
  import Header from "../../components/header/Header";
  import Footer from "../../components/footer/Footer";

  const ApexChart = () => {
    const [state] = React.useState({
      series: [
        {
          name: "Blue",
          data: [
            { x: "Jan", y: 43 },
            { x: "Feb", y: 58 },
          ],
        },
        {
          name: "Green",
          data: [
            { x: "Jan", y: 33 },
            { x: "Feb", y: 38 },
          ],
        },
        {
          name: "Red",
          data: [
            { x: "Jan", y: 55 },
            { x: "Feb", y: 21 },
          ],
        },
      ],
      options: {
        chart: {
          type: "line",
          zoom: { enabled: false },
          toolbar: { show: false },
        },
        plotOptions: {
          line: {
            isSlopeChart: true,
          },
        },
        colors: ["#313D65", "#5F2024", "#7C7C7C"],
        dataLabels: { enabled: true },
        stroke: { curve: "smooth" },
        xaxis: { categories: ["Jan", "Feb"], title: { text: "Meses" } },
        yaxis: { title: { text: "Valores" }, min: 0 },
        legend: { position: "bottom" },
      },
    });

    return (
      <div>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={250}
        />
      </div>
    );
  };

  const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalChart, setModalChart] = useState(null);

    // === GRÁFICOS ORIGINAIS ===

    const chart1 = {
      series: [
        { name: "Positivos - 2013", data: [28, 29, 33, 36, 32, 32, 33] },
        { name: "Negativos - 2013", data: [12, 11, 14, 18, 17, 13, 13] },
      ],
      options: {
        chart: { type: "line", zoom: { enabled: false }, toolbar: { show: false } },
        colors: ["#313D65", "#5F2024"],
        dataLabels: { enabled: true },
        stroke: { curve: "smooth" },
        grid: { borderColor: "#e7e7e7" },
        markers: { size: 3 },
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], title: { text: "Meses" } },
        yaxis: { title: { text: "Quantidade" }, min: 0, max: 40 },
        legend: { position: "top", horizontalAlign: "center" },
      },
    };

    const chart2 = {
      series: [
        { name: "Atendimento", data: [64, 22, 43, 21] },
        { name: "Suporte", data: [52, 13, 44, 32] },
      ],
      options: {
        chart: { type: "bar", toolbar: { show: true } },
        plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: "70%" } },
        dataLabels: {
          enabled: true,
          style: { colors: ["#000"], fontSize: "13px", fontWeight: "bold" },
        },
        xaxis: { categories: [2004, 2005, 2006, 2007] },
        colors: ["#7C7C7C", "#313D65"],
        legend: { position: "bottom" },
      },
    };

    const chart6 = {
      series: [
        { name: "Satisfação Geral", data: [57, 56, 61, 58] },
        { name: "Engajamento", data: [101, 98, 87, 105] },
        { name: "Retenção", data: [36, 26, 45, 48] },
      ],
      options: {
        chart: { type: "bar", toolbar: { show: true } },
        plotOptions: { bar: { borderRadius: 5, columnWidth: "55%" } },
        dataLabels: { enabled: true },
        xaxis: { categories: ["Abr", "Mai", "Jun", "Jul"] },
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
            hollow: { size: "35%" },
            dataLabels: {
              name: { fontSize: "14px" },
              value: { fontSize: "16px", formatter: (val) => val + "%" },
            },
          },
        },
        colors: ["#313D65", "#5F2024"],
        labels: ["Positivos", "Negativos"],
        legend: { show: true, position: "bottom" },
      },
    };

    const candleChart = {
      series: [
        {
          data: [
            { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
            { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
            { x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.65] },
          ],
        },
      ],
      options: {
        chart: { type: "candlestick", height: 350 },
        title: { text: "Análise de Variação", align: "left" },
        xaxis: { type: "datetime" },
        yaxis: { tooltip: { enabled: true } },
        plotOptions: { candlestick: { colors: { upward: "#313D65", downward: "#5F2024" } } },
      },
    };

    const abrirModal = (chart) => {
      setModalChart(chart);
      setIsModalOpen(true);
    };

    const fecharModal = () => {
      setIsModalOpen(false);
      setModalChart(null);
    };

    return (
      <div className="dashboard-container">
        <Header />
        <main className="dashboard-main">
          <div className="dashboard-grid">
            <div className="dash-card" onClick={() => abrirModal(chart1)}>
              <h3>Média de Feedbacks</h3>
              <ReactApexChart options={chart1.options} series={chart1.series} type="line" height={250} />
            </div>

            <div className="dash-card" onClick={() => abrirModal(chart6)}>
              <h3>Indicadores Gerais</h3>
              <ReactApexChart options={chart6.options} series={chart6.series} type="bar" height={250} />
            </div>

            <div className="dash-card" onClick={() => abrirModal(chart2)}>
              <h3>Comparativo de Departamentos</h3>
              <ReactApexChart options={chart2.options} series={chart2.series} type="bar" height={200} />
            </div>

            <div className="dash-card" onClick={() => abrirModal(feedbackChart)}>
              <h3>Feedbacks</h3>
              <ReactApexChart options={feedbackChart.options} series={feedbackChart.series} type="radialBar" height={200} />
            </div>

            <div className="dash-card" onClick={() => abrirModal(candleChart)}>
              <h3>Variação de Valores</h3>
              <ReactApexChart options={candleChart.options} series={candleChart.series} type="candlestick" height={200} />
            </div>

            {/* === NOVO GRÁFICO ADICIONADO === */}
            <div className="dash-card">
              <h3>Desempenho Trimestral (Slope Chart)</h3>
              <ApexChart />
            </div>
          </div>
        </main>
        <Footer />

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
