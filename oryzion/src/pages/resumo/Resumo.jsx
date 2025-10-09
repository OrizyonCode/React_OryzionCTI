import React from "react";
import "./Resumo.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Resumo = () => {

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <section className="container-resumo" style={{ flex: 1 }}>
        <div className="modal-resumo">
          <div className="voltar">
            
          </div>

          <h2 className="titulo-resumo">Resumo 0001</h2>

          <div className="caixa-texto">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resumo;
