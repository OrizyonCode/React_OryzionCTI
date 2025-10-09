import React from "react";
// Importe o componente Voltar
import Voltar from "../../components/voltar/Voltar"; // ATENÇÃO: Ajuste este caminho conforme necessário!

import "./Resumo.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Resumo = () => {

  // 1. Defina a função que será passada para o componente Voltar
  const handleVoltar = () => {
    // Exemplo: Usar a função nativa do navegador para voltar
    window.history.back(); 
    // Se estiver usando React Router, você usaria: navigate(-1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <section className="container-resumo" style={{ flex: 1 }}>
        <div className="modal-resumo">
          <div className="voltar">
            {/* 2. Adicione o componente Voltar na div e passe a função */}
            <Voltar acaoDeVoltar={handleVoltar} /> 
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