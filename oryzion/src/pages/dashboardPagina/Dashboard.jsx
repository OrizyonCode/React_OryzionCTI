import React from "react";
import "./dashboard.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Dashboard = () => {
  return (
    <div className="painel-principal">
      <Header />

      <main className="conteudo-painel">
        <button className="botao-voltar">← Voltar</button>

        <div className="container-cartoes">
          <div className="cartao">Dash 1</div>
          <div className="cartao">Dash 2</div>
          <div className="cartao">Dash 3</div>
          <div className="cartao">Dash 4</div>
          <div className="cartao">Dash 5</div>
          <div className="cartao">Dash 6</div>
          <div className="cartao">Dash 7</div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
